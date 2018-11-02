const assert = require('assert');
const User = require('../models/user');

describe('Finding Database records', function (){
  var user
  beforeEach(function(done){
    user = new User({
      email: 'wbaridon@student.42.fr',
      login: 'wbaridon',
      picture: 'test.jpg',
      name: 'Baridon',
      firstname: 'Wenceslas',
      password: 'test',
      langue: 0
    });
    user.save().then(function(){
      done();
    })
  })
  it('Find one record from User', function(done){
    User.findOne({name: 'Baridon'}).then(function(result){
      assert(result.name === 'Baridon')
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
