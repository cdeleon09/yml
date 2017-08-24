module.exports = function(app, passport) {
  var mongoose = require('mongoose'),
  Draft = mongoose.model('Draft'),
  User = mongoose.model('User'),
  userController = require('./users/user.controller'),
  draftController = require('./drafts/draft.controller');

    /**PUBLIC ROUTES**/
    app.post('/login', passport.authenticate('login'), function(req, res){
        res.sendStatus(200);
    });
    app.get('/logout', function(req, res){
      req.logout();
      res.sendStatus(200);
    });
    app.post('/users', userController.createUser(User));

    /**PROTECTED ROUTES**/
    //user routes
    app.get('/users', userController.getUsers(User))

    //draft routes
    app.route('/drafts')
    .post(draftController.createDraft(Draft))
    .get(draftController.getDrafts(Draft));

    app.route('/drafts/:id/pods')
    .post(draftController.addPodToDraft(Draft));

    app.route('/drafts/:draftId/pods/:id/users')
    .post(draftController.addUserToPod(Draft));

    //set up passport middleware authentication for secured routes
    app.use(passport.authenticationMiddleware());
};
