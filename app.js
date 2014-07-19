
/**
 * Module dependencies.
 */

var express = require('express');
var schedule = require('node-schedule');

// Prod
var sendgrid = require("sendgrid")(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

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

// Schedule job to send email
var job = schedule.scheduleJob(rule, function() {

  // If their bin needs collecting tomorrow, send an email!
  sendgrid.send({
    to:       'joebentley10@gmail.com',
    from:     'other@example.com',
    subject:  'Hello World',
    text:     'My first email through SendGrid.'
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
});
