const assert = require('assert');
const User = require('../models/user');

describe('Saving Database records', function (){
  it('Save a record into User', function(done){
    var user = new User({
      email: 'wbaridon@student.42.fr',
      login: 'wbaridon',
      picture: 'test.jpg',
      name: 'Baridon',
      firstname: 'Wenceslas',
      password: 'test',
      langue: 0
    });
    user.save().then(function(){
      assert(user.isNew === false);
      done();
    }).catch(done);
  });
});
