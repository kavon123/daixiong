<!--  -->
<template>
  <transition>
    <div class="dialog" :class="show?'':'style_show'">
      <div class="dialog_ct">
        <van-loading type="spinner" class="loading" />
        <div class="dialog_text">正在为您生成YG账号</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
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
  background: #00000000;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog_ct {
    width: 130px;
    height: 84px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    .loading {
      width: 28px;
      height: 28px;
      margin-bottom: 8px;
    }
    .dialog_text {
      color: #fff;
    }
  }
}
.style_show {
  display: none;
}
</style>