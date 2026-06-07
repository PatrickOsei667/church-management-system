const Joi = require('joi');

const donationSchema = Joi.object({
  member_id: Joi.number().required(),
  branch_id: Joi.number().required(),
  donation_date: Joi.string().isoDate().required(),
  items: Joi.array()
    .items(
      Joi.object({
        donation_type: Joi.string().required(),
        amount: Joi.number().positive().required(),
      })
    )
    .required(),
});

module.exports = { donationSchema };
