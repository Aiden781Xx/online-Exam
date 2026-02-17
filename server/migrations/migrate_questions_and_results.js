import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set in environment. Aborting.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to DB');

  const Question = mongoose.connection.collection('questions');
  const Exam = mongoose.connection.collection('exams');
  const Result = mongoose.connection.collection('results');

  // Backup collections
  console.log('Backing up questions -> questions_backup');
  try { await mongoose.connection.db.collection('questions_backup').drop().catch(()=>{}); } catch(e){}
  const qs = await Question.find({}).toArray();
  if (qs.length) await mongoose.connection.db.collection('questions_backup').insertMany(qs);

  // Migrate questions into exams.questions (inline)
  console.log('Migrating questions into exams.questions');
  const byExam = {};
  qs.forEach(q => {
    const examId = q.examId && q.examId.toString();
    if (!examId) return;
    byExam[examId] = byExam[examId] || [];
    byExam[examId].push({
      questionText: q.questionText,
      options: (q.options || []).map(o => o.text || o),
      correctAnswer: q.options ? q.options.findIndex(o=>o.isCorrect) : 0,
      marks: q.marks || 1,
      image: q.questionImage || null,
    });
  });

  for (const examId of Object.keys(byExam)) {
    const exam = await Exam.findOne({ _id: new mongoose.Types.ObjectId(examId) });
    if (!exam) continue;
    const existing = exam.questions || [];
    const toInsert = byExam[examId];
    exam.questions = existing.concat(toInsert);
    await Exam.updateOne({ _id: exam._id }, { $set: { questions: exam.questions } });
    console.log(`Patched exam ${examId} with ${toInsert.length} questions`);
  }

  // Backup results
  console.log('Backing up results -> results_backup');
  try { await mongoose.connection.db.collection('results_backup').drop().catch(()=>{}); } catch(e){}
  const rs = await Result.find({}).toArray();
  if (rs.length) await mongoose.connection.db.collection('results_backup').insertMany(rs);

  // Migrate legacy results that reference questionId -> to new answers with questionIndex
  console.log('Migrating results to new schema');
  for (const r of rs) {
    try {
      if (!r.examId) continue;
      const exam = await Exam.findOne({ _id: new mongoose.Types.ObjectId(r.examId.toString()) });
      if (!exam) continue;
      const questions = exam.questions || [];
      const questionIndexMap = {};
      // If old questions existed as separate docs, map their original _id to index by matching text
      // Best-effort: try to find by questionText or by sequence
      questions.forEach((q, idx) => { questionIndexMap[q.questionText] = idx; });

      const newAnswers = (r.answers || []).map(a => {
        // legacy answer may have questionId and selectedOptionIndex
        const qId = a.questionId ? a.questionId.toString() : null;
        // Try find matching question by index if questionId isn't present in inline
        const qIndex = typeof a.questionIndex === 'number' ? a.questionIndex : (a.questionText ? questionIndexMap[a.questionText] : -1);
        const selectedOption = typeof a.selectedOptionIndex === 'number' ? a.selectedOptionIndex : (a.selectedOption || 0);
        const q = questions[qIndex] || null;
        const isCorrect = q && typeof q.correctAnswer === 'number' ? (selectedOption === q.correctAnswer) : false;
        const marksObtained = isCorrect ? (q.marks || 1) : 0;
        return {
          questionIndex: qIndex >= 0 ? qIndex : null,
          selectedOption,
          isCorrect,
          marksObtained,
        };
      });

      const totalMarks = questions.reduce((s,q)=>s+(q.marks||1),0);
      const score = newAnswers.reduce((s,a)=>s+(a.marksObtained||0),0);
      const percentage = totalMarks>0?Math.round((score/totalMarks)*100):0;

      await Result.updateOne({ _id: r._id }, { $set: {
        answers: newAnswers,
        totalMarks,
        score,
        percentage,
        status: 'graded',
        examSnapshot: {
          examName: exam.examName || exam.title || null,
          subject: exam.subject || null,
          class: exam.class || null,
          section: exam.section || null,
          totalMarks,
        }
      } });
      console.log(`Migrated result ${r._id}`);
    } catch (err) {
      console.error('Failed to migrate result', r._id, err.message);
    }
  }

  console.log('Migration complete');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
