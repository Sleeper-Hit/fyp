var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
const passport = require('passport');
var methodOverride = require('method-override');

module.exports = function() {
    let app = express();

    app.use(logger('dev'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

	app.set('view engine', 'ejs');
	require('./strategies/local-jwt.js')();
    app.use(passport.initialize());

    require('./../app/routes/orders.js')(app);
    require('./../app/routes/users.js')(app);

    return app;
}
