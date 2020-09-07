<template>
  <div class="add-wrap" :class="[{show: addShowFlag}]">
    <div class="add">
      <div class="form-wrap">
        <div class="form">
          <div class="row">
            <input class="ui-input input-title" v-model.trim="title" placeholder="标题" />
          </div>
          <div>
            <textarea class="ui-input ui-textarea" type v-model.trim="content" placeholder="请输入内容"></textarea>
          </div>
          <div class="btn-wrap">
            <button @click="AddFn" class="btn">发表</button>
          </div>
        </div>
        <div class="buttom">
          <button @click="closeAddFn" class="btn-close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import { mapActions } from "vuex";
export default {
  name: "Add",
  data: () => {
    return {
      title: "",
      content: ""
    };
  },
  props: ["addShowFlag"],
  methods: {
    ...mapActions("toast", ["showToast"]),
    AddFn() {
      if (this.title === "" || this.content === "") {
        this.showToast({ text: "标题，内容不能为空！" });
        return;
      }
      axios({
        method: "post",
        url: "/message/send",
        data: {
          title: this.title,
          content: this.content,
          userid: JSON.parse(sessionStorage.getItem("userInfo")).user_id
        }
      })
        .then(res => {
          if (res.code === "0") {
            this.showToast({ text: "添加成功！" });
            this.$emit("addList");
            this.title = "";
            this.content = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeAddFn() {
      this.$emit("closeShowFn");
    }
  }
};
</script>
<style scoped>
@import "../css/form.scss";
.add-wrap {
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.add-wrap.show {
  display: block;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
.add {
  display: flex;
  height: 100%;
  align-items: center;
}
.form-wrap {
  width: 647px;
}
.form {
  padding-bottom: 72px;
}
.row {
  border-bottom: 0;
  margin-bottom: 30px;
}
.input-title {
  height: 99px;
}
.ui-input {
  border: 1px solid #949494;
  border-radius: 21px;
  padding: 20px;
}
.ui-textarea {
  height: 555px;
}
.btn-wrap {
  padding-top: 48px;
}
.buttom {
  text-align: right;
  padding-top: 47px;
}
.btn-close {
  width: 86px;
  height: 86px;
  background: url(../assets/delete.png) no-repeat;
  background-size: 100% auto;
  border: 0;
}
</style>
