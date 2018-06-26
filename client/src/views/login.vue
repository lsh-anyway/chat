<template>
    <div class="login">
        <button @click="loginByGitHub" v-if="isLogin">GitHub登录</button>
        <div v-if="!isLogin">{{userInfo}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component()
export default class login extends Vue {
  isLogin = true;
  userInfo = "";
  beforeMount() {
    console.log(this.$route);
  }
  loginByGitHub() {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=55b07150945744c997bf";
  }
}
</script>
