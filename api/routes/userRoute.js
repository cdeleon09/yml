module.exports = function(app) {
  var userController = require('../controllers/userController');
  // user Routes
  app.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);


};
