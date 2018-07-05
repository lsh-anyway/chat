<template>
	<div class="home">
		<div class="left-side">
			<main-content></main-content>
		</div>
		<div class="right-side" v-if="content.isActive">
			<verification v-if="content.activeType === 'showAddFriend'"></verification>
			<verify-list v-if="content.activeType === 'verify'"></verify-list>
			<friend-panel v-if="content.activeType === 'friendPanel'"></friend-panel>
			<dialog-panel v-if="content.activeType === 'dialog'"></dialog-panel>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import mainContent from "@/components/main-content/index.vue";
import verification from "@/components/verification/index.vue";
import verifyList from "@/components/verify-list/index.vue";
import friendPanel from "@/components/friend-panel/index.vue";
import dialogPanel from "@/components/dialog-panel/index.vue";

@Component({
  components: {
    mainContent,
    verification,
    verifyList,
    friendPanel,
    dialogPanel
  }
})
export default class home extends Vue {
  @State content: any;
}
</script>

<style scoped lang="scss">
@import "index";
</style>
