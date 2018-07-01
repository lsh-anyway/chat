<template>
	<div class="tab-bar">
		<router-link class="tab-bar-item" to="/chat">
			<i class="icon-chat"></i>
			<span>聊天</span>
		</router-link>
		<router-link class="tab-bar-item" to="/contacts">
			<i class="icon-contacts"></i>
			<span>通讯录</span>
		</router-link>
		<router-link class="tab-bar-item" to="/me">
			<i class="icon-home"></i>
			<span>我</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class tabBar extends Vue {}
</script>

<style scoped lang="scss">
@import "index";
</style>
