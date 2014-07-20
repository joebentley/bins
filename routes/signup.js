
/*
 * POST signup page
 */

var mongoose = require('mongoose');
var User = require('../user_model.js');


exports.post = function(req, res) {
  res.render('signup', { email: req.body.email, day: req.body.day });
  
  // dev
  //mongoose.connect('mongodb://localhost/test');
  // prod
  mongoose.connect(process.env.MONGOLAB_URI);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {

    var newUser = new User({ email: req.body.email, day: req.body.day.toLowerCase() });

    newUser.save(function (err, newUser) {

    });

    db.close();
  });
};
