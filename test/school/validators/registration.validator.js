/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-20 15:35:20
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-20 15:51:11
 */
const Joi = require('joi');

// Setting up user schema.
const schoolSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  mobile: Joi.string()
    .min(10)
    .max(10)
    .required(),
  terms: Joi.boolean()
    .required()
    .invalid(false),
  pincode: Joi.string()
    .min(6)
    .max(6)
    .required()
});

module.exports = schoolSchema;
