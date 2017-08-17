module.exports = function(app) {
  // user Routes
  app.route('/users')
  .get(function(req, res){ res.send("this is a test") });
};
