<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog">
        <div class="dialog_ct">
          <div class="title">允许访问通讯录</div>
          <div class="sum" v-if="first">
            立即得
            <span>1000</span>红包券
          </div>
          <div class="prompt">邀请通讯录好友成功率增加85％</div>
          <div class="but" @click="fnLogin">去允许</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    first: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    fnClose() {
      this.$emit("close", "contactsShow", false);
    },
    fnLogin() {
      this.fnClose();
      this.$emit("close", "permissions", true);
      this.$emit("close", "first", false);
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
    .sum {
      color: #666;
      font-size: 15px;
      margin: 10px 0;
      span {
        color: #f8456e;
      }
    }
    .prompt {
      color: #999;
      font-size: 14px;
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