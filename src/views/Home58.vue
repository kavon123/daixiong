<template>
  <div class="home"
       :class="{overflow:inviteShow}">
    <m-bar :text="barString" />
    <div class="g-ct">
      <div class="u-but"
           @click="fnJump">了解58棋牌</div>
      <div class="g-rules-ct">
        <div class="u-title">代理规则</div>
        <div class="u-rules_text">
          1. 无需您下载，好友通过您分享的链接下载并注册58棋牌，游戏5分钟，您即可获得5元奖励。
          <br />邀请奖励在本页面提现
        </div>
        <div class="u-rules_text">
          2. 邀请的好友投注您还可获得返佣奖励，每万元最高返佣70元。
          <br />返佣奖励需在“58棋牌”中提现
        </div>
      </div>
      <div class="g-sum-ct">
        <div class="m-user">
          <van-icon name="user-o"
                    color="#EBB84E" />
          <template v-if="!bIsLogin">
            <span class="u-user">{{oUserinfo.userId}}</span>
            <van-icon name="wap-nav"
                      color="#ffee2e"
                      @click="fnPop('generateShow',true)" />
          </template>
          <template v-else>
            <span class="u-user"
                  @click="fnInfo">登录</span>
          </template>
        </div>
        <div class="m-sum-ct">
          <div class="sum_item">
            <div class="u-title">邀请奖励</div>
            <div class="sum_item_ct">
              <img class="sum_gold"
                   src="@/assets/images/gold.png"
                   alt />
              <div class="sum_num">
                <span>{{oUserinfo.externalBalance}}</span>元
              </div>
              <div class="sum_add">累计已获得{{oUserinfo.externalTotalAmount}}元</div>
            </div>
            <div class="sum_but">
              <img :class="bIsLogin || !oUserinfo.externalBalance?'gray':''"
                   src="@/assets/images/transfer.png"
                   @click="fnWithdrawal" />
            </div>
          </div>
          <div class="sum_item">
            <div class="u-title">返佣奖励</div>
            <div class="sum_item_ct">
              <img class="sum_golds"
                   src="@/assets/images/golds.png"
                   alt />
              <div class="sum_num">
                <span>{{oUserinfo.balance}}</span>元
              </div>
              <div class="sum_add">累计已获得{{oUserinfo.commision}}元</div>
            </div>
            <div class="sum_but">
              <img @click="fn58Withdrawal"
                   src="@/assets/images/withdrawal.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="g-user-list"
           v-if="totalSize">
        <div class="u-title">我的邀请</div>
        <van-row type="flex"
                 class="g-table_head">
          <van-col span="6">用户名</van-col>
          <van-col span="6">收益</van-col>
          <van-col span="6">日期</van-col>
          <van-col span="5">状态</van-col>
        </van-row>

        <van-row type="flex"
                 class="g-table"
                 v-for="(item,i) in lists"
                 :key="i">
          <van-col span="6">{{item.mobile}}</van-col>
          <van-col span="6"
                   class="u-num">{{item.amount}}元</van-col>
          <van-col span="6">{{item.time}}</van-col>
          <van-col span="5"
                   class="u-state">
            {{item.status==2?"已发放":"未游戏"}}
            <span class="u-alert"
                  v-if="item.status!=2"
                  @click="fnOpen">提醒</span>
          </van-col>
        </van-row>

        <div class="user_but"
             @click="fnPromoteList"
             v-if="totalSize>7">
          更多
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="g-tutorial-ct">
        <div class="u-title">如何赚钱</div>
        <div class="small_coup"
             @click="fnPop('bestShow',true)">推广小妙招</div>
        <div class="tutorial_title">如何获得邀请奖励？</div>
        <div class="g_img_ct">
          <img class="steps"
               src="@/assets/images/58steps1.png"
               alt />
          <img class="arrow"
               src="@/assets/images/arrow.png"
               alt />
          <img class="steps"
               src="@/assets/images/58steps2.png"
               alt />
          <img class="arrow"
               src="@/assets/images/arrow.png"
               alt />
          <img class="steps"
               src="@/assets/images/58steps3.png"
               alt />
        </div>
        <div class="g_img_ct">
          <div class="steps_text">邀请好友</div>
          <div class="steps_text">好友玩5分钟游戏</div>
          <div class="steps_text">获得奖励</div>
        </div>
        <div class="tutorial_title">如何获得返佣奖励？</div>
        <div class="g_img_ct">
          <img class="steps"
               src="@/assets/images/58steps1.png"
               alt />
          <img class="arrow"
               src="@/assets/images/arrow.png"
               alt />
          <img class="steps"
               src="@/assets/images/58steps2.png"
               alt />
        </div>
        <div class="g_img_ct">
          <div class="steps_text">邀请的好友投注</div>
          <div class="steps_text">您获得返佣</div>
        </div>
      </div>
      <div v-if="!switchs.showShareBox"
           class="g-best"
           :style="'height:'+paddingB+'px'">
        <img src="@/assets/images/best.png"
             @click="fnShowButPop" />
      </div>
      <div v-if="switchs.showShareBox"
           class="g-best">
        <bottom-share :btShareOpt="btShareOpt"
                      @finishShare="finishShare"></bottom-share>
      </div>
      <img class="single-img"
           v-if="switchs.showShareBox"
           src="@/assets/images/best.png"
           @click="fnShowButPop" />
      <footer class="footer">本页面由58棋牌提供</footer>
    </div>
    <div class="chest-box"
         v-if="switchs.showChest">
      <div v-if="chestStatus==1"
           class="s-box can-open"
           @click="openChest"></div>
      <div v-if="chestStatus==3"
           class="s-box has-open">
        <span class="count-box">{{ chestCount }}</span>
      </div>
    </div>
    <van-popup v-model="switchs.showPop">
      <chest-modal v-if="hasGetShareOpt" 
                   @closeBoxDialog="switchs.showPop=false"
                   :redPackageId="redPackageId"
                   :boxAmount="boxAmount"
                   :btShareOpt="btShareOpt"
                   :chestChildTask="chestChildTask"></chest-modal>
    </van-popup>
    <m-58 v-if="generateShow"
          @close="fnPop" />
    <m-rele-suc v-if="sucShow"
                :name="oUserinfo.userId"
                @close="fnPop" />
    <m-rele-err v-if="errShow"
                @info="fnInfo"
                @close="fnPop" />
    <m-best v-if="bestShow"
            @close="fnPop" />
    <m-withdrawal v-if="withdrawal"
                  @close="fnPop" />
    <m-but-pop v-if="butPopShow"
               @close="fnPop" />
    <m-win-pop v-if="winShow"
               type="58"
               @close="fnPop" />
    <m-qrcode type="58"
              v-if="qrcodeShow"
              @close="fnPop" />
    <m-invite v-if="inviteShow"
              @close="fnPop" />
    <m-download v-if="mDownloadShow"
                :downloadUrl="oUserinfo.downloadUrl"
                @close="fnPop" />
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
import mInvite from "./Invite/Invite58";
import mDownload from "@/components/m-download";
import { callAppMethod, formatSeconds } from "@/util/tools.js"
import bottomShare from "@/components/bottom-share/index.vue";
import chestTask from "@/components/chest-task/index.vue";
import chestModal from "./components/chest-modal/index.vue"
export default {
  components: {
    mInvite,
    mBar,
    m58,
    mReleSuc,
    mReleErr,
    mBest,
    mWithdrawal,
    mButPop,
    mWinPop,
    mQrcode,
    mDownload,
    bottomShare,
    chestModal,
  },
  data () {
    return {
      mDownloadShow: false,
      inviteShow: false,
      totalSize: 0,
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
      paddingB: 72,
      itemCode: "",
      chestStatus: 0,
      switchs: {
        showShareBox: false,
        showPop: false,
        showChest: false
      },
      chestCount: "",
      btShareOpt: {
        shareTxt: "",
        shareUrl: ""
      },
      hasGetShareOpt: false,
      redPackageId: "",
      boxAmount: 0,
      chestChildTask: []
    };
  },
  computed: {
    ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  created () {
    this.fnGetUrl();
    this.fnGetBar();
    this.fngetUserFriend();
    this.fnInfo();
    this.fnGetItemCode()
    const h = window.screen.height;
    if (h >= 812) {
      this.paddingB = 35 + this.paddingB;
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER",
      setBarString: "SET_BAR_STRING"
    }),
    fnPop (key, vla) {
      this[key] = vla;
    },
    fnWithdrawal () {
      if (this.bIsLogin || !this.oUserinfo.externalBalance) return;
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { source: 1 },
          data => {
            this.fnWithdrawalReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ source: 1 })
        );
        this.fnWithdrawalReq(data);
      }
    },
    fnWithdrawalReq (data) {
      $api
        .postRequest("/user/v3/userCashExternalRedPackage", data)
        .then(res => {
          if (res.code === 0) {
            this.withdrawal = true;
            const oUserinfo = Object.assign(this.oUserinfo, {
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
    fn58Withdrawal () {
      if (this.isIOS) {
        this.mDownloadShow = true;
        // this.$bridge.callhandler("DX_openWX_QQ_58", { type: "58" }, data => {
        //   if (data == 0) {
        //     this.$toast.fail(`未安装58棋牌!请安装`);
        //   }
        // });
      } else {
        const code = android.DX_openWX_QQ_58(JSON.stringify({ type: "58" }));
        if (code == 0) {
          this.mDownloadShow = true;
        }
      }
    },
    fnPromoteList () {
      this.$router.push("/promote");
    },
    fnJump () {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_gotoBrowser", this.oUserinfo.downloadUrl);
      } else {
        android.DX_gotoBrowser(this.oUserinfo.downloadUrl);
      }
    },
    fnInfo () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner"
      });
      if (this.isIOS) {
        this.$bridge.callhandler("DX_encryptionRequest", {}, data => {
          this.fnInfoReq(data);
        });
      } else {
        const data = android.DX_encryptionRequest({});
        this.fnInfoReq(data);
      }
    },
    fnInfoReq (data) {
      $api
        .postRequest("/user/v3/login58", data)
        .then(res => {
          this.$toast.clear();
          if (res.code === 0) {
            const oUserinfo = Object.assign(this.oUserinfo, res.datas);
            this.setUserInfo(oUserinfo);
            this.bIsLogin = false;
            //hasBind 0 新注册(新生成) ,1新绑定 2 老账户
            if (res.datas.hasBind == 0) {
              this.generateShow = true;
            } else if (res.datas.hasBind == 1) {
              this.sucShow = true;
            }
          } else {
            if (res.msg) {
              this.$toast.fail(res.msg);
            }
          }
        })
        .catch(err => {
          this.errShow = true;
          this.$toast.clear();
        });
    },
    fngetUserFriend () {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          {
            source: 1,
            page: 1,
            size: 6
          },
          data => {
            this.fngetUserFriendReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({
            source: 1,
            page: 1,
            size: 6
          })
        );
        this.fngetUserFriendReq(data);
      }
    },
    fngetUserFriendReq (data) {
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

    fnGetBar () {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_encryptionRequest", {}, data => {
          this.fnGetBarReq(data);
        });
      } else {
        const data = android.DX_encryptionRequest({});
        this.fnGetBarReq(data);
      }
    },
    fnGetBarReq (data) {
      $api
        .postRequest("/external/friend/search58CommisionRecord", data)
        .then(res => {
          if (res.code === 0 && res.datas) {
            let list = res.datas.map(item => {
              return `58代理 ${item.userId} 刚刚提现了 ${item.obtainCommision} 元！               `;
            });
            const barString = list.join("");
            this.setBarString(barString);
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
    fnGetUrl () {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_encryptionRequest", {}, data => {
          this.fnGetUrlReq(data);
        });
      } else {
        const data = android.DX_encryptionRequest({});
        this.fnGetUrlReq(data);
      }
    },
    fnGetUrlReq (data) {
      $api
        .postRequest("/external/friend/getUnderstandUrl58", data)
        .then(res => {
          if (res.code === 0) {
            const oUserinfo = Object.assign(this.oUserinfo, {
              url: res.datas
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
    fnShowButPop () {
      if (this.bIsLogin) {
        this.fnInfo();
      } else {
        this.butPopShow = true;
      }
    },
    fnOpen () {
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
    },
    fnGetItemCode () {
      this.itemCode = this.$route.query.itemCode
      console.log("进入initial ", this.itemCode)
      var appParam = { classCode: "EXTERNAL_SHARE_URL", itemCode: this.itemCode }
      if (this.itemCode == "58_BOX_SHARE_URL") {
        callAppMethod("DX_encryptionRequest", appParam, this.getShareUrl)
        appParam = { taskConfigCode: "TreasureBox58" }
        callAppMethod("DX_encryptionRequest", appParam, this.getChestStatus)
      }
      else if (this.itemCode == "58_BASK_SHARE_URL" || this.itemCode == "58_SIGN_SHARE_URL") {
        callAppMethod("DX_encryptionRequest", appParam, this.getShareUrl)
      }
    },
    getShareUrl (data) {
      $api
        .postRequest("/lookup/searchLookupItem", data)
        .then(res => {
          if (res.code == 0) {
            console.log("拿到了分享文本", res.datas)
            this.btShareOpt.shareTxt = res.datas[0].attribute1
            this.btShareOpt.shareUrl = res.datas[0].attribute1
            callAppMethod("DX_copy", this.btShareOpt.shareTxt)
            this.hasGetShareOpt = true
            this.switchs.showShareBox = true
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    getChestStatus (data) {
      $api
        .postRequest("/user/task/v3/searchTaskDetailByCode", data)
        .then(res => {
          if (res.code == 0) {
            console.log("收到宝箱任务状态", res.datas)
            this.switchs.showChest = true
            if (res.datas.status == 3) {
              let seconds = res.datas.countdown
              this.startchestCount(seconds)
            }else{
            this.chestStatus = res.datas.status
            }
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    startchestCount (seconds) {
      let actSec = parseInt(seconds)
      let _this = this
      actCount()
      function actCount () {
        let timer = setTimeout(() => {
          _this.chestCount = formatSeconds(actSec)
          _this.chestStatus = 3
          if (actSec > 0) {
            actSec--
            actCount()
            clearTimeout(timer)
            timer = null
          } else {
            clearTimeout(timer)
            _this.chestCount = "--:--:--"
            setTimeout(() => {
              let appParam = { taskConfigCode: "TreasureBox58" }
              callAppMethod("DX_encryptionRequest", appParam, _this.getChestStatus)
            }, 2000)
          }
        }, 1000)
      }
    },
    openChest () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner"
      });
      let appParam = {
        taskConfigCode: "TreasureBox58"
      }
      callAppMethod("DX_encryptionRequest", appParam, this.beginChestTask)
    },
    beginChestTask (data) {
      $api
        .postRequest("/user/task/executeTask", data)
        .then(res => {
          if (res.code == 0) {
            console.log("收到宝箱主要任务", res.datas)
            this.redPackageId = res.datas.redPackageIdStr
            this.boxAmount = res.datas.amount
            let appParam = {
              taskConfigCode: "TreasureBox58",
              status: "on"
            }
            callAppMethod("DX_encryptionRequest", appParam, this.getChestChildTask)
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    getChestChildTask (data) {
      $api
        .postRequest("/task/config/searchChildrenTaskInfo", data)
        .then(res => {
          if (res.code == 0) {
            console.log("收到宝箱任务子列表", res.datas)
            this.$toast.clear();
            this.reWriteTaskList(res.datas)
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    reWriteTaskList (list) {
      let newList = []
      list.map((v, k) => {
        if (v.status == "on") {
          newList.push(v)
        }
      })
      this.chestChildTask = newList
      console.log("生产了新数组", this.chestChildTask)
      this.switchs.showPop = true;
      let appParam = { taskConfigCode: "TreasureBox58" }
      callAppMethod("DX_encryptionRequest", appParam, this.getChestStatus)
    },
    finishShare () {
      console.log("收到分享成功的emit了")
      if (this.itemCode == "58_BASK_SHARE_URL") {
        let appParam = { taskConfigCode: "BaskRedPackage58" }
        callAppMethod("DX_encryptionRequest", appParam, this.baskRedPackage)
      }
    },
    baskRedPackage (data) {
      $api
        .postRequest("/user/task/v3/baskRedPackage", data)
        .then(res => {
          if (res.code == 0) {
            console.log("提交了晒富并收到请求", res.datas)
          } 
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
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
      display: flex;
      justify-content: center;
      align-items: center;
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
    margin-bottom: 20px;
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
        height: 50px;
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
  .single-img {
    width: 226px;
    height: 52px;
    display: block;
    margin: 0 auto;
  }
  .g-best {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    width: 100vw;
    // height: 72px;
    background: #1e0500;
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
    background: #1e0500;
    text-align: center;
    margin-bottom: 100px;
  }
}
.chest-box {
  position: fixed;
  top: 396px;
  right: 15px;
  width: 67px;
  height: 63px;
  .s-box {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 105px;
  }
  .can-open {
    background: url("./image/can-open.png") no-repeat;
    background-size: 100% 100%;
  }
  .has-open {
    background: url("./image/has-open.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
