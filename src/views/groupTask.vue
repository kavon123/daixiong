


<template>
  <div class="groupTask_page" @touchmove.prevent>
    <div class="scroll_view">
      <div class="header">
        <div class="back" @click="fnGoBack">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">团队分享任务</div>
        <div class="titltBtn" @click="grouLog(true)">组队记录</div>
      </div>
      <div class="checkScript" @click="checkScript(true)">
        <img src="@/assets/home/script_btn.png" alt />
      </div>

      <div class="tip">
        <div>
          <span class="title">团队任务 :</span>
          <span class="category">58棋牌分享</span>
        </div>
        <div>
          <span class="title">累计奖金 :</span>
          <img src="@/assets/images/redpackcup.png" alt />
          <span class="sum">{{pizeSum.totalAmount}}</span>
        </div>
      </div>

      <div class="mid">
        <img src="@/assets/home/invite.png" alt @click="add(teamId,'邀请队友')" />
        <img src="@/assets/home/join.png" alt @click="add(teamId,'提醒队友')" />
      </div>

      <joinWin v-if="joinWinShow" @func="closejoin" />
      <addWin v-if="addWinShow" :parentmsg="msgCode" @func="closeAdd" />
      <SharejoinWin v-if="SjoinWinShow" :data="teamId" @func="colseSharejoin" />
      <scriptWin v-if="scriptWinShow" @func="colseScript" />
      <endTip v-if="endTipShow" @func="colsEndTip" :parms="endParms" @refresh="getParms" />

      <div class="joinBtn" @click="joinBtn(true)">
        <img src="@/assets/images/teammar.png" alt />
        <span>加入队伍</span>
      </div>

      <div class="carousel">
        <div class="scroll_conten">
          <swiper class="conten swipe" @slideChange="onChange" :options="swipertop" ref="Swiper">
            <!-- <swiper-slide class="afterBox">
              <div class="basicInfo">
                <div class="datalis">
                  <div class="infoTitle">
                    <img src="@/assets/images/formteam.png" alt />
                    <span>创建队伍</span>
                  </div>
                  <div class="date">
                    <span class="dateNum">48</span>
                    <span class="dateIcon">:</span>
                    <span class="dateNum">00</span>
                    <span class="dateIcon">:</span>
                    <span class="dateNum">00</span>
                  </div>
                </div>
                <div class="userInfo">
                  <ul class="user">
                    <li class="usericon">
                      <img src="@/assets/images/regcom.png" alt class="regcom" />
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="userName">{{nickName}}</li>
                  </ul>
                  <ul class="userpize">
                    <li class="pizeSum">
                      <span>X</span>
                      1.0
                    </li>
                    <li class="pizeTitle">我的奖励</li>
                  </ul>
                </div>
                <div class="operation">
                  <div class="script">
                    好朋友多做任务，多领
                    <span>20倍</span>奖励
                  </div>
                  <div class="creatBtn" @click="creatTeam(true)">
                    <img src="@/assets/images/creact.png" alt />
                  </div>
                </div>
              </div>
            </swiper-slide>-->

            <swiper-slide
              class="afterBox"
              v-for="(item,index) in teamList"
              :key="index"
              v-if="index==0"
            >
              <div class="basicInfo">
                <div class="datalis">
                  <div class="infoTitle">
                    <img src="@/assets/images/formteam.png" alt />
                    <span>队伍</span>
                    <span>{{index+1}}</span>
                    <span>/</span>
                    <span>{{teamList.length}}</span>
                  </div>
                  <div class="date">
                    <span class="dateNum">{{item.H}}</span>
                    <span class="dateIcon">:</span>
                    <span class="dateNum">{{item.F}}</span>
                    <span class="dateIcon">:</span>
                    <span class="dateNum">{{item.S}}</span>
                  </div>
                </div>

                <div class="end">
                  <div @click="end(item.teamId,item.status)">提前结束</div>
                </div>

                <div
                  class="userInfo"
                  v-for="(data,idx) in item.memberList"
                  :key="idx"
                  v-if="data.type==1"
                >
                  <ul class="user">
                    <li class="usericon">
                      <img src="@/assets/images/regcom.png" alt class="regcom" />
                      <img :src="data.image" alt />
                    </li>
                    <li class="userName">{{data.nickName}}</li>
                    <li class="usersType color_0" v-if="data.status==0" @click="openLDWb">去提交</li>
                    <li class="usersType color_1" v-if="data.status==1" @click="openLDWb">审核中</li>
                    <li class="usersType color_2" v-if="data.status==2" @click="openLDWb">已完成</li>
                  </ul>

                  <ul class="userpize" v-if="data.type==1">
                    <li class="pizeSum">
                      <span>X</span>
                      {{data.multiple}}
                    </li>
                    <li class="pizeTitle">我的奖励</li>
                  </ul>
                </div>

                <div class="teamList">
                  <div class="team" v-for="(team,i) in forList" :key="i">
                    <ul v-if="!item.memberList[i]||item.memberList[i].type==2">
                      <li class="teamUser">
                        <img v-if="item.memberList[i]" :src="item.memberList[i].image" alt />
                        <img
                          v-if="!item.memberList[i]"
                          src="@/assets/images/add.png"
                          alt
                          @click="add(item.teamId,'邀请队友')"
                        />
                      </li>
                      <li class="teamName" v-if="item.memberList[i]">{{item.memberList[i].nickName}}</li>
                      <li class="teamName" v-if="!item.memberList[i]">立即邀请</li>
                      <li
                        class="teamType color_0"
                        v-if="!item.memberList[i]||item.memberList[i].status==0"
                      >待提交</li>
                      <li
                        class="teamType color_1"
                        v-if="item.memberList[i]&&item.memberList[i].status==1"
                      >审核中</li>
                      <li
                        class="teamType color_2"
                        v-if="item.memberList[i]&&item.memberList[i].status==2"
                      >已完成</li>
                    </ul>
                  </div>`
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { Swiper, swiperSlide } from "vue-awesome-swiper";
import addWin from "@/components/addWin";
import joinWin from "@/components/joinWin";
import SharejoinWin from "@/components/SharejoinWin";
import scriptWin from "@/components/scriptWin";
import endTip from "@/components/endTip";

export default {
  data() {
    return {
      SjoinWinShow: false,
      nickName: "",
      pizeSum: "",
      msgCode: {},
      joinWinShow: false,
      addWinShow: false,
      parms: "",
      forList: [1, 2, 3, 4, 5],
      teamList: [
        // {
        //   teamId: "1191551200150056960",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 2,
        //   completeNum: 0,
        //   overDate: 1573095719000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191551200150056961",
        //       teamId: "1191551200150056960",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "1",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     },
        //     {
        //       memberId: "1191656976801783808",
        //       teamId: "1191551200150056960",
        //       userId: "1191644992643457024",
        //       nickName: "Tree",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7KAQMk4AAFB9sqBQd4624.png",
        //       type: "2",
        //       status: "0",
        //       amount: 50000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // },
        // {
        //   teamId: "1191602410332807168",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573107928000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191602410337001472",
        //       teamId: "1191602410332807168",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "2",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // },
        // {
        //   teamId: "1191638703842451456",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573116581000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191638703842451457",
        //       teamId: "1191638703842451456",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "2",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // },
        // {
        //   teamId: "1191668541873643520",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573123695000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191668541873643521",
        //       teamId: "1191668541873643520",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "2",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // },
        // {
        //   teamId: "1191694975014985728",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573129997000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191694975014985729",
        //       teamId: "1191694975014985728",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "2",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // },
        // {
        //   teamId: "1191733881768960000",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573139273000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191733881768960001",
        //       teamId: "1191733881768960000",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "2",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // },
        // {
        //   teamId: "1191733898458095616",
        //   leaderId: "1158605294933299200",
        //   taskConfigId: null,
        //   status: "0",
        //   totalNum: 1,
        //   completeNum: 1,
        //   overDate: 1573139277000,
        //   createdDate: null,
        //   updateDate: null,
        //   memberList: [
        //     {
        //       memberId: "1191733898458095617",
        //       teamId: "1191733898458095616",
        //       userId: "1158605294933299200",
        //       nickName: "测试",
        //       image:
        //         "http://154.206.62.162:8888/video/M00/01/D2/ms4-ol1ok7GAHnW6AADeHfmAYo4566.png",
        //       type: "1",
        //       status: "2",
        //       amount: 20000,
        //       multiple: 0,
        //       taskConfigId: null,
        //       taskName: null,
        //       rewardDescription: null
        //     }
        //   ]
        // }
      ],
      teamId: "",
      swipertop: {
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1.1,
        spaceBetween: 8,
        observer: true,
        observeParents: true,
        onSlideChangeEnd: function(swiper) {
          swiper.update();
          swiper.startAutoplay();
          swiper.reLoop();
        }
        // loop: true
      },
      activeIndex: 0,
      isIOS: this.$store.state.isIOS,
      scriptWinShow: false,
      endTipShow: false,
      endParms: {},
      gitClipData:false,
  
    };
  },
  components: {
    // ...mapGetters(["oUserinfo", "barString", "isIOS"]),
    addWin,
    joinWin,
    SharejoinWin,
    scriptWin,
    endTip
  },
  created() {
    this.getParms();
  },
  computed: {
    // ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  mounted() {
    this.$nextTick(() => {    
      this.Sharejoin(this.parms)
    });
  },

  activated() {},
  computed: {},
  methods: {
    endReq(parms) {
      $api
        .postRequest("/user/task/v6/close58Team ", parms)
        .then(res => {
          if (res.code == 0) {
            this.$toast.success(res.datas);
          } else {
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          // this.$toast.fail(err.message);
        });
    },
    colsEndTip() {
      this.endTipShow = false;
    },
    end(id, status) {
      if (status == 0) {
        this.endParms.teamId = id;
        this.endParms.status = status;
        this.endTipShow = true;
        return;
      }
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { teamId: id },
          data => {
            this.endReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ teamId: id })
        );
        this.endReq(data);
      }
    },
    colseScript() {
      this.scriptWinShow = false;
    },
    checkScript() {
      this.scriptWinShow = true;
    },
    fnGoBack() {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_goBack");
      } else {
        android.DX_goBack({});
      }
    },
    openLDWb() {
      let href = window.location.href;
      let str = href.split("#/")[0];
      let newUrl = `${str}#/moments/58?webHasHead=1`;
      // let newUrl = "http://202.60.235.20/dist/#/moments/58?webHasHead=1";
      if (this.isIOS) {
        this.$bridge.callhandler("DX_openLDWb", { newUrl }, data => {});
      } else {
        let data = android.DX_openLDWb(newUrl);
      }
    },
    colseSharejoin() {
      this.SjoinWinShow = false;
    },
    ClipJioin(ClipData, parms) {
      let data = {};
      let inx = ClipData.indexOf("?") + 1;
      let dataStr = ClipData.substr(inx);
      let arr = dataStr.split("&");
      arr.forEach(item => {
        var tmp = item.split("=");
        data[tmp[0]] = tmp[1];
      });
      let teamId = data["teamId"];
      if (teamId) {
        this.teamId = teamId;
        $api
          .postRequest("/user/task/v6/searchMyJoinMemberTeam", parms)
          .then(res => {
            if (!res.datas) {
              this.SjoinWinShow = true;
            }
          })
          .catch(err => {
            // this.$toast.fail(err.message);
          });
        this.$forceUpdate();
      }
    },
    Sharejoin(parms) {
      //获取剪贴板数据
      if (!this.isIOS) {
        let ClipData = android.getTeamClipData();
        if (ClipData) {
          this.ClipJioin(ClipData, parms);
        }
      } else {
        this.$bridge.callhandler("getTeamClipData", {}, data => {
          let ClipData = data;
          if (ClipData) {
            this.ClipJioin(ClipData, parms);
          }
        });
      }
    },
    closejoin() {
      this.joinWinShow = false;
    },
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
          this.$toast.fail("系统异常，获取邀请码失败！");
        });
    },
    joinBtn(flag) {
      //加入队伍
      if (this.isIOS) {
        this.$bridge.callhandler("DX_encryptionRequest", {}, data => {
          this.searchMyteam(data);
        });
      } else {
        const data = android.DX_encryptionRequest(JSON.stringify({}));
        this.searchMyteam(data);
      }
    },

    searchMyteam(data) {
      $api
        .postRequest("/user/task/v6/searchMyJoinMemberTeam", data)
        .then(res => {
          if (res.datas) {
            let href = window.location.href;
            let str = href.split("#/")[0];
            window.location.href = `${str}#/myTeam`;
          } else {
            this.joinWinShow = true;
          }
        })
        .catch(err => {
          this.joinWinShow = true;
        });
    },

    creatTeam(flag) {
      $api
        .postRequest("/user/task/v6/create58TaskTeam", this.parms)
        .then(res => {
          if (res.code == 0) {
            this.$toast.success("创建成功！");
            this.getSeachTeam(this.parms);
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail("创建失败！");
        });
    },
    grouLog(flag) {
      let href = window.location.href;
      let str = href.split("#/")[0];
      window.location.href = `${str}#/groupLog`;
    },
    onChange() {
      this.activeIndex = this.$refs.Swiper.swiper.activeIndex;
    },
    getParms() {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_encryptionRequest", {}, data => {
          this.parms = data;
          this.getSeachTeam(data);
          this.getPizeSum(data);
          // this.Sharejoin(data);
        });
      } else {
        const data = android.DX_encryptionRequest({});
        this.parms = data;
        this.getSeachTeam(data);
        this.getPizeSum(data);
        // this.Sharejoin(data);
      }
    },
    dateStr(str) {
      if (str < 10) {
        return `0${str}`;
      } else {
        return str;
      }
    },
    getPizeSum(parms) {
      $api
        .postRequest("/user/task/v6/searchMy58TeamAmount", parms)
        .then(res => {
          if (res.code == 0) {
            this.pizeSum = res.datas;
          } else {
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          // this.$toast.fail(err.message);
        });
    },

    getSeachTeam(parms) {
      $api
        .postRequest("/user/task/v6/searchMy58TaskTeam", parms)
        .then(res => {
          if (res.code == 0) {
            let list = res.datas;
            if (list) {
              for (let i = 0; i < list.length; i++) {
                let item = list[0];
                if (!this.teamId && item.totalNum < 5) {
                  this.teamId = item.teamId;
                }
                let itemDate = new Date().getTime();
                let endDate = item.overDate - itemDate;
                let H = parseInt(endDate / 1000 / 60 / 60);
                let F = parseInt((endDate / 1000 / 60) % 60);
                let S = parseInt((endDate / 1000) % 60);
                list[i].H = this.dateStr(H);
                list[i].F = this.dateStr(F);
                list[i].S = this.dateStr(S);
                // this.teamList.push(list[i]);
              }
              this.teamList = list;
              // console.log(this.teamList.length, "aaaa");
              // if ((this.teamList.length = 0)) {
              //   this.creatTeam(true);
              // }
              // setTimeout(() => {
              //   this.$refs.Swiper.swiper.slideTo(1, 1, false);
              // }, 200);
            } else {
              this.creatTeam(true);
            }
          } else {
            // this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          // this.$toast.fail(err.message);
        });
      if (!this.isIOS) {
        android.DX_dismisLoading();
      }
    }
  }
};
</script>


