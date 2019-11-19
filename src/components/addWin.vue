



<template>
  <div class="win" @touchmove.prevent>
    <ul class="conten">
      <li class="title">{{parentmsg.addTitle}}</li>
      <li>请复制邀请文案，并前往社交网站粘贴</li>
      <!-- <li>还差一人就开奖！加入队伍，立即瓜分40元红包！提现秒到！立刻来瓜分：https://mobile.umeng.com/platform/5d09b8b83fc19509f100102e</li> -->
      <li v-if="parentmsg.addTitle!='提醒队友'" class="stText">{{parentmsg.msg}}</li>
      <li
        v-if="parentmsg.addTitle=='提醒队友'"
        class="stText"
      >{{`亲，做完任务就开奖！快发完朋友圈提交任务，一起瓜分50元！${parentmsg.msg.substr(parentmsg.msg.indexOf("h") )}`}}</li>
      <li>推荐使用以下邀请方式:</li>
      <li>
        <div class="iconList">
          <div>
            <img src="@/assets/scol/wx.png" alt />
            <span>微信好友</span>
          </div>
          <div>
            <img src="@/assets/scol/puq.png" alt />
            <span>朋友圈</span>
          </div>
          <div>
            <img src="@/assets/scol/qq.png" alt />
            <span>QQ好友</span>
          </div>
          <div>
            <img src="@/assets/scol/momo.png" alt />
            <span>短信</span>
          </div>
          <div>
            <img src="@/assets/scol/wb.png" alt />
            <span>微博</span>
          </div>
          <div>
            <img src="@/assets/scol/tiktok.png" alt />
            <span>抖音</span>
          </div>
          <div>
            <img src="@/assets/scol/qt.png" alt />
            <span>陌陌</span>
          </div>
          <div>
            <img src="@/assets/scol/tb.png" alt />
            <span>贴吧</span>
          </div>
        </div>
      </li>
      <li>
        <div @click="copy()">复制文案</div>
      </li>
    </ul>
    <div class="closeBtn">
      <img src="@/assets/scol/close.png" alt @click="sendMsg" />
    </div>
  </div>
</template>


<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      parms: "",
      isIOS: this.$store.state.isIOS
    };
  },
  props: ["parentmsg"],
  components: {
    // ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    sendMsg() {
      // 按钮的点击事件
      this.$emit("func"); // 调用父组件传递过来的方法，同时把数据传递出去
    },
    copy() {
      let ele = document.getElementsByClassName("stText")[0];
      let msg = ele.innerText;
      if (this.isIOS) {
        this.$bridge.callhandler("getRouseApp", {}, data => {
          // console.log(data, "获取跳转参数");
          msg = `${msg}&appleID=${data.appleID}&schemes=${data.schemes}`;
          this.$bridge.callhandler("DX_copy", msg, data => {
            if (data == 1) {
              this.$toast.success("复制成功！");
            }
          });
        });
      } else {
        let userInfo = android.getUserInfo();//获取当前用户信息
        let userInfoObj = JSON.parse(userInfo);
        // console.log(userInfoObj,"+++++++++");
        msg += `&inviteUserId=${userInfoObj.userID}`;
        const data = android.DX_copy(msg);
        if (data == 1) {
          this.$toast.success("复制成功！");
        }
      }
    }
  }
};
</script>


<style lang='less' scoped>
.win {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .conten {
    margin: auto;
    margin-top: 160px;
    width: 300px;
    // height: 422px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 1);
    padding: 26px 31px 30px 31px;
    .title {
      text-align: center;
      font-size: 17px;
      font-weight: 400;
      height: 24px;
      line-height: 24px;
    }
    li:nth-child(2) {
      margin: 13px 0 4px 0;
      color: #333333;
      font-size: 14px;
      font-weight: 400;
    }
    li:nth-child(3) {
      color: #888888;
      font-size: 13px;
      font-weight: 400;
      width: 238px;
      height: 90px;
      line-height: 18px;
      word-wrap: break-word;
      margin-bottom: 21px;
    }
    li:nth-child(4) {
      font-size: 14px;
      color: #333;
      font-weight: normal;
      line-height: 20px;
      height: 20px;
    }
    li:nth-child(5) {
      .iconList {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-content: flex-start;
        flex-wrap: wrap;
        div {
          margin-top: 15px;
          width: 25%;
          text-align: center;
          img {
            width: 38px;
            height: 38px;
            // border: 1px dashed #888;
            padding: 4px;
            display: block;
            margin: auto;
          }
          span {
            color: #555555;
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
    li:nth-child(6) {
      margin-top: 18px;
      div {
        margin: auto;
        height: 40px;
        width: 140px;
        text-align: center;
        line-height: 40px;
        background: #367dfd;
        color: #fff;
        font-size: 15px;
        font-weight: 400;
        border-radius: 5px;
      }
    }
  }
  .closeBtn {
    text-align: center;
    margin-top: 10px;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
}
</style>