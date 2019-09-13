<!--  -->
<template>
  <transition>
    <div class="but_pop" @touchmove.prevent @click.prevent>
      <div class="title">选中海报前往分享</div>
      <van-swipe @change="onChange" class="swipe" v-if="platformType ===2 ">
        <van-swipe-item class="item">
          <div class="swipe_img img_1" ref="capture1">
            <div class="qrcode1" id="qrcode1"></div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="item">
          <div class="swipe_img img_2" ref="capture2">
            <div class="qrcode2" id="qrcode2"></div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="item">
          <div class="swipe_img img_3" ref="capture3">
            <div class="qrcode3" id="qrcode3"></div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <van-swipe @change="onChange" class="swipe" v-else indicator-color="#4c38d8">
        <van-swipe-item class="item">
          <div class="swipe_img img_a" ref="capture1">
            <div class="qrcode_a" id="qrcode1"></div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="item">
          <div class="swipe_img img_b" ref="capture2">
            <div class="qrcode_b" id="qrcode2"></div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="item">
          <div class="swipe_img img_c" ref="capture3">
            <div class="qrcode_c" id="qrcode3"></div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="copy_text">
        YG电竞顶级代理招募中，长按图片识别图中的二维码，即可加入YG电竞，领取188元新手红包！
        <br />>www.baidu.com
      </div>
      <div class="copy_but">文案已复制到剪切板，记得粘贴哦</div>
      <div>
        <img class="share_img" src="./shareImg.png" alt />
      </div>
      <div class="cancel" @click="closeFn">取消</div>
    </div>
  </transition>
</template>

<script>
import domtoimage from "dom-to-image";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  props: {
    closeFn: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
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
      const div = document.getElementById("qrcode1");
      const div1 = document.getElementById("qrcode2");
      const div2 = document.getElementById("qrcode3");
      this.qrcode(div, "qrcode1");
      this.qrcode(div1, "qrcode2");
      this.qrcode(div2, "qrcode3");
    });
  },
  methods: {
    onChange(index) {
      this.activeIndex = index;
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
        text: "http://baidu.com"
      });
    },
    fnShare(shareType) {
      const _this = this;
      const refs = ["capture1", "capture2", "capture3"];
      domtoimage.toJpeg(_this.$refs[refs[_this.activeIndex]]).then(dataUrl1 => {
        domtoimage
          .toJpeg(_this.$refs[refs[_this.activeIndex]])
          .then(dataUrl2 => {
            if (_this.isIOS) {
              _this.$bridge.callhandler(
                "DX_save_share_Image",
                { type: "share", image: dataUrl2, shareType },
                data => {
                  if (data == 1) {
                    this.$emit("close", "winShow", true);
                    this.$emit("close", "butPopShow", false);
                  }
                }
              );
            } else {
              console.log("Android");
            }
          });
      });
    }
  }
};
</script>
<style lang="less">
.van-swipe {
  overflow: visible;
}
.swipe {
  .van-swipe__indicators {
    bottom: -20px;
  }
  .van-swipe__indicator {
    width: 12px;
    height: 12px;
  }
}
</style>
<style lang='less' scoped>
.but_pop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    // padding-top: 14px;
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
          width: 105;
          height: 105;
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
  // .choose {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   width: 100%;
  //   position: absolute;
  //   height: 182px;
  //   background: #fff;
  //   bottom: 0;
  //   animation: myfirst 0.4s;

  //   .title {
  //     height: 20px;
  //     font-size: 14px;
  //     font-weight: 400;
  //     color: #000;
  //     line-height: 20px;
  //     margin: 16px 0 12px;
  //   }
  //   .items {
  //     display: flex;
  //     justify-content: space-around;
  //     align-items: center;
  //     margin-bottom: 10px;
  //     .item {
  //       width: 90px;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: center;
  //       align-items: center;
  //       .img_ct {
  //         width: 53px;
  //         height: 47px;
  //         display: flex;
  //         justify-content: center;
  //         align-items: flex-end;
  //         margin-bottom: 6px;
  //         img {
  //           width: 45px;
  //           height: 45px;
  //         }
  //         .last {
  //           width: 53px;
  //           height: 47px;
  //         }
  //       }
  //     }
  //   }
  // }
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