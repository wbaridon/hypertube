const mongoose = require('mongoose');
const BlackList = require('./blackList');

module.exports.get = function (data) {
  return new Promise ((resolve, reject) => {
    User.findOne({'token': data}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.add = function (data, callback) {
  var blackList = new BlackList({
    token: data.token,
  })
  blackList.save().then(function(){
    callback()
  }).catch(err => {})
}
