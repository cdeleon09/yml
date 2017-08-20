module.exports = function(app, passport) {
  var userController = require('./users/user.controller');

  // login Routes
  app.post('/login', passport.authenticate('login'), function(req, res){
    res.sendStatus(200);
  });

  // user Routes
  app.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);

};
