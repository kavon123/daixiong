<template>
  <div class="home">
    <m-nav title="任务中心" />
    <m-bar
      text="通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容"
    />
    <div class="g-ct">
      <div class="u-but">了解YG娱乐</div>
      <div class="g-rules-ct">
        <div class="u-rules_text">
          1.好友通过您分享的链接注册YG娱乐，进入游戏1分钟，您即可获得2元佣金。
          <br />邀请奖励在本页面提现
        </div>
        <div class="u-rules_text">
          2.返佣奖励=直属下级返佣（流水每10万则返佣10000元）+非直属下级返佣（返给上级佣金*级数*30%），详见
          <span class="u-rules_inst">返佣说明</span>
          <br />返佣奖励需在“YG电竞”中提现
        </div>
      </div>
      <div class="g-sum-ct"></div>
      <div class="g-tutorial-ct"></div>
      <div class="g-best">
        <img src="@/assets/images/best.png" alt />
      </div>
      <footer class="footer">本页面由YG娱乐提供</footer>
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
  width: 375px;
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
    width: 375px;
    margin-top: 35px;
    height: 314px;
    background-image: url("../assets/images/rules_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    padding: 75px 38px 0 38px;
    .u-rules_text {
      width: 300px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(164, 166, 155, 1);
      line-height: 21px;
      padding-bottom: 19px;
      .u-rules_inst {
        color: #ffd85a;
      }
    }
    .u-rules_text:last-child {
      padding-bottom: 0;
    }
  }
  .g-sum-ct {
  }

  .g-tutorial-ct {
    width: 375px;
    margin-top: 35px;
    height: 314px;
    background-image: url("../assets/images/rules_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .g-best {
    width: 226px;
    height: 52px;
    margin: 58px auto 21px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    font-size: 12px;
    font-weight: 400;
    color: rgba(137, 134, 128, 1);
    line-height: 22px;
    text-align: center;
  }
}
</style>
