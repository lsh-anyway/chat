import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "normalize.css";
import "./registerServiceWorker";
import "./config/element-ui";
import "./config/axios"

Vue.config.productionTip = false;

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
