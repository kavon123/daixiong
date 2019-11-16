




<template>
  <div class="groupLog_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back" @click="groupTask()">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">组队记录</div>
        <div class="titltBtn"></div>
      </div>
      <div class="noImg" v-if="teamList.length==0">
        <img src="@/assets/images/noteamLog.png" alt />
      </div>
      <div class="swipe" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="logList" v-if="teamList.length>0">
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
              <div v-for="(num,i) in numberList" :key="i">
                <img v-if="num<=item.totalNum" src="@/assets/images/member.png" alt />
                <img v-if="num>item.totalNum" src="@/assets/images/add.png" alt />
              </div>
            </li>
            <li class="redPack" @click="groupDetails(item.teamId)">
              <img src="@/assets/images/redpackcup.png" alt />
              <span>{{item.amount}}</span>
              <img src="@/assets/images/go.png" alt />
            </li>
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
      teamList: [
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388284033187840",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295295000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "0"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388282661650432",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295295000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388281826983936",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295295000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388256132677632",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295288000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388255998459904",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295288000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388255172182016",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295288000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388254043914240",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295288000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388253288939520",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295288000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192388252613656576",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573295288000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // },
        // {
        //   Ytd: "2019-11-16",
        //   Time: "12:53:24",
        //   teamId: "1192361580837388288",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573288929000,
        //   multiple: 1,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: null,
        //   amount: "20000"
        // }
      ],
      numberList: [1, 2, 3, 4, 5],
      params: { page: 1, size: 10 },
      page: { totalSize: "", totalPage: "", currPage: "" }, //	总数   	总页数  当前页数
      tstart: "",
      tend: "",
      touch: false,
      TouchDate: [],
      // swipertop: {
      //   initialSlide: 0,
      //   direction: "vertical",
      //   centeredSlides: true,
      //   slidesPerView: 1,
      //   slideTo: 1,
      //   spaceBetween: 0,
      //   onSlideChangeEnd: function(swiper) {
      //     alert(swiper.activeIndex + "");
      //     // swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
      //   }
      //   // loop: true
      // },
      isIOS: this.$store.state.isIOS,
      startY: "", //滑动起始为位置
      moveY: "", //滑动距离
      disY: "" //位移位置
    };
  },

  components: {},
  created() {},
  mounted() {},
  activated() {
    // this.$refs.Swiper.swiper.slideTo(1, 1, false);
    this.getParms(this.params);
  },
  computed: {},
  methods: {
    touchStart: function(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.touches.length == 1) {
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startY = ev.touches[0].clientY; // 记录开始位置
      }
    },

    touchMove: function(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.touches.length == 1) {
        //滑动时距离浏览器上侧的距离
        this.moveY = ev.touches[0].clientY;
        //实时的滑动的距离-起始位置=实时移动的位置
        this.disY = this.moveY - this.startY;
      }
    },
    touchEnd: function(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.changedTouches.length == 1) {
        let endY = ev.changedTouches[0].clientY;
        this.disY = endY - this.startY;
        console.log(this.disY);
        if (this.disY > 0) {
          if (this.page.currPage > 1) {
            this.$toast.loading({
              duration: 0,
              forbidClick: true, // 禁用背景点击
              message: ""
            });

            this.params.page = Number(this.page.currPage) - 1;
            this.getParms(this.params);
          } else {
            this.$toast.fail("当前是首页！");
          }
        } else if (this.disY < 0) {
          if (this.page.currPage < this.page.totalPage) {
            this.$toast.loading({
              duration: 0,
              forbidClick: true, // 禁用背景点击
              message: ""
            });

            this.params.page = Number(this.page.currPage) + 1;
            this.getParms(this.params);
          } else {
            this.$toast.fail("当前是尾页！");
          }
        }
      }
    },

    groupDetails(teamId) {
      let href = window.location.href;
      let str = href.split("#/")[0];
      this.$store.state.teamId = teamId;
      // console.log(this.$store.state.teamId);
      window.location.href = `${str}#/groupDetails`;
    },
    groupTask() {
      let href = window.location.href;
      let str = href.split("#/")[0];
      window.location.href = `${str}#/groupTask`;
    },

    getParms(params) {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { page: params.page, size: params.size },
          data => {
            this.getTeamLog(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ page: params.page, size: params.size })
        );
        this.getTeamLog(data);
      }
    },
    timerToStr(time) {
      if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    },
    getTeamLog(data) {
      $api
        .postRequest(`/user/task/v6/searchMy58TaskTeamHisPage`, data)
        .then(res => {
          if (res.code == 0) {
            this.page.totalSize = res.datas.totalSize;
            this.page.totalPage = res.datas.totalPage;
            this.page.currPage = res.datas.currPage;
            console.log(
              `总数${this.page.totalSize} -- 总页${this.page.totalPage}--当前页${this.page.currPage}`
            );

            let list = res.datas.infoList;
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let date = new Date(item.overDate);
              let Y = date.getFullYear();
              let M = date.getMonth() + 1;
              let D = date.getDate();
              let H = date.getHours();
              let F = date.getMinutes();
              let S = date.getSeconds();
              let ytd = `${Y}-${this.timerToStr(M)}-${this.timerToStr(D)}`;
              let time = `${this.timerToStr(H)}:${this.timerToStr(
                F
              )}:${this.timerToStr(S)}`;
              list[i].Ytd = ytd;
              list[i].Time = time;
            }
            this.$toast.clear();
            this.teamList = list;
          } else {
            this.temashow = true;
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
      this.$forceUpdate();
    }
  }
};
</script>


<style lang='less' scoped>
.groupLog_page {
  height: 100vh;
  overflow: hidden;
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
    .noImg {
      padding-top: 113px;
      width: 100%;
      text-align: center;
      img {
        width: 142px;
        height: 133px;
      }
    }
    .swipe {
      height: 100vh;
      .logList {
        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          height: 30px;
          li {
            color: #333;
            font-weight: bold;
            font-size: 16px;
          }
          li:nth-child(1) {
            width: 70px;
            margin-left: 6px;
          }
          li:nth-child(2) {
            width: 130px;
            box-sizing: border-box;
            padding-left: 20px;
            // text-align: center;
          }
          li:nth-child(3) {
            width: 100px;
            text-align: center;
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
            div {
              width: 33px;
              height: 33px;
              position: absolute;
              top: -20px;
              img {
                width: 33px;
                height: 33px;
              }
            }
            div:nth-child(1) {
              left: 0;
              z-index: 10;
            }
            div:nth-child(2) {
              left: 16.5px;
              z-index: 9;
            }
            div:nth-child(3) {
              left: 33px;
              z-index: 8;
            }
            div:nth-child(4) {
              left: 49.5px;
              z-index: 7;
            }
            div:nth-child(5) {
              left: 66px;
              z-index: 6;
            }
          }
        }
        .redPack {
          text-align: right;
          width: 100px;
          img:nth-child(1) {
            width: 17px;
            height: 12px;
            margin-right: 4px;
          }
          span:nth-child(2) {
            color: #e0413c;
            font-size: 16px;
            font-weight: 400;
          }
          img:nth-child(3) {
            margin-left: 4px;
            width: 12px;
            height: 18px;
            margin-left: 14px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>