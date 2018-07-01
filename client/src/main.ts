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
  const path = to.path;
  const isLogin = store.state.isLogin;
  if (isLogin) {
    switch (path) {
      case "/login":
      case "/signup":
        next("/");
        break;
      default:
        next();
    }
  } else {
    const token = localStorage.getItem("token");
    if (token) {
      store
        .dispatch("getUserInfo", token)
        .then(() => {
          switch (path) {
            case "/login":
            case "/signup":
              next("/");
              break;
            default:
              next();
          }
        })
        .catch(() => {
          next("/login");
        });
    } else {
      switch (path) {
        case "/chat":
          if (to.query.code) {
            axios
              .get("/user/oauth/github", {
                params: {
                  code: to.query.code
                }
              })
              .then((res: any) => {
                store.dispatch("getUserInfo", res.token).then(() => {
                  next();
                });
              })
              .catch(() => {
                next("/login");
              });
          } else {
            next("/login");
          }
          break;
        case "/login":
        case "/signup":
          next();
          break;
        default:
          next("/login");
      }
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
