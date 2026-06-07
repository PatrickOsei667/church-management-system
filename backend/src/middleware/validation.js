const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const details = {};
    error.details.forEach((err) => {
      details[err.path[0]] = err.message;
    });

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details,
    });
  }

  req.validated = value;
  next();
};

module.exports = { validate };
