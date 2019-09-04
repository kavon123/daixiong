<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" :class="show?'':'style_show'">
        <div class="dialog_ct">
          <div class="title">网络异常，请重试</div>
          <div class="but" @click="fnLogin">重试</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  methods: {
    fnClose() {
      this.$emit("close", "errShow", false);
    },
    fnLogin() {
      this.$emit("close", "errShow", false);
      this.$emit("info");
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
  z-index: 99999;
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

.style_show {
  display: none;
}
</style>