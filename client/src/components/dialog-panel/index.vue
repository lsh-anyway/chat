<template>
	<div class="dialog-panel">
		<header>
			<i class="el-icon-arrow-left" @click="clearContent">返回</i>
			{{dialog.name}}
		</header>
		<ul class="message-list">
			<li class="message" :class="{myMessage: item.from._id === user._id}" v-for="item in dialog.messages" :key="item.id">
                <img :src="baseUrl + item.from.avatar" class="avatar" width="32" height="32">
                <i></i>
                <span class="content">
                    {{item.content}}
                </span>
            </li>
		</ul>
		<el-form :inline="true" class="form" size="small">
			<el-form-item class="input">
				<el-input v-model="message"></el-input>
			</el-form-item>
			<el-form-item class="button">
				<el-button @click="send">发送</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { baseUrl } from "@/config";
import { socket } from "@/api/socket";

@Component
export default class dialogPanel extends Vue {
  @Mutation clearContent: any;
  @Mutation clearDialogNum: any;
  @State content: any;
  @State user: any;
  message = "";
  baseUrl = baseUrl;

  get dialog() {
    return this.content.activeContent;
  }

  send() {
    let message = {
      dialog: this.dialog._id,
      from: this.user._id,
      content: this.message
    };
    this.message = "";
    socket.emit("message", message);
  }

  @Watch("dialog.messages")
  read() {
    this.clearDialogNum(this.dialog._id);
    socket.emit("read", this.dialog._id);
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
