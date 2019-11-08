


<template>
  <div class="groupTask_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back" @click="fnGoBack">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">团队分享任务</div>
        <div class="titltBtn" @click="grouLog(true)">组队记录</div>
      </div>

      <div class="tip">
        <img src="@/assets/images/regrec.png" alt class="regrec" />
        <img src="@/assets/images/regrec.png" alt class="regrecR" />
        <div>
          <span class="title">团队任务 :</span>
          <span class="category">58棋牌分享</span>
        </div>
        <div>
          <span class="title">累计奖金 :</span>
          <img src="@/assets/images/redpackcup.png" alt />
          <span class="sum">{{pizeSum}}</span>
        </div>
      </div>
      <joinWin v-if="joinWinShow" @func="closejoin" />
      <addWin v-if="addWinShow" :parentmsg="msgCode" @func="closeAdd" />
      <div class="joinBtn" @click="joinBtn(true)">
        <img src="@/assets/images/teammar.png" alt />
        <span>加入队伍</span>
      </div>
      <div class="carousel">
        <div class="scroll_conten"  @click.prevent>
          <swiper class="conten swipe" @slideChange="onChange" :options="swipertop" ref="Swiper">
            <swiper-slide class="afterBox">
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
            </swiper-slide>

            <!-- <swiper-slide class="afterBox">
              <div class="basicInfo">
                <div class="datalis">
                  <div class="infoTitle">
                    <img src="@/assets/images/formteam.png" alt />
                    <span>队伍</span>
                    <span>1</span>
                    <span>/</span>
                    <span>3</span>
                  </div>

                  <div class="date">
                    <span class="dateNum">1</span>
                    <span class="dateIcon">:</span>
                    <span class="dateNum">03</span>
                    <span class="dateIcon">:</span>
                    <span class="dateNum">10</span>
                  </div>
                </div>

                <div class="userInfo">
                  <ul class="user">
                    <li class="usericon">
                      <img src="@/assets/images/regcom.png" alt class="regcom" />
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="userName">dsfjdfskfd</li>
                    <li class="usersType">已完成</li>
                  </ul>

                  <ul class="userpize">
                    <li class="pizeSum">
                      <span>X</span>
                      2.0
                    </li>
                    <li class="pizeTitle">我的奖励</li>
                  </ul>
                </div>

                <div class="teamList">
                  <ul class="team">
                    <li class="teamUser">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team">
                    <li class="teamUser">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team">
                    <li class="teamUser">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team">
                    <li class="teamUser">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>
                </div>
              </div>
            </swiper-slide>-->

            <swiper-slide class="afterBox" v-for="(item,index) in teamList" :key="index">
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

                <div class="userInfo" v-for="(data,idx) in item.memberList" :key="idx">
                  <ul class="user" v-if="data.type==1">
                    <li class="usericon">
                      <img src="@/assets/images/regcom.png" alt class="regcom" />
                      <img :src="data.image" alt />
                    </li>
                    <li class="userName">{{data.nickName}}</li>
                    <li class="usersType color_0" v-if="data.status==0" @click="openLDWb">去提交</li>
                    <li class="usersType color_1" v-if="data.status==1">审核中</li>
                    <li class="usersType color_2" v-if="data.status==2">已完成</li>
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

      <div class="declare">
        <div class="script_title">
          <img src="@/assets/images/ruledescript.png" alt />
        </div>
        <p>规则说明：</p>
        <p>1.团队中完成任务的人数越多奖励越高；</p>
        <div class="tab">
          <div>
            <img src="@/assets/images/×1men.png" alt />
            <span>队长奖励 X 1.0</span>
            <span>队员奖励 X 1.0</span>
          </div>
          <div>
            <img src="@/assets/images/×3men.png" alt />
            <span>队长奖励 X 1.6</span>
            <span>队员奖励 X 1.3</span>
          </div>
          <div>
            <img src="@/assets/images/×5men.png" alt />
            <span>队长奖励 X 2.0</span>
            <span>队员奖励 X 1.5</span>
          </div>
        </div>
        <p>
          2.团队任务时间为48小时，48小时内邀请好友加入团队，并提交58棋牌分享任务，即视为组队成功；在以下两种情况下队伍会自动结束
          <br />
          <b>a.队伍中所有人均已完成任务</b>
          <br />
          <b>b.队伍倒计时结束</b>
        </p>
        <p>
          3.奖励发放规则：
          <br />若我的奖励为2.0倍，则用户总领取的奖励金额为 2×2.0=4 元，其中包含2元基础任务奖励，和2元团队任务奖励。
        </p>
        <!-- <p>4.任务基础奖励，将在个人任务审核通过后发放，团队奖励将在组队任务结束时，根据完成情况，逐一发放；</p>
        <p>
          5.团队任务为分享任务的延续，若用户已完成分享任务次数达到10次及以上，则在此页面完成任务只能获得额外奖励，不再获得基础奖励；
          <br />
          <b>示例：队长已完成分享任务10次以上，且组队5人均已完成任务，则队伍结算时，队长的奖励为 2元 × 1.0 =2 元</b>
        </p>
        <p>6.加入队伍后，在倒计时结束前任意时间完成过任务，即视为完成任务；</p>-->
        <p>4.队伍中所有人均可邀请新队员；</p>
        <p>5.每个人最多只能成为一次队员，成为队长的次数不限；</p>
        <p>6.每个人同时最多拥有20支队伍；</p>
      </div>
      <div class="blak"></div>
      <div class="foterBtn">
        <div class="warnBtn" @click="add(teamId,'提醒队友')">提醒队员做任务</div>
        <div class="invterBtn" @click="add(teamId,'邀请队友')">邀请队员</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import addWin from "@/components/addWin";
