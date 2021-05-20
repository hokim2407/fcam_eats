const models = require("../models");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passwordHash = require("../helpers/passwordHash");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await models.User.findOne({
        where: { username, password: passwordHash(password) },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return done(null, false, {
          message: "일치하는 아이디 패스워드가 없습니다.",
        });
      } else {
        return done(null, user.dataValues);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
