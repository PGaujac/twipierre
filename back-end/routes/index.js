/* Modules imports */
const express = require('express');
const router = express.Router();

/* Controllers imports */
const index = require('../controllers/index');

// Post and save tweets to db
router.post('/tweet', index.postTweet);

// Get tweets from db
router.get('/gettweets', index.getTweets);

router.post('/register', index.register);

module.exports = router;
