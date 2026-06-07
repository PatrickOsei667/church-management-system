const Joi = require('joi');

const departmentSchema = Joi.object({
  department_name: Joi.string().min(2).required(),
  leader: Joi.string().optional(),
  branch_id: Joi.number().required(),
});

module.exports = { departmentSchema };
