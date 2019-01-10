const mongoose = require('mongoose');
const User = require('./user');

module.exports.getUser = function (userName) {
  return new Promise ((resolve, reject) => {
    User.findOne({'userName': userName}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.getUserByMail = function (email) {
  return new Promise ((resolve, reject) => {
    User.findOne({'email': email}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.userExist = function (email, userName) {
  return new Promise ((resolve, reject) => {
    User.findOne({$or: [{'email': email}, {'userName': userName}]}).then(function(result){
      resolve(result)
    })
  })
}
module.exports.createUser = function (data, callback) {
  var user = new User({
    email: data.email,
    userName: data.userName,
    picture: data.picture, // Voir comment le faire
    lastName: data.lastName,
    firstName: data.firstName,
    password: data.password,
    locale: data.locale,
    darkTheme: data.darkTheme
  })
  user.save().then(function(){
    callback()
  })
}
module.exports.updateUser = function (field, value, newUser) {
  // Revoir update   User.findOneAndUpdate({lastName: 'Baridon'}, {lastName: 'Grain'})
  // On doit rechercher la personne en fonction d'un field puis changer la valeur
  console.log(field, value, newUser);
  return new Promise ((resolve, reject) => {
    User.findOneAndUpdate({[field]: value}, newUser)
    .then(function(result){ resolve(console.log(result)) },
    (err) => {console.log(err)}
    )
  })
}
