/**
* Passport JWT configuration.
* Created by Kudzai Gopfa on 3/5/2017.
* MIT Licensed
*/

'use strict'

/**
* Module dependencies
*/

const passport        =  require('passport');
const User            =  require('mongoose').model('User');
const ExtractJwt      =  require('passport-jwt').ExtractJwt;
const JWTStrategy     =  require('passport-jwt').Strategy;

module.exports = function() {

    let jwtOptions             =  {};
    jwtOptions.jwtFromRequest  =  ExtractJwt.fromAuthHeaderWithScheme("jwt");
    jwtOptions.secretOrKey     =  '123bcvd';

    let strategy = new JWTStrategy(jwtOptions, function(jwt_payload, done) {
        User.findOne({
            _id: jwt_payload._id
            }, '-salt -password -__v -provider', function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });

    passport.use(strategy);
};
