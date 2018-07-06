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
  const token = localStorage.getItem("token");
  const connecting = store.state.connecting;
  const code = to.query.code;
  switch (path) {
    case "/login":
    case "/signup":
    	if (connecting) return next("/");
      if (!token) return next();
      if (token) {
        store
          .dispatch("getUserInfo", token)
          .then(() => {
            next("/");
          })
          .catch(err => {
            next();
          });
      }
      break;
    default:
    	if (connecting) return next();
      if (!token && !code) return next("/login");
      if (token) {
	      next();
        store.dispatch("getUserInfo", token);
      } else if (code) {
        axios
          .get("/user/oauth/github", {
            params: {
              code: to.query.code
            }
          })
          .then((res: any) => {
	          next();
	          localStorage.setItem("token", res.token);
            store.dispatch("getUserInfo", res.token);
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
