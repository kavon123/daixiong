<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent @click.prevent>
        <div class="dialog_ct">
          <div class="title">推广小妙招</div>
          <div class="prompt">
            <div>1.通过微信群、微信朋友圈、QQ群等方式宣传</div>
            <div>2.通过贴吧、论坛、微博、陌陌等方式推广</div>
            <div>3.通过直播平台抖音、快手等资源引流</div>
            <div>4.推荐亲友，一传十，十传百</div>
          </div>
          <div class="but" @click="fnClose">知道了</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    fnClose() {
      this.$emit("close", "bestShow", false);
    }
  }
};
</script>
<style lang='less' scoped>
.dialog {
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
  .dialog_ct {
    width: 300px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    .title {
      color: #333333;
      height: 30px;
      font-size: 17px;
      margin-top: 25px;
    }

    .prompt {
      width: 248px;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      margin-top: 8px;
      div {
        margin-bottom: 12px;
      }
      div:last-child {
        margin-bottom: 0;
      }
    }
    .but {
      padding: 10px 40px;
      height: 40px;
      background: #367dfd;
      border-radius: 5px;
      font-size: 15px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #fff;
      text-align: center;
      margin: 30px 0;
    }
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>