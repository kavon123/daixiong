<template>
  <div class="home">
    <m-nav title="任务中心" />
    <m-bar
      text="通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容"
    />
    <div class="g-ct">
      <div class="u-but">了解YG棋牌</div>
      <div class="g-rules-ct">
        <div class="u-rules_text">
          1.好友通过您分享的链接注册YG娱乐，进入游戏1分钟，您即可获得2元佣金。
          <br />邀请奖励在本页面提现
        </div>
        <div class="u-rules_text">
          2.返佣奖励=直属下级返佣（流水每10万则返佣10000元）+非直属下级返佣（返给上级佣金*级数*30%），详见
          <span>返佣说明</span>
          <br />返佣奖励需在“YG电竞”中提现
        </div>
      </div>
      <div class="g-sum-ct">
        <div class="m-user">
          <van-icon name="user-o" color="#EBB84E" />
          <span class="u-user">159622212</span>
          <van-icon name="wap-nav" color="#ffee2e" />
        </div>
        <div class="m-sum-ct">
          <div class="sum_item">
            <div class="u-title">如何赚钱</div>
            <div class="sum_item_ct">
              <img class="sum_gold" src="@/assets/images/gold.png" alt />
              <div class="sum_num">
                <span>6</span>元
              </div>
              <div class="sum_add">累计已获得123元</div>
            </div>
            <div class="sum_but">
              <img src="@/assets/images/transfer.png" alt />
            </div>
          </div>
          <div class="sum_item">
            <div class="u-title">如何赚钱</div>
            <div class="sum_item_ct">
              <img class="sum_golds" src="@/assets/images/golds.png" alt />
              <div class="sum_num">
                <span>6</span>元
              </div>
              <div class="sum_add">累计已获得123元</div>
            </div>
            <div class="sum_but">
              <img src="@/assets/images/withdrawal.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="g-user-list">
        <van-row type="flex" class="g-table_head">
          <van-col span="6">用户名</van-col>
          <van-col span="6">收益</van-col>
          <van-col span="6">日期</van-col>
          <van-col span="5">状态</van-col>
        </van-row>
        <van-row type="flex" class="g-table">
          <van-col span="6">
            <div class="table_name">asdfasdf</div>
            <span>*****0128</span>
          </van-col>
          <van-col span="6" class="u-num">2元</van-col>
          <van-col span="6">20190831</van-col>
          <van-col span="5" class="u-state">
            已发放
            <span class="u-alert">提醒</span>
          </van-col>
        </van-row>
        <van-row type="flex" class="g-table">
          <van-col span="6">
            <div class="table_name">asdfasdf</div>
            <span>*****0128</span>
          </van-col>
          <van-col span="6" class="u-num">2元</van-col>
          <van-col span="6">20190831</van-col>
          <van-col span="5" class="u-state">
            已发放
            <span class="u-alert">提醒</span>
          </van-col>
        </van-row>
        <van-row type="flex" class="g-table">
          <van-col span="6">
            <div class="table_name">asdfasdf</div>
            <span>*****0128</span>
          </van-col>
          <van-col span="6" class="u-num">2元</van-col>
          <van-col span="6">20190831</van-col>
          <van-col span="5" class="u-state">
            已发放
            <span class="u-alert">提醒</span>
          </van-col>
        </van-row>
        <van-row type="flex" class="g-table">
          <van-col span="6">
            <div class="table_name">asdfasdf</div>
            <span>*****0128</span>
          </van-col>
          <van-col span="6" class="u-num">2元</van-col>
          <van-col span="6">20190831</van-col>
          <van-col span="5" class="u-state">
            已发放
            <span class="u-alert">提醒</span>
          </van-col>
        </van-row>
        <van-row type="flex" class="g-table">
          <van-col span="6">
            <div class="table_name">asdfasdf</div>
            <span>*****0128</span>
          </van-col>
          <van-col span="6" class="u-num">2元</van-col>
          <van-col span="6">20190831</van-col>
          <van-col span="5" class="u-state">
            已发放
            <span class="u-alert">提醒</span>
          </van-col>
        </van-row>
        <div class="user_but">
          更多
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="g-tutorial-ct">
        <div class="small_coup" @click="fnPop('bestShow',true)">推广小妙招</div>
        <div class="tutorial_title">如何获得邀请奖励？</div>
        <div class="g_img_ct">
          <img class="steps" src="@/assets/images/YGsteps1.png" alt />
          <img class="arrow" src="@/assets/images/YGarrow.png" alt />
          <img class="steps" src="@/assets/images/YGsteps2.png" alt />
          <img class="arrow" src="@/assets/images/YGarrow.png" alt />
          <img class="steps" src="@/assets/images/YGsteps3.png" alt />
        </div>
        <div class="g_img_ct">
          <div class="steps_text">邀请好友</div>
          <div class="steps_text">好友玩5分钟游戏</div>
          <div class="steps_text">获得奖励</div>
        </div>
        <div class="tutorial_title">如何获得返佣奖励？</div>
        <div class="g_img_ct">
          <img class="steps" src="@/assets/images/YGsteps1.png" alt />
          <img class="arrow" src="@/assets/images/YGarrow.png" alt />
          <img class="steps" src="@/assets/images/YGsteps2.png" alt />
        </div>
        <div class="g_img_ct">
          <div class="steps_text">邀请的好友投注</div>
          <div class="steps_text">您获得返佣</div>
        </div>
      </div>
      <div class="g-best">
        <img src="@/assets/images/best.png" alt />
      </div>
      <footer class="footer">本页面由YG娱乐提供</footer>
    </div>
    <!-- <m-loading :show="true" /> -->
    <!-- <m-generate :show="true" @close="fnClose" /> -->
    <!-- <m-login :show="true" @close="fnClose" /> -->
    <!-- <m-rele-suc :show="true" @close="fnClose" /> -->
    <!-- <m-rele-err :show="show" @close="fnClose" /> -->
    <!-- <m-contacts :show="show" :first="first" @close="fnClose" /> -->
    <m-best :show="bestShow" @close="fnPop" />
  </div>
