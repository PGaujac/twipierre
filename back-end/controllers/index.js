/*
 * Index controller
 */
const Tweet = require('../models/Tweet');

const index = {
  postTweet: (req, res) => {
    console.log(req.body);
    const newTweet = new Tweet(req.body);
    newTweet.save().then(() => {
      console.log('Tweet has been saved');
      error => console.log(error);
    });
    res.json({
      success: true
    });
  }
};

module.exports = index;
