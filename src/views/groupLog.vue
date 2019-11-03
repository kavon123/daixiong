




<template>
  <div class="groupLog_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back" @click="groupTask(true)">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">组队记录</div>
        <div class="titltBtn"></div>
      </div>
      <div class="logList" @click="groupDetails(true)">
        <ul class="title">
          <li>结束时间</li>
          <li>我的队伍</li>
          <li>我的奖励</li>
        </ul>
        <ul class="list" v-for="(item,index) in  teamList" :key="index">
          <li class="date">
            <div>{{item.Ytd}}</div>
            <div>{{item.Time}}</div>
          </li>
          <li class="memberImg">
            <img src="@/assets/images/member.png" alt />
            <img src="@/assets/images/add.png" alt="">
            <img src="@/assets/images/member.png" alt />
            <img src="@/assets/images/member.png" alt />
            <img src="@/assets/images/member.png" alt />
            <!-- <img src="@/assets/images/member.png" alt /> -->
          </li>
          <li class="redPack">
            <img src="@/assets/images/redpackcup.png" alt />
            <span>X</span>
            <span>{{item.multiple}}</span>
            <img src="@/assets/images/go.png" alt />
          </li>
        </ul>
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
    
  },
  mounted() {
    this.getImg();
  },
  computed: {},
  methods: {
    groupDetails(flag) {
      let href = window.location.href;
      let str = href.split("#/");
      window.location.href = `${str}#/groupDetails`;
    },
    groupTask(flag) {
      let href = window.location.href;
      let str = href.split("#/");
      window.location.href = `${str}#/groupTask`;
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
    timerToStr(time) {
      if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    },
    getImgReq(data) {
      $api
        .postRequest("/user/task/v6/searchMy58TaskTeamHisPage", data)
        .then(res => {
          if (res.code == 0) {
            let list = res.datas.infoList;
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let date = new Date(item.overDate);
              let Y = date.getFullYear();
              let M = date.getMinutes() + 1;
              let D = date.getDate();
              let H = date.getHours();
              let F = date.getMinutes();
              let S = date.getSeconds();
              let ytd = `${Y}-${this.timerToStr(M)}-${this.timerToStr(D)}`;
              let time = `${this.timerToStr(H)}-${this.timerToStr(F)}-${this.timerToStr(S)}`;
              list[i].Ytd = ytd;
              list[i].Time = time;
            }
            this.teamList = list;
            console.log(this.teamList);
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
.groupLog_page {
  overflow-y: scroll;
  .scroll_view {
    margin-top: 64px;
    background: #fff;
    .header {
      height: 64px;
      width: 100%;
      background-image: url("../assets/images/Rectangle.png");
      background-size: 100%;
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
    .logList {
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 62px;
        li {
          color: #333;
          font-weight: bold;
          font-size: 16px;
        }
        li:nth-child(1) {
          width: 70px;
        }
        li:nth-child(2) {
          width: 120px;
          box-sizing: border-box;
          padding-left: 10px;
        }
      }
      .list {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 62px;
        border-bottom: 1px solid #e6e6e6;
        .date {
          width: 70px;
          div {
            width: 100%;
            text-align: center;
            color: #999;
            font-weight: 400;
            line-height: 20px;
          }
        }
        .memberImg {
          width: 120px;
          position: relative;
          img {
            width: 33px;
            height: 33px;
            position: absolute;
            top: -20px;
          }
          img:nth-child(1) {
            left: 0;
            z-index: 10;
          }
          img:nth-child(2) {
            left: 16.5px;
            z-index: 9;
          }
          img:nth-child(3) {
            left: 33px;
            z-index: 8;
          }
          img:nth-child(4) {
            left: 49.5px;
            z-index: 7;
          }
          img:nth-child(5) {
            left: 66px;
            z-index: 6;
          }
        }
      }
      .redPack {
        img:nth-child(1) {
          width: 17px;
          height: 12px;
          margin-right: 4px;
        }
        span:nth-child(2) {
          color: #e0413c;
          font-size: 14px;
          font-weight: 400;
        }
        span:nth-child(3) {
          color: #e0413c;
          font-size: 18px;
          font-weight: 400;
        }
        img:nth-child(4) {
          width: 8px;
          height: 13px;
          margin-left: 14px;
        }
      }
    }
  }
}
</style>