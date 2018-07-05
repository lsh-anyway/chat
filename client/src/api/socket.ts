import io from "socket.io-client";
import store from "@/store/store";

const socket = io("http://localhost:3000");

function initSocket(id: any) {
  socket.on("news", (data: any) => {
    console.log(data);
  });

  const user_id = id;
  socket.emit("init", { user_id });

  socket.on("verify", (data: any) => {
    store.commit("addVerifications", data);
  });

  socket.on("agree", (data: any) => {
    console.log(data);
    store.commit("addFriend", data);
  });

  socket.on("message", (data: any) => {
    store.commit("addMessage", data);
  });
}

export { socket, initSocket };
