<template>
	<div class="me">
		<div class="info">
			<img :src="user.avatar" class="avatar" width="100" height="100">
			<div class="name">{{user.nickname}}</div>
		</div>
		<div class="log-out" @click="logout">退出登录</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

@Component
export default class me extends Vue {
  @Getter user: any;
  @Mutation clearUserInfo: any;

  public logout() {
    localStorage.clear();
    this.clearUserInfo();
    this.$router.push("/login");
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
