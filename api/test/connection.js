const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(function(done){
  mongoose.connect('mongodb://localhost:27017/hypertube', { useNewUrlParser: true });
  mongoose.connection.once('open', function (){
    console.log('Connexion DB: OK')
    done();
  }).on('error', function(error){
    console.log('Connection error:', error);
  });
});

// Drop the user Table before each test
beforeEach(function(done){
  mongoose.connection.collections.users.drop(function(){
    done();
  })
});
