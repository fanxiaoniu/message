<template>
  <div class="page-detail">
    <div class="title">{{item.title}}</div>
    <div class="content">{{item.content}}</div>
    <div class="info">
      <div class="left">
        <span class="date">{{item.date}}</span>
        <span class="auth">{{item.authName}}</span>
      </div>
      <div class="handle">
        <span class="btn-answer" @click="answerFn" :class="[{active: showAnswerFlag}]"></span>
      </div>
    </div>
    <div class="answer-list">
      <div class="item" v-for="item in answerList" :key="item.id">
        <div class="item-con" v-if="item.authName">
          <div class="item-info">
            <div class="item-auth">
              <span class="auth-name">{{item.authName}}</span> 回复:
            </div>
            <div class="item-time">{{item.created_at.substring(5)}}</div>
          </div>
          <div class="item-content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <Answer v-on:updateAnswer="addList"></Answer>
    <Toast></Toast>
  </div>
</template>

<script>
import Answer from "../components/Answer";
import Toast from "../components/Toast";
import axios from "../axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "Detail",
  data: () => {
    return {
      item: {},
      answerList: []
    };
  },
  computed: {
    ...mapState({
      showAnswerFlag: state => state.answer.showAnswerFlag
    })
  },
  components: {
    Answer,
    Toast
  },
  methods: {
    ...mapActions("answer", [
      "hideAnswerBottom",
      "showAnswerBottom",
      "setCurrentItem"
    ]),
    answerFn() {
      if (this.showAnswerFlag) {
        this.hideAnswerBottom();
      } else {
        this.showAnswerBottom();
      }
    },
    addList(item) {
      this.answerList.push(item);
      this.getAuth(item);
    },
    getAnswerList() {
      axios({
        method: "get",
        url: "/reply/list",
        params: {
          messageid: this.item.id
        }
      })
        .then(res => {
          this.answerList = res.result;
          for (let i in this.answerList) {
            this.getAuth(this.answerList[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAuth(item) {
      axios({
        method: "get",
        url: "/user/get",
        params: { id: item.userid }
      })
        .then(res => {
          if (res.code === "0") {
            this.$set(item, "authName", res.result.username);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    }
  },

  created() {
    let temp = JSON.parse(sessionStorage.getItem("currentItem"))|| null;
    if(temp === null){
      this.$router.replace('/List')
      return;
    }
    this.item = temp
    this.item.date = this.item.created_at.substring(5);
    this.setCurrentItem(this.item);
    this.getAnswerList();
  }
};
</script>
<style scoped>
.page-detail {
  padding: 28px 28px 248px;
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
.answer-list {
  padding-top: 60px;
}
.item-con {
  border-bottom: 1px solid #ccc;
}
.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
}
.item-content {
  padding-bottom: 20px;
}
.item {
  margin-bottom: 30px;
}
.item-time {
  color: #c9c9c9;
}
.item:last-of-type .item-con {
  border-bottom: 0;
}
.auth-name {
  font-weight: bold;
}
</style>
