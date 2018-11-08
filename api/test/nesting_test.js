const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Nesting records', function(){
  beforeEach(function(done){
    mongoose.connection.collections.users.drop(function (){
      done();
    })
  });
  it('Create an user with one movie seen', function(done){
    var user = new User({
      LastName: 'Baridon',
      moviesHistory: [{id: 1}]
    })
    user.save().then(function(){
      User.findOne({lastName: 'Baridon'}).then(function(record){
        assert(record.moviesHistory.length === 1)
        done();
      })
    })
  });
  it('Add a movie seen to an user', function(done){
    var user = new User({
      lastName: 'Baridon',
      moviesHistory: [{id: 1}]
    })
    user.save().then(function(){
      User.findOne({lastName: 'Baridon'}).then(function(record){
        record.moviesHistory.push({id: 2});
        record.save().then(function(){
          User.findOne({lastName: 'Baridon'}).then(result => {
            assert(result.moviesHistory.length === 2);
            done();
          })
        })
      })
    });
  })
})
