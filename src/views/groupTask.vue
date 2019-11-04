


<template>
  <div class="groupTask_page">
    <div class="scroll_view">
      <div class="header">
        <div class="back">
          <img class="sum_gold" src="@/assets/images/back.png" alt />
        </div>
        <div class="title">团队分享任务</div>
        <div class="titltBtn" @click="grouLog(true)">组队记录</div>
      </div>

      <div class="tip">
        <img src="@/assets/images/regrec.png" alt class="regrec" />
        <div>
          <span class="title">团队任务 :</span>
          <span class="category">58棋牌分享</span>
        </div>
        <div>
          <span class="title">累计奖金 :</span>
          <img src="@/assets/images/redpackcup.png" alt />
          <span class="sum">995260</span>
        </div>
      </div>
      <div class="joinBtn" @click="joinBtn(true)">
        <img src="@/assets/images/teammar.png" alt />
        <span>加入队伍</span>
      </div>
      <div class="carousel">
        <div class="scroll_conten" @touchmove.prevent @click.prevent>
          <swiper class="conten swipe" @slideChange="onChange" :options="swipertop" ref="Swiper">
            <swiper-slide class="afterBox">
              <div class="basicInfo">
                <div class="infoTitle">
                  <img src="@/assets/images/formteam.png" alt />
                  <span>创建队伍</span>
                </div>
                <div class="date">
                  <span class="dateNum">24</span>
                  <span class="dateIcon">:</span>
                  <span class="dateNum">00</span>
                  <span class="dateIcon">:</span>
                  <span class="dateNum">00</span>
                </div>
                <div class="userInfo">
                  <ul class="user">
                    <li class="usericon">
                      <img src="@/assets/images/regcom.png" alt class="regcom" />
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="userName">dsfjdfskfd</li>
                    <li class="usersType">审核中</li>
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
            <swiper-slide class="afterBox" v-for="(item,index) in teamList" :key="index">
              <div class="basicInfo">
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
                <div class="userInfo" v-for="(data,idx) in item.memberList" :key="idx">
                  <ul class="user" v-if="data.type==1">
                    <li class="usericon">
                      <img src="@/assets/images/regcom.png" alt class="regcom" />
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="userName">dsfjdfskfd</li>
                    <li class="usersType" v-if="item.completeNum==0">待提交</li>
                    <li class="usersType" v-if="item.completeNum==1">审核中</li>
                    <li class="usersType" v-if="item.completeNum==2">已完成</li>
                  </ul>
                  <ul class="userpize">
                    <li class="pizeSum">
                      <span>X</span>
                      {{data.multiple}}
                    </li>
                    <li class="pizeTitle">我的奖励</li>
                  </ul>
                </div>
                <div class="teamList">
                  <ul class="team" v-if="item.memberList[0]&&item.memberList[0].type==2">
                    <li class="teamUser">
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="teamName">{{item.memberList[0].nickName}}</li>
                    <li class="teamType" v-if="item.memberList[0].status==0">待提交</li>
                    <li class="teamType" v-if="item.memberList[0].status==1">审核中</li>
                    <li class="teamType" v-if="item.memberList[0].status==2">已完成</li>
                  </ul>
                  <ul class="team" v-if="!item.memberList[0]">
                    <li class="teamUser" @click="add(true)">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team" v-if="item.memberList[1]&&item.memberList[1].type==2">
                    <li class="teamUser">
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="teamName">{{item.memberList[1].nickName}}</li>
                    <li class="teamType" v-if="item.memberList[1].status==0">待提交</li>
                    <li class="teamType" v-if="item.memberList[1].status==1">审核中</li>
                    <li class="teamType" v-if="item.memberList[1].status==2">已完成</li>
                  </ul>
                  <ul class="team" v-if="!item.memberList[1]">
                    <li class="teamUser" @click="add(true)">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team" v-if="item.memberList[2]&&item.memberList[2].type==2">
                    <li class="teamUser">
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="teamName">{{item.memberList[2].nickName}}</li>
                    <li class="teamType" v-if="item.memberList[2].status==0">待提交</li>
                    <li class="teamType" v-if="item.memberList[2].status==1">审核中</li>
                    <li class="teamType" v-if="item.memberList[2].status==2">已完成</li>
                  </ul>
                  <ul class="team" v-if="!item.memberList[2]">
                    <li class="teamUser" @click="add(true)">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team" v-if="item.memberList[3]&&item.memberList[3].type==2">
                    <li class="teamUser">
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="teamName">{{item.memberList[3].nickName}}</li>
                    <li class="teamType" v-if="item.memberList[3].status==0">待提交</li>
                    <li class="teamType" v-if="item.memberList[3].status==1">审核中</li>
                    <li class="teamType" v-if="item.memberList[3].status==2">已完成</li>
                  </ul>
                  <ul class="team" v-if="!item.memberList[3]">
                    <li class="teamUser" @click="add(true)">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>

                  <ul class="team" v-if="item.memberList[4]&&item.memberList[4].type==2">
                    <li class="teamUser">
                      <img src="@/assets/images/user.png" alt />
                    </li>
                    <li class="teamName">{{item.memberList[4].nickName}}</li>
                    <li class="teamType" v-if="item.memberList[4].status==0">待提交</li>
                    <li class="teamType" v-if="item.memberList[4].status==1">审核中</li>
                    <li class="teamType" v-if="item.memberList[4].status==2">已完成</li>
                  </ul>
                  <ul class="team" v-if="!item.memberList[4]">
                    <li class="teamUser" @click="add(true)">
                      <img src="@/assets/images/add.png" alt />
                    </li>
                    <li class="teamName">立即邀请</li>
                    <li class="teamType">待提交</li>
                  </ul>
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
        <p>2.团队任务时间为48小时，48小时内邀请好友加入团队，并提交58棋牌分享任务，即视为组队成功；在以下两种情况下队伍会自动结束</p>
        <p>
          3.奖励发放规则：
          <br />若我的奖励为2.0倍，则用户总领取的奖励金额为 2×2.0=4 元，其中包含2元基础任务奖励，和2元团队任务奖励。
        </p>
        <p>4.任务基础奖励，将在个人任务审核通过后发放，团队奖励将在组队任务结束时，根据完成情况，逐一发放；</p>
        <p>
          5.团队任务为分享任务的延续，若用户已完成分享任务次数达到10次及以上，则在此页面完成任务只能获得额外奖励，不再获得基础奖励；
          <br />示例：队长已完成分享任务10次以上，且组队5人均已完成任务，则队伍结算时，队长的奖励为 2元 × 1.0 =2 元
        </p>
        <p>6.加入队伍后，在倒计时结束前任意时间完成过任务，即视为完成任务；</p>
        <p>7.队伍中所有人均可邀请新队员；</p>
        <p>8.每个人最多只能成为一次队员，成为队长的次数不限；</p>
        <p>9.每个人同时最多拥有20支队伍；</p>
      </div>
      <div class="blak"></div>
      <div class="foterBtn">
        <div class="warnBtn">提醒队员做任务</div>
        <div class="invterBtn">邀请队员</div>
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
      parms: "",
      teamList: [],
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
    ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  created() {
    let that = this;
    let p = new Promise(function(resolve, reject) {
      that.getImg();
    });
  },
  mounted() {
    this.getImgReq(this.parms);
  },
  computed: {},
  methods: {
    add(flag) {
      $api
        .postRequest("/user/task/v6/searchTeamShareUrl", this.parms)
        .then(res => {
          console.log(res);
          if (res.code == 0) {
          } else {
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          this.$toast.fail("创建失败！");
        });
    },
    joinBtn(flag) {
      let parm = "";
      const classCode =
        this.platformType === 2 ? "WECHAT_POSTER_YG" : "WECHAT_POSTER_58";
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode, teamId: "1191334465153208320" },
          data => {
            parm = data;
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ classCode, teamId: "1191334465153208320" })
        );
        parm = data;
      }
      $api
        .postRequest("/user/task/v6/add58TeamMember", parm)
        .then(res => {
          if (res.code == 0) {
          } else {
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          this.$toast.fail("创建失败！");
        });
    },
    creatTeam(flag) {
      $api
        .postRequest("/user/task/v6/create58TaskTeam", this.parms)
        .then(res => {
          if (res.code == 0) {
            this.$toast.fail("创建成功！");
            let list = res.datas;
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let date = new Date(item.overDate);
              let H = date.getHours();
              let F = date.getMinutes();
              let S = date.getSeconds();
              list[i].H = H;
              list[i].F = F;
              list[i].S = S;
            }
            let arry = this.teamList.concat(list);
            this.teamList = arry;
            this.$forceUpdate();
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
      let str = href.split("#/");
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
    getImgReq(parms) {
      $api
        .postRequest("/user/task/v6/searchMy58TaskTeam", parms)
        .then(res => {
          if (res.code == 0) {
            let list = res.datas;
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let date = new Date(item.overDate);
              let H = date.getHours();
              let F = date.getMinutes();
              let S = date.getSeconds();
              list[i].H = H;
              list[i].F = F;
              list[i].S = S;
            }
            this.teamList = list;
          } else {
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
        z-index: 999;
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
      height: 342px;
      position: relative;
      .scroll_conten {
        // width: 332px;
        height: 342px;
        // margin: auto;
        // position: relative;
        .conten {
          // position: absolute;
          // left: -4px;
          height: 342px;
          white-space: nowrap;
          overflow: hidden;
          margin: 0;
          .afterBox {
            margin-top: 17px;
            // width: 400px;
            // margin: 17px 20px 0 20px;
            // display: inline-block;
            .basicInfo {
              // width: 332px;
              // height: 325px;
              background: #fdf8e5;
              border-radius: 4px;
              // margin: 0 4px;
              position: relative;
              .infoTitle {
                position: absolute;
                left: 10px;
                top: 26px;
                width: 105px;
                height: 38px;
                line-height: 33px;
                line-height: 38px;
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
                padding-top: 30px;
                height: 30px;
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
                }
                .dateIcon {
                  display: inline-block;
                  width: 14px;
                  text-align: center;
                  font-size: 16px;
                  font-weight: 700;
                  font-family: 微软雅黑;
                  color: #711010;
                }
              }
              .userInfo {
                // margin-top: 30px;
                height: 60px;
                position: relative;
                .user {
                  position: absolute;
                  left: 54px;
                  top: 10px;
                  .usericon {
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    position: relative;
                    img {
                      width: 60px;
                      height: 60px;
                    }
                    .regcom {
                      width: 38px;
                      height: 17px;
                      position: absolute;
                      z-index: 10000;
                      top: -9px;
                      left: 10px;
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
                }
                .userpize {
                  position: absolute;
                  right: 30px;
                  top: 20px;
                  text-align: right;
                  .pizeSum {
                    // height: 43px;
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
                margin-top: 80px;
                height: 115px;
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
                  margin-top: 20px;
                  text-align: center;
                  height: 294px;
                  img {
                    width: 294px;
                    height: 53px;
                  }
                }
              }
              .teamList {
                margin-top: 80px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                .teamUser {
                  height: 60px;
                  text-align: center;
                  img {
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