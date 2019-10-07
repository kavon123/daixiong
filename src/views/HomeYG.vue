<template>
  <div class="home" :class="{overflow:inviteShow}">
    <m-bar :text="barString" />
    <div class="g-ct">
      <div class="u-but" @click="fnJump(ygUserinfo.loginUrl)">了解YG电竞</div>
      <div class="g-rules-ct">
        <div class="u-rules_text">
          1.好友通过您分享的链接注册YG电竞，进入游戏5分钟，您即可获得5元佣金。
          <br />邀请奖励在本页面提现
        </div>
        <div class="u-rules_text">
          2.邀请的好友投注您还可获得返佣奖励，每万元最高返佣70元，详见
          <span @click="fnJump(ygUserinfo.commissionUrl)">返佣说明</span>
          <br />返佣奖励需在“YG电竞”中提现
        </div>
      </div>
      <div class="g-sum-ct">
        <div class="m-user">
          <van-icon name="user-o" color="#EBB84E" />
          <template v-if="!bIsLogin">
            <span class="u-user">{{ygUserinfo.userId}}</span>
            <van-icon name="wap-nav" color="#ffee2e" @click="fnPop('generateShow',true)" />
          </template>
          <template v-else>
            <span class="u-user" @click="fnPop('loginShow',true)">登录</span>
          </template>
        </div>
        <div class="m-sum-ct">
          <div class="sum_item">
            <div class="u-title">邀请奖励</div>
            <div class="sum_item_ct">
              <img class="sum_gold" src="@/assets/images/gold.png" alt />
              <div class="sum_num">
                <span>{{ygUserinfo.externalBalance}}</span>元
              </div>
              <div class="sum_add">累计已获得{{ygUserinfo.externalTotalAmount}}元</div>
            </div>
            <div class="sum_but">
              <img
                :class="{gray:DX_Draw_Money}"
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
                <span>{{ygUserinfo.dxUserBalance && ygUserinfo.dxUserBalance.balance?ygUserinfo.dxUserBalance.balance:'0'}}</span>元
              </div>
              <div
                class="sum_add"
              >累计已获得{{ygUserinfo.dxUserBalance && ygUserinfo.dxUserBalance.sumCommision?ygUserinfo.dxUserBalance.sumCommision:'0'}}元</div>
            </div>
            <div class="sum_but">
              <img src="@/assets/images/withdrawal.png" @click="fnYGWithdrawal" />
            </div>
          </div>
        </div>
      </div>
      <div class="g-user-list" v-if="totalSize">
        <van-row type="flex" class="g-table_head">
          <van-col span="6">用户名</van-col>
          <van-col span="6">收益</van-col>
          <van-col span="6">日期</van-col>
          <van-col span="5">状态</van-col>
        </van-row>
        <van-row type="flex" class="g-table" v-for="(row,i) in lists" :key="i">
          <van-col span="6">
            <div class="table_name">{{row.name}}</div>
          </van-col>
          <van-col span="6" class="u-num">{{row.amount}}元</van-col>
          <van-col span="6">{{row.time}}</van-col>
          <van-col span="5" class="u-state">
            {{row.status==2?"已发放":"未游戏"}}
            <span
              class="u-alert"
              v-if="row.status!=2"
              @click="fnOpen"
            >提醒</span>
          </van-col>
        </van-row>
        <div class="user_but" @click="fnPromoteList" v-if="totalSize>6">
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
      <div class="g-best" :style="'height:'+paddingB+'px'">
        <img src="@/assets/images/best.png" alt @click="fnShowButPop" />
      </div>
      <footer class="footer">本页面由YG电竞提供</footer>
    </div>
    <m-YG v-if="generateShow" @close="fnPop" />
    <m-login v-if="loginShow" @fnInfoAll="fnInfoAll" @close="fnPop" />
    <m-rele-err v-if="errShow" @info="fnInfo" @close="fnPop" />
    <m-rele-suc v-if="sucShow" :name="ygUserinfo.userId" @close="fnPop" />
    <m-best v-if="bestShow" @close="fnPop" />
    <m-withdrawal v-if="withdrawal" @close="fnPop" />
    <m-but-pop v-if="butPopShow" @close="fnPop" />
    <m-win-pop v-if="winShow" type="YG" @close="fnPop" />
    <m-qrcode type="YG" v-if="qrcodeShow" @close="fnPop" />
    <m-invite v-if="inviteShow" @close="fnPop" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getDate } from "@/util/methods.js";
import $api from "@/util/api.js";
import mBar from "@/components/m-bar";
import mYG from "@/components/m-generate/yg";
import mLogin from "@/components/m-login";
import mReleSuc from "@/components/m-rele/success";
import mReleErr from "@/components/m-rele/error";
import mBest from "@/components/m-best";
import mWithdrawal from "@/components/m-withdrawal";
import mButPop from "@/components/m-but-pop";
import mWinPop from "@/components/m-win-pop";
import mQrcode from "@/components/m-qrcode";
import mInvite from "./Invite/Invite";
import promoteList from "./promoteList";
import relativeList from "./relativeList";

