module.exports = function(app, passport) {
    var userController = require('./users/user.controller'),
    draftController = require('./drafts/draft.controller'),
    podController = require('./pods/pod.controller');

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

    //pod routes
    app.route('/pods')
    .post(podController.createPod)
    .get(podController.getPods);

    app.route('/pods/:id/users')
    .post(podController.addUserToPod);



    //set up passport middleware authentication for secured routes
    app.use(passport.authenticationMiddleware());
};
