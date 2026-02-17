import Joi from 'joi';

export const createExamSchema = Joi.object({
  examName: Joi.string().optional().allow(null, ''),
  title: Joi.string().optional().allow(null, ''),
  subject: Joi.string().required(),
  class: Joi.string().required(),
  section: Joi.string().optional().allow(null, ''),
  examDate: Joi.alternatives().try(
    Joi.date(),
    Joi.string().isoDate()
  ).optional(),
  duration: Joi.number().integer().min(1).required(),
  totalMarks: Joi.number().min(1).required(),
  questions: Joi.array().items(Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.number().required(),
    marks: Joi.number().optional(),
    image: Joi.string().optional().allow(null, ''),
  })).optional(),
  isActive: Joi.boolean().optional(),
});

export const submitExamSchema = Joi.object({
  examId: Joi.string().required(),
  answers: Joi.array().items(Joi.object({
    questionIndex: Joi.number().required(),
    selectedOption: Joi.number().required(),
  })).min(1).required(),
});
