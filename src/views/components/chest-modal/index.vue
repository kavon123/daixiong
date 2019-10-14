<template>
  <div class="chest-modal">
    <div class="main-body">
      <div class="main-title">宝箱红包&nbsp;&nbsp;<img class="title-icon"
             :src="require('./image/step_open_'+currentIndex+'.png')"
             alt="">&nbsp;&nbsp;奖励到账</div>
      <div class="main-steps">
        <div v-for="(v,k) in chestChildTask"
             :key="k"
             class="item-box">
          <div class="icon-box">
            <img v-if="k==0||k<=currentIndex"
                 :src="require('./image/step_open_'+k+'.png')"
                 alt="">
            <img v-if="k>0&&k>currentIndex"
                 :src="require('./image/step_'+k+'.png')"
                 alt="">
          </div>
          <div class="arr-box"
               v-if="k<chestChildTask.length-1">
            <img v-if="k==0||k<=currentIndex"
                 src="./image/step_open_forward.png"
                 alt="">
            <img v-if="k>0&&k>currentIndex"
                 src="./image/step_forward.png"
                 alt="">
          </div>
        </div>
      </div>
      <div class="main-award display-flex"><b>+&nbsp;</b>
        <span class="large-txt"
              v-if="currentIndex===0">{{ boxAmount }}</span>
        <span class="large-txt"
              v-if="currentIndex>0">{{chestChildTask[currentIndex-1].amount}}</span>&nbsp;红包券</div>
      <div class="main-text">
        <div v-if="currentIndex>=chestChildTask.length-1"
             class="text-title">本轮奖励 100% 领取完成</div>
        <div v-else
             class="text-title">文案已自动复制</div>
        <div v-if="currentIndex>=chestChildTask.length-1"
             class="text-img">
        </div>
        <div v-else
             class="text-body" v-html="btShareOpt.shareTxt">
        </div>
      </div>
      <div class="main-btn display-flex flex-center"
           @click="shareToApp"
           v-html="chestChildTask[currentIndex].description"></div>
      <!-- <div class="modal-msg">
        <span class="large-txt" v-if="currentIndex>0"> +{{chestChildTask[currentIndex-1].amount}}</span>
        <span class="large-txt" v-if="currentIndex===0">{{ boxAmount }}</span>
        红包券</div> -->
      <!-- <div class="modal-btn"
           @click="shareToApp">
        {{chestChildTask[currentIndex].description}}
      </div> -->
    </div>
    <div class="close-box"
         @click="closeBoxDialog"></div>
  </div>
</template>

