<template>
  <div class="fix-bottom" :class="[{ show: showAnswerFlag}]">
    <div class="mask" @click="closeAnswerFn" style="display: none"></div>
    <div class="bottom">
      <div class="handle">
        <button class="btn-cancel" @click="closeAnswerFn">取消</button>
        <button class="btn-answer" @click="submitAnswer">回复</button>
      </div>
      <textarea :placeholder="`回复${currentItem.authName || ''}`" v-model.trim="answerContent"></textarea>
    </div>
  </div>
</template>
<script>
import axios from "../axios";
import { getNowFormatDate } from "../utils/utils";
import { mapState, mapActions } from "vuex";
export default {
  name: "Answer",
  data: () => {
    return {
      answerContent: ""
    };
  },
  computed: {
    ...mapState({
      showAnswerFlag: state => state.answer.showAnswerFlag,
      currentItem: state => state.answer.currentItem
    })
  },
  methods: {
    ...mapActions("toast", ["showToast"]),
    ...mapActions("answer", ["hideAnswerBottom"]),
    closeAnswerFn() {
      this.hideAnswerBottom();
    },
    submitAnswer() {
      if (this.answerContent === "") {
        this.showToast({ text: "回复内容不能为空" });
        return;
      }
      axios({
        method: "post",
        url: "/reply/send",
        data: {
          userid: JSON.parse(sessionStorage.getItem("userInfo")).user_id,
          messageid: this.currentItem.id,
          content: this.answerContent
        }
      })
        .then(res => {
          if (res.code === "0") {
            this.showToast({ text: "回复成功！", time: 1200 });
            this.hideAnswerBottom();
            if (this.$route.name === "Detail") {
              this.$emit("updateAnswer", {
                id: Date.parse(new Date()),
                content: this.answerContent,
                created_at: getNowFormatDate(),
                userid: JSON.parse(sessionStorage.getItem("userInfo")).user_id
              });
            }
            this.answerContent = "";
          } else {
            this.showToast({ text: "回复失败" });
          }
        })
        .catch(error => {
          console.log(error);
          this.showToast({ text: "回复失败" });
        });
    }
  },
  destroyed() {
    this.hideAnswerBottom();
  }
};
</script>
<style scoped>
.fix-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 248px;
  display: none;
}
.bottom {
  box-sizing: border-box;
  width: 100%;
  height: 248px;
  position: absolute;
  right: 0;
  bottom: -248px;
  background: #ffffff;
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px 2px 0 0;
  padding: 16px 35px 35px;
}
.fix-bottom.show {
  display: block;
}
.fix-bottom.show .bottom {
  bottom: 0rem;
}
textarea {
  width: 100%;
  border: 0;
  border: 1px solid #979797;
  border-radius: 10px;
  height: 158px;
  box-sizing: border-box;
  padding: 16px;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.handle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.btn-cancel {
  border: 1px solid #979797;
  border-radius: 8px;
  border-radius: 8px;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #949494;
  letter-spacing: -0.58px;
  background: #fff;
  width: 74px;
  height: 34px;
}
.btn-answer {
  background-image: linear-gradient(90deg, #9bccff 0%, #88eaff 100%);
  border-radius: 8px;
  width: 74px;
  height: 34px;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: -0.58px;
  border: 0;
}
</style>
