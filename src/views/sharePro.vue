










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
      <div class="footer">
        <img src="@/views/sharePro/share_pc/RqCode.png" alt />
        <div>下载APP领钱</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      temashow: false,
      teamList: [],
      swipertop: {
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1.1,
        spaceBetween: 8,
        loop: false
      }
    };
  },
  components: {},
  created() {},
  mounted() {},
  computed: {},
  methods: {}
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
        }
        .LstIcon {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
        li {
          padding-left: 30%;
          .picture {
            margin-top: 16px;
          }
        }
        li:nth-child(1) {
          height: 186px;
          background: #f9efd0;
          div {
            img {
              vertical-align: middle;
              border: 1px dashed #888888;
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
              border: 1px dashed #888888;
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
              border: 1px dashed #888888;
            }
          }
          .state {
            line-height: 125px;
            text-align: center;
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
        img {
          width: 125px;
          height: 125px;
          vertical-align: middle;
          margin-top: 30px;          
        }
        div{
          color: #711010;
          font-size:14px;
          font-weight:bold;
        }
      }
    }
  }
}
</style>