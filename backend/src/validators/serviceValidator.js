const Joi = require('joi');

const serviceSchema = Joi.object({
  service_type: Joi.string().min(2).required(),
  service_date: Joi.string().isoDate().required(),
  branch_id: Joi.number().required(),
});

module.exports = { serviceSchema };
