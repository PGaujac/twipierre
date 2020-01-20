/*
 * Index controller
 */
const Tweet = require('../models/Tweet');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

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

  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const newUser = new Users({
        Email: req.body.Email,
        UserName: req.body.UserName,
        Password: hashedPassword,
        Tweets: []
      });
      newUser.save().then(() => {
        console.log('User Added');
        error => console.log(error);
        res.send(true);
      });
    } catch {
      res.json({
        success: false
      });
      console.log('Something went wrong');
    }
  },

  comment: (req, res) => {
    console.log(req.body);
    res.json({
      success: true
    });
  }
};

module.exports = index;