import joinWin from "@/components/joinWin";
export default {
  data() {
    return {
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
        spaceBetween: 8
        // loop: true
      },
      activeIndex: 0
    };
  },
  components: {
    ...mapGetters(["oUserinfo", "barString", "isIOS"]),
    addWin,
    joinWin
  },
  created() {
    let that = this;
    let p = new Promise(function(resolve, reject) {
      that.getImg();
    });
  },
  mounted() {
    this.getImgReq(this.parms);
    this.getPizeSum();
  },
  computed: {},
  methods: {
    fnGoBack() {
      console.log(this.isIOS);
      if (this.isIOS) {
        this.$bridge.callhandler("DX_goBack");
      } else {
        android.DX_goBack({});
      }
    },
    openLDWb() {
      let href = window.location.href;
      let str = href.split("#/")[0];
      // let newUrl = `${str}#/share?webhashead=1`;
      let newUrl = "http://202.60.235.20/dist/#/moments/:type?webhashead=1";
      // let newUrl = "http://202.60.235.20/dist/#/moments/58";
      if (this.isIOS) {
        this.$bridge.callhandler("DX_openLDWb", { newUrl }, data => {});
      } else {
        const data = android.DX_openLDWb(newUrl);
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
          this.$toast.fail("创建失败！");
        });
    },
    joinBtn(flag) {
      //加入队伍
      const classCode =
        this.platformType === 2 ? "WECHAT_POSTER_YG" : "WECHAT_POSTER_58";
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode },
          data => {
            this.searchMyteam(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ classCode })
        );
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
            this.getImgReq(this.parms);

            // let list = res.datas;
            // for (let i = 0; i < list.length; i++) {
            //   let item = list[i];
            //   // if (!this.teamId && item.totalNum < 5) {
            //   //   this.teamId = item.teamId;
            //   // }
            //   let itemDate = new Date().getTime();
            //   let endDate = item.overDate - itemDate;
            //   let H = parseInt(endDate / 1000 / 60 / 60);
            //   let F = parseInt((endDate / 1000 / 60) % 60);
            //   let S = parseInt((endDate / 1000) % 60);
            //   list[i].H = this.dateStr(H);
            //   list[i].F = this.dateStr(F);
            //   list[i].S = this.dateStr(S);
            //   this.teamList.push(list[i])
            //   console.log(list[i])
            // }
            //   console.log("111111")
            //   console.log(this.teamList)

            // this.$forceUpdate();
          } else {
            this.$toast.fail(code.message);
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
    getImg() {
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
    dateStr(str) {
      if (str < 10) {
        return `0${str}`;
      } else {
        return str;
      }
    },
    getPizeSum() {
      $api
        .postRequest("/user/task/v6/searchMy58TeamTotalAmount", this.parms)
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

    getImgReq(parms) {
      $api
        .postRequest("/user/task/v6/searchMy58TaskTeam", parms)
        .then(res => {
          if (res.code == 0) {
            let list = res.datas;
            if (list) {
              for (let i = 0; i < list.length; i++) {
                let item = list[i];

                // let data = item.memberList;
                // for (let i = 0; j < data.length; j++) {
                //   if (data[j].type == 1) {
                //     this.nickName = data.nickName;
                //   }
                // }

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
            } else {
              this.creatTeam(true);
            }
          } else {
            // this.$toast.fail(code.message);
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
  overflow-y: scroll;
  .scroll_view {
    margin-top: 64px;
    margin-bottom: 70px;
    padding-top: 152px;
    background-image: url("../assets/images/redpack.png");
    background-size: 100%;
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
    .tip {
      height: 60px;
      background: #fdf8e5;
      margin: 0 20px;
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      position: relative;
      .regrec {
        width: 8px;
        height: 34px;
        position: absolute;
        top: 52px;
        left: 20px;
        z-index: 10;
      }
      .regrecR {
        width: 8px;
        height: 34px;
        position: absolute;
        top: 52px;
        right: 20px;
        z-index: 10;
      }
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
      top: 270px;
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
      margin-top: 17px;
      position: relative;
      .scroll_conten {
        .conten {
          .afterBox {
            height: 350px;
            .basicInfo {
              background: #fdf8e5;
              border-radius: 4px;
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
              .userInfo {
                position: absolute;
                top: 80px;
                width: 335px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 120px;
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
                height: 150px;
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
        b {
          font-weight: 400;
          color: #977b78;
        }
      }
      .tab {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          img {
            width: 53px;
            height: 53px;
          }
          span {
            font-size: 12px;
            font-weight: 400;
            font-style: normal;
            text-decoration: none;
            font-family: 微软雅黑;
            color: #7f463f;
          }
        }
      }
    }
    .blak {
      height: 20px;
    }
    .foterBtn {
      // padding: 10px 20px;
      width: 100%;
      height: 70px;
      position: fixed;
      bottom: 0;
      z-index: 100;
      background: #450005;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      div {
        width: 150px;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        border-radius: 6px;
      }
      .warnBtn {
        border: 1px solid #fff;
        color: #fff;
      }
      .invterBtn {
        background: #ffd354;
        color: #791a22;
      }
    }
  }
}
</style>