import { GetterTree } from "vuex";
import { baseUrl } from "@/config";
import { User } from "@/store/state";

const getters: GetterTree<any, any> = {
  user({ user }: { user: User }): User {
    if (user.avatar) {
      user.avatar = baseUrl + user.avatar;
    }
    return user;
  }
};

export default getters;
