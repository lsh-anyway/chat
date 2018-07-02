const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  GitHubStrategy = require("passport-github").Strategy,
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/users");
const config = require("../config/index");

// 账号密码验证策略
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({
        $or: [{ "local.email": username }, { username }]
      });
      if (!user) return done(null, false, { message: "用户名错误" });

      const isMatch = await user.validPassword(password);
      if (!isMatch) return done(null, false, { message: "密码错误" });

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

// GitHub OAuth2.0 登录认证策略
passport.use(
  new GitHubStrategy(
    {
      clientID: config.oauth.GitHub.clientID,
      clientSecret: config.oauth.GitHub.clientSecret
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        // console.log("profile", profile);

        // 检查数据库中是否存在该用户
        const existingUser = await User.findOne({ "GitHub.id": profile.id });

        if (existingUser) {
          // console.log("User already exists in our database");
          return cb(null, existingUser);
        }

        // console.log("User doesn't exists, we're creating a new one");

        // 如果用户不存在，新建用户
        const newUser = new User({
          nickname: profile.username,
          method: "GitHub",
          GitHub: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();

        cb(null, newUser);
      } catch (e) {
        cb(e, false, e.message);
      }

      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // 	return cb(err, user);
      // });
    }
  )
);

// token验证策略
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // 在数据库中查找用户
        const user = await User.findById(payload.sub).populate(["verifications.from", "friends", "dialogs"]);

        // 如果用户不存在，返回 false
        if (!user) {
          return done(null, false);
        }

        // 否则返回 user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
