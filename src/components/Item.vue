<template>
  <div v-if="done" class="list-wrap">
    <div class="list" v-if="list.length">
      <div
        v-for="item in list"
        :key="item.key"
        class="item"
        :id="item.id"
        :class="[{active: (currentId === item.id) && $store.state.showAnswerFlag}]"
      >
        <div class="item-link" @click="detail(item)">
          <div class="title">{{item.title}}</div>
          <div class="con">{{item.content}}</div>
          <div class="info">
            <span class="date">{{item.created_at.substring(5)}}</span>
            <span class="auth">{{"用户id:" + item.userid}}</span>
          </div>
        </div>
        <div class="btn-answer" @click="answer(item)"></div>
      </div>
    </div>
    <div v-else class="empty">
      <span>还没有留言哦！</span>
    </div>
  </div>
</template>
<script>
import axios from "../axios";
export default {
  name: "Item",
  data: () => {
    return {
      currentId: -1,
      isActive: false
    };
  },
  computed: {},
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    answer(item) {
      if (
        this.isActive &&
        this.currentId === item.id &&
        this.$store.state.showAnswerFlag
      ) {
        this.isActive = false;
        this.$store.commit("hideAnswerBottom");
      } else {
        this.isActive = true;
        this.currentId = item.id;
        this.$store.commit("setCurrentItem", item);
        this.$store.commit("showAnswerBottom");
      }
    },
    detail(item) {
      this.$store.commit("hideAnswerBottom");
      this.$store.commit("setCurrentItem", item);
      this.$router.push({
        path: "/Detail",
        query: {
          title: item.title,
          content: item.content,
          created_at: item.created_at,
          userid: item.userid,
          id: item.id
        }
      });
    },
    getAuth(userid) {
      axios({
        method: "get",
        url: "/user/get",
        id: userid
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
.list {
  padding-top: 28px;
}
.item {
  margin: 0 28px 28px;
  padding-bottom: 20px;
  text-align: justify;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
}
.btn-answer {
  position: absolute;
  right: 0;
  bottom: 20px;
  width: 48px;
  height: 40px;
  background: url(../assets/answer.png) no-repeat;
  background-size: 100% auto;
}
.item.active .btn-answer {
  background-image: url(../assets/answer_actice.png);
}
.title {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #646464;
  letter-spacing: -0.77px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 45px;
  padding-bottom: 6px;
}
.con {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #4c4c4c;
  letter-spacing: -0.68px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  max-height: 90px;
  line-height: 45px;
  margin-bottom: 12px;
}
.info {
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
.item:last-of-type {
  border-bottom: 0;
}
.empty {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>