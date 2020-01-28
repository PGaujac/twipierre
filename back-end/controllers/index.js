/*
 * Index controller
 */
const Tweet = require('../models/Tweet');
const Users = require('../models/Users');

const index = {
  postTweet: (req, res) => {
    console.log(req.body);
    const newTweet = new Tweet(req.body);
    newTweet.save().then(
      () => {
        console.log('Tweet has been saved');
      },
      error => {
        console.log(error);
      }
    );
    Users.findOne({ username: req.body.Author }).then(
      data => {
        if (!data) {
          res.status(404).json({
            message: 'User not found'
          });
        } else {
          data.tweets.push(newTweet);
          data.save().then(
            () => {
              res.json({
                success: true
              });
            },
            () => {
              res.status(500).json({ success: false });
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
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
