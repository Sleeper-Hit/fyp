var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({
            email: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Incorrect password, Please Try Again!'
                });
            }
            return done(null, user);
        });
    }));
};
