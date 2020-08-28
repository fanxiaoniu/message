<template>
  <div class="page-detail">
    <div class="title">{{item.title}}</div>
    <div class="content">{{item.content}}</div>
    <div class="info">
      <div class="left">
        <span class="date">{{item.date}}</span>
        <span class="auth">用户id:{{item.userid}}</span>
      </div>
      <div class="handle">
        <span class="btn-answer" @click="answerFn" :class="[{active: $store.state.showAnswerFlag}]"></span>
      </div>
    </div>
    <Answer></Answer>
  </div>
</template>

<script>
import Answer from "../components/Answer";
export default {
  name: "Detail",
  data: () => {
    return {
      item: {}
    };
  },
  components: {
    Answer
  },
  methods: {
    answerFn() {
      if (this.$store.state.showAnswerFlag) {
        this.$store.commit("hideAnswerBottom");
      } else {
        this.$store.commit("showAnswerBottom");
      }
    }
  },
  mounted() {
    this.item = this.$route.query;
    this.item.date = this.item.created_at.substring(5);
    this.$store.commit("setCurrentItem", this.item);
  }
};
</script>
<style scoped>
.page-detail {
  padding: 28px;
}
.title {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #646464;
  letter-spacing: -0.77px;
  margin-bottom: 12px;
  text-align: justify;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #7d7d7d;
  letter-spacing: -0.68px;
  text-align: justify;
  margin-bottom: 40px;
}
.date {
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #c9c9c9;
  letter-spacing: -0.58px;
}
.auth {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #989898;
  letter-spacing: -0.63px;
  margin-left: 20px;
}
.btn-answer {
  width: 50px;
  height: 42px;
  display: inline-block;
  background: url(../assets/answer.png) no-repeat;
  background-size: 100% auto;
}
.btn-answer.active {
  background-image: url(../assets/answer_actice.png);
}
</style>
