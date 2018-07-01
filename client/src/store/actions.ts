import { ActionTree } from "vuex";
import axios from "axios";

const actions: ActionTree<any, any> = {
  getUserInfo({ state, commit }, token): void {
    axios
      .get("/user/info", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        commit("setUserInfo", res);
      })
      .catch(err => {
        state.isLogin = false;
        throw err;
      });
  }
};

export default actions;
