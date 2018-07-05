import { MutationTree } from "vuex";
import { State, User } from "@/store/state";
import { socket, initSocket } from "@/api/socket";

const mutations: MutationTree<any> = {
  // 设置用户信息
  setUserInfo(state: State, info: any) {
    const { _id, avatar, nickname }: User = info;
    info.dialogs.forEach((dialog: any) => {
    	dialog.num = dialog.messages.length;
    });
    state.isLogin = true;
    state.user = { _id, avatar, nickname };
    state.friends = info.friends;
    state.dialogs = info.dialogs;
    state.verifications = info.verifications;
    initSocket(_id);
  },
  // 清空用户信息
  clearUserInfo(state: State) {
    state.isLogin = false;
    state.user = {
      _id: "",
      nickname: "",
      avatar: ""
    };
    state.friends = [];
    state.dialogs = [];
    state.verifications = [];
  },
  // 添加朋友到通讯录
  addFriend(state: State, info: any) {
    state.friends.push(info);
    state.verifications = state.verifications.filter(item => {
      return item.from._id !== info._id;
    });
  },
  // 显示添加朋友时搜寻的界面
  showAddFriend(state: State, info: any) {
    state.content.isActive = true;
    state.content.activeType = "showAddFriend";
    state.content.activeContent = info;
  },
  // 显示选中朋友时的界面
  showFriendPanel(state: State, info: any) {
    state.content.isActive = true;
    state.content.activeType = "friendPanel";
    state.content.activeContent = info;
  },
  // 显示发送好友验证是的界面
  showVerification(state: State) {
    state.content.isActive = true;
    state.content.activeType = "verify";
    state.content.activeContent = null;
  },
  // 显示会话窗口
  showDialog(state: State, info: any) {
    state.content.isActive = true;
    state.content.activeType = "dialog";
    state.content.activeContent = info;
    socket.emit("read", info._id);
  },
  // 收到好友申请，添加到页面上
  addVerifications(state: State, info: any) {
    state.verifications.push(info);
  },
  // 关闭一些界面
  clearContent(state: State) {
    state.content.isActive = false;
    state.content.activeType = "";
    state.content.activeContent = null;
  },
  // 添加会话
  addDialog(state: State, info: any) {
  	info.num = 0;
    state.dialogs.push(info);
  },
  // 添加信息
  addMessage(state: State, info: any) {
    state.dialogs.forEach((dialog: any) => {
      if (dialog._id === info.dialog) {
        dialog.messages.push(info);
        dialog.num++;
      }
    });
  },
  // 重置未读信息条数
	clearDialogNum(state: State, info: any) {
  	let dialog = state.dialogs.filter((item: any) => {
  		return item._id === info;
	  });
  	dialog[0].num = 0;
	}
};

export default mutations;
