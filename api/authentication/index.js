module.exports =  function(passport){
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  bcrypt = require('bcrypt');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Email does not exist.' }); }
        bcrypt.compare(password, user.password, function(err, res){
          if(res){
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid email or password.'});
          }
        });
      });
    }
  ));

  passport.authenticationMiddleware = function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.sendStatus(401);
    }
  };
}
