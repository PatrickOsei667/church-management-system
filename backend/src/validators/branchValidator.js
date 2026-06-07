const Joi = require('joi');

const branchSchema = Joi.object({
  branch_name: Joi.string().min(2).required(),
  location: Joi.string().min(5).required(),
});

module.exports = { branchSchema };
