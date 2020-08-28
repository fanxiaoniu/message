<template>
  <div class="toast-wrap" v-if="$store.state.toast">
    <div
      class="toast"
      :class="[{ani: $store.state.toast && $store.state.toast }]"
    >{{$store.state.toast}}</div>
  </div>
</template>
<script>
export default {
  name: "Add",
  data: () => {
    return {
      aniFlag: false,
      interId: null
    };
  },
  updated() {
    this.aniFlag = true;
    if (this.interId !== null) {
      clearTimeout(this.interId);
    }
    this.interId = setTimeout(() => {
      this.$store.commit("removeToast");
    }, 1400);
  }
};
</script>
<style scoped>
.toast-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
}

.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ani 1.5s forwards;
  padding: 20px;
  color: #fff;
  background: #b9dffe;
  border-radius: 8px;
  opacity: 1;
}

@keyframes ani {
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>