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
  },

  getTweets: (req, res) => {
    Tweet.find({}, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      res.send(data);
    });
  }
};

module.exports = index;
