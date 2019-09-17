<!--  -->
<template>
  <div class="centent">
    <van-row type="flex" class="table_head">
      <van-col span="8">姓名</van-col>
      <van-col span="8">手机号</van-col>
      <van-col span="8">状态</van-col>
    </van-row>
    <div class="scroll" @touchmove="fnTouchmove">
      <van-row type="flex" class="table_body" v-for="(item,i) in contactsList" :key="i">
        <van-col span="8" class="name">{{item.name}}</van-col>
        <van-col span="8">{{item.phone}}</van-col>
        <van-col span="8" class="state" @click="fnChoose(item.phone)">选择TA</van-col>
      </van-row>
      <img class="img_you" src="@/views/Invite/images/you.png" v-if="contactsList.length==0" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    //这里存放数据
    return {
      lists: []
    };
  },
  computed: {
    ...mapGetters(["contactsList"])
  },
  methods: {
    ...mapMutations({
      setPhone: "SET_PHONE"
    }),
    fnChoose(phone) {
      this.setPhone(phone);
      this.$router.back(-1);
    }
  }
};
</script>
<style lang='less' scoped>
.img_you {
  display: block;
  width: 140px;
  height: 153px;
  margin: 20px auto;
}

.centent {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #fff;
  .scroll {
    height: calc(100vh - 48px);
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