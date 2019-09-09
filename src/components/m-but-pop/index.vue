<!--  -->
<template>
  <transition>
    <div class="but_pop">
      <van-swipe @change="onChange" class="swipe" :show-indicators="false" :width="375">
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
      <div class="choose">
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
        <div class="cancel" @click="fnClose" :style="'margin-bottom:'+height+'px;'">取消</div>
      </div>
    </div>
  </transition>
</template>

<script>
import domtoimage from "dom-to-image";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      activeIndex: 0,
      height: 0
    };
  },
  computed: {
    ...mapGetters(["oUserinfo", "ygUserinfo", "platformType"])
  },
  mounted() {
    const h = window.screen.height;
    if (h >= 812) {
      this.height = 35;
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
        text: url
      });
    },
    fnShare(shareType) {
      const _this = this;
      const refs = ["capture1", "capture2", "capture3"];
      domtoimage.toJpeg(_this.$refs[refs[_this.activeIndex]]).then(dataUrl => {
        _this.$bridge.callhandler(
          "DX_save_share_Image",
          { type: "share", image: dataUrl, shareType },
          data => {
            if (data == 1) {
              this.$emit("close", "winShow", true);
              this.$emit("close", "butPopShow", false);
            }
          }
        );
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
  background: rgba(0, 0, 0, 0.5);
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
        .qrcode1 {
          width: calc(110px * 0.95);
          height: calc(110px * 0.95);
          position: absolute;
          left: calc(50% - 52px);
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
      margin-bottom: 30px;
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