import Joi from 'joi';

export const validateBody = (schema) => (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message).join(', ');
      return res.status(400).json({ success: false, error: messages, errors: error.details.map(d => d.message) });
    }
    req.body = value;
    next();
  } catch (err) {
    console.error('Validation error:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
};
