var user = require('./../controllers/users.js');

module.exports = function(app) {
    app.post('/users/signin', user.login);
    app.get('/', user.renderLogin);
    app.route('/users/signup').get(user.renderSignup)
        .post(user.create);
}
