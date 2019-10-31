


<template>
  <div class="groupTask_page">
    <div class="header">
      <div class="back">
        <img class="sum_gold" src="@/assets/images/left.png" alt />
      </div>
      <div class="title">团队分享任务</div>
      <div class="titltBtn">组队记录</div>
    </div>
    <div class="tip">
      <div>
        <span class="title">团队任务 :</span>
        <span class="category">58棋牌分享</span>
      </div>
      <div>
        <span class="title">累计奖金 :</span>
        <img src="@/assets/images/prize.png" alt />
        <span class="sum">995260</span>
      </div>
    </div>
    <div class="jointema">
      <div class="joinBtn">加入队伍</div>
    </div>
    <div class="carousel">
      <img src="@/assets/images/rightAfter.png" alt class="leftAfter" />
      <img src="@/assets/images/rightAfter.png" alt class="rightAfter" />
      <div class="scroll_conten">
        <div class="conten">
          <div class="afterBox">
            <div class="basicInfo">
              <div class="infoTitle">
                <p>
                  队伍1
                  <span>/2</span>
                </p>
              </div>
              <div class="date">
                <span class="dateNum">23</span>
                <span class="dateIcon">:</span>
                <span class="dateNum">53</span>
                <span class="dateIcon">:</span>
                <span class="dateNum">53</span>
              </div>
              <div class="userInfo">
                <ul class="user">
                  <li class="usericon">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="userName">dsfjdfskfd</li>
                  <li class="usersType">审核中</li>
                </ul>
                <ul class="userpize">
                  <li class="pizeTitle">我的奖励</li>
                  <li class="pizeSum">
                    <span>X</span>
                    1.0
                  </li>
                </ul>
              </div>
              <div class="teamList">
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="afterBox">
            <div class="basicInfo">
              <div class="infoTitle">
                <p>
                  队伍1
                  <span>/2</span>
                </p>
              </div>
              <div class="date">
                <span class="dateNum">23</span>
                <span class="dateIcon">:</span>
                <span class="dateNum">53</span>
                <span class="dateIcon">:</span>
                <span class="dateNum">53</span>
              </div>
              <div class="userInfo">
                <ul class="user">
                  <li class="usericon">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="userName">dsfjdfskfd</li>
                  <li class="usersType">审核中</li>
                </ul>
                <ul class="userpize">
                  <li class="pizeTitle">我的奖励</li>
                  <li class="pizeSum">
                    <span>X</span>
                    1.0
                  </li>
                </ul>
              </div>
              <div class="teamList">
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
                <ul class="team">
                  <li class="teamUser">
                    <img src="@/assets/images/headportrait2.png" alt />
                  </li>
                  <li class="teamName">gfhyjhjkg</li>
                  <li class="teamType">已完成</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="declare">
      <p>规则说明：</p>
      <p>1.团队中完成任务的人数越多奖励越高；</p>
      <div class="tab">
        <ul>
          <li></li>
          <li>队长奖励 X 1.0</li>
          <li>队员奖励 X 1.0</li>
        </ul>
        <ul>
          <li></li>
          <li>队长奖励 X 1.6</li>
          <li>队员奖励 X 1.3</li>
        </ul>
        <ul>
          <li></li>
          <li>队长奖励 X 2.0</li>
          <li>队员奖励 X 1.5</li>
        </ul>
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
    <div class="foterBtn">
      <div class="warnBtn">提醒队员做任务</div>
      <div class="invterBtn">邀请队员</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>


