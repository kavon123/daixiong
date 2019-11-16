



<template>
  <div class="win" @touchmove.prevent>
    <div class="conten">
      <div class="title">规则说明</div>
      <p>1、团队中完成任务的人数越多奖励越高；</p>
      <!-- <div class="tab">
        <div>
          <img src="@/assets/images/×1men.png" alt />
          <span>队长奖励 X 1.0</span>
          <span>队员奖励 X 1.0</span>
        </div>
        <div>
          <img src="@/assets/images/×3men.png" alt />
          <span>队长奖励 X 1.6</span>
          <span>队员奖励 X 1.3</span>
        </div>
        <div>
          <img src="@/assets/images/×5men.png" alt />
          <span>队长奖励 X 2.0</span>
          <span>队员奖励 X 1.5</span>
        </div>
      </div>-->
      <!-- <p>2、奖励金发送规则： 若我的奖励为2.0倍，则用户总领取的奖励金额为2*2.0=4元，其中包含2元基础任务奖励，2元团队任务奖励。</p> -->
      <p>
        2、奖励金发送规则：
        <br />邀请一人完成任务，队长奖励24000；
        <br />邀请二人完成任务，队长奖励48000；
        <br />邀请三人完成任务，队长奖励78000；
        <br />邀请四人完成任务，队长奖励120000；
      </p>
      <p>
        3、团队任务时间为48小时，48小时内邀请好友加入团队，并提交58棋牌分享任务，即视为组队成功；在以下两种情况下队伍会自动结束：
        <br />a、队伍中所有人均已完成任务。
        <br />b、队伍倒计时结束。
      </p>
      <p>4、团队任务在自动结束之前，队长可手动提前结束，奖励金截止当前金额，即视为组队成功，本次队伍结束后，系统将自动创建新的队伍，队伍创建次数不限。</p>
      <p>5、队伍中所有人均可邀请新队员。</p>
      <p>6、每个人最多只能成为一次队员，成为队长次数不限。</p>
    </div>
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
  created() {},
  mounted() {},
  computed: {},
  methods: {
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
    margin-top: 120px;
    width: 300px;
    // height: 422px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 1);
    padding: 26px 20px 30px 20px;
    .title {
      text-align: center;
      font-size: 17px;
      font-weight: 400;
      height: 24px;
      line-height: 24px;
    }
    img {
      width: 100%;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      font-family: 微软雅黑;
      color: #7f463f;
      b {
        font-weight: 400;
        color: #977b78;
      }
    }
    .tab {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        img {
          width: 53px;
          height: 53px;
        }
        span {
          line-height: 18px;
          font-size: 12px;
          font-weight: 400;
          font-style: normal;
          text-decoration: none;
          font-family: 微软雅黑;
          color: #7f463f;
        }
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