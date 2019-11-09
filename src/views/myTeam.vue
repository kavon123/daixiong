










<template>
  <div class="groupDetails_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back" @click="groupTask()">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">我加入的队伍</div>
        <div class="titltBtn"></div>
      </div>
      <addWin v-if="addWinShow" :parentmsg="msgCode" @func="closeAdd" />
      <div class="conter" v-if="team">
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
                <img src="@/assets/images/add.png" alt @click="add(teamId,'邀请队友')" />
              </li>
              <li class="name">邀请队友</li>
              <li class="type color_0">待提交</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="declare">
        <div class="script_title">
          <img src="@/assets/images/ruledescript.png" alt />
        </div>
        <p>1、用户最多只能同时加入1支队伍，但可创建20支队伍</p>
        <p>2.、用户使用加入队伍功能，只能领取1次奖励，成功领取奖励后，加入功能消失。</p>
      </div>

      <div class="blak"></div>

      <div class="foterBtn">
        <div class="warnBtn" @click="groupTask">去组队</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import addWin from "@/components/addWin";
export default {
  data() {
    return {
      addWinShow: false,
      msgCode: {},
      temashow: false,
      teamList: [],
      teamId: "",
      team: "",
      //   {
      // teamId: "1191551200150056960",
      // leaderId: "1158605294933299200",
      // taskConfigId: null,
      // status: "0",
      // totalNum: 2,
      // completeNum: 0,
      // overDate: 1573095719000,
      // createdDate: null,
      // updateDate: null,
      // memberList: [
      //   {
      //     memberId: "1191551200150056961",
      //     teamId: "1191551200150056960",
      //     userId: "1158605294933299200",
      //     nickName: "测试",
      //     image:
      //       "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
      //     type: "1",
      //     status: "1",
      //     amount: 20000,
      //     multiple: 0,
      //     taskConfigId: null,
      //     taskName: null,
      //     rewardDescription: null
      //   },
      //   {
      //     memberId: "1191656976801783808",
      //     teamId: "1191551200150056960",
      //     userId: "1191644992643457024",
      //     nickName: "Tree",
      //     image:
      //       "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7KAQMk4AAFB9sqBQd4624.png",
      //     type: "2",
      //     status: "0",
      //     amount: 50000,
      //     multiple: 0,
      //     taskConfigId: null,
      //     taskName: null,
      //     rewardDescription: null
      //   }
      // ]
      //   },
      userList: [1, 2, 3, 4, 5],
      parms: ""
    };
  },
  components: {
    ...mapGetters(["oUserinfo", "barString", "isIOS", "teamId"]),
    addWin
  },
  created() {
    this.getImg();
    this.getImgReq();
  },
  mounted() {},
  computed: {},
  methods: {
    closeAdd() {
      this.addWinShow = false;
    },
    add(temaId, title) {
      this.msgCode.addTitle = title;
      //邀请加入队伍
      $api
        .postRequest("/user/task/v6/searchTeamShareUrl", this.parms)
        .then(res => {
          if (res.code == 0) {
            let msg = res.datas.content;
            let nweMsg = msg.replace(/{teamId}/g, temaId);
            nweMsg += `&teamId=${temaId}`;
            this.msgCode.msg = nweMsg;
            this.addWinShow = true;
          } else {
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          this.$toast.fail("创建失败！");
        });
    },
    openLDWb() {
      console.log("去提交");
      let href = window.location.href;
      let str = href.split("#/")[0];
      let newUrl = `${str}#/moments/58?webhashead=1`;
      // let newUrl = "http://202.60.235.20/dist/#/moments/58?webhashead=1";
      if (this.isIOS) {
        this.$bridge.callhandler("DX_openLDWb", { newUrl }, data => {});
      } else {
        const data = android.DX_openLDWb(newUrl);
      }
    },
    groupTask() {
      let href = window.location.href;
      let str = href.split("#/")[0];
      window.location.href = `${str}#/groupTask`;
    },
    getImg() {
      //   console.log(this.$store.state.teamId);
      //   let parms = this.$store.state.teamId;

      //   // {"teamId":'1192011020049252352'};
      const classCode =
        this.platformType === 2 ? "WECHAT_POSTER_YG" : "WECHAT_POSTER_58";
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode },
          data => {
            this.parms = data;
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ classCode })
        );
        this.parms = data;
      }
    },
    timerToStr(time) {
      if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    },
    getImgReq() {
      $api
        .postRequest("/user/task/v6/searchMyJoinMemberTeam", this.parms)
        .then(res => {
          if (res.code == 0) {
            let list = res.datas;
            this.teamId = list.teamId;
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
    margin-bottom: 75px;
    padding-top: 152px;
    background-image: url("../assets/images/redpack.png");
    background-size: 100%;

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
      background: #fdf8e5;
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
            border: 1px solid #711010;
            color: #5e2019;
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
    .declare {
      margin: 40px 20px 20px 20px;
      background: #fdf8e5;
      border-radius: 6px;
      padding: 45px 20px 20px 20px;
      position: relative;
      .script_title {
        margin: 0 20px;
        position: absolute;
        text-align: center;
        top: -20px;
        img {
          width: 100%;
        }
      }
      p {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        text-decoration: none;
        font-family: 微软雅黑;
        color: #7f463f;
      }
    }
    .blak {
      height: 20px;
    }
    .foterBtn {
      // padding: 10px 20px;
      width: 100%;
      height: 75px;
      position: fixed;
      bottom: 0;
      z-index: 100;
      background: #450005;
      line-height: 75px;
      text-align: center;
      div {
        width: 335px;
        height: 44px;
        display: inline-block;
        line-height: 44px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        border-radius: 6px;
        background: linear-gradient(to top, #ffb33c, #ffca3c, #ffde7c);
      }
    }
  }
}
</style>