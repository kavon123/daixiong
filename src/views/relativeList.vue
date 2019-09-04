<!--  -->
<template>
  <div class="promote">
    <m-nav title="选择亲友" :arrow="true" />
    <div class="centent">
      <van-row type="flex" class="table_head">
        <van-col span="8">姓名</van-col>
        <van-col span="8">手机号</van-col>
        <van-col span="8">状态</van-col>
      </van-row>
      <div class="scroll">
        <van-row type="flex" class="table_body" v-for="(item,i) in lists" :key="i">
          <van-col span="8" class="name">{{item.name}}</van-col>
          <van-col span="8">{{item.phone}}</van-col>
          <van-col span="8" class="state">{{item.state===1?"已发放":"未游戏"}}</van-col>
        </van-row>
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