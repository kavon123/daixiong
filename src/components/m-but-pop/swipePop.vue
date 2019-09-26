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
        <swiper-slide class="item" v-for="(item,index) in listImg_yg" :key="item.itemId">
          <div class="swipe_img" :style="'background-image: url('+item.attribute1+')'">
            <div :class="'qrcode'+index" :id="'qrcode'+index+'_YG'"></div>
          </div>
        </swiper-slide>
      </swiper>
      <swiper @slideChange="onChange" :options="swipertop" class="swipe" ref="Swiper" v-else>
        <swiper-slide class="item" v-for="(item,index) in listImg_58" :key="item.itemId">
          <div class="swipe_img" :style="'background-image: url('+item.attribute1+')'">
            <div :class="'qrcode58_'+index" :id="'qrcode'+index+'_58'"></div>
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
import $api from "@/util/api.js";
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
      listImg_58: [],
      listImg_yg: [],
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
    this.getImg();
    const h = window.screen.height;
    this.height = (h - 667) / 2 + 32;
    if (h >= 812) {
      this.BotHeight = 35 + 45;
    }
  },
  methods: {
    getImg() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      const classCode =
        this.itemCode === "YG_SHARE_URL"
          ? "WECHAT_POSTER_YG"
          : "WECHAT_POSTER_58";
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode },
          data => {
            this.getImgReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ classCode })
        );
        this.getImgReq(data);
      }
    },
    getImgReq(data) {
      $api
        .postRequest("/lookup/searchLookupItem", data)
        .then(res => {
          if (res.code === 0) {
            res.datas.sort((a, b) => a.order - b.order);
            if (this.itemCode === "YG_SHARE_URL") {
              this.listImg_yg = res.datas;
            } else {
              this.listImg_58 = res.datas;
            }
            this.GenerateQrCode();
          } else {
            if (res.msg) {
              this.$toast.fail(res.msg);
            }
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    GenerateQrCode() {
      let ids = ["qrcode0_58", "qrcode1_58", "qrcode2_58"];
      if (this.itemCode === "YG_SHARE_URL") {
        ids = ["qrcode0_YG", "qrcode1_YG", "qrcode2_YG"];
      }
      if (!document.getElementById(ids[0])) {
        setTimeout(() => {
          this.GenerateQrCode();
        }, 10);
      } else {
        ids.forEach(item => {
          this.qrcode(document.getElementById(item), item);
        });
      }
    },
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
      console.log($div);
      let qrcode = new QRCode(key, {
        width: $div.clientWidth,
        height: $div.clientHeight, // 高度
        correctLevel: QRCode.CorrectLevel.M,
        text: this.momentsUrl
      });
      this.$toast.clear();
    },
    fnShare() {
      const _this = this;
      let ids = ["qrcode0_58", "qrcode1_58", "qrcode2_58"];
      if (this.itemCode === "YG_SHARE_URL") {
        ids = ["qrcode0_YG", "qrcode1_YG", "qrcode2_YG"];
      }

      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const HTML = document.getElementById(ids[_this.activeIndex]);

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
        .qrcode0 {
          width: 105px;
          height: 105px;
          position: absolute;
          left: 90px;
          top: 286px;
        }
        .qrcode1 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 316px;
        }
        .qrcode2 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 18px;
          top: 321px;
        }
        .qrcode58_0 {
          width: 65px;
          height: 65px;
          position: absolute;
          left: 111px;
          top: 318px;
        }
        .qrcode58_1 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 322px;
        }
        .qrcode58_2 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 200px;
          top: 316px;
        }
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