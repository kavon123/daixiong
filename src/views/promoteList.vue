<!--  -->
<template>
  <div class="promote">
    <m-nav title="我的邀请" :arrow="true" />
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
              <div>{{item.phone}}</div>
            </van-col>
            <van-col span="6" class="sum">{{item.sum}}元</van-col>
            <van-col span="6">{{item.time}}</van-col>
            <van-col span="6" class="state">
              {{item.state===1?"已发放":"未游戏"}}
              <span class="alert" v-if="item.state!==1">提醒</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mNav from "@/components/m-nav";

export default {
  components: {
    mNav
  },
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
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.centent {
  height: calc(100vh - 46px);
  overflow: hidden;
  .scroll {
    height: calc(100vh - 94px);
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