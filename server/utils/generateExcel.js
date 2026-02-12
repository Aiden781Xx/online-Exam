import ExcelJS from "exceljs";

export async function exportResultsToExcel(results) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Results", {
    columns: [
      { width: 25 },
      { width: 20 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 25 },
      { width: 15 },
      { width: 15 },
      { width: 12 },
      { width: 12 },
    ],
  });

  sheet.addRow([
    "Student Name",
    "Father Name",
    "Class",
    "Section",
    "Roll No",
    "Exam",
    "Total Marks",
    "Obtained",
    "Percentage",
    "Submitted At",
  ]);
  sheet.getRow(1).font = { bold: true };

  results.forEach((r) => {
    const student = r.studentId || {};
    const exam = r.examId || {};
    sheet.addRow([
      student.name || "-",
      student.fatherName || "-",
      student.class || "-",
      student.section || "-",
      student.rollNo || "-",
      exam.title || "-",
      r.totalMarks,
      r.marksObtained,
      r.percentage + "%",
      r.submittedAt
        ? new Date(r.submittedAt).toLocaleString()
        : "-",
    ]);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
