










<template>
  <div class="groupDetails_page">
    <div class="scroll_view">
      <!-- <div class="header">
        <div class="searsh">
          <input type="text" placeholder value="快来! 我已经成功提现!" />
          <img src="@/views/sharePro/img/refresh.png" alt />
        </div>
      </div>-->
      <div class="banner"></div>
      <div class="tag">简单三步, 拿现金红包</div>
      <ul class="flow">
        <li>
          <img src="@/views/sharePro/share_pc/01.png" alt class="LstIcon" />
          <span class="title">下载APP</span>
          <div class="picture">
            <img src="@/views/sharePro/share_pc/down.png" alt />
            <img src="@/views/sharePro/share_pc/1.png" alt />
            <img src="@/views/sharePro/share_pc/user.png" alt />
            <img src="@/views/sharePro/share_pc/1.png" alt />
            <img src="@/views/sharePro/share_pc/erio.png" alt />
          </div>
          <div>
            <span>下载APP</span>
            <span>注册登录</span>
            <span>打开任务面板</span>
          </div>
        </li>
        <li>
          <img src="@/views/sharePro/share_pc/02.png" alt class="LstIcon" />
          <span class="title">加入队伍</span>
          <div class="picture">
            <img src="@/views/sharePro/share_pc/join_btn.png" alt />
            <img src="@/views/sharePro/share_pc/join_copy.png" alt />
          </div>
        </li>

        <li>
          <img src="@/views/sharePro/share_pc/03.png" alt class="LstIcon" />
          <span class="title">完成任务并领钱</span>
          <div class="picture">
            <img src="@/views/sharePro/img/join_tema.png" alt />
          </div>
          <div class="state">奖励自动派发至钱包！我已经成功提现，快加入吧！</div>
        </li>
      </ul>
      <div class="footer vpaycode">
        <!-- <img src="@/views/sharePro/share_pc/RqCode.png" alt id="RqCode" /> -->
        <div id="qrcode" ref="qrcode"></div>

        <div>下载APP领钱</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import QRCode from "qrcodejs2";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      qrcode: "",
      temashow: false,
      teamList: []
    };
  },
  components: {},
  created() {
    let url = window.location.href;
    let json = {};
    var arr = url.substr(url.indexOf("?") + 1).split("&");

    arr.forEach(item => {
      var tmp = item.split("=");
      json[tmp[0]] = tmp[1];
    });
    this.newUrl = `https://da9fdhgi.com/index/download?appkey=${json.appKey}`;

    this.payOrder();
  },
  mounted() {},
  computed: {},
  methods: {
    payOrder() {
      let url = window.location.href;
      let json = {};
      var arr = url.substr(url.indexOf("?") + 1).split("&");
      arr.forEach(item => {
        var tmp = item.split("=");
        json[tmp[0]] = tmp[1];
      });
      this.innerVisible = true;
      // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
      this.qrcode = `https://da9fdhgi.com/index/download?appkey=${json.appKey}`;
      // 使用$nextTick确保数据渲染
      this.$nextTick(() => {
        this.crateQrcode();
      });
    },
    crateQrcode() {
      this.qr = new QRCode("qrcode", {
        width: 120,
        height: 120, // 高度
        text: this.qrcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      // console.log(this.qrcode)
    }
  }
};
</script>


<style lang='less' scoped>
@media screen and( min-width:750px) {
  .groupDetails_page {
    overflow-y: scroll;
    .scroll_view {
      .banner {
        background-image: url("./sharePro/share_pc/top.png");
        background-size: 100% 240px;
        background-repeat: no-repeat;
        height: 240px;
        border-bottom: 1px dashed #888888;
      }
      .tag {
        font-size: 19px;
        color: #711010;
        font-weight: bold;
        text-align: center;
        background: #f9efd0;
        padding-bottom: 10px;
      }
      .flow {
        .title {
          font-size: 17px;
          font-weight: bold;
          font-style: italic;
          color: #c83130;
          vertical-align: middle;
        }
        .LstIcon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          vertical-align: middle;
        }
        li {
          padding-left: 30%;
          .picture {
            // margin-top: 10px;
            // margin: auto;
          }
        }
        li:nth-child(1) {
          height: 186px;
          background: #f9efd0;
          div {
            img {
              vertical-align: middle;
              // border: 1px dashed #888888;
            }
            img:nth-child(2n-1) {
              width: 70px;
              height: 70px;
            }
            img:nth-child(2n) {
              width: 25px;
              height: 22px;
              margin: 0 43px;
            }
            span {
              font-size: 12px;
              color: #711010;
              font-weight: 400;
              display: inline-block;
              width: 74px;
              text-align: center;
              vertical-align: top;
            }
            span:nth-child(2) {
              margin-left: 106px;
            }
            span:nth-child(3) {
              margin-left: 106px;
            }
          }
        }
        li:nth-child(2) {
          height: 280px;
          background: #fff6da;
          .picture {
            img {
              height: 177px;
              vertical-align: middle;
              // border: 1px dashed #888888;
            }
            img:nth-child(1) {
              width: 305px;
              margin-right: 7px;
            }
            img:nth-child(2) {
              width: 246px;
            }
          }
        }
        li:nth-child(3) {
          height: 458px;
          background: #f9efd0;
          .picture {
            img {
              width: 295px;
              height: 262px;
              vertical-align: middle;
              // border: 1px dashed #888888;
            }
          }
          .state {
            line-height: 125px;
            // text-align: center;
            height: 125px;
            font-size: 20px;
            color: #7a1e15;
            font-weight: bold;
            font-style: italic;
          }
        }
      }
      .footer {
        height: 210px;
        text-align: center;
        background: #eee1ba;
        padding-top: 30px;
        #qrcode {
          margin: auto;
          border: 2px solid #fff;
          width: 125px;
          height: 125px;
          vertical-align: middle;
          // margin-top: 30px;
        }
        div {
          color: #711010;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>