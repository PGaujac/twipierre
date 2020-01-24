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
  },

  comment: (req, res) => {
    console.log(req.body);
    Tweet.findOne({ _id: req.body.tweetId }).then(
      data => {
        if (!data) {
          res.status(404).json({
            message: 'tweet not found'
          });
        } else {
          data.Comments.push(req.body.comment);
          data.save().then(() => {
            res.json({
              success: true
            }),
              () => {
                res.status(500).json({ success: false });
              };
          });
        }
      },
      error => {
        res.status(500).json({ success: false });
      }
    );
  }
};

module.exports = index;
