const express = require('express');
const User = require('../models/User')
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const router = express.Router();


//  @route     GET api/auth
//  @desc      Register user form
//  @access    Public
router.get('/register', (req, res) => {
    res.render('users/register');
});

//  @route     POST api/auth
//  @desc      Register user to database
//  @access    Public
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', 'Welcome to EGL Media');
            res.redirect('/blogs');
        });
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/auth/register');
    }
}));

//  @route     GET auth/login
//  @desc      Login form
//  @access    Public
router.get('/login', (req, res) => {
    res.render('users/login');
});

//  @route     POST auth/login
//  @desc      Login user
//  @access    Private
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('Welcome back');
    const redirectUrl = req.session.returnTo || '/blogs';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out')
    res.redirect('/blogs')
})



module.exports = router;