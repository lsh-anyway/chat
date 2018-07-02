<template>
	<div class="wrapper">
		<header>
			<i class="el-icon-arrow-left" @click="clearContent">返回</i>
			好友申请
		</header>
		<ul class="verify-list">
			<li v-for="item in verifications" :key="item.id" class="verify-item">
				<img class="avatar" :src="baseUrl + item.from.avatar" width="32" height="32">
				<div class="info">
					<span class="nickname">{{item.from.nickname}}</span>
					<span class="message">消息：{{item.content}}</span>
				</div>
				<el-button size="small" @click="agree(item)">同意</el-button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { baseUrl } from "@/config";
import { socket } from "@/api/socket";

@Component
export default class verifyList extends Vue {
  @State verifications: any;
  @Mutation clearContent: any;
  @Mutation addFriend: any;

  baseUrl = baseUrl;
  agree(verification: any) {
    socket.emit("agree", verification);
    this.addFriend(verification.from);
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
