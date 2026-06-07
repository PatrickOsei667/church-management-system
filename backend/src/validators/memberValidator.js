const Joi = require('joi');

const memberSchema = Joi.object({
  member_name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  branch_id: Joi.number().required(),
});

const updateMemberSchema = Joi.object({
  member_name: Joi.string().min(2).optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

module.exports = { memberSchema, updateMemberSchema };
