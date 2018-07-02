<template>
	<div class="search">
		<header>
			<i class="el-icon-arrow-left" @click="closeSearch">返回</i>
			{{searchContent}}
		</header>
		<div class="form-inline" v-if="searchContent === '添加好友'">
			<el-input v-model="username" placeholder="请输入用户名,昵称或邮箱" class="search-input"></el-input>
			<i @click="onSubmit" class="el-icon-search"></i>
		</div>
		<users-list v-if="searchContent === '添加好友'" :users="users"></users-list>
		<div class="form-inline" v-if="searchContent === '添加群聊'">
			<el-input v-model="nickname" placeholder="请输入昵称"></el-input>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import usersList from "../users-list/index.vue";

@Component({
  components: {
    usersList
  }
})
export default class search extends Vue {
  @Prop(String) searchContent!: string;

  username = "";
  nickname = "";
  users = [];

  closeSearch() {
    this.$emit("closeSearch");
  }
  onSubmit() {
    if (this.searchContent === "添加好友") {
      if (!this.username) return this.$message("请输入搜索信息");
      this.axios.get(`/user/find/${this.username}`).then((res: any) => {
        this.users = res;
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
