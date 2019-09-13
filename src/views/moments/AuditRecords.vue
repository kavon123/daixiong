<template>
  <div class="main">
    <div class="head">
      <div class="nav">
        <van-icon name="arrow-left" class="icon" @click="fnGoBack" />
        <div class="title">审核记录</div>
        <van-icon name="arrow-left" class="icon" style="visibility: hidden;" />
      </div>
    </div>
    <div class="body">
      <div class="item" v-for="item in lists" :key="item" @click="fnViewStatus(item)">
        <div class="left">
          <div>2019年6月25日</div>
          <div class="time">12时23分40秒</div>
        </div>
        <div class="center">+3000红包券</div>
        <div class="right">
          正在审核
          <van-icon name="arrow" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      lists: [...Array(100)]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fnGoBack() {
      this.$router.back(-1);
    },
    fnViewStatus(id) {
      this.$router.push({ name: "AuditStatus", params: { id } });
    }
  },
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
p {
  margin: 0;
}
.g_bg {
  background-color: #fff;
  border-radius: 8px;
}
.g_flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-image: url("./image/bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #4c38d8;
  .head {
    position: fixed;
    background: linear-gradient(to right, #27abf3, #3177f0);
    .nav {
      .g_flex;
      width: 100vw;
      height: 40px;

      color: #fff;
      font-weight: 500;
      padding: 0 15px;
      margin-top: 24px;
      .title {
        flex: 1;
        font-size: 18px;
        text-align: center;
      }
      .icon {
        font-size: 20px;
      }
    }
  }
  .body {
    height: calc(100vh - 113px);
    overflow: auto;
    margin: 79px 15px 34px;
    background: #fff;
    border-radius: 10px;
    .item {
      height: 60px;
      margin: 0 10px;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #443f6b;
      .left {
        flex: 1;
        .time {
          font-size: 12px;
          color: #999;
        }
      }
      .center {
        flex: 1;
        color: #f8456e;
        text-align: center;
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex: 1;
      }
      .icon {
        font-size: 20px;
        color: #9c9c9c;
      }
    }
  }
}
</style>