const Dialog = require("../models/dialogs");
const Message = require("../models/messages");
const User = require("../models/users");

module.exports = {
  createDialog: async (req, res, next) => {
    let params = req.value.body;
    let membersIdArray = params.members;
    let name = params.name;
    let members = [];
    for (let i = 0, len = membersIdArray.length; i < len; i++) {
      let memberId = membersIdArray[i];
      let member = await User.findById(memberId);
      members.push(member);
    }
    let dialog = new Dialog({
      name: name,
      members: members
    });
    const response = {
      _id: dialog._id,
      members: []
    };
    for (let i = 0, len = members.length; i < len; i++) {
      let member = members[i];
      response.members.push({
        _id: member._id,
        avatar: member.avatar,
        nickname: member.nickname
      });
      await member.update({ $addToSet: { dialogs: dialog } });
    }

    await dialog.save();
    
    res.status(200).json(response);
  }
};
