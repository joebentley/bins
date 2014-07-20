
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
    day: String
});

module.exports = mongoose.model('User', userSchema);
