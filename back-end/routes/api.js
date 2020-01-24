const express = require('express');
const router = express.Router();
const passport = require('../controllers/passport-config');

const api = require('../controllers/api');

router.post('/register', api.register);
router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log(req.user);
  res.json({
    success: true,
    user: req.user.username
  });
});

module.exports = router;
