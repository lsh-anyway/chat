import io from "socket.io-client";
import store from "@/store/store";

const socket = io("http://localhost:3000");

function initSocket(id: any) {
  socket.emit("init", { id });
  socket.on("success", () => {
    store.commit("setSocket");
    console.log("connecting...");
  });

  socket.on("verify", (data: any) => {
    store.commit("addVerifications", data);
  });

  socket.on("agree", (data: any) => {
    store.commit("addFriend", data);
  });

  socket.on("message", (data: any) => {
    store.commit("addMessage", data);
  });
}

export { socket, initSocket };
