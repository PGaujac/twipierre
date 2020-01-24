const Users = require('../models/Users');

const api = {
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
  }
};

module.exports = api;
