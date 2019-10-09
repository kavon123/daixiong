<template>
  <van-popup v-model="showStopAct">
      <div class="stop-act-modal">
        <div class="stop-act-body">
          <div class="body-head">
            <img src="./image/sorry.png"
                 alt="">
          </div>
          <div class="body-main">
            <div class="txt"><b>YG电竞推广员招募任务</b>优化中，暂不开放，已完成任务的用户可在此页面正常提现</div>
            <div class="txt">建议您前往完成<b> 58棋牌代理招募任务</b></div>
          </div>
          <!-- <div class="submit-btn"
               @click="goto58Task">去完成</div> -->
        </div>
        <div class="stop-act-foot">
          <div class="act-foot-close"
               @click="closeDlog"></div>
        </div>
      </div>
    </van-popup>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props:{
    showStopAct:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    closeDlog(){
      this.$emit('closeDlog')
    }
  }
}
</script>

<style>
.van-popup--center {
  background: rgba(0, 0, 0, 0);
}
.stop-act-modal {
  width: 265px;
}
.stop-act-body {
  background: url("./image/stop_modal.png") no-repeat;
  background-size: 100% auto;
  height: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stop-act-body .body-head {
  padding-top: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stop-act-body .body-head img {
  width: 128px;
  height: 28px;
}
.stop-act-body .body-main {
  margin-top: 60px;
  width: 190px;
  height: 55px;
  color: #443e61;
  font-size: 13px;
}
.stop-act-body .body-main .txt {
  padding-bottom: 3px;
  letter-spacing: 1px;
}
.stop-act-body .submit-btn {
  margin-top: 36px;
  width: 190px;
  height: 40px;
  background: url("./image/btn-prup.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  font-size: 16px;
}
.stop-act-foot {
  display: flex;
  justify-content: center;
}
.act-foot-close {
  width: 32px;
  height: 32px;
  background: url("./image/close.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
}
</style>
