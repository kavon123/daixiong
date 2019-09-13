<template>
  <div class="main">
    <div class="head">
      <div class="nav">
        <van-icon name="arrow-left" class="icon" @click="fnGoBack" />
        <div class="title">等待审核</div>
        <van-icon name="arrow-left" class="icon" style="visibility: hidden;" />
      </div>
    </div>
    <div class="body">
      <div class="steps_content">
        <div class="steps_icon">
          <img class="icon" src="@/views/moments/image/success.png" alt />
          <div class="line active"></div>
          <img class="icon" src="@/views/moments/image/wait.png" alt />
          <div class="line"></div>
          <img class="icon" src="@/views/moments/image/credit.png" alt />
        </div>
        <div class="steps_text">
          <div class="item">
            <p class="title active">提交审核成功</p>
            <p class="time">2019.02.16 15:23:15</p>
          </div>
          <div class="item title">等待客服审核</div>
          <div class="item">
            <p class="title">审核通过，发放奖励</p>
            <p class="time">2019.02.16 15:23:15</p>
          </div>
        </div>
      </div>

      <div class="instructions color">
        <div class="failure">未通过原因</div>审核时间不超过24小时，审核通过后，奖励将会发放至您的钱包余额。
      </div>
      <div class="but">确认</div>
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.params.id);
  },
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
    .steps_content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 35px;
      border-bottom: 10px solid #f5f5f5;
      .steps_icon {
        width: 57px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon {
          width: 57px;
          height: 45px;
        }
        .line {
          width: 1px;
          height: 40px;
          background: #bababa;
        }
        .active {
          background: #6d5aff;
        }
      }
      .steps_text {
        flex: 1;
        .item {
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: 45px;
          margin-bottom: 40px;
          margin-left: 30px;
        }
        .item:last-child {
          margin-bottom: 0;
        }
        .title {
          color: #bababa;
          font-size: 15px;
        }
        .active {
          color: #443f6b;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .failure {
      color: #ff4b4e;
      font-size: 16px;
      padding-bottom: 14px;
    }
    .instructions {
      padding: 32px;
      color: #999;
      font-size: 13px;
    }
    .color {
      color: #4d4871;
    }
    .but {
      width: 210px;
      height: 45px;
      background: linear-gradient(#a28bff 0%, #826cff 50%, #a28bff 100%);
      border-radius: 6px;
      margin: 8px auto 0;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 45px;
    }
  }
}
</style>