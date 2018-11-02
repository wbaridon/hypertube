const assert = require('assert');
const User = require('../models/user');

describe('Deleting Database records', function (){
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
  it('Delete one record from User', function(done){
    User.findOneAndDelete({name: 'Baridon'}).then(function(){
      User.findOne({name: 'Baridon'}).then(function(result){
        assert(result === null);
        done();
      })
    })
  });
});
