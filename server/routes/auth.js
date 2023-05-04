var passport = require('passport');
var OpenIDConnectStrategy = require('passport-openidconnect');
var express = require('express');
var qs = require('querystring');
let clientIO;

// Set reference to client Socket.io
function setSocketIO(io) {
    clientIO = io;
}

// OpenID connect strategy
passport.use(new OpenIDConnectStrategy({
    issuer: 'https://' + process.env['AUTH0_DOMAIN'] + '/',
    authorizationURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/authorize',
    tokenURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/oauth/token',
    userInfoURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/userinfo',
    clientID: process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect',
    scope: ['profile']
}, function verify(issuer, profile, cb) {
    return cb(null, profile);
}));


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.displayName });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// router for authentication requests
var router = express.Router();

router.get('/login', passport.authenticate('openidconnect'));

router.get('/oauth2/redirect', passport.authenticate('openidconnect', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        var params = {
            client_id: process.env['AUTH0_CLIENT_ID'],
            returnTo: process.env['SERVER_PROTOCOL'] + '://' + process.env['SERVER_HOSTNAME'] + ':' + process.env['SERVER_PORT']
        };
        res.redirect('https://' + process.env['AUTH0_DOMAIN'] + '/v2/logout?' + qs.stringify(params));
    });
});

module.exports.authRouter = router;
module.exports.authSocketIO = setSocketIO;