const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

// 账号密码验证策略
passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({$or: [{ "local.email": username }, { username }]});
        if (!user) return done(null, false, { message: "用户名错误" });
        
        const isMatch = await user.validPassword(password);
        if (!isMatch) return done(null, false, { message: '密码错误' });
        
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);
