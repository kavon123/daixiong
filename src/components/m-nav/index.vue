<!--  -->
<template>
  <van-nav-bar @click-left="onClickLeft" :left-arrow="arrow" class="u-nav" :title="title" />
</template>

<script>
export default {
  props: {
    click: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickLeft() {
      console.log("object");
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='less' scoped>
.u-nav {
  background: linear-gradient(to right, #29b5f4, #3476ef);
}
</style>

<style lang="less">
.u-nav {
  .van-nav-bar__title,
  .van-icon {
    color: #fff;
    font-size: 18px;
  }
}
</style>