<style lang='less' scoped>
.groupTask_page {
  background-image: url("../assets/images/redpack.png");
  background-size: 100%;
  .scroll_view {
    margin-top: 64px;
    padding-top: 192px;
    .header {
      height: 64px;
      width: 100%;
      background-image: url("../assets/images/Rectangle.png");
      background-size: 100%;
      position: fixed;
      z-index: 100;
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
    .checkScript {
      position: absolute;
      top: 98.5px;
      right: 0;
      width: 25px;
      height: 72px;
      text-align: right;
      img {
        width: 25px;
        height: 72px;
      }
    }
    .tip {
      height: 50px;
      background: #fdf8e5;
      margin: 0 18px;
      margin-bottom: 20px;
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      div {
        line-height: 24px;
        .title {
          font-size: 14px;
          font-weight: 400;
          color: #711010;
          font-weight: bold;
        }
        .category {
          font-size: 14px;
          font-weight: 700;
          color: #e0413c;
          font-weight: bold;
        }
        img {
          vertical-align: -2px;
          width: 16px;
          height: 12px;
          margin-right: 4px;
        }
        .sum {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
      }
    }
    .mid {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      height: 80px;
      background-image: url("../assets/home/open.png");
      background-size: 100%;
      margin: 0 18px;
      margin-top: 10px;
      // line-height: 80px;
      img {
        vertical-align: middle;
        width: 164px;
        height: 53px;
      }
    }
    .joinBtn {
      width: 85px;
      height: 30px;
      display: inline-block;
      background: #930501;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      line-height: 30px;
      text-align: right;
      padding-right: 8px;
      position: fixed;
      top: 200px;
      right: 0;
      z-index: 100;
      color: #fff;
      img {
        width: 14px;
        height: 15px;
        vertical-align: middle;
        margin-right: 4px;
      }
    }
    .carousel {
      // margin-top: 17px;
      position: relative;
      // height: 100vh;

      .scroll_conten {
        .conten {
          .afterBox {
            .basicInfo {
              height: 382px;
              // background: #fdf8e5;
              background-image: url("../assets/home/lun_bgm.png");
              padding-bottom: 24px;
              background-size: 100%;
              border-radius: 6px;
              background-repeat: no-repeat;
              position: relative;

              .datalis {
                height: 80px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 120px;

                .infoTitle {
                  padding-left: 10px;
                  width: 150px;
                  img {
                    width: 38px;
                    height: 38px;
                    vertical-align: middle;
                    margin-right: 8px;
                  }
                  span {
                    text-align: center;
                    font-size: 18px;
                    font-weight: 400;
                    font-style: normal;
                    text-decoration: none;
                    font-family: 微软雅黑;
                    color: #711010;
                    font-weight: bold;
                    padding: 0px;
                    margin: 0px;
                    word-break: break-word;
                  }
                }
                .date {
                  height: 38px;
                  text-align: right;
                  padding-right: 10px;
                  .dateNum {
                    display: inline-block;
                    background: #ed706b;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 5px;
                    color: #ffffff;
                    font-size: 16px;
                    vertical-align: middle;
                  }
                  .dateIcon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 14px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    font-family: 微软雅黑;
                    color: #711010;
                  }
                }
              }
              .end {
                height: 31px;

                position: absolute;
                top: 68px;
                right: 20px;
                z-index: 100;
                div {
                  width: 72px;
                  height: 25px;
                  font-size: 12px;
                  color: #791a22;
                  font-weight: 500;
                  background: linear-gradient(
                    top,
                    #ffb33c 100%,
                    #ffca3c 100%,
                    #ffde7c 100%
                  );
                  border-radius: 5px;
                  line-height: 25px;
                  text-align: center;
                }
              }
              .userInfo {
                position: absolute;
                top: 80px;
                width: 335px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 125px;
                .user {
                  padding-left: 50px;
                  position: relative;
                  .usericon {
                    img:nth-child(2) {
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                      border: 1px solid #7eaace;
                    }
                    .regcom {
                      width: 38px;
                      height: 17px;
                      position: absolute;
                      z-index: 10;
                      top: -10px;
                      left: 64px;
                    }
                  }
                  .userName {
                    text-align: center;
                    margin: 5px auto;
                    height: 14px;
                    color: #9f6150;
                  }
                  .usersType {
                    margin: 5px auto;
                    height: 25px;
                    width: 70px;
                    text-align: center;
                    line-height: 25px;
                    font-size: 14px;
                    color: #5e2019;
                    border: 1px solid #711010;
                    border-radius: 6px;
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
                .userpize {
                  padding-right: 30px;
                  text-align: right;
                  .pizeSum {
                    font-size: 36px;
                    font-weight: 400;
                    font-family: 微软雅黑;
                    color: #ff6666;
                    text-align: left;
                    span {
                      font-size: 16px;
                    }
                  }
                  .pizeTitle {
                    display: inline-block;
                    width: 60px;
                    height: 20px;
                    text-align: left;
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    text-decoration: none;
                    font-family: 微软雅黑;
                    color: #9f6150;
                  }
                }
              }

              .operation {
                height: 150px;
                .script {
                  text-align: center;
                  height: 22px;
                  font-size: 18px;
                  color: #5f211a;
                  span {
                    color: #e0413c;
                    font-size: 22px;
                  }
                }
                .creatBtn {
                  margin-top: 42px;
                  text-align: center;
                  height: 53px;
                  img {
                    width: 294px;
                    height: 53px;
                  }
                }
              }
              .teamList {
                // position: relative;
                padding-top: 20px;
                height: 162px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                .team {
                  // position: absolute;
                  // top: -100px;
                  // display: inline-block;

                  .teamUser {
                    text-align: center;
                    img {
                      border-radius: 50%;
                      width: 60px;
                      height: 60px;
                    }
                  }
                  .teamName {
                    text-align: center;
                    margin: 5px auto;
                    height: 14px;
                    color: #9f6150;
                  }
                  .teamType {
                    margin: 5px auto;
                    height: 25px;
                    width: 70px;
                    text-align: center;
                    line-height: 25px;
                    font-size: 14px;
                    color: #5e2019;
                    border: 1px solid #711010;
                    border-radius: 6px;
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
                ul:nth-child(1) {
                  left: 12px;
                }
                ul:nth-child(2) {
                  left: 94px;
                }
                ul:nth-child(3) {
                  left: 176px;
                }
                ul:nth-child(4) {
                  left: 258px;
                }
              }
            }
          }
        }
      }
    }
    // .blak {
    //   height: 123px;
    // }
  }
}
</style>