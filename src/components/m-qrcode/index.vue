<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent>
        <div class="dialog_ct" :class="type==='58'?'dialog_ct_58':'dialog_ct_yg'">
          <div class="title">扫描二维码，注册{{type==='58'?'58':"YG"}}电竞领取现金</div>
          <div id="qrcode" class="qrcode"></div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["oUserinfo", "ygUserinfo", "platformType"])
  },
  mounted() {
    this.$nextTick(() => {
      this.qrcode();
    });
  },
  methods: {
    fnClose() {
      this.$emit("close", "qrcodeShow", false);
    },
    qrcode() {
      const url =
        this.platformType === 1
          ? this.oUserinfo.downloadUrl
          : this.ygUserinfo.ygSharedUrl;
      const $div = document.getElementById("qrcode");
      let qrcode = new QRCode("qrcode", {
        width: $div.clientWidth,
        height: $div.clientHeight, // 高度
        text: url
      });
    }
  }
};
</script>
<style lang='less' scoped>
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .dialog_ct {
    width: 300px;
    height: 295px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    .title {
      font-size: 17px;
      color: #f9e467;
      margin: 32px 0 26px 0;
    }
    .qrcode {
      width: 160px;
      height: 160px;
      background: #fff;
      border-radius: 10px;
      padding: 10px;
    }
  }

  .dialog_ct_58 {
    background-image: url("../../assets/images/win_58.png");
  }
  .dialog_ct_yg {
    background-image: url("../../assets/images/win_yg.png");
  }

  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>