
/**
 * Module dependencies.
 */

var express = require('express');
var schedule = require('node-schedule');
var mongoose = require('mongoose');

// Prod
//var sendgrid = require("sendgrid")(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

// Routes setup
var routes = require('./routes');
var user = require('./routes/user');
var signup = require('./routes/signup');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/signup', signup.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// Emailing system, check every day if emails need to be sent

var rule = new schedule.RecurrenceRule();
rule.second = 1;

// Map between days of week and numbers
var days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];

// Schedule job to send email
var job = schedule.scheduleJob(rule, function() {

  // Warn them a day in advance
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var weekDay = days[tomorrow.getDay()];
  
  // Connect to db
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
 
  db.once('open', function () {

    var userSchema = mongoose.Schema({
      email: String,
      day: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({ day: weekDay }, function (err, user) {

      console.log("sent");
      /*// If their bin needs collecting tomorrow, send an email!
      sendgrid.send({
        to:       user.email,
        from:     'other@example.com',
        subject:  'Bins',
        text:     'Your bins are being collected tomorrow!'
      }, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
      });*/

    });

  });
});
