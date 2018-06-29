const JWT = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../config/index");

const signToken = user => {
  return JWT.sign(
    {
      iss: "Lsh",
      sub: user.id,
      iat: new Date().getTime(), // 发布时间
      // exp: new Date().setDate(new Date().getDate() + 1) // 一天后过期
    },
    JWT_SECRET
  );
};

module.exports = {
  // 注册
  signUp: async (req, res, next) => {
    // 获取用户输入的email和密码
    const { username, nickname, email, password } = req.value.body;

    // 检查数据库中是否有相同邮箱的用户
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status.json({
        error: "该邮箱已注册"
      });
    }

    // 否则新建一个用户
    const newUser = new User({
      username,
      nickname,
      method: "local",
      local: {
        email,
        password
      }
    });
    await newUser.save();

    // 生成该用户的token
    const token = signToken(newUser);

    // 将该用户的token返回
    res.status(200).json({ token });
  },
  // 登录
  signIn: async (req, res, next) => {
    // 生成token
    const token = signToken(req.user);

    res.status(200).json({ token });
  },
  // GitHub登录
  GitHubOAuth: async (req, res, next) => {
	  // 生成token
	  const token = signToken(req.user);
	  res.status(200).json({ token });
  },
  // 获取用户信息
  getUser: async (req, res, next) => {
    res.status(200).json(req.user);
  }
};