</template>

<script>
import mNav from "@/components/m-nav";
import mBar from "@/components/m-bar";
import mLoading from "@/components/m-loading";
import mGenerate from "@/components/m-generate";
import mLogin from "@/components/m-login";
import mReleSuc from "@/components/m-rele/success";
import mReleErr from "@/components/m-rele/error";
import mContacts from "@/components/m-contacts";
import mBest from "@/components/m-best";

export default {
  name: "home",
  components: {
    mNav,
    mBar,
    mLoading,
    mGenerate,
    mLogin,
    mReleSuc,
    mReleErr,
    mContacts,
    mBest
  },
  data() {
    return {
      show: true,
      first: false,
      bestShow: false
    };
  },
  methods: {
    goToPage() {
      this.$router.push("/about");
    },
    fnPop(key, vla) {
      this[key] = vla;
    }
  }
};
</script>

<style lang='less' scoped>
.g-ct {
  overflow: hidden;
  margin-top: -30px;
  width: 375px;
  height: 2130px;
  background-image: url("../assets/images/YGbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .u-title {
    text-align: center;
    color: #fdfe4a;
    height: 20px;
    font-size: 20px;
    font-weight: bold;
    line-height: 21px;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#eee7d5),
      to(#ffe9a4)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 28px;
    margin-bottom: 16px;
  }
  .u-but {
    width: 145px;
    height: 45px;
    border: 1px solid #ffee2e;
    border-radius: 23px;
    margin: 402px auto 0;
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
    height: 265px;
    background-image: url("../assets/images/YGbgct1.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .u-rules_text {
      width: 300px;
      font-size: 13px;
      color: #a4a69b;
      line-height: 21px;
      padding-bottom: 15px;
      margin-top: 75px;
      span {
        color: #ffd85a;
      }
    }
    .u-rules_text:last-child {
      padding-bottom: 0;
      margin-top: 0;
    }
  }

  .g-sum-ct {
    width: 375px;
    margin-top: 30px;
    height: 336px;
    background-image: url("../assets/images/YGbgct2.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    .m-user {
      display: flex;
      align-items: center;
      margin-top: 26px;
      margin-left: 45px;
      .u-user {
        color: #ffee2e;
        font-size: 15px;
        padding: 0 8px;
      }
    }
    .m-sum-ct {
      display: flex;
      justify-content: center;
      .sum_item_ct {
        width: 145px;
        height: 128px;
        background: rgba(55, 53, 105, 1);
        border: 1px solid rgba(55, 55, 99, 1);
        box-shadow: 0px 0px 4px 0px rgba(255, 255, 255, 1);
        border-radius: 11px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .sum_item {
        width: 145px;
        margin-right: 10px;
        margin-left: 10px;
      }
      .sum_but {
        width: 122px;
        height: 32px;
        margin: 16px auto 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sum_gold {
        width: 80px;
        height: 64px;
        margin-top: 6px;
      }
      .sum_golds {
        width: 68px;
        height: 64px;
        margin-top: 6px;
      }
      .sum_num {
        color: #edd221;
        span {
          font-size: 22px;
        }
      }
      .sum_add {
        color: #e39500;
      }
    }
  }
  .g-user-list {
    width: 375px;
    height: 392px;
    background-image: url("../assets/images/YGbgct3.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 68px;
    .g-table_head {
      width: 85vw;
      margin-bottom: 16px;
      .van-col {
        text-align: center;
        color: #c5d7fa;
        font-size: 15px;
        font-weight: 500;
      }
    }
    .g-table {
      width: 85vw;
      margin-bottom: 8px;

      .van-col {
        text-align: center;
        color: #a4a69b;
        height: 34px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .table_name {
          color: #a5a5c1;
        }
      }

      .u-num {
        color: #ffd85a;
        font-size: 15px;
        font-weight: 500;
      }
      .u-state {
        position: relative;
        .u-alert {
          color: #edd221;
          position: absolute;
          width: 32px;
          display: block;
          top: 8px;
          left: 56px;
        }
      }
    }
    .user_but {
      width: 115px;
      height: 27px;
      border: 1px solid #edd221;
      border-radius: 13px;
      color: #edd221;
      line-height: 27px;
      text-align: center;
      margin-top: 12px;
    }
  }

  .g-tutorial-ct {
    position: relative;
    width: 375px;
    margin-top: 30px;
    height: 429px;
    background-image: url("../assets/images/YGbgct4.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    flex-direction: column;
    display: flex;
    align-items: center;
    .small_coup {
      color: #ffd85a;
      font-weight: 500;
      margin-top: 60px;
    }
    .tutorial_title {
      color: #c5d7fa;
      font-size: 17px;
      height: 17px;
      font-weight: 500;
      margin-bottom: 20px;
      margin-top: 24px;
    }
    .g_img_ct {
      display: flex;
      align-items: center;
      .steps {
        width: 70px;
        height: 70px;
        display: block;
      }
      .arrow {
        width: 46px;
        height: 34px;
        display: block;
        margin-top: -15px;
      }
    }
    .steps_text {
      font-weight: 500;
      color: #ffffd1;
      width: 116px;
      text-align: center;
    }
  }

  .g-best {
    width: 226px;
    height: 52px;
    margin: 58px auto 18px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    font-size: 12px;
    color: #f7d99d;
    line-height: 22px;
    text-align: center;
  }
}
</style>
