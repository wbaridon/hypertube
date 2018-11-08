const assert = require('assert');
const User = require('../models/user');

describe('Saving Database records', function (){
  it('Save a record into User', function(done){
    var user = new User({
      email: 'wbaridon@student.42.fr',
      userName: 'wbaridon',
      picture: 'test.jpg',
      LastName: 'Baridon',
      firstName: 'Wenceslas',
      password: 'test',
      locale: 'en'
    });
    user.save().then(function(){
      assert(user.isNew === false);
      done();
    }).catch(done);
  });
});
