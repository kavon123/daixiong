<!--  -->
<template>
  <transition>
    <div class="but_pop" @touchmove.prevent @click.prevent>
      <div class="title" :style="'height:'+height+'px'"></div>
      <swiper
        @slideChange="onChange"
        :options="swipertop"
        class="swipe"
        ref="Swiper"
        v-if="itemCode ==='YG_SHARE_URL'"
      >
        <swiper-slide class="item">
          <div class="swipe_img img_1" ref="capture1_YG">
            <div class="qrcode1" id="qrcode1_YG"></div>
          </div>
        </swiper-slide>
        <swiper-slide class="item">
          <div class="swipe_img img_2" ref="capture2_YG">
            <div class="qrcode2" id="qrcode2_YG"></div>
          </div>
        </swiper-slide>
        <swiper-slide class="item">
          <div class="swipe_img img_3" ref="capture3_YG">
            <div class="qrcode3" id="qrcode3_YG"></div>
          </div>
        </swiper-slide>
      </swiper>
      <swiper @slideChange="onChange" :options="swipertop" class="swipe" ref="Swiper" v-else>
        <swiper-slide class="item">
          <div class="swipe_img img_a" ref="capture1_58">
            <div class="qrcode_a" id="qrcode1_58"></div>
          </div>
        </swiper-slide>
        <swiper-slide class="item">
          <div class="swipe_img img_b" ref="capture2_58">
            <div class="qrcode_b" id="qrcode2_58"></div>
          </div>
        </swiper-slide>
        <swiper-slide class="item">
          <div class="swipe_img img_c" ref="capture3_58">
            <div class="qrcode_c" id="qrcode3_58"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="copy_text">
        {{copyText}}
        <br />
        {{momentsUrl}}
      </div>
      <div class="copy_but">文案已复制到剪切板，记得粘贴哦</div>
      <div>
        <img class="share_img" src="./shareImg.png" alt @click="fnShare" />
      </div>
      <div class="cancel" :style="'height: '+BotHeight+'px;'" @click="closeFn">取消</div>
    </div>
  </transition>
</template>

<script>
import Html2canvas from "html2canvas";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";
import { setTimeout } from "timers";

export default {
  props: {
    closeFn: {
      type: Function,
      default: () => {}
    },
    copyText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      swipertop: {
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1.3,
        spaceBetween: 20
      },
      activeIndex: 0,
      height: 0,
      BotHeight: 45
    };
  },
  computed: {
    ...mapGetters(["momentsUrl", "isIOS", "itemCode"])
  },
  mounted() {
    const h = window.screen.height;
    this.height = (h - 667) / 2 + 32;
    if (h >= 812) {
      this.BotHeight = 35 + 45;
    }
    this.$nextTick(() => {
      let ids = ["qrcode1_58", "qrcode2_58", "qrcode3_58"];
      if (this.itemCode === "YG_SHARE_URL") {
        ids = ["qrcode1_YG", "qrcode2_YG", "qrcode3_YG"];
      }
      ids.forEach(item => {
        this.qrcode(document.getElementById(item), item);
      });
    });
  },
  methods: {
    onChange(index) {
      this.activeIndex = this.$refs.Swiper.swiper.activeIndex;
    },
    fnBook() {
      this.$emit("close", "butPopShow", false);
      this.$emit("close", "inviteShow", true);
    },
    fnClose() {
      this.$emit("close", "butPopShow", false);
    },
    qrcode($div, key) {
      let qrcode = new QRCode(key, {
        width: $div.clientWidth,
        height: $div.clientHeight, // 高度
        correctLevel: QRCode.CorrectLevel.M,
        text: this.momentsUrl
      });
    },
    fnShare() {
      const _this = this;
      let refs = ["capture1_58", "capture2_58", "capture3_58"];
      if (this.itemCode === "YG_SHARE_URL") {
        refs = ["capture1_YG", "capture2_YG", "capture2_YG"];
      }
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const HTML = _this.$refs[refs[_this.activeIndex]];

      Html2canvas(HTML, {
        allowTaint: true
      })
        .then(canvas => {
          let url = canvas.toDataURL("image/png");
          if (_this.isIOS) {
            _this.$bridge.callhandler(
              "DX_save_share_Image",
              { type: "share", image: url, shareType: 2 },
              data => {
                if (data == 1) {
                  this.closeFn();
                }
              }
            );
          } else {
            const data = android.DX_save_share_Image(
              JSON.stringify({
                type: "share",
                image: url,
                shareType: 2
              })
            );
            if (data == 1) {
              this.closeFn();
            }
          }
        })
        .catch(err => {
          this.$toast.fail(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.but_pop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    padding-bottom: 8px;
  }
  .swipe {
    width: 100%;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      .swipe_img {
        width: calc(300px * 0.95);
        height: calc(426px * 0.95);
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        .qrcode1 {
          width: 105px;
          height: 105px;
          position: absolute;
          left: 90px;
          top: 286px;
        }
        .qrcode2 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 317px;
        }
        .qrcode3 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 18px;
          top: 322px;
        }
        .qrcode_a {
          width: 65px;
          height: 65px;
          position: absolute;
          left: 111px;
          top: 318px;
        }
        .qrcode_b {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 317px;
        }
        .qrcode_c {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 322px;
        }
      }
      .img_1 {
        background-image: url("./swipe1.png");
      }
      .img_2 {
        background-image: url("./swipe2.png");
      }
      .img_3 {
        background-image: url("./swipe3.png");
      }
      .img_a {
        background-image: url("./swipeA.png");
      }
      .img_b {
        background-image: url("./swipeB.png");
      }
      .img_c {
        background-image: url("./swipeC.png");
      }
    }
  }
  .cancel {
    position: absolute;
    background: #fff;
    bottom: 0;
    color: #999;
    height: 45px;
    width: 100%;
    line-height: 45px;
    text-align: center;
  }
  .copy_text {
    width: 294px;
    color: #eceaff;
    font-size: 13px;
    line-height: 18px;
    padding: 22px 0 10px 0;
  }
  .copy_but {
    width: 210px;
    height: 32px;
    background: rgba(230, 226, 255, 1);
    border-radius: 8px;
    color: #5e539d;
    text-align: center;
    line-height: 32px;
    margin-bottom: 6px;
  }
  .share_img {
    width: 218px;
    height: 52px;
  }
}
</style>