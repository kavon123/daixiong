<!--  -->
<template>
  <transition>
    <div class="but_pop" @touchmove.prevent @click.prevent>
      <swiper
        @slideChange="onChange"
        :options="swipertop"
        class="swipe"
        ref="Swiper"
        v-if="platformType ===2 "
      >
        <swiper-slide class="item">
          <div class="swipe_img img_1" ref="capture1_YG">
            <div class="qrcode_1" id="qrcode1_YG"></div>
          </div>
        </swiper-slide>
        <swiper-slide class="item">
          <div class="swipe_img img_2" ref="capture2_YG">
            <div class="qrcode_2" id="qrcode2_YG"></div>
          </div>
        </swiper-slide>
        <swiper-slide class="item">
          <div class="swipe_img img_3" ref="capture3_YG">
            <div class="qrcode_3" id="qrcode3_YG"></div>
          </div>
        </swiper-slide>
      </swiper>
      <swiper @slideChange="onChange" class="swipe" ref="Swiper" :options="swipertop" v-else>
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
      <div class="choose" :style="'height:'+height+'px;'">
        <div class="title">分享至</div>
        <div class="items">
          <div class="item" @click="fnShare(1)">
            <div class="img_ct">
              <img src="@/assets/images/WX.png" alt />
            </div>
            <div>微信</div>
          </div>
          <div class="item" @click="fnShare(2)">
            <div class="img_ct">
              <img src="@/assets/images/circle.png" alt />
            </div>

            <div>朋友圈</div>
          </div>
          <div class="item" @click="fnShare(4)">
            <div class="img_ct">
              <img src="@/assets/images/QQ.png" alt />
            </div>
            <div>QQ</div>
          </div>
          <div @click="fnBook" class="item">
            <div class="img_ct">
              <img class="last" src="@/assets/images/book.png" alt />
            </div>
            <div>通讯录</div>
          </div>
        </div>
        <div class="cancel" @click="fnClose">取消</div>
      </div>
    </div>
  </transition>
</template>

<script>
import Html2canvas from "html2canvas";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      swipertop: {
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1.3,
        spaceBetween: 20
      },
      activeIndex: 0,
      height: 182
    };
  },
  computed: {
    ...mapGetters(["oUserinfo", "ygUserinfo", "platformType", "isIOS"])
  },
  mounted() {
    const h = window.screen.height;
    if (h >= 812) {
      this.height = 217;
    }
    this.$nextTick(() => {
      let ids = ["qrcode1_58", "qrcode2_58", "qrcode3_58"];
      if (this.platformType == 2) {
        ids = ["qrcode1_YG", "qrcode2_YG", "qrcode3_YG"];
      }
      ids.forEach(item => {
        this.qrcode(document.getElementById(item), item);
      });
    });
  },
  methods: {
    onChange() {
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
      const url =
        this.platformType === 1
          ? this.oUserinfo.downloadUrl
          : this.ygUserinfo.ygSharedUrl;
      let qrcode = new QRCode(key, {
        width: $div.clientWidth,
        height: $div.clientHeight, // 高度
        correctLevel: QRCode.CorrectLevel.M,
        text: url
      });
    },
    fnShare(shareType) {
      const _this = this;
      let refs = ["capture1_58", "capture2_58", "capture3_58"];
      if (this.platformType == 2) {
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
            _this.$bridge.callhandler("DX_save_share_Image", {
              type: "share",
              image: url,
              shareType
            });
          } else {
            const data = android.DX_save_share_Image(
              JSON.stringify({
                type: "share",
                image: url,
                shareType
              })
            );
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
img {
  width: 100%;
  height: 100%;
}
.but_pop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  .swipe {
    width: 100%;
    margin-top: -182px;
    height: calc(100vh - 182px);

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
        .qrcode_1 {
          width: 105px;
          height: 105px;
          position: absolute;
          left: 90px;
          top: 286px;
        }
        .qrcode_2 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 317px;
        }
        .qrcode_3 {
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
  .choose {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    height: 182px;
    background: #fff;
    bottom: 0;
    animation: myfirst 0.4s;

    .title {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #000;
      line-height: 20px;
      margin: 16px 0 12px;
    }
    .items {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
      .item {
        width: 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img_ct {
          width: 53px;
          height: 47px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          margin-bottom: 6px;
          img {
            width: 45px;
            height: 45px;
          }
          .last {
            width: 53px;
            height: 47px;
          }
        }
      }
    }
    .cancel {
      color: #999;
      height: 55px;
      width: 100%;
      border-top: 10px solid #f5f5f5;
      line-height: 45px;
      text-align: center;
    }
  }
}

@keyframes myfirst {
  from {
    bottom: -182px;
  }
  to {
    bottom: 0;
  }
}
</style>