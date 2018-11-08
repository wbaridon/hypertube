const assert = require('assert');
const User = require('../models/user');

describe('Finding Database records', function (){
  var user
  beforeEach(function(done){
    user = new User({
      email: 'wbaridon@student.42.fr',
      userName: 'wbaridon',
      picture: 'test.jpg',
      lastName: 'Baridon',
      firstName: 'Wenceslas',
      password: 'test',
      locale: 'en'
    });
    user.save().then(function(){
      done();
    })
  })
  it('Find one record from User', function(done){
    User.findOne({lastName: 'Baridon'}).then(function(result){
      assert(result.lastName === 'Baridon')
      done();
    })
  });
  it('Find one record by ID from User', function(done){
    User.findOne({ _id: user._id}).then(function(result){
      assert(result._id.toString() === user._id.toString());
      done();
    })
  });
});