<script>
import { callAppMethod } from "@/util/tools.js"
import { mapGetters } from "vuex";
import $api from "@/util/api.js";
export default {
  data () {
    return {
      currentIndex: 0,
      canPostTask: true,
      lastGoUrl: ""
    }
  },
  computed: {
    ...mapGetters(["isIOS"])
  },
  props: {
    chestChildTask: {
      type: Array,
      default: () => {
        return []
      }
    },
    btShareOpt: {
      type: Object,
      default: () => {
        return {
          shareTxt: "",
          shareUrl: ""
        }      }
    },
    redPackageId: {
      type: String,
      default: ""
    },
    boxAmount: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    let length = this.chestChildTask.length
    this.lastGoUrl = this.chestChildTask[length - 1].attribute1
    let description = `体验产品，最多领取<b style="color:#700000;font-size:20px;">188</b>元新手红包`
    this.chestChildTask.push({ description })
    this.chestChildTask.map((v, k) => {
      if (v.taskConfigCode == "TreasureBox58WXPYQ" || v.taskConfigCode == "TreasureBox58WX") {
        v.comParam = { type: "WX" }
        v.command = "DX_openWX_QQ_58"
      } else if (v.taskConfigCode == "TreasureBox58QQ" || v.taskConfigCode == "TreasureBoxQQKJ") {
        v.command = "DX_openWX_QQ_58"
        v.comParam = { type: "QQ" }
      } else {
        v.command = "DX_openSMS"
        v.comParam = {
          number: "",
          content: this.btShareOpt.shareTxt
        }
      }
    })
    console.log("子组件新数组", this.chestChildTask)
  },
  methods: {
    shareToApp () {
      if (this.canPostTask) {
        this.canPostTask = false
        if ((this.currentIndex < this.chestChildTask.length - 1)) {
          let currentVal = this.chestChildTask[this.currentIndex]
          callAppMethod(currentVal.command, currentVal.comParam, this.goToCurrTask)
        } else if (this.currentIndex == this.chestChildTask.length - 1) {
          if (this.isIOS) {
            callAppMethod("DX_gotoBrowser", this.lastGoUrl)
          } else {
            android["DX_gotoBrowser"](this.lastGoUrl);
          }
          this.$emit("closeBoxDialog")
        }
      }
    },
    goToCurrTask () {
      console.log("分享成功，进入调用任务接口")
      if (this.currentIndex < this.chestChildTask.length - 1) {
        let appParam = {
          taskConfigCode: this.chestChildTask[this.currentIndex].taskConfigCode,
          redPackageId: this.redPackageId        }
        console.log("开始子任务数据", appParam)
        callAppMethod("DX_encryptionRequest", appParam, this.postTask)
      }
    },
    postTask (data) {
      $api
        .postRequest("/user/task/treasureBoxChildrenTask", data)
        .then(res => {
          this.canPostTask = true
          if (res.code == 0) {
            console.log("任务提交成功")
            setTimeout(() => { this.currentIndex++ }, 800)
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.canPostTask = true
          this.$toast.fail(err.message);
        });
    },
    closeBoxDialog () {
      this.$emit("closeBoxDialog")
    }
  }
}
</script>

<style lang='less' scoped>
.chest-modal {
  width: 311px;
  .large-txt {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 49px;
  }
  .main-body {
    width: 100%;
    height: 488px;
    background: url("./image/modal-bg.png") no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    padding-top: 28px;
    .modal-title {
      color: #ffffff;
      margin-top: 150px;
    }
    .modal-msg {
      margin-top: 43px;
      color: #ffffff;
    }
    .modal-btn {
      margin-top: 42px;
      background: url("./image/modal-btn.png") no-repeat;
      background-size: 100% 100%;
      width: 210px;
      height: 45px;
      color: rgb(254, 117, 4);
      display: flex;
      justify-content: center;
      padding-top: 10px;
      font-size: 14px;
    }
    .main-title {
      height: 44px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      .title-icon {
        width: 44px;
        height: 44px;
      }
    }
    .main-steps {
      margin-top: 62px;
      display: flex;
      .item-box {
        display: flex;
        img {
          width: 100%;
          height: 100%;
        }
        .icon-box {
          height: 34px;
          width: 34px;
          margin-left: 2px;
          margin-right: 2px;
        }
        .arr-box {
          margin-top: 6px;
          height: 8px;
          width: 16px;
        }
      }
    }
    .main-award {
      margin-top: 23px;
      height: 75px;
      width: 240px;
      background: url("./image/quan.png") no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
      font-size: 22px;
      justify-content: center;
      align-items: baseline;
      line-height: 80px;
    }
    .main-text {
      margin-top: 42px;
      .text-title {
        font-size: 15px;
        text-align: center;
      }
      .text-body {
        height: 98px;
        padding: 0 20px;
        color: #999999;
        white-space: pre-line;
      }
      .text-img {
        width: 184px;
        height: 34px;
        background: url("./image/more-award.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }
    .main-btn {
      width: 270px;
      height: 44px;
      background: rgba(240, 109, 4, 1);
      box-shadow: 0px 2px 7px 0px rgba(240, 109, 4, 0.19);
      border-radius: 22px;
      color: #ffffff;
      font-size: 15px;
    }
  }
  .close-box {
    width: 40px;
    height: 40px;
    background: url("./../../../assets/images/close-btn.png") no-repeat;
    background-size: 100% 100%;
    margin: 10px auto;
  }
}
</style>
