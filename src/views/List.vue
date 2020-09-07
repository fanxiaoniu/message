<template>
  <div class="page-list">
    <Item
      v-if="list.length > 0"
      :list="list"
      @answerShowFn="answerShowFn"
      :answerShowFlag="answerShowFlag"
      :updateFlag="updateFlag"
    ></Item>
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
      updateFlag: false
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
          if (res.code === "0") {
            if (this.list.length === 0) {
              this.list = res.result;
            } else {
              this.list.push(res.result.pop());
            }
            if (this.addShowFlag === true) {
              this.updateFlag = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.updateFlag = true;
          this.closeShowFn();
        });
    },
    updateList() {
      this.updateFlag = false;
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
    }
  }
};
</script>
<style scoped>
.page-list {
  padding-bottom: 248px;
  box-sizing: border-box;
}
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