export default {
  components: {
    mInvite,
    mQrcode,
    mWinPop,
    mButPop,
    mBar,
    mYG,
    mLogin,
    mReleSuc,
    mReleErr,
    mBest,
    mWithdrawal
  },
  data() {
    return {
      inviteShow: false,
      butPopShow: false,
      winShow: false,
      qrcodeShow: false,
      sucShow: false,
      loginShow: false,
      withdrawal: false,
      first: false,
      bestShow: false,
      generateShow: false,
      errShow: false,
      bIsLogin: true,
      totalSize: 0,
      lists: [],
      paddingB: 72
    };
  },
  created() {
    console.log(this.$route)
    this.fngetUserFriend();
    this.fnInfo();
    this.setPlatformType(2);
    const h = window.screen.height;
    if (h >= 812) {
      this.paddingB = 72 + 35;
    }
  },
  computed: {
    ...mapGetters(["ygUserinfo", "barString", "isIOS"]),
    DX_Draw_Money() {
      return (
        this.bIsLogin ||
        !this.ygUserinfo.externalBalance ||
        this.ygUserinfo.externalBalance == 0
      );
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO_YG",
      setBarString: "SET_BAR_STRING",
      setPlatformType: "SET_PLATFORM_TYPE"
    }),
    fnYGWithdrawal() {
      this.fnJump(this.ygUserinfo.loginUrl);
    },
    fnPop(key, vla) {
      this[key] = vla;
    },
    fnWithdrawal() {
      if (this.DX_Draw_Money) return;
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { source: 2 },
          data => {
            this.fnWithdrawalReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ source: 2 })
        );
        this.fnWithdrawalReq(data);
      }
    },
    fnWithdrawalReq(data) {
      $api
        .postRequest("/user/v3/userCashExternalRedPackage", data)
        .then(res => {
          if (res.code === 0) {
            this.withdrawal = true;
            const oUserinfo = Object.assign(this.ygUserinfo, {
              externalBalance: 0
            });
            this.setUserInfo(oUserinfo);
          } else {
            if (res.msg) {
              this.$toast.fail(res.msg);
            }
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },

    fnPromoteList() {
      this.$router.push("/promote");
    },
    fnShowButPop() {
      if (this.bIsLogin) {
        this.fnInfo();
      } else {
        this.butPopShow = true;
      }
    },
    fnInfo() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner"
      });
      if (this.isIOS) {
        console.log("开始向苹果发送数据")
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { loginType: 2 },
          data => {
            console.log("收到请求")
            this.fnInfoReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ loginType: 2 })
        );
        this.fnInfoReq(data);
      }
    },
    fnInfoReq(data) {
      $api
        .postRequest("/user/v3/loginYg", data)
        .then(res => {
          this.fnInfoAll();
          if (res.code === 0) {
            const oUserinfo = Object.assign(this.ygUserinfo, res.datas);
            this.setUserInfo(oUserinfo);
            this.bIsLogin = false;
            // 1 新注册(新生成) , 2新绑定 3 老账户
            if (res.datas.hasBind == 2) {
              this.sucShow = true;
            }
          } else {
            if (res.msg) {
              this.$toast.fail(res.msg);
            }
          }
        })
        .catch(err => {
          this.$toast.clear();
          this.errShow = true;
        });
    },
    fnInfoAll() {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_encryptionRequest", {}, data => {
          this.fnInfoAllReq(data);
        });
      } else {
        const data = android.DX_encryptionRequest({});
        this.fnInfoAllReq(data);
      }
    },
    fnInfoAllReq(data) {
      $api
        .postRequest("/external/friend/getYgDatas", data)
        .then(res => {
          this.$toast.clear();
          if (res.code === 0) {
            const oUserinfo = Object.assign(this.ygUserinfo, res.datas);
            let list = res.datas.dxRankingAHundred.map(item => {
              return `YG代理 ${item.userId} 刚刚提现了 ${parseInt(
                item.sumMoney
              )} 元！               `;
            });
            const text = list.join("");
            this.setBarString(text);
            this.setUserInfo(oUserinfo);
            if (this.ygUserinfo.hasBind == 1) {
              this.generateShow = true;
            }
          } else {
            if (res.msg) {
              this.$toast.fail(res.msg);
            }
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    fnJump(url) {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_gotoBrowser", url);
      } else {
        android.DX_gotoBrowser(url);
      }
    },
    fngetUserFriend() {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          {
            source: 2,
            page: 1,
            size: 5
          },
          data => {
            this.fngetUserFriendReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({
            source: 2,
            page: 1,
            size: 5
          })
        );
        this.fngetUserFriendReq(data);
      }
    },
    fngetUserFriendReq(data) {
      $api
        .postRequest("/user/v3/searchUserFriendPage", data)
        .then(res => {
          if (res.code === 0) {
            res.datas.infoList = res.datas.infoList.map(item => {
              item.time = getDate(item.createdDate);
              return item;
            });
            this.totalSize = res.datas.totalSize;
            this.lists = res.datas.infoList;
          } else {
            if (res.msg) {
              this.$toast.fail(res.msg);
            }
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    fnOpen() {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_openWX_QQ_58", { type: "WX" }, data => {
          if (data == 0) {
            this.$toast.fail(`未安装微信!请安装`);
          }
        });
      } else {
        const data = android.DX_openWX_QQ_58(JSON.stringify({ type: "WX" }));
        if (data == 0) {
          this.$toast.fail(`未安装微信!请安装`);
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
.overflow {
  height: 100vh;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
}
.g-ct {
  overflow: hidden;
  margin-top: -30px;
  width: 375px;
  background-image: url("../assets/images/YGbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
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
      display: flex;
      justify-content: center;
      align-items: center;
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
    margin-bottom: 20px;
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
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 72px;
    background: #19142b;
    img {
      width: 226px;
      height: 52px;
    }
  }
  .footer {
    width: 100vw;
    font-size: 12px;
    color: #f7d99d;
    line-height: 35px;
    text-align: center;
    height: 35px;
    background: #19142b;
    text-align: center;
    margin-bottom: 105px;
  }
}
</style>
