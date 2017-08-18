module.exports = function(app) {
  var userController = require('../controllers/userController');
  var loginController = require('../controllers/loginController');

  // user Routes
  app.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);

  // login Routes
  app.route('/login')
  .post(loginController.login);
};
