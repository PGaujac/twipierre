/*
 * Index controller
 */
const Tweet = require('../models/Tweet');
const Users = require('../models/Users');

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

  register: (req, res) => {
    // Check if email already exists in DB
    Users.findOne({ email: req.body.email }, (err, previousUser) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Something went wrong'
        });
      } else if (previousUser) {
        return res.json({
          success: false,
          message: 'Account with that email already exists'
        });
      }
      //If user doesn't exist create it
      else {
        try {
          const newUser = new Users({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            tweets: []
          });
          newUser.save().then(() => {
            console.log('User Added');
            //TODO: debug
            //error => console.log(error);
            res.send(true);
          });
        } catch {
          res.json({
            success: false
          });
          console.log('Something went wrong');
        }
      }
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
