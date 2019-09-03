<template>
  <div class="home">
    <m-nav title="任务中心" />
    <m-bar
      text="通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容"
    />
    <div class="g-ct">
      <div class="u-but">了解YG娱乐</div>
      <div class="g-rules-ct"></div>
    </div>
  </div>
</template>

<script>
import mNav from "@/components/m-nav";
import mBar from "@/components/m-bar";

export default {
  name: "home",
  components: {
    mNav,
    mBar
  },
  methods: {
    goToPage() {
      this.$router.push("/about");
    }
  }
};
</script>
<style lang='less' scoped>
.g-ct {
  overflow: hidden;
  margin-top: -30px;
  width: 100%;
  height: 2062px;
  background-image: url("../assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .u-but {
    width: 145px;
    height: 45px;
    border: 1px solid #ffee2e;
    border-radius: 23px;
    margin: 347px auto 0;
    font-size: 19px;
    line-height: 45px;
    text-align: center;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #fff12e;
  }
  .g-rules-ct {
    height: 2062px;
    background-image: url("../assets/images/rules_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
}
</style>
