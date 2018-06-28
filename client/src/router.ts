import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/index.vue";
import Signup from "./views/Signup/index.vue";
import Chat from "./views/Chat/index.vue";
import Home from "./views/Home/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat
    },
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});
