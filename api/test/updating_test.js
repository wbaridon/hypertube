const assert = require('assert');
const User = require('../models/user');

describe('Updating Database records', function (){
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
  it('Update one record from User', function(done){
    User.findOneAndUpdate({lastName: 'Baridon'}, {lastName: 'Grain'}).then(function(){
      User.findOne({_id: user._id}).then(function(result){
        assert(result.lastName === 'Grain');
        done();
      })
    })
  });
});
