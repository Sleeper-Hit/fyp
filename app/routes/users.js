var user = require('./../controllers/users.js');
var passport = require('passport');

module.exports = function(app) {
    app.post('/users/signin', user.login);

    app.route('/')
      .post( passport.authenticate('local', {
        successRedirect: '/rooms',
        failureRedirect: '/',
        failureFlash: true
      }))
      .get(user.renderLogin);

    app.route('/users/signup').get(user.renderSignup)
        .post(user.create);
}
