<!--  -->
<template>
  <div class="promote">
    <div class="centent">
      <van-row type="flex" class="table_head">
        <van-col span="8">姓名</van-col>
        <van-col span="8">手机号</van-col>
        <van-col span="8">状态</van-col>
      </van-row>
      <div class="scroll">
        <van-row type="flex" class="table_body" v-for="(item,i) in contactsList" :key="i">
          <van-col span="8" class="name">{{item.name}}</van-col>
          <van-col span="8">{{item.phone}}</van-col>
          <van-col span="8" class="state" @click="fnChoose(item.phone)">选择TA</van-col>
        </van-row>
      </div>
    </div>
    <van-icon name="close" class="close" @click="fnClose" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    //这里存放数据
    return {
      lists: [
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 0
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 0
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 0
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 0
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        },
        {
          name: "asaasdghhc",
          phone: "*******1223123",
          sum: "664",
          time: "2019/09/01",
          state: 1
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["contactsList"])
  },
  methods: {
    ...mapMutations({
      setPhone: "SET_PHONE"
    }),
    fnClose() {
      this.$emit("close", "relativeShow", false);
      this.$emit("close", "inviteShow", true);
    },
    fnChoose(phone) {
      this.setPhone(phone);
      this.$emit("close", "inviteShow", true);
      this.fnClose();
    }
  }
};
</script>
<style lang='less' scoped>
.close {
  font-size: 35px;
  color: #fff;
  margin-top: 20px;
}
.promote {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.centent {
  height: 500px;
  width: 90%;
  overflow: hidden;
  background: #fff;
  .scroll {
    height: calc(500px - 48px);
    overflow: auto;
  }
}
.table_head {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 4px solid #f5f5f5;
  .van-col {
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: 500;
  }
}

.table_body {
  width: 100%;
  height: 53px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  .name {
    color: #333;
  }
  .van-col {
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .state {
    color: #ff8b29;
  }
}
</style>