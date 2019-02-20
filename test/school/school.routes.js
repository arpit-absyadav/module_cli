/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:31
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-20 15:40:31
 */
var school = require('./school.controller');
var _jwtToken = require('../../common/helpers/j_w_t/jwt.helper');
var _schoolValidator = require('./school.validator');
var prefix = '/school';
module.exports = function(app) {
  // Registration route
  app
    .route(prefix + '/registration')
    .all(_schoolValidator.validate)
    .post(school.createSchool);

  // Login route
  app
    .route(prefix + '/login')
    .all(_schoolValidator.validateLogin)
    .post(school.login);
};
