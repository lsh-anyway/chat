<template>
	<div class="contacts">
		<div @click="showVerification" class="applications">
			<span class="title">好友申请</span>
			<span class="num">{{verifications.length}}</span>
		</div>
		<ul class="friends-list">
			<li class="friend-item" v-for="item in friends" :key="item,id">
				<img class="avatar" :src="baseUrl + item.avatar" width="32" height="32">
				<span class="nickname">{{item.nickname}}</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { baseUrl } from "@/config";

@Component
export default class contacts extends Vue {
  @State verifications: any;
  @State friends: any;
  @Mutation showVerification: any;

  baseUrl = baseUrl;
}
</script>

<style scoped lang="scss">
@import "index";
</style>
