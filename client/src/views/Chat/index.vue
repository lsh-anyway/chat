<template>
	<ul class="dialogs-list">
		<li class="dialog-item" v-for="item in dialogs" :key="item._id" @click="clickDialog(item)">
			<img class="avatar" :src="getImgUrl(item)" width="32" height="32">
			<div class="content-wrapper">
				<p class="nickname">{{item.name}}</p>
				<p class="content">{{getContent(item)}}</p>
			</div>
            <span class="num" v-if="item.num > 0">{{item.num}}</span>
        </li>
	</ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { baseUrl } from "@/config";

@Component
export default class dialogsList extends Vue {
  @Getter dialogs: any;
  @Getter user: any;
  @Mutation showDialog: any;
  @Mutation clearDialogNum: any;

  getImgUrl(dialog: any) {
    let url;
    if (dialog.members.length === 2) {
      dialog.members.forEach((member: any) => {
        if (member._id !== this.user._id) {
          url = baseUrl + member.avatar;
        }
      });
    }
    return url;
  }
  getContent(item) {
    if (item.messages.length > 0) {
      let messages = item.messages;
      let message = messages[messages.length - 1];
      let from = message.from.nickname;
      let content = message.content;
      return `${from}: ${content}`;
    }
  }
  clickDialog(item) {
    this.showDialog(item);
    this.clearDialogNum(item._id);
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