<style lang='less' scoped>
.groupTask_page {
  height: 100vh;
  overflow-y: scroll;
  .header {
    height: 40px;
    width: 100%;
    background: #5abbeb;
    position: fixed;
    z-index: 10;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .back {
      width: 30px;
      text-align: center;
      img {
        height: 14px;
        width: 8px;
        vertical-align: middle;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      font-style: normal;
      text-decoration: none;
      font-family: 微软雅黑;
      color: rgb(255, 255, 255);
      padding-left: 45px;
    }
    .titltBtn {
      width: 80px;
      font-size: 18x;
      color: #ffff;
      text-align: center;
    }
  }
  .tip {
    margin-top: 40px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    div {
      .title {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        text-decoration: none;
        font-family: 微软雅黑;
        color: rgb(102, 102, 102);
      }
      .category {
        font-size: 14px;
        font-weight: 700;
        font-style: normal;
        text-decoration: none;
        font-family: 微软雅黑;
        color: rgb(245, 60, 58);
      }
      img {
        vertical-align: bottom;
        width: 20px;
        height: 20px;
        margin-right: 4px;
      }
      .sum {
        font-size: 16px;
        font-weight: 700;
        font-style: normal;
        text-decoration: none;
        font-family: 微软雅黑;
        color: rgb(0, 0, 0);
      }
    }
  }
  .jointema {
    height: 30px;
    text-align: right;
    margin-bottom: 8px;
    div {
      width: 100px;
      height: 30px;
      display: inline-block;
      background: #fa9291;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      line-height: 30px;
      text-align: right;
      padding-right: 8px;
    }
    .joinBtn {
      position: fixed;
      top: 94px;
      right: 0;
      z-index: 100;
    }
  }
  .carousel {
    height: 342px;
    position: relative;
    .leftAfter {
      position: absolute;
      left: -1px;
      top: 165px;
      transform: rotate(180deg);
      width: 30px;
      height: 20px;
      z-index: 100;
    }
    .rightAfter {
      position: absolute;
      right: -1px;
      top: 165px;
      width: 30px;
      height: 20px;
      z-index: 100;
    }
    .scroll_conten {
      width: 331px;
      height: 322px;
      margin: auto;
      position: relative;
      .conten {
        position: absolute;
        left: -6px;
        height: 322px;
        white-space: nowrap;
        overflow: hidden;
        .afterBox {
          margin-top: 17px;
          display: inline-block;
          .basicInfo {
            width: 331px;
            height: 305px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 0 6px;
            position: relative;
            .infoTitle {
              position: absolute;
              left: 10px;
              top: -17px;
              background: #fff;
              width: 105px;
              height: 33px;
              line-height: 33px;
              border: 1px solid #666;
              border-radius: 6px;
              p {
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: 微软雅黑;
                color: rgb(0, 0, 0);
                padding: 0px;
                margin: 0px;
                word-break: break-word;
                span {
                  font-size: 10px;
                  font-weight: 400;
                  font-style: normal;
                  text-decoration: none;
                  font-family: 微软雅黑;
                  color: rgb(153, 153, 153);
                }
              }
            }
            .date {
              height: 40px;
              text-align: right;
              padding: 5px;
              .dateNum {
                display: inline-block;
                background: #4db0f080;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 5px;
              }
              .dateIcon {
                display: inline-block;
                width: 14px;
                font-size: 14px;
                font-weight: 700;
                font-family: 微软雅黑;
                color: rgb(0, 0, 0);
              }
            }
            .userInfo {
              height: 100px;
              position: relative;
              .user {
                position: absolute;
                left: 6px;
                top: 10px;
                padding: 10px;
                .usericon {
                  width: 60px;
                  height: 60px;
                  text-align: center;
                  line-height: 60px;
                  img {
                    width: 55px;
                    height: 55px;
                  }
                }
                .userName {
                  height: 20px;
                }
                .usersType {
                  height: 20px;
                  width: 60px;
                  text-align: center;
                  line-height: 18px;
                  font-size: 14px;
                  color: #3366ff;
                  border: 1px solid #3366ff;
                  border-radius: 6px;
                }
              }
              .userpize {
                position: absolute;
                right: 20px;
                top: 20px;
                text-align: right;
                .pizeTitle {
                  display: inline-block;
                  width: 60px;
                  height: 20px;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 400;
                  font-style: normal;
                  text-decoration: none;
                  font-family: 微软雅黑;
                  color: #fff;
                  background: #666;
                }
                .pizeSum {
                  height: 43px;
                  font-size: 32px;
                  font-weight: 400;
                  font-family: 微软雅黑;
                  color: #ff6666;
                  span {
                    font-size: 16px;
                  }
                }
              }
            }
            .teamList {
              margin-top: 40px;
              height: 90px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              .teamUser {
                width: 48px;
                height: 48px;
                img {
                  width: 48px;
                  height: 48px;
                }
              }
              .teamName {
                text-align: center;
                height: 20px;
                width: 50px;
              }
              .teamType {
                text-align: center;
                height: 20px;
                width: 50px;
                border-radius: 6px;
                border: 1px solid #666;
                font-size: 14px;
                font-weight: 400;
                font-family: 微软雅黑;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
  .declare {
    margin: 0 20px;
    margin-bottom: 90px;
    p {
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      font-family: 微软雅黑;
      color: rgb(102, 102, 102);
    }
    .tab {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  .foterBtn {
    padding: 10px 20px;
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    z-index: 100;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    div {
      width: 150px;
      padding: 0 2%;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      font-weight: 400;
      font-family: 微软雅黑;
      text-align: center;
      border: 1px solid #666;
      background: #fff;
      border-radius: 6px;
    }
    .warnBtn {
      //   display: inline-block;
    }
    .invterBtn {
      background: #3568ff;
      color: #fff;
    }
  }
}
</style>