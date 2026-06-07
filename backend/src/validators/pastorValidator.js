const Joi = require('joi');

const pastorSchema = Joi.object({
  pastor_name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  branch_id: Joi.number().required(),
});

module.exports = { pastorSchema };
