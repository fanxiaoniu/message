<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import 'css/reset.css';
.tc{text-align: center}
#app {
  color: #646464;
  font-size: 24px;
  width:100%;
  max-width: 750px;
  margin: 0 auto;
  font-family: PingFangSC-Regular;
}
</style>
