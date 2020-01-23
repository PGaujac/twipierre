const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');

const authenticateUser = (email, password, done) => {
  Users.findOne({ email: email }).then(
    user => {
      if (user == null) {
        return done(null, false, { message: 'No user with that email' });
      }

      if (!user.validPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    },
    error => done(error)
  );
};

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

// Tel token appartient a tel utilisateur
passport.serializeUser((user, done) => {
  done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
  Users.findOne({ _id: id }).then(
    user => {
      done(null, user);
    },
    error => {
      done(error);
    }
  );
});

module.exports = passport;
