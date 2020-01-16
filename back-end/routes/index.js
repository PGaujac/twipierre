/* Modules imports */
const express = require('express');
const router = express.Router();

/* Controllers imports */
const index = require('../controllers/index');

/* GET home page. */
router.post('/tweet', index.postTweet);

router.get('/', (req, res, next) => {
  res.send('coucou');
});

module.exports = router;
