import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/index.vue";
import Signup from "./views/Signup/index.vue";
import Home from "./views/Home/index.vue";
import Chat from "./views/Chat/index.vue";
import Contacts from "./views/Contacts/index.vue";
import Me from "./views/Me/index.vue";

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
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          redirect: "/chat"
        },
        {
          path: "/chat",
          name: "聊天",
          component: Chat
        },
        {
          path: "/contacts",
          name: "通讯录",
          component: Contacts
        },
        {
          path: "/me",
          name: "我",
          component: Me
        }
      ]
    }
  ]
});
