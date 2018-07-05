<template>
	<ul class="users-list">
		<li v-for="user in users" :key="user._id" class="user-item" @click="selectUser(user)">
			<img class="avatar" :src="baseUrl + user.avatar" width="32" height="32s">
			<div class="user-info">
				<p class="nickname">{{user.nickname}}</p>
				<p class="username">{{user.username}}</p>
			</div>
		</li>
	</ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { baseUrl } from "@/config/index";
import { State, Mutation } from "vuex-class";

@Component
export default class userLists extends Vue {
  @Prop(Array) users!: any;
  @State friends!: any;
  @State user!: any;
  @Mutation showAddFriend: any;

  baseUrl = baseUrl;

  selectUser(user: any) {
    console.log(user);
    let friends = this.friends;
    let me = this.user;
    if (me._id === user._id) {
      return this.$message("不能添加自己为好友");
    }
    friends.forEach((item: any) => {
      if (item._id === user._id) {
        return this.$message("该用户已在您的好友列表中");
      }
    });
    this.showAddFriend(user);
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
