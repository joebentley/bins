
/*
 * POST signup page
 */

var mongoose = require('mongoose');


exports.post = function(req, res) {
  res.render('signup', { email: req.body.email, day: req.body.day });
  
  // dev
  mongoose.connect('mongodb://localhost/test');
  // prod
  //mongoose.connect(process.env.MONGOLAB_URI);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {

    var userSchema = mongoose.Schema({
      email: String,
      day: String
    });

    var User = mongoose.model('User', userSchema);
    
    var newUser = new User({ email: req.body.email, day: req.body.day.toLowerCase() });

    newUser.save(function (err, newUser) {

    });
  });
};
