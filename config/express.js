var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
const passport = require('passport');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('flash');

module.exports = function() {
    let app = express();

    app.use(logger('dev'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(express.static('./public'));

    app.use(session({
       resave: true,
       saveUninitialized: true,
       secret: 'supersecret'
    }));

    app.use(methodOverride());
    app.use(flash());

    app.set('views', './app/views');
  	app.set('view engine', 'ejs');
  	require('./strategies/local-jwt.js')();
    app.use(passport.initialize());
    app.use(passport.session());

    require('./../app/routes/orders.js')(app);
    require('./../app/routes/users.js')(app);

    return app;
}
