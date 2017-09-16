/* GET auth . */
const express = require('express');
const router = express.Router();
// login
const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;

passport.serializeUser(function (user, done) {
    // console.log('---serializeUser---');
    // console.log(user);
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    // console.log('---deserializeUser---');
    // console.log(obj)
    done(null, obj);
});

passport.use(new GithubStrategy({
    clientID: 'd25098dbd530d69e2fca',
    clientSecret: '232ae8119e8d02731260b01aba6ff453aedb4aed',
    callbackURL: "http://localhost:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
}));

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        // console.log("success111111111111111.success.................success.................success.................")
        // console.log(req.user);
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        // console.log("success..2222222222222222222success.................success.................success.................")
        res.redirect('/');
    });

module.exports = router;
