const assert = require('assert');
const User = require('../models/user');

describe('Deleting Database records', function (){
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
  it('Delete one record from User', function(done){
    User.findOneAndDelete({lastName: 'Baridon'}).then(function(){
      User.findOne({lastName: 'Baridon'}).then(function(result){
        assert(result === null);
        done();
      })
    })
  });
});
