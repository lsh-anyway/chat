const JWT = require("jsonwebtoken");
const User = require("../models/users");
const Dialog = require("../models/dialogs");
const Message = require("../models/messages");
const { JWT_SECRET } = require("../config/index");

const signToken = user => {
  return JWT.sign(
    {
      iss: "Lsh",
      sub: user.id,
      iat: new Date().getTime() // 发布时间
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
    console.log(req.value.body);

    // 检查数据库中是否有相同邮箱的用户
    const foundUser = await User.findOne({
      $or: [{ "local.email": email }, { username }]
    });
    if (foundUser) {
      return res.status(403).json({
        error: "该用户已存在"
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
    const user = req.user;
    let verifications = user.verifications;
    let friends = user.friends;
    let dialogs = user.dialogs;
    let response = {
      user: {
        id: user._id,
        nickname: user.nickname,
        avatar: user.avatar
      },
      friends: [],
      dialogs: [],
      verifications: []
    };
    for (let i = 0, len = verifications.length; i < len; i++) {
      let verification = verifications[i];
      let from = verification.from;
      response.verifications.push({
        from: {
          id: from._id,
          nickname: from.nickname,
          avatar: from.avatar
        },
        content: verification.content
      });
    }
    for (let i = 0, len = friends.length; i < len; i++) {
      let friend = friends[i];
      response.friends.push({
        id: friend._id,
        nickname: friend.nickname,
        avatar: friend.avatar
      });
    }
    for (let i = 0, len = dialogs.length; i < len; i++) {
      let dialog = dialogs[i];
      response.friends.push({
        id: dialog._id,
        messages: dialog.messages,
        members: dialog.members
      });
    }
    
    res.status(200).json(response);
  },
  // 查找用户
  findUser: async (req, res, next) => {
    const username = req.params.username;
    const users = await User.find({
      $or: [
        { username },
        { nickname: username },
        { "local.email": username },
        { "GitHub.email": username }
      ]
    });

    if (!users) {
      return res.status(404).json({ error: "该用户不存在" });
    }

    const response = [];
    for (let i = 0, len = users.length; i < len; i++) {
      let user = users[i];
      response.push({
        id: user._id,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar
      });
    }

    res.status(200).json(response);
  }
};
