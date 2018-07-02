<template>
	<div class="verification">
		<header>
			<i class="el-icon-arrow-left" @click="clearContent">返回</i>
			好友申请
		</header>
		<div class="content">
			<span class="title">发送验证消息</span>
			<div class="form">
				<el-input v-model="verifyInfo"></el-input>
				<el-button @click="verify">发送</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { socket } from "@/api/socket";

@Component
export default class verification extends Vue {
  verifyInfo = "";
  @State content: any;
  @Mutation clearContent: any;

  verify() {
    console.log(this.content);
    socket.emit("verify", {
      to: this.content.activeContent.id,
      content: this.verifyInfo
    });
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
