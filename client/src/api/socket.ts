import io from "socket.io-client";
import store from "@/store/store";

const socket = io("http://localhost:3000");

function initSocket(user: any) {
  socket.on("news", (data: any) => {
    console.log(data);
  });

  const user_id = user.id;
  socket.emit("init", { user_id });

  socket.on("verify", (data: any) => {
    store.commit("addVerifications", data);
  });

  socket.on("agree", (data: any) => {
		store.commit("addFriend", data);
  })
}

export { socket, initSocket };
