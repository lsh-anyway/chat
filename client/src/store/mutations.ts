import { MutationTree } from "vuex";
import { State } from "@/store/state";
import { initSocket } from "@/api/socket";

const mutations: MutationTree<any> = {
  setUserInfo(state: State, info: any) {
    state.isLogin = true;
    state.user = info.user;
    state.friends = info.friends;
    state.dialogs = info.dialogs;
    state.verifications = info.verifications;
    initSocket(info.user);
  },
  clearUserInfo(state: State) {
    state.isLogin = false;
    state.user = {
      id: "",
      nickname: "",
      avatar: ""
    };
    state.friends = [];
    state.dialogs = [];
    state.verifications = [];
  },
  addFriend(state: State, info: any) {
    state.friends.push(info);
    state.verifications.filter(item => {
      return item.from.id !== info.id;
    });
  },
  showAddFriend(state: State, info: any) {
    state.content.isActive = true;
    state.content.activeType = "showAddFriend";
    state.content.activeContent = info;
  },
  showVerification(state: State) {
    state.content.isActive = true;
    state.content.activeType = "verify";
    state.content.activeContent = null;
  },
  addVerifications(state: State, info: any) {
    state.verifications.push(info);
  },
  clearContent(state: State) {
    state.content.isActive = false;
    state.content.activeType = "";
    state.content.activeContent = null;
  }
};

export default mutations;
