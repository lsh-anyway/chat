<template>
	<div class="friend-panel">
		<header>
			<i class="el-icon-arrow-left" @click="clearContent">返回</i>
		</header>
		<div class="panel">
			<img class="avatar" :src="baseUrl + content.activeContent.avatar" width="200" height="200">
			<div class="nickname">{{content.activeContent.nickname}}</div>
			<el-button @click="sendMessage">发送消息</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { baseUrl } from "@/config";

@Component
export default class friendPanel extends Vue {
  @Mutation clearContent: any;
  @Mutation addDialog: any;
  @Mutation showDialog: any;
  @State content: any;
  @State dialogs: any;
  @State user: any;

  baseUrl = baseUrl;
  sendMessage() {
    let id = this.content.activeContent._id;
    let user_id = this.user._id;
    let dialog;
    this.dialogs.forEach((item: any) => {
      if (item.members.length === 2 && item.members.indexOf(id) !== -1) {
        item.members.forEach((member: any) => {
          if (member._id === id) {
            dialog = item;
          }
        });
      }
    });
    if (!dialog) {
      dialog = {
        members: [user_id, id]
      };
      let token = localStorage.getItem("token");
      this.axios
        .post("/dialog/create", dialog, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          this.addDialog(res);
          this.clearContent();
          this.showDialog(res);
        });
    } else {
      this.showDialog(dialog);
    }
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
