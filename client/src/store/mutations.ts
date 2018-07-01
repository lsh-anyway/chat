import { MutationTree } from "vuex";
import { State } from "@/store/state";

const mutations: MutationTree<any> = {
  setUserInfo(state: State, info: any) {
    state.isLogin = true;
    state.user = info.user;
    state.friends = info.friends;
    state.dialogs = info.dialogs;
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
    state.messages = [];
  }
};

export default mutations;
