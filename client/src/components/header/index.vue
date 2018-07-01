<template>
	<div class="header">
		{{$route.name}}
		<el-dropdown class="drop-down" trigger="click" @command="handleCommand">
			<span class="el-dropdown-link">
				<i class="icon-add"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="添加好友">添加好友</el-dropdown-item>
				<el-dropdown-item command="添加群聊">添加群聊</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class tabBar extends Vue {
  handleCommand(command) {
    this.$emit("showSearch", command);
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
