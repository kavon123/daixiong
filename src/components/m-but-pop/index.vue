<!--  -->
<template>
  <transition>
    <div class="but_pop">
      <van-swipe @change="onChange" class="swipe" :show-indicators="false" :width="375">
        <van-swipe-item class="item">
          <div class="swipe_img img_1">
            <div class="qrcode1" id="qrcode1"></div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="item">
          <div class="swipe_img img_2">
            <div class="qrcode2" id="qrcode2"></div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="item">
          <div class="swipe_img img_3">
            <div class="qrcode3" id="qrcode3"></div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="choose">
        <div class="title">分享至</div>
        <div class="items">
          <div @click="fnClose" class="item">
            <div class="img_ct">
              <img src="@/assets/images/WX.png" alt />
            </div>
            <div>微信</div>
          </div>
          <div class="item">
            <div class="img_ct">
              <img src="@/assets/images/circle.png" alt />
            </div>

            <div>朋友圈</div>
          </div>
          <div class="item">
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
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    ...mapGetters(["oUserinfo", "ygUserinfo", "platformType"])
  },
  mounted() {
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
      this.$router.push("/invite");
    },
    fnClose() {
      this.$emit("close", "butPopShow", false);
      // this.$emit("close", "qrcodeShow", true);
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
        width: 300px;
        height: 426px;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        .qrcode1 {
          width: 110px;
          height: 110px;
          position: absolute;
          left: calc(50% - 55px);
          top: 303px;
        }
        .qrcode2 {
          width: 73px;
          height: 73px;
          position: absolute;
          left: 211.5px;
          top: 332.5px;
        }
        .qrcode3 {
          width: 73px;
          height: 73px;
          position: absolute;
          left: 18px;
          top: 338px;
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