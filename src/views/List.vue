<template>
  <div class="page-list">
    <Item :list="list" :done="done" @answerShowFn="answerShowFn" :answerShowFlag="answerShowFlag"></Item>
    <Add @addList="updateList" :addShowFlag="addShowFlag" @closeShowFn="closeShowFn"></Add>
    <div class="float">
      <button class="float-btn btn-search" @click="goSearch"></button>
      <button class="float-btn btn-add" @click="addBtnFn"></button>
    </div>
    <Answer></Answer>
    <Toast></Toast>
  </div>
</template>

<script>
import axios from "../axios";
import Item from "../components/Item";
import Answer from "../components/Answer";
import Add from "../components/Add";
import Toast from "../components/Toast";
export default {
  name: "List",
  data: () => {
    return {
      list: [],
      addShowFlag: false,
      answerShowFlag: false,
      currentItem: {},
      answerContent: "",
      done: false
    };
  },
  components: {
    Item,
    Add,
    Answer,
    Toast
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios({
        method: "get",
        url: "/message/list"
      })
        .then(res => {
          if (res.data.code === "0") {
            this.list = res.data.result;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.done = true;
        });
    },
    updateList() {
      this.addShowFlag = false;
      this.getList();
    },
    goSearch() {
      this.$router.push("/Search");
    },
    addBtnFn() {
      this.addShowFlag = true;
    },
    closeShowFn() {
      this.addShowFlag = false;
    },
    answerShowFn(item) {
      this.currentItem = item;
      this.answerShowFlag = true;
    },
    closeAnswerFn() {
      this.answerShowFlag = false;
    },
    submitAnswer() {
      axios({
        method: "post",
        url: "/reply/send",
        content: this.answerContent,
        messageid: this.currentItem.id,
        userid: sessionStorage.getItem("userInfo").user_id
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.float {
  position: fixed;
  right: 32px;
  bottom: 55px;
}
.float-btn {
  width: 86px;
  height: 86px;
  border: 0;
  background: no-repeat;
  background-size: 100% auto;
}
.btn-search {
  background-image: url(../assets/search.png);
}
.btn-add {
  margin-left: 49px;
  background-image: url(../assets/add.png);
}
</style>
