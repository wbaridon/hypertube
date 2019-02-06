const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/hypertube', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open', function (){
  console.log('Connexion DB: OK')
}).on('error', function(error){
  console.log('Connection error:', error);
});
