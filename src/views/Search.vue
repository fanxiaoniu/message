<template>
  <div class="page-search">
    <div class="wrap">
      <div class="back" @click="backFn"></div>
      <div class="search">
        <input type="input" placeholder="请输入搜索条件" class="ui-input" />
      </div>
      <div class="btn-search">搜索</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    backFn() {
      this.$router.push("/List");
    }
  }
};
</script>
<style scoped>
.back {
  width: 64px;
  height: 40px;
  background: url(../assets/arrow.png) no-repeat center;
  background-size: 20px auto;
}
.wrap {
  display: flex;
  width: 100%;
  height: 110px;
  background: url(../assets/bar.png) no-repeat;
  background-size: 100% auto;
  align-items: center;
}
.ui-input {
  width: 550px;
  height: 60px;
  padding: 0 10px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  letter-spacing: -0.68px;
}
.btn-search {
  font-family: PingFangSC-Regular;
  font-size: 34px;
  color: #fff;
  letter-spacing: -0.82px;
  text-align: center;
  flex-grow: 1;
}
</style>
