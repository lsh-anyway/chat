<template>
	<div class="home">
		<div class="left-side">
			<main-content></main-content>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import mainContent from "@/components/main-content/index.vue";

@Component({
  components: {
    mainContent
  }
})
export default class home extends Vue {}
</script>

<style scoped lang="scss">
@import "index";
</style>
