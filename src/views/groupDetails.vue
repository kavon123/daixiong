




<template>
  <div class="groupDetails_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back"  @click="grouLog(true)">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">组队详情</div>
        <div class="titltBtn"></div>
      </div>
      <div class="conter">
        <ul class="date">
          <li class="date_end">
            <div class="title">结束时间</div>
            <div class="dateNumber">2019-11-31 16:30:20</div>
          </li>
          <li class="date_residue">
            <div class="number">00</div>
            <div class="icon">:</div>
            <div class="number">00</div>
            <div class="icon">:</div>
            <div class="number">00</div>
          </li>
        </ul>
        <ul class="headerMan">
          <li class="teamUser">
            <img src="@/assets/images/user.png" alt class="userImg" />
            <div class="name">dffggf</div>
            <div class="type">待审批</div>
          </li>
          <li class="parze">
            <div class="sum">
              <span>X</span>
              1.3
            </div>
            <div class="title">我的奖励</div>
          </li>
        </ul>
        <div class="temaList">
          <ul>
            <li class="temaImg">
              <img src="@/assets/images/user.png" alt />
            </li>
            <li class="name">fjjdfg</li>
            <li class="type">已经完成</li>
          </ul>
          <ul>
            <li class="temaImg">
              <img src="@/assets/images/user.png" alt />
            </li>
            <li class="name">fjjdfg</li>
            <li class="type">已经完成</li>
          </ul>
          <ul>
            <li class="temaImg">
              <img src="@/assets/images/user.png" alt />
            </li>
            <li class="name">fjjdfg</li>
            <li class="type">已经完成</li>
          </ul>
          <ul>
            <li class="temaImg">
              <img src="@/assets/images/user.png" alt />
            </li>
            <li class="name">fjjdfg</li>
            <li class="type">已经完成</li>
          </ul>
        </div>
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
  created() {
    // this.getImg();
  },
  mounted() {},
  computed: {},
  methods: {
     grouLog(flag) {
      let href = window.location.href;
      let str = href.split("#/");
      window.location.href = `${str}#/groupLog`;
    },
    onChange() {
      
    },
    getImg() {
      // this.$toast.loading({
      //   duration: 0,
      //   forbidClick: true, // 禁用背景点击
      //   message: "加载中..."
      // });
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
        .postRequest("/user/task/v6/searchMy58TaskTeam", data)
        .then(res => {
          if (res.code == 0) {
          } else {
            this.temashow = true;
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    }
  }
};
</script>


<style lang='less' scoped>
.groupDetails_page {
  overflow-y: scroll;
  .scroll_view {
    margin-top: 64px;
    background: #f5f5f5;
    .header {
      height: 64px;
      width: 100%;
      background-image: url("../assets/images/Rectangle.png");
      background-size: 100%;
      // background: #4a87ea;
      position: fixed;
      z-index: 10;
      top: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .back {
        height: 28px;
        width: 30px;
        margin-left: 10px;
        text-align: center;
        img {
          height: 17px;
          width: 16px;
          vertical-align: middle;
        }
      }
      .title {
        height: 34px;
        font-size: 18px;
        font-family: 微软雅黑;
        color: #fff;
        font-weight: 400;
        padding-left: 45px;
      }
      .titltBtn {
        height: 28px;
        width: 80px;
        font-size: 14px;
        color: #ffff;
        font-weight: 400;
        text-align: center;
        color: #fff;
      }
    }
    .conter {
      margin: 10px 20px;
      background: #fff;
      width: 335px;
      height: 362px;
      .date {
        height: 90px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .date_end {
          .title {
            font-size: 18px;
            color: #711010;
            font-weight: bold;
          }
          .dateNumber {
            margin-top: 8px;
            color: #9f6150;
            font-size: 12px;
            font-weight: bold;
          }
        }
        .date_residue {
          text-align: right;
          div {
            display: inline-block;
            text-align: center;
          }
          .number {
            width: 30px;
            height: 30px;
            background: #ed706b;
            font-size: 16px;
            color: #fff;
            line-height: 30px;
            border-radius: 5px;
          }
          .icon {
            color: #711010;
            font-size: 16px;
            width: 16px;
            line-height: 20px;
            height: 20px;
          }
        }
      }
      .headerMan {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .teamUser {
          text-align: center;
          .userImg {
            width: 60px;
            height: 60px;
          }
          .name {
            margin: auto;
            color: #9f6150;
            font-size: 12px;
            font-weight: 400;
            margin: 8px 0 10px 0;
          }
          .type {
            margin: auto;
            color: #999999;
            font-size: 12px;
            font-weight: 400;
            width: 70px;
            height: 25px;
            border: 1px solid #bfbfbf;
            border-radius: 5px;
            text-align: center;
            line-height: 24px;
          }
        }
        .parze {
          .sum {
            text-align: right;
            font-size: 50px;
            color: #e0413c;
            span {
              font-size: 28px;
            }
          }
          .title {
            text-align: right;
            color: #9f6150;
            font-size: 12px;
          }
        }
      }
      .temaList {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .temaImg {
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .name {
          text-align: center;
          color: #9f6150;
          font-size: 12px;
          font-weight: 400;
          margin: 8px 0 10px 0;
        }
        .type {
          width: 70px;
          height: 25px;
          color: #999;
          font-size: 12px;
          font-weight: 400;
          border: 1px solid #d7d7d7;
          border-radius: 5px;
          text-align: center;
          line-height: 25px;
        }
      }
    }
  }
}
</style>