




<template>
  <div class="groupDetails_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back" @click="grouLog()">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">组队详情</div>
        <div class="titltBtn"></div>
      </div>

      <div class="conter">
        <ul class="date">
          <li class="date_end">
            <div class="title">结束时间</div>
            <div class="dateNumber">{{team.time}}</div>
          </li>
          <li class="date_residue">
            <div class="number">{{team.end_h}}</div>
            <div class="icon">:</div>
            <div class="number">{{team.end_f}}</div>
            <div class="icon">:</div>
            <div class="number">{{team.end_s}}</div>
          </li>
          <!-- <li class="date_residue" v-if="team.status==1">
            <div class="end">已完成</div>
          </li>-->
        </ul>
        <ul class="headerMan" v-for="(item,inx) in team.memberList" :key="inx">
          <li class="teamUser" v-if="item&&item.type==1">
            <img :src="item.image" alt class="userImg" />
            <div class="name">{{item.nickName}}</div>
            <div class="type color_0" v-if="item.status==0" @click="openLDWb">去提交</div>
            <div class="type color_1" v-if="item.status==1" @click="openLDWb">审核中</div>
            <div class="type color_2" v-if="item.status==2">已完成</div>
          </li>
          <li class="parze" v-if="item&&item.type==1">
            <div class="sum">
              <span>X</span>
              {{item.multiple}}
            </div>
            <div class="title">我的奖励</div>
          </li>
        </ul>

        <div class="temaList">
          <div v-for="(data,i) in userList" :key="i">
            <ul v-if="team.memberList[i] &&team.memberList[i].type==2">
              <li class="temaImg">
                <img :src="team.memberList[i].image" alt />
              </li>
              <li class="name">{{team.memberList[i].nickName}}</li>
              <li class="type color_0" v-if="team.memberList[i].status==0">待提交</li>
              <li class="type color_1" v-if="team.memberList[i].status==1">审核中</li>
              <li class="type color_2" v-if="team.memberList[i].status==2">已完成</li>
            </ul>
            <ul v-if="team.memberList.length<data">
              <li class="temaImg">
                <img src="@/assets/images/add.png" alt />
              </li>
              <li class="name">邀请队友</li>
              <li class="type">待提交</li>
            </ul>
          </div>
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
      teamId: "",
      team: {},
      userList: [1, 2, 3, 4, 5],
      parms: "",
      isIOS: this.$store.state.isIOS
    };
  },
  components: {
    // ...mapGetters(["oUserinfo", "barString", "isIOS", "teamId"])
  },
  created() {},
  mounted() {},
  activated() {
    this.getParms();
  },
  computed: {},
  methods: {
    openLDWb() {
      let href = window.location.href;
      let str = href.split("#/")[0];
      let newUrl = `${str}#/moments/58?webHasHead=1`;
      // let newUrl = "http://202.60.235.20/dist/#/moments/58?webHasHead=1";
      if (this.isIOS) {
        this.$bridge.callhandler("DX_openLDWb", { newUrl }, data => {});
      } else {
        const data = android.DX_openLDWb(newUrl);
      }
    },
    grouLog() {
      let href = window.location.href;
      let str = href.split("#/")[0];
      window.location.href = `${str}#/groupLog`;
    },
    getParms() {
      // console.log(this.$store.state.teamId);
      let parms = this.$store.state.teamId;

      // {"teamId":'1192011020049252352'};
      const classCode =
        this.platformType === 2 ? "WECHAT_POSTER_YG" : "WECHAT_POSTER_58";
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { teamId: parms },
          data => {
            this.parms = data;
            this.getTeamDetails(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ teamId: parms })
        );
        this.parms = data;
        this.getTeamDetails(data);
      }
    },
    timerToStr(time) {
      if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    },
    getTeamDetails(parms) {
      $api
        .postRequest("/user/task/v6/searchTaskTeamById", parms)
        .then(res => {
          if (res.code == 0) {
            let list = res.datas;
            let date = new Date(list.overDate);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let H = date.getHours();
            let F = date.getMinutes();
            let S = date.getSeconds();
            let time = `${Y}-${this.timerToStr(M)}-${this.timerToStr(
              D
            )}  ${this.timerToStr(H)}:${this.timerToStr(F)}:${this.timerToStr(
              S
            )}`;
            list["time"] = time;
            let itemDate = new Date().getTime();
            let endDate = list.overDate - itemDate;
            let end_h = parseInt(endDate / 1000 / 60 / 60);
            let end_f = parseInt((endDate / 1000 / 60) % 60);
            let end_s = parseInt((endDate / 1000) % 60);
            list["end_h"] = this.timerToStr(end_h);
            list["end_f"] = this.timerToStr(end_f);
            list["end_s"] = this.timerToStr(end_s);
            if (list.status == 1 || list.status == 2) {
              list["end_h"] = "00";
              list["end_f"] = "00";
              list["end_s"] = "00";
            }
            this.team = list;
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
.groupDetails_page {
  overflow-y: scroll;
  .scroll_view {
    margin-top: 64px;
    padding-top: 15px;
    height: 100vh;
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
      margin: 0 20px;
      background: #fff;
      width: 335px;
      height: 362px;
      border-radius: 6px;
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
            vertical-align: middle;
          }
          // .end {
          //   width: 110px;
          //   height: 40px;
          //   text-align: center;
          //   line-height: 40px;
          //   font-size: 22px;
          //   color: #711010;
          //   font-weight: 800;
          //   border: 1px solid #711010;
          //   border-radius: 5px;
          //   // background: #711010;
          // }
          .number {
            width: 30px;
            height: 30px;
            background: #ed706b;
            font-size: 16px;
            line-height: 30px;
            color: #fff;
            border-radius: 5px;
          }
          .icon {
            color: #711010;
            font-size: 16px;
            width: 16px;
            vertical-align: middle;
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
            border-radius: 50%;
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
          .color_0 {
            color: #e2524b;
            border: 1px solid #e2524b;
          }
          .color_1 {
            color: #5e2019;
            border: 1px solid #5e2019;
          }
          .color_2 {
            color: #bfbfbf;
            border: 1px solid #bfbfbf;
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
            border-radius: 50%;
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
        .color_0 {
          color: #df8052;
          border: 1px solid #df8052;
        }
        .color_1 {
          color: #5e2019;
          border: 1px solid #5e2019;
        }
        .color_2 {
          color: #bfbfbf;
          border: 1px solid #bfbfbf;
        }
      }
    }
  }
}
</style>