const mongoose = require('mongoose');
const User = require('./user');

module.exports.getUser = function (login) {
  return new Promise ((resolve, reject) => {
    User.findOne({'login': login}).then(function(result){
      resolve(result)
    })
  })
}
module.exports.userExist = function (email, login) {
  return new Promise ((resolve, reject) => {
    User.findOne({$or: [{'email': email}, {'login': login}]}).then(function(result){
      resolve(result)
    })
  })
}
module.exports.createUser = function (data, callback) {
  var user = new User({
    email: data.email,
    userName: data.userName,
    picture: '', // Voir comment le faire
    lastName: data.lastName,
    firstName: data.firstName,
    password: data.password
  })
  user.save().then(function(){
    callback()
  })
}
module.exports.updateUser = function (user, callback) {
  // Voir sur mongo comment faire
}
