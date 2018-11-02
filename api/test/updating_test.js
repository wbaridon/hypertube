const assert = require('assert');
const User = require('../models/user');

describe('Updating Database records', function (){
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
  it('Update one record from User', function(done){
    User.findOneAndUpdate({name: 'Baridon'}, {name: 'Grain'}).then(function(){
      User.findOne({_id: user._id}).then(function(result){
        assert(result.name === 'Grain');
        done();
      })
    })
  });
});
