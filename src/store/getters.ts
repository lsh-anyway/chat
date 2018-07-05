import { GetterTree } from "vuex";
import { baseUrl } from "@/config";
import { User } from "@/store/state";

const getters: GetterTree<any, any> = {
  user({ user }: { user: User }): User {
    if (user.avatar) {
      user.avatar = baseUrl + user.avatar;
    }
    return user;
  },
  dialogs(state) {
    let user = state.user;
    let dialogs = state.dialogs;
    dialogs.forEach((info: any) => {
      if (!info.name || info.name.length === 0) {
        info.members.forEach((member: any) => {
          if (member._id !== user._id) {
            info.name = member.nickname;
          }
        });
      }
    });
    return dialogs;
  }
};

export default getters;
