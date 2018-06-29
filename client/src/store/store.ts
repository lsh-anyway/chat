import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: null,
	  avatar: null,
	  isLogin: false,
	  friends: [],
	  message: [],
	  dialog: []
  },
  mutations: {},
  actions: {}
});
