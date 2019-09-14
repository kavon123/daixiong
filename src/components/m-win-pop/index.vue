<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent @click.prevent>
        <div class="dialog_ct" :class="type==='58'?'dialog_ct_58':'dialog_ct_yg'">
          <div class="title">短信邀请成功</div>
          <div class="centent">告知好友查看短信，可提高30%成功率哦</div>
          <div class="channel">
            <div class="item" @click="fnOpen('WX','微信')">
              <img src="@/assets/images/WX.png" />
              <div class="text_color">告知微信好友</div>
            </div>
            <div class="item" @click="fnOpen('QQ','QQ')">
              <img src="@/assets/images/QQ.png" />
              <div class="text_color">告知QQ好友</div>
            </div>
          </div>
          <div class="but" @click="fnClose"></div>
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
    type: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["isIOS"])
  },
  methods: {
    fnClose() {
      this.$emit("close", "winShow", false);
    },
    fnOpen(platform, name) {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_openWX_QQ_58",
          { type: platform },
          data => {
            if (data == 0) {
              this.$toast(`未安装${name}!请安装`);
            }
          }
        );
      } else {
        const data = android.DX_openWX_QQ_58(
          JSON.stringify({ type: platform })
        );
        if (data == 0) {
          this.$toast(`未安装${name}!请安装`);
        }
      }
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
      border-radius: 10px;
      padding: 0 36px;
      margin-bottom: 17px;
      font-size: 14px;
      font-weight: normal;
      color: #f5ebae;
      line-height: 20px;
    }
    .channel {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
          width: 45px;
          height: 45px;
          margin-bottom: 5px;
        }
        .text_color {
          color: #f5ebae;
        }
      }
    }
    .but {
      width: 154px;
      height: 56px;
      background-image: url("../../assets/images/down.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      margin-top: 30px;
    }
  }
  .dialog_ct_58 {
    background-image: url("../../assets/images/win_58.png");
  }
  .dialog_ct_yg {
    background-image: url("../../assets/images/win_yg.png");
    .centent {
      color: #c2c4ff;
    }
    .channel {
      .item {
        .text_color {
          color: #c2c4ff;
        }
      }
    }
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>