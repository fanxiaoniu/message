<template>
  <div class="page-login">
    <div class="form-wrap">
      <div class="form">
        <div class="form-title">快速登录</div>
        <div class="row">
          <input class="ui-input" v-model.trim="username" placeholder="用户名/手机号码/电子邮箱" />
        </div>
        <div class="row">
          <input class="ui-input" type="password" v-model.trim="password" placeholder="请输入密码" />
        </div>
        <div class="btn-wrap">
          <button @click="loginFn" class="btn">登录</button>
        </div>
        <div class="tc forget" @click="forgetFn">忘记密码怎么办？</div>
      </div>
      <div class="tc form-bottom">
        <div class="form-bottom-link" @click="goRegister">注册</div>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import axios from "../axios";
import Toast from "../components/Toast";

export default {
  name: "Login",
  data: () => {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    Toast
  },
  methods: {
    loginFn() {
      if (this.username === "" || this.password === "") {
        this.$store.commit("showToast", "用户名，密码必填");
        return;
      }
      axios
        .post("/auth/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.code === "0") {
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            this.$store.commit("showToast", "登录成功");
            axios.defaults.headers.common["Authorization"] =
              `Bearer ` + res.data.data.access_token;
            setTimeout(() => {
              this.$router.push("/List");
            }, 1400);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goRegister() {
      this.$router.push("/Register");
    },
    forgetFn() {
      this.$store.commit("showToast", "请联系管理员");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../css/form.scss";
.page-login {
  height: 100vh;
  background: #d4ebff url(../assets/bg.png) no-repeat center;
  background-size: 100% auto;
  padding-top: 336px;
  box-sizing: border-box;
}

.forget {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #afafaf;
  padding-top: 20px;
}
</style>
