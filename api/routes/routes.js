module.exports = function(app, passport) {
  userController = require('../controllers/userController'),
  loginController = require('../controllers/loginController');

  // user Routes
  app.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);

  // login Routes
  app.post('/login', passport.authenticate('login'), function(req, res){
    res.json({message: "Welcome!"});
  });
};
