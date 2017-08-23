module.exports = function(app, passport) {
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
    app.post('/users', userController.createUser);

    /**PROTECTED ROUTES**/
    //user routes
    app.get('/users', userController.getUsers)

    //draft routes
    app.route('/drafts')
    .post(draftController.createDraft)
    .get(draftController.getDrafts);

    app.route('/drafts/:id/pods')
    .post(draftController.addPodToDraft);

    app.route('/drafts/:draftId/pods/:id/users')
    .post(draftController.addUserToPod);

    //set up passport middleware authentication for secured routes
    app.use(passport.authenticationMiddleware());
};
