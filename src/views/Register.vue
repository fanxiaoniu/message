<template>
  <div class="page-register">
    <div class="form-wrap">
      <div class="form">
        <div class="form-title">注册账号</div>
        <div class="row">
          <input class="ui-input" v-model="username" placeholder="用户名" />
        </div>
        <div class="row">
          <input class="ui-input" v-model="email" placeholder="手机号码/电子邮箱" />
        </div>
        <div class="row">
          <input class="ui-input" type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="btn-wrap">
          <button @click="registerFn" class="btn">注册</button>
        </div>
      </div>
      <div class="tc form-bottom">
        <div class="form-bottom-link" @click="goLogin">登录</div>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import axios from "../axios";
import Toast from "../components/Toast";
import { mapActions } from "vuex";
export default {
  name: "Register",
  data: () => {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  components: {
    Toast
  },
  methods: {
    ...mapActions("toast", ["showToast"]),
    registerFn() {
      if (this.username === "" || this.password === "" || this.email === "") {
        this.showToast({ text: "用户名,密码，邮箱必填" });
        return;
      }
      axios({
        url: "/user/register",
        method: "post",
        data: {
          email: this.email,
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          if (res.code === "0") {
            this.showToast({
              text: "注册成功,去登录!",
              time: 1200,
              afterFn: () => {
                this.$router.push("/Login");
              }
            });
          } else {
            this.showToast({ text: res.errorMsg });
          }
        })
        .catch(function(error) {
          this.showToast({ text: error });
        });
    },
    goLogin() {
      this.$router.push("/Login");
    }
  }
};
</script>
<style scoped>
@import "../css/form.scss";
.tc {
  text-align: center;
}
.page-register {
  height: 100vh;
  background: #d4ebff url(../assets/bg2.png) no-repeat center;
  background-size: 100% auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.form-wrap {
  margin-top: -20px;
}
.form {
  padding-bottom: 75px;
}
</style>
