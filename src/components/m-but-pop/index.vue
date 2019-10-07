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
        <swiper-slide class="item" v-for="(item,index) in listImg_yg" :key="item.itemId">
          <div class="swipe_img" :style="'background-image: url('+item.attribute1+')'">
            <img :src="item.attribute1" alt="">
            <div :class="'qrcode_'+index" :id="'qrcode'+index+'_YG'"></div>
          </div>
        </swiper-slide>
      </swiper>
      <swiper @slideChange="onChange" class="swipe" ref="Swiper" :options="swipertop" v-else>
        <swiper-slide class="item" v-for="(item,index) in listImg_58" :key="item.itemId">
          <div class="swipe_img" :style="'background-image: url('+item.attribute1+')'">
            <img :src="item.attribute1" alt="">
            <div :class="'qrcode58_'+index" :id="'qrcode'+index+'_58'"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="tishi">截屏海报去分享{{testData}}</div>
      <div class="choose" :style="'height:'+height+'px;'">
        <div class="title" @click="fnBook">分享至到通讯录</div>
        <!-- <div class="items">
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
        </div>-->
        <div class="cancel" @click="fnClose">取消</div>
      </div>
    </div>
  </transition>
</template>

<script>
import $api from "@/util/api.js";
import Html2canvas from "html2canvas";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      testData:"",
      listImg_58: [],
      listImg_yg: [],
      swipertop: {
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1.3,
        spaceBetween: 20
      },
      activeIndex: 0,
      height: 100
    };
  },
  computed: {
    ...mapGetters(["oUserinfo", "ygUserinfo", "platformType", "isIOS"])
  },
  mounted() {
    this.getImg();
    const h = window.screen.height;
    if (h >= 812) {
      this.height = 135;
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
        this.platformType === 2 ? "WECHAT_POSTER_YG" : "WECHAT_POSTER_58";
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
            if (this.platformType === 2) {
              this.listImg_yg = res.datas;
               console.log("this.listImg_yg")
            console.log(this.listImg_yg)
            } else {
              this.listImg_58 = res.datas;
              console.log("this.listImg_58")
            console.log(this.listImg_58)
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
      if (this.platformType === 2) {
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
      let urlArr = url.split("?");
      urlArr[1] = urlArr[1]
        ? urlArr[1] + "&time=" + new Date().getTime()
        : "time=" + new Date().getTime();

      let qrcode = new QRCode(key, {
        width: $div.clientWidth,
        height: $div.clientHeight, // 高度
        correctLevel: QRCode.CorrectLevel.M,
        text: urlArr.join("?")
      });
      this.$toast.clear();
    }
    // fnShare(shareType) {
    //   const _this = this;
    //   let ids = ["qrcode0_58", "qrcode1_58", "qrcode2_58"];
    //   if (this.platformType === 2) {
    //     ids = ["qrcode0_YG", "qrcode1_YG", "qrcode2_YG"];
    //   }
    //   window.pageYOffset = 0;
    //   document.documentElement.scrollTop = 0;
    //   document.body.scrollTop = 0;

    //   const HTML = document.getElementById(ids[_this.activeIndex]);

    //   Html2canvas(HTML, {
    //     allowTaint: true
    //   })
    //     .then(canvas => {
    //       let url = canvas.toDataURL("image/png");
    //       if (_this.isIOS) {
    //         _this.$bridge.callhandler("DX_save_share_Image", {
    //           type: "share",
    //           image: url,
    //           shareType
    //         });
    //       } else {
    //         const data = android.DX_save_share_Image(
    //           JSON.stringify({
    //             type: "share",
    //             image: url,
    //             shareType
    //           })
    //         );
    //       }
    //     })
    //     .catch(err => {
    //       this.$toast.fail("分享失败");
    //     });
    // }
  }
};
</script>
<style lang='less' scoped>
.tishi {
  color: #5e539d;
  width: 200px;
  height: 32px;
  background: #e6e2ff;
  border-radius: 8px;
  text-align: center;
  line-height: 32px;
}
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
  flex-direction: column;
  .swipe {
    width: 100%;
    margin-top: -155px;
    height: calc(100vh - 155px);

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
        .qrcode_0 {
          width: 105px;
          height: 105px;
          position: absolute;
          left: 90px;
          top: 286px;
        }
        .qrcode_1 {
          width: 69px;
          height: 69px;
          position: absolute;
          left: 201px;
          top: 316px;
        }
        .qrcode_2 {
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
      // .img_1 {
      //   background-image: url("./swipe1.jpg");
      // }
      // .img_2 {
      //   background-image: url("./swipe2.jpg");
      // }
      // .img_3 {
      //   background-image: url("./swipe3.jpg");
      // }
      // .img_a {
      //   background-image: url("./swipeA.jpg");
      // }
      // .img_b {
      //   background-image: url("./swipeB.jpg");
      // }
      // .img_c {
      //   background-image: url("./swipeC.jpg");
      // }
    }
  }
  .choose {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    height: 100px;
    background: #fff;
    bottom: 0;
    animation: myfirst 0.4s;

    .title {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #000;
      line-height: 20px;
      margin: 12px 0;
    }

    // .items {
    //   display: flex;
    //   justify-content: space-around;
    //   align-items: center;
    //   margin-bottom: 10px;
    //   .item {
    //     width: 90px;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    //     .img_ct {
    //       width: 53px;
    //       height: 47px;
    //       display: flex;
    //       justify-content: center;
    //       align-items: flex-end;
    //       margin-bottom: 6px;
    //       img {
    //         width: 45px;
    //         height: 45px;
    //       }
    //       .last {
    //         width: 53px;
    //         height: 47px;
    //       }
    //     }
    //   }
    // }
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
    bottom: -100px;
  }
  to {
    bottom: 0;
  }
}
</style>