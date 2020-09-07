<template>
  <div class="toast-wrap" v-if="toastText">
    <div class="toast" :class="[{ani: toastText}]">{{toastText}}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Add",
  data: () => {
    return {};
  },
  computed: {
    ...mapState({
      toastText: state => state.toast.toastText
    })
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