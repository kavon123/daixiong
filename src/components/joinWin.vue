



<template>
  <div class="win" @touchmove.prevent>
    <ul class="conten">
      <li class="title">加入队伍</li>
      <li>请粘贴好友的邀请链接：</li>
      <!-- <li>还差一人就开奖！加入队伍，立即瓜分40元红包！提现秒到！立刻来瓜分：https://mobile.umeng.com/platform/5d09b8b83fc19509f100102e</li> -->
      <li>
        <!-- <div>还差一人就开奖！加入队伍，立即瓜分50元红包！提现秒到！立刻来瓜分：https://mobile.umeng.com/platform/5d09b8b83fc19509f100102e</div> -->
        <textarea name class="text"></textarea>
      </li>
      <li>
        <p>1. 加入队伍功能，每个用户仅可使用一次，使用后请创建新队伍来领取奖励</p>
        <p>2. 用户使用加入队伍功能，只能领取1次奖励，成功领取奖励后，加入功能消失。</p>
      </li>

      <li>
        <div @click="join()">确定加入</div>
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
      parms: ""
    };
  },
  props: ["parentmsg"],
  components: {
    ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  created() {  
  },
  mounted() {},
  computed: {},
  methods: {   
    join() {
      let str = document.getElementsByClassName("text")[0].value;
      console.log(str);
      let Id = str.split("teamId=")[1];
      let parm = "";
      const classCode =
        this.platformType === 2 ? "WECHAT_POSTER_YG" : "WECHAT_POSTER_58";
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode, teamId: Id },
          data => {
            parm = data;
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ classCode, teamId: Id })
        );
        parm = data;
      }
      $api
        .postRequest("/user/task/v6/add58TeamMember", parm)
        .then(res => {
          if (res.code == 0) {
            this.$toast.success("加入成功");
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail("加入失败!");
        });
    },
    sendMsg() {
      this.$emit("func");
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
    margin-top: 98px;
    width: 300px;
    height: 422px;
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
      width: 238px;
      height: 110px;
      margin-bottom: 21px;
      border-radius: 5px;
      border: 1px solid rgba(229, 229, 229, 1);
      padding: 10px;
      .text {
        width: 100%;
        height: 100%;
        font-size: 13px;
        font-weight: 400;
        color: #888888;
        line-height: 18px;
        text-indent: 0;
        // word-wrap: break-word;
        border: 0;
      }
    }
    li:nth-child(4) {
      p {
        color: #fe4562;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
    li:nth-child(5) {
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