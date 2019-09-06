<template>
  <div class="home">
    <m-bar :text="barString" />
    <div class="g-ct">
      <div class="u-but" @click="fnJump">了解58棋牌</div>
      <div class="g-rules-ct">
        <div class="u-title">代理规则</div>
        <div class="u-rules_text">
          1. 无需您下载，好友通过您分享的链接下载并注册58棋牌，游戏1分钟，您即可获得2元奖励。
          <br />邀请奖励在本页面提现
        </div>
        <div class="u-rules_text">2. 佣金模式是以一级返佣一级，每万元最高返佣70元返佣奖励需在“58棋牌”中提现</div>
      </div>
      <div class="g-sum-ct">
        <div class="m-user">
          <van-icon name="user-o" color="#EBB84E" />
          <template v-if="!bIsLogin">
            <span class="u-user">{{oUserinfo.userId}}</span>
            <van-icon name="wap-nav" color="#ffee2e" @click="fnPop('generateShow',true)" />
          </template>
          <template v-else>
            <span class="u-user" @click="fnInfo">登录</span>
          </template>
        </div>
        <div class="m-sum-ct">
          <div class="sum_item">
            <div class="u-title">邀请奖励</div>
            <div class="sum_item_ct">
              <img class="sum_gold" src="@/assets/images/gold.png" alt />
              <div class="sum_num">
                <span>{{oUserinfo.externalBalance}}</span>元
              </div>
              <div class="sum_add">累计已获得{{oUserinfo.externalTotalAmount}}元</div>
            </div>
            <div class="sum_but">
              <img
                :class="bIsLogin?'gray':''"
                src="@/assets/images/transfer.png"
                @click="fnWithdrawal"
              />
            </div>
          </div>
          <div class="sum_item">
            <div class="u-title">返佣奖励</div>
            <div class="sum_item_ct">
              <img class="sum_golds" src="@/assets/images/golds.png" alt />
              <div class="sum_num">
                <span>{{oUserinfo.balance}}</span>元
              </div>
              <div class="sum_add">累计已获得{{oUserinfo.commision}}元</div>
            </div>
            <div class="sum_but">
              <img
                @click="fn58Withdrawal"
                :class="bIsLogin?'gray':''"
                src="@/assets/images/withdrawal.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="g-user-list" v-if="lists.length">
        <div class="u-title">我的邀请</div>
        <van-row type="flex" class="g-table_head">
          <van-col span="6">用户名</van-col>
          <van-col span="6">收益</van-col>
          <van-col span="6">日期</van-col>
          <van-col span="5">状态</van-col>
        </van-row>

        <van-row type="flex" class="g-table" v-for="(item,i) in viewList" :key="i">
          <van-col span="6">{{item.mobile}}</van-col>
          <van-col span="6" class="u-num">{{item.amount}}元</van-col>
          <van-col span="6">{{item.time}}</van-col>
          <van-col span="5" class="u-state">
            {{item.state===2?"已发放":"未游戏"}}
            <span class="u-alert" v-if="item.state!==2">提醒</span>
          </van-col>
        </van-row>

        <div class="user_but" @click="fnPromoteList" v-if="lists.length>7">
          更多
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="g-tutorial-ct">
        <div class="u-title">如何赚钱</div>
        <div class="small_coup" @click="fnPop('bestShow',true)">推广小妙招</div>
        <div class="tutorial_title">如何获得邀请奖励？</div>
        <div class="g_img_ct">
          <img class="steps" src="@/assets/images/58steps1.png" alt />
          <img class="arrow" src="@/assets/images/58arrow.png" alt />
          <img class="steps" src="@/assets/images/58steps2.png" alt />
          <img class="arrow" src="@/assets/images/58arrow.png" alt />
          <img class="steps" src="@/assets/images/58steps3.png" alt />
        </div>
        <div class="g_img_ct">
          <div class="steps_text">邀请好友</div>
          <div class="steps_text">好友玩5分钟游戏</div>
          <div class="steps_text">获得奖励</div>
        </div>
        <div class="tutorial_title">如何获得返佣奖励？</div>
        <div class="g_img_ct">
          <img class="steps" src="@/assets/images/58steps1.png" alt />
          <img class="arrow" src="@/assets/images/58arrow.png" alt />
          <img class="steps" src="@/assets/images/58steps2.png" alt />
        </div>
        <div class="g_img_ct">
          <div class="steps_text">邀请的好友投注</div>
          <div class="steps_text">您获得返佣</div>
        </div>
      </div>
      <div class="g-best">
        <img src="@/assets/images/best.png" @click="fnShowButPop" />
      </div>
      <footer class="footer">本页面由YG娱乐提供</footer>
    </div>
    <m-58 v-if="generateShow" :data="oUserinfo" @close="fnPop" />
    <m-rele-suc v-if="sucShow" :name="oUserinfo.userId" @close="fnPop" />
    <m-rele-err v-if="errShow" @info="fnInfo" @close="fnPop" />
    <m-best v-if="bestShow" @close="fnPop" />
    <m-withdrawal v-if="withdrawal" @close="fnPop" />
    <m-but-pop v-if="butPopShow" @close="fnPop" />
    <m-win-pop v-if="winShow" type="58" @close="fnPop" />
    <m-qrcode type="58" v-if="qrcodeShow" @close="fnPop" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { getDate } from "@/util/methods.js";
import mBar from "@/components/m-bar";
import m58 from "@/components/m-generate/58";
import mReleSuc from "@/components/m-rele/success";
import mReleErr from "@/components/m-rele/error";
import mBest from "@/components/m-best";
import mWithdrawal from "@/components/m-withdrawal";
import mButPop from "@/components/m-but-pop";
import mWinPop from "@/components/m-win-pop";
import mQrcode from "@/components/m-qrcode";

export default {
  name: "home",
  components: {
    mBar,
    m58,
    mReleSuc,
    mReleErr,
    mBest,
    mWithdrawal,
    mButPop,
    mWinPop,
    mQrcode
  },
  data() {
    return {
      qrcodeShow: false,
      winShow: false,
      butPopShow: false,
      sucShow: false,
      withdrawal: false,
      first: false,
      bestShow: false,
      generateShow: false,
      errShow: false,
      bIsLogin: true,
      lists: [],
      barString: ""
    };
  },
  computed: {
    viewList() {
      return this.lists.slice(0, 6);
    },
    ...mapGetters(["oUserinfo"])
  },
  created() {
    this.fnGetUrl();
    this.fnGetBar();
    this.fngetUserFriend();
    this.fnInfo();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER",
      setDowUrl: "SET_DOW_URL",
      setPromoteList: "SET_PROMOTE_LIST",
      setBarString: "SET_BAR_STRING"
    }),
    fnPop(key, vla) {
      this[key] = vla;
    },
    fnWithdrawal() {
      if (this.bIsLogin) return;
      if (!this.oUserinfo.externalBalance) {
        this.$toast("余额不足！");
        return;
      }
      $api
        .postRequest("/user/v3/userCashExternalRedPackage", { source: 1 })
        .then(res => {
          if (res.code === 0) {
            this.withdrawal = true;
            const oUserinfo = Object.assign(this.oUserinfo, {
              externalBalance: 0
            });
            _this.setUserInfo(oUserinfo);
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          this.$toast(err.msg);
        });
    },
    fn58Withdrawal() {
      if (this.bIsLogin) return;
      console.log(this.oUserinfo.url);
    },
    fnPromoteList() {
      this.setPromoteList(this.lists);
      this.$router.push("/promote");
    },
    fnJump() {
      console.log(this.oUserinfo.url);
    },
    fnInfo() {
      const _this = this;
      _this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner"
      });
      $api
        .postRequest("/user/v3/login58")
        .then(res => {
          _this.$toast.clear();
          if (res.code === 0) {
            _this.setDowUrl(res.datas.downloadUrl);
            const oUserinfo = Object.assign(this.oUserinfo, res.datas);
            _this.setUserInfo(oUserinfo);
            _this.bIsLogin = false;
            // 1 新注册(新生成) , 2新绑定 3 老账户
            if (res.datas.hasBind == 1) {
              _this.generateShow = true;
            } else if (res.datas.hasBind == 2) {
              _this.sucShow = true;
            }
          } else {
            _this.errShow = true;
          }
        })
        .catch(err => {
          _this.errShow = true;
          _this.$toast.clear();
        });
    },
    fngetUserFriend() {
      $api
        .postRequest("/user/v3/searchUserFriendPage")
        .then(res => {
          if (res.code === 0) {
            res.datas.infoList = res.datas.infoList.map(item => {
              item.time = getDate(item.createdDate);
              return item;
            });
            this.lists = res.datas.infoList;
          } else {
            this.$toast(err.msg);
          }
        })
        .catch(err => {
          this.$toast(err.msg);
        });
    },
    fnGetBar() {
      $api
        .postRequest("/external/friend/search58CommisionRecord")
        .then(res => {
          if (res.code === 0) {
            let list = res.datas.map(item => {
              return `58代理 ${item.userId} 刚刚提现了 ${item.obtainCommision} 元！               `;
            });
            this.barString = list.join("");
            this.setBarString(this.barString);
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          this.$toast(err.msg);
        });
    },
    fnGetUrl() {
      $api
        .postRequest("/external/friend/getUnderstandUrl58")
        .then(res => {
          if (res.code === 0) {
            this.oUserinfo = Object.assign(this.oUserinfo, { url: res.datas });
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          this.$toast(err.msg);
        });
    },
    fnShowButPop() {
      if (this.bIsLogin) {
        this.fnInfo();
      } else {
        this.butPopShow = true;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.g-ct {
  overflow: hidden;
  margin-top: -30px;
  width: 375px;
  // height: 1995px;
  background-image: url("../assets/images/58bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
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
    margin-top: 42px;
    height: 212px;
    background-image: url("../assets/images/58bgct1.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .u-rules_text {
      width: 300px;
      font-size: 13px;
      color: #e39500;
      line-height: 21px;
      padding-bottom: 15px;
    }
    .u-rules_text:last-child {
      padding-bottom: 0;
    }
  }
  .u-title {
    color: #efc066;
    height: 20px;
    font-size: 20px;
    font-weight: bold;
    line-height: 21px;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#fff6d4),
      to(#ebb74b)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 28px;
    margin-bottom: 16px;
  }

  .g-sum-ct {
    width: 375px;
    margin-top: 30px;
    height: 313px;
    background-image: url("../assets/images/58bgct2.png");
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
        border: 1px solid #f3c376;
        background: linear-gradient(
          0deg,
          rgba(60, 17, 2, 1) 0%,
          rgba(108, 32, 5, 1) 100%
        );
        border-radius: 11px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .sum_item {
        width: 145px;
        margin-right: 10px;
        margin-left: 10px;
        .u-title {
          text-align: center;
          margin-top: 30px;
          margin-bottom: 15px;
        }
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
    margin-top: 28px;
    height: 339px;
    background-image: url("../assets/images/58bgct3.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .g-table_head {
      width: 85vw;
      margin-bottom: 16px;
      .van-col {
        text-align: center;
        color: #efc066;
        font-size: 15px;
        font-weight: 500;
      }
    }
    .g-table {
      width: 85vw;
      margin-bottom: 8px;

      .van-col {
        text-align: center;
        color: #e39500;
      }
      .u-num {
        color: #edd221;
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
          top: 0;
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
    height: 400px;
    background-image: url("../assets/images/58bgct4.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    flex-direction: column;
    display: flex;
    align-items: center;
    .small_coup {
      position: absolute;
      color: #ffee2e;
      top: 32px;
      left: 260px;
    }
    .tutorial_title {
      color: #efc066;
      font-size: 17px;
      font-weight: 500;
      margin-bottom: 15px;
      margin-top: 30px;
    }
    .g_img_ct {
      display: flex;
      .steps {
        width: 50px;
        height: 50px;
        display: block;
      }
      .arrow {
        width: 58px;
        display: block;
      }
    }
    .steps_text {
      margin-top: 12px;
      font-weight: 500;
      color: #e39500;
      width: 108px;
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
    margin-bottom: 15px;
  }
}
</style>
