const mongoose = require('mongoose');
const User = require('./user');

module.exports.getUser = function (userName) {
  return new Promise ((resolve, reject) => {
    User.findOne({'userName': userName}).then(function(result){
      if (result === null) {
        reject({error: 'getUser.noSuchUser'});
      }
      resolve(result);
    })
  })
}

module.exports.getUserByMail = function (email) {
  return new Promise ((resolve, reject) => {
    User.findOne({'email': email}).then(function(result){
      if (result === null) {
        reject({error: 'getUserByMail.noSuchUser'});
      }
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
    picture: data.picture,
    lastName: data.lastName,
    firstName: data.firstName,
    password: data.password,
    locale: data.locale,
    darkTheme: data.darkTheme,
    oauth: data.oauth,
    profilIsFill: data.profilIsFill
  })
  user.save().then(function(){
    callback()
  })
}
module.exports.updateUser = function (field, value, newUser) {
  // Revoir update   User.findOneAndUpdate({lastName: 'Baridon'}, {lastName: 'Grain'})
  // On doit rechercher la personne en fonction d'un field
  return new Promise ((resolve, reject) => {
    User.findOneAndUpdate({[field]: value}, newUser)
    .then(function(result){ resolve() },
    (err) => {}
    )
  })
}
module.exports.updateUserField = function (req, update) {
  return new Promise ((resolve, reject) => {
    User.findOneAndUpdate(req, update)
    .then(function(result){ resolve() },
    (err) => {}
    )
  })
}

module.exports.getAllId = function () {
  return new Promise ((resolve, reject) => {
    User.find({}, 'userName')
    .then(function(result){ resolve(result) },
    (err) => {}
    )
  })
}

module.exports.movieSeen = function (user, data) {
  return new Promise ((resolve, reject) => {
    Movie.findOneAndUpdate({'userName': user}, {$push: {moviesHistory: data}})
    .then(function(result){ resolve() },
    (err) => {console.log(err)}
    )
  })
}

module.exports.movieUnseen = function (user, movieId) {
  return new Promise ((resolve, reject) => {
    Movie.findOneAndUpdate({ 'userName': user}, { $pull: { moviesHistory: { id: movieId } }}).then(done => {
      Movie.findOne({ userName: user }).then(movie => {
        resolve(movie.moviesHistory)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}
