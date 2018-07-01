<template>
	<div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import io from "socket.io-client";

@Component
export default class Chat extends Vue {
  public socket = io("http://localhost:3000");
  public initSocket() {
    this.socket.on("news", (data: any) => {
      console.log(data);
      this.socket.emit("my other event", { my: "data" });
    });
  }

  mounted() {
    this.initSocket();
  }
}
</script>

<style scoped lang="scss">
</style>
