import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";
import "normalize.css";
import "./registerServiceWorker";
import "./config/element-ui";
import "./config/axios";

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const path = to.path;
  if (token) {
    axios
      .get("/user/info", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log(res);
        if (path === "/login" || path === "signup") {
          next("/");
        }
        next();
        return;
      })
      .catch(err => {
        console.log(err);
        if (path !== "/login") {
          next("/login");
        }
        next();
      });
  } else {
    switch (path) {
      case "/login":
      case "/signup":
        next();
        break;
      default:
        next("/login");
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
