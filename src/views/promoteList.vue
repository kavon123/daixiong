<!--  -->
<template>
  <div class="promote">
    <div class="centent">
      <div class="table_head">
        <van-row type="flex">
          <van-col span="6">用户名</van-col>
          <van-col span="6">收益</van-col>
          <van-col span="6">日期</van-col>
          <van-col span="6">状态</van-col>
        </van-row>
      </div>
      <div class="scroll">
        <div class="table_body" v-for="(item,i) in lists" :key="i">
          <van-row type="flex" justify="center">
            <van-col span="6">
              <div class="name">{{item.name}}</div>
              <div>{{item.mobile}}</div>
            </van-col>
            <van-col span="6" class="sum">{{item.amount}}元</van-col>
            <van-col span="6">{{item.time}}</van-col>
            <van-col span="6" class="state">
              {{item.state===2?"已发放":"未游戏"}}
              <span
                class="alert"
                v-if="item.state!==2"
                @click="fnRemind"
              >提醒</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  created() {
    this.lists = this.$route.params.lists;
  },
  methods: {
    fnRemind() {
      console.log("object");
    }
  }
};
</script>
<style lang='less' scoped>
.centent {
  height: 100vh;
  overflow: hidden;
  .scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
.table_head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid #f5f5f5;
  .van-row {
    width: 92%;
    height: 48px;
    display: flex;
    align-items: center;
    .van-col {
      text-align: center;
      color: #333333;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
.table_body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  .van-row {
    width: 92%;
    height: 53px;
    display: flex;
    align-items: center;
    .van-col {
      text-align: center;
      color: #666;
      font-size: 12px;
      .name {
        color: #333;
      }
    }
    .sum {
      font-size: 14px;
      color: #d4080c;
    }
    .state {
      position: relative;
      .alert {
        color: #ff8b29;
        position: absolute;
        right: -6px;
      }
    }
  }
}
</style>