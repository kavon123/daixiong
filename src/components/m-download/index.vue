<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent @click.prevent>
        <div class="dialog_ct dialog_ct_58">
          <img class="img" src="./icon.png" alt />
          <div class="centent">返佣奖励需在58棋牌中体现</div>
          <div class="but" @click="fnDownload"></div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    downloadUrl: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["isIOS"])
  },
  methods: {
    fnClose() {
      this.$emit("close", "mDownloadShow", false);
    },
    fnDownload() {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_gotoBrowser", this.downloadUrl);
      } else {
        android.DX_gotoBrowser(this.downloadUrl);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.img {
  width: 74px;
  height: 74px;
  margin-top: 28px;
}
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99;
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
    .title {
      color: #f9e467;
      font-size: 20px;
      margin: 28px 0 12px;
    }
    .centent {
      margin-bottom: 30px;
      margin-top: 18px;
      font-size: 16px;
      color: #f5ebae;
    }
    .but {
      width: 154px;
      height: 56px;
      background-image: url("./but.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      margin-top: 30px;
    }
  }
  .dialog_ct_58 {
    background-image: url("../../assets/images/win_58.png");
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>