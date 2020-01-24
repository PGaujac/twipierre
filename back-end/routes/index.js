/* Modules imports */
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Users = require('../models/Users');

// const initializePassport = require('../controllers/passport-config');
// initializePassport(passport, Email => {
//   Users.findOne(user => user.email === Email);
// });
/* Controllers imports */
const index = require('../controllers/index');

// Post and save tweets to db
router.post('/tweet', index.postTweet);

// Get tweets from db
router.get('/gettweets', index.getTweets);

router.post('/comment', index.comment);

// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// );

module.exports = router;
