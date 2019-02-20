/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-20 15:35:20
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-20 15:44:03
 */
const Joi = require('joi');

// Setting up user schema.
const schoolLoginSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
});

module.exports = schoolLoginSchema;
