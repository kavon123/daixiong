<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent @click.prevent>
        <div class="dialog_ct">
          <div class="title">已关联您的58账号</div>
          <div class="cnetent">
            <span>用户名称</span>
            <div class="name">{{name}}</div>
          </div>
          <div class="but" @click="fnClose">登录赚钱</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },

  methods: {
    fnClose() {
      this.$emit("close", "sucShow", false);
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
  background: rgba(0, 0, 0, 0.9);
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
      margin-top: 20px;
      margin-bottom: 8px;
    }
    .cnetent {
      display: flex;
      color: #666666;
      font-size: 14px;
      align-items: center;
      .name {
        padding: 8px 43px;
        color: #000;
        background: #f5f5f5;
        border-radius: 9px;
        margin-left: 14px;
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