import { ActionTree } from "vuex";
import axios from "axios";
import { initSocket } from "@/api/socket";
import { updateDB } from "@/api/pouchDB";

const actions: ActionTree<any, any> = {
  async getUserInfo({ state, commit }, token) {
    const res = await axios.get("/user/info", {
      headers: {
        Authorization: token
      }
    });

    const Info = await updateDB(res);
    initSocket(Info.user._id);
    if (Info) commit("setUserInfo", Info);
  }
};

export default actions;
