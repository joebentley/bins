
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Bin Collection' });
};

exports.signup = function(req, res) {
  res.render('signup', { email: req.body.email, day: req.body.day });
};
