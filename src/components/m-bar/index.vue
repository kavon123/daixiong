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
<style lang='less' scoped>
.u-bar {
  padding: 0 94px;
  height: 30px;
}
</style>

<style lang="less">
.u-bar {
  .van-notice-bar__content {
    font-size: 12px;
  }
}
</style>