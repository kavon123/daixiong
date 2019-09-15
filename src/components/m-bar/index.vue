<!--  -->
<template>
  <van-notice-bar class="u-bar" color="#fff" :text="text" left-icon="volume-o" />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang='less'>
.u-bar {
  padding: 0 94px;
  height: 30px;
  background: rgba(0, 0, 0, 0.6);
  .van-notice-bar__content {
    font-size: 12px;
    white-space: pre;
  }
}
</style>