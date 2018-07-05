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
  const token = localStorage.getItem("token");
  const code = to.query.code;
  switch (path) {
    case "/login":
    case "/signup":
      if (isLogin) return next("/");
      if (!token) return next();
      if (token) {
        store
          .dispatch("getUserInfo", token)
          .then(() => {
            if (store.state.isLogin) return next("/");
            next();
          })
          .catch(err => {
            next();
          });
      }
      break;
    default:
      if (isLogin) return next();
      if (!token && !code) return next("/login");
      if (token) {
        store.dispatch("getUserInfo", token).then(() => {
          if (store.state.isLogin) return next();
          next("/login");
        });
      } else if (code) {
        axios
          .get("/user/oauth/github", {
            params: {
              code: to.query.code
            }
          })
          .then((res: any) => {
            localStorage.setItem("token", res.token);
            store.dispatch("getUserInfo", res.token).then(() => {
              next();
            });
          })
          .catch(() => {
            next("/login");
          });
      }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
