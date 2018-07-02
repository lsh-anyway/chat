<template>
	<div class="main-content">
		<vue-header @showSearch="showSearch"></vue-header>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<tab-bar></tab-bar>
		<search v-if="searching" :searchContent="searchContent" @closeSearch="closeSearch"></search>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TabBar from "../tabbar/index.vue";
import vueHeader from "../vueHeader/index.vue";
import search from "@/components/search/index.vue";

@Component({
  components: { TabBar, vueHeader, search }
})
export default class mainContent extends Vue {
  searching = false;
  searchContent = "";

  closeSearch() {
    this.searching = false;
  }
  showSearch(content: any) {
    this.searchContent = content;
    this.searching = true;
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
