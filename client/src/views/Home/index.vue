<template>
	<div class="home">
		<div class="left-side">
			<main-content></main-content>
		</div>
		<div class="right-side" v-if="content.isActive">
			<verification v-if="content.activeType === 'showAddFriend'"></verification>
			<verify-list v-if="content.activeType === 'verify'"></verify-list>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import mainContent from "@/components/main-content/index.vue";
import verification from "@/components/verification/index.vue";
import verifyList from "@/components/verify-list/index.vue";

@Component({
  components: {
    mainContent,
    verification,
    verifyList
  }
})
export default class home extends Vue {
  @State content: any;
}
</script>

<style scoped lang="scss">
@import "index";
</style>
