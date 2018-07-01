<template>
	<div class="search">
		<header>
			<i class="el-icon-arrow-left" @click="closeSearch">返回</i>
			{{searchContent}}
		</header>
		<div class="form-inline" v-if="searchContent === '添加好友'">
			<el-input v-model="user.username" placeholder="请输入用户名,昵称或邮箱" class="search-input"></el-input>
			<i @click="onSubmit" class="el-icon-search"></i>
		</div>
		<div class="form-inline" v-if="searchContent === '添加群聊'">
			<el-input v-model="user.username" placeholder="请输入昵称"></el-input>
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class search extends Vue {
  @Prop(String) searchContent;
  user = {
    username: ""
  };

  closeSearch() {
    this.$emit("closeSearch");
  }
  onSubmit() {}
}
</script>

<style scoped lang="scss">
@import "index";
</style>
