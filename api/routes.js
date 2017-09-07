module.exports = function(app, passport) {
  //init models
  var mongoose = require('mongoose'),
  Draft = mongoose.model('Draft'),
  User = mongoose.model('User');

  //init controllers
  var userController = require('./users/user.controller'),
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
  //set up passport middleware authentication for secured routes
  app.use(passport.authenticationMiddleware());
  
  //user routes
  app.get('/users', userController.getUsers(User))

  //draft routes
  app.route('/drafts')
  .post(draftController.createDraft(Draft))
  .get(draftController.getDrafts(Draft));

  app.route('/drafts/:id')
  .delete(draftController.deleteDraft(Draft));

  app.route('/drafts/:id/pods')
  .post(draftController.addPodToDraft(Draft));

  app.route('/drafts/:draftId/pods/:podId')
  .delete(draftController.deletePod(Draft));

  app.route('/drafts/:draftId/pods/:podId/users')
  .post(draftController.addUserToPod(Draft));

  app.route('/drafts/:draftId/pods/:podId/users/:userId')
  .delete(draftController.removeUserFromPod(Draft));

  app.route('/drafts/:draftId/pods/:podId/matches/:matchId')
  .post(draftController.updateMatchResults(Draft));


};
