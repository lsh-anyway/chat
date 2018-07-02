import { ActionTree } from "vuex";
import axios from "axios";

const actions: ActionTree<any, any> = {
  async getUserInfo({ state, commit }, token) {
    const res = await axios.get("/user/info", {
      headers: {
        Authorization: token
      }
    });
    if (res) commit("setUserInfo", res);
  }
};

export default actions;
