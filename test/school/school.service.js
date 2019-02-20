/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:13
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-20 15:29:07
 */

const School = require('mongoose').model('School');
const handleMongooseError = require('../../common/handlers/mongoose.error.handler');

/**
 * @function : `Create  School Fn`
 * @description : `Will return result as array`
 */
exports.createSchool = school => {
  try {
    const _school = new School(school);
    return new Promise((resolve, reject) => {
      _school
        .save()
        .then(result => {
          resolve([false, result]);
        })
        .catch(err => {
          console.error(err);
          resolve([err, false]);
        });
    });
  } catch (error) {
    return error;
  }
};

/**
 * @function : `Get School Fn`
 * @description : `Will return result as array`
 *
 * @param { string } email : `will have email `
 */
exports.findByEmail = email => {
  try {
    return new Promise((resolve, reject) => {
      School.findOne({ email: email, isActivated: true })
        .then(_school => resolve([false, _school]))
        .catch(err => resolve([err, false]));
    });
  } catch (error) {
    return error;
  }
};
