<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" :class="show?'':'style_show'">
        <div class="dialog_ct">
          <div class="text">已转账到我的钱包，可前往我的 钱包页面提现</div>
          <div class="but_ct">
            <div class="but" @click="fnWithdrawal">去提现</div>
            <div class="but but--b" @click="fnClose">确 定</div>
          </div>
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

  methods: {
    fnClose() {
      this.$emit("close", "withdrawal", false);
    },
    fnWithdrawal() {
      console.log("object");
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
    .text {
      color: #000;
      font-size: 17px;
      padding: 36px 32px 0;
    }
    .but_ct {
      display: flex;

      .but {
        margin: 0 10px;
        width: 100px;
        padding: 10px 0;
        // background: #367dfd;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 400;
        color: #367dfd;
        border: 1px solid #367dfd;
        text-align: center;
        margin: 30px 10px;
      }
      .but--b {
        color: #fff;
        background: #367dfd;
      }
      //   .but {
      //     padding: 10px 40px;
      //     background: #367dfd;
      //     border-radius: 5px;
      //     font-size: 15px;
      //     font-weight: 400;
      //     color: #fff;
      //     text-align: center;
      //     margin: 30px 10px;
      //   }
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