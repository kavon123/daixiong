<!--  -->
<template>
  <van-notice-bar
    class="u-bar"
    color="#fff"
    background="#00000060"
    :text="text"
    left-icon="volume-o"
  />
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
  .van-notice-bar__content {
    font-size: 12px;
    white-space: pre;
  }
}
</style>