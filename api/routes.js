module.exports = function(app, passport) {
    var userController = require('./users/user.controller'),
    podController = require('./pods/pod.controller');

    // routes that don't require authentication
    app.post('/login', passport.authenticate('login'), function(req, res){
        res.sendStatus(200);
    });
    app.post('/users', userController.createUser);

    //pod routes
    app.route('/pods')
    .post(podController.createPod)
    .get(podController.getPods);

    app.route('/pods/:id/users')
    .post(podController.addUserToPod);

    //user routes
    app.get('/users', userController.getUsers)

    //set up passport middleware authentication for secured routes
    app.use(passport.authenticationMiddleware());
};
