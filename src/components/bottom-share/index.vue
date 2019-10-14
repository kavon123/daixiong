<template>
  <div class="share-bottom">
    <div class="share-txt-box">
      <span>文案已复制至粘贴板，前往粘贴</span>
      <span style="color:#367DFD" @click="showPop=true">查看文案</span>
    </div>
    <div class="share-line"></div>
    <div class="share-btn-box">
      <div class="btn-item"
           v-for="(v,k) in btnList"
           :key="k"
           @click="copyAndOpen(v,k)">
        <div class="item-img">
          <img :src="v.icon"
               alt="">
        </div>
        <div class="item-title">{{v.name}}</div>
      </div>
    </div>
    <van-popup v-model="showPop">
      <div class="modal-doc">
        <div class="doc-main">
          <div class="main-title">复制文案</div>
          <div class="main-text" v-html="btShareOpt.shareTxt"></div>
          <div class="main-btn" @click="showPop=false">确定</div>
        </div>
        <div class="close-box"
             @click="showPop=false"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { callAppMethod } from "@/util/tools.js"

export default {
  data () {
    return {
      btnList: [],
      showPop: false
    }
  },
  props: {
    btShareOpt: {
      type: Object,
      default: () => {
        return {
          shareTxt: "",
          shareUrl: ""
        }      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.createBtnList()
    },
    createBtnList () {
      this.btnList = [{
        name: "微信分享",
        appParam: {
          type: "WX"
        },
        command: "DX_openWX_QQ_58",
        icon: require("./image/share_wechat.png")
      }, {
        name: "朋友圈",
        appParam: {
          type: "WX"
        },
        command: "DX_openWX_QQ_58",
        icon: require("./image/share_pyq.png")
      }, {
        name: "QQ邀请",
        appParam: {
          type: "QQ"
        },
        command: "DX_openWX_QQ_58",
        icon: require("./image/share_qq.png")
      }, {
        name: "短信",
        appParam: {
          number: "",
          content: this.btShareOpt.shareTxt
        },
        command: "DX_openSMS",
        icon: require("./image/share_msg.png")
      }]
    },
    copyAndOpen (v, k) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, 
        loadingType: "spinner"
      });
      callAppMethod(v.command, v.appParam, this.finishShare)
    },
    finishShare(){
      this.$toast.clear();
      this.$emit("finishShare")
    },
    testSaveImg(){
       callAppMethod("DX_saveImages", ["http://www.comwv.com/uploads/20191012/26cf634e264014dcd5562875171fbd5b.jpg","http://www.comwv.com/uploads/20191012/26cf634e264014dcd5562875171fbd5b.jpg","http://www.comwv.com/uploads/20191012/26cf634e264014dcd5562875171fbd5b.jpg","http://www.comwv.com/uploads/20191012/26cf634e264014dcd5562875171fbd5b.jpg"], this.finishSave)
    },
    finishSave(){
      console.log("存储成功")
    }
  }
}
</script>

<style lang='less' scoped>
.share-bottom {
  width: 100%;
  background: #ffffff;
  .share-txt-box {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 0 25px;
    color: #818CA0;
    font-size: 14px;
  }
  .share-line {
    width: 100%;
    height: 3px;
    background: rgba(249, 249, 249, 1);
  }
  .share-btn-box {
    width: 100%;
    display: flex;
    .btn-item {
      flex: 1;
      height: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item-title {
        padding-top: 1px;
      }
      .item-img {
        width: 38px;
        height: 38px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .modal-doc {
    width: 300px;
    .doc-main {
      height: 240px;
      background: #ffffff;
      border-radius: 9px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .main-title {
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        padding-top: 25px;
      }
      .main-text {
        height: 118px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        padding: 12px 25px 2px 25px;
        white-space: pre-line;
      }
      .main-btn {
        text-align: center;
        line-height: 40px;
        width: 140px;
        height: 40px;
        font-size: 17px;
        background: rgba(54, 125, 253, 1);
        border-radius: 5px;
        color: #ffffff;
      }
    }
    .close-box {
      width: 40px;
      height: 40px;
      background: url("./../../assets/images/close-btn.png") no-repeat;
      background-size: 100% 100%;
      margin: 10px auto;
    }
  }
}
</style>
