<template>
  <div class="invite">
    <m-nav title="邀请亲友赚现金" />
    <m-bar
      text="通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容 通知内容"
    />
    <div class="main-wrapper">
      <div class="banner"></div>
      <div class="title-wrapper">
        <div class="nav-title"
             v-bind:class="activeType==='phone-invite'?'nav-title nav-title-active':'nav-title'"
             @click="activeType='phone-invite'"
        >
          <p>手机号邀请</p>
        </div>
        <div class="nav-title"
             v-bind:class="activeType!=='phone-invite'?'nav-title nav-title-active':'nav-title'"
             @click="activeType='txl-invite'"
        >
          <p>通讯录邀请</p>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="phone-invite" v-if="activeType==='phone-invite'">
          <div class="title">
            请输入对方手机号码
          </div>
          <div class="step step01">
            <div class="step-icon">
              第一步
            </div>
            <div class="input-wrapper" @click="focusTelphone">
              <span class="tel-icon"></span>
              <input type="text" placeholder="请输入11位手机号码" maxlength="11" ref="telphone">
            </div>
            <div class="txl-icon"></div>
          </div>
          <div class="step step02">
            <div class="step-icon">
              第二步
            </div>
            <div class="invite-btn">
              <div class="xhb-icon"></div>
              <div class="text">邀请亲友赚现金</div>
            </div>
          </div>
          <div class="bottom-text">亲友在身边直接扫码</div>
          <div class="tips-wrapper">
            <div class="tips-icon"></div>
            <div class="tips-text">
              <p>选择通讯录好友发送短信给好友，好友通过短信中的链接注册YG账号</p>
              <p>观看视频半小时以上，您即可获得奖励</p>
            </div>
          </div>
        </div>
        <div class="txl-invite" v-if="activeType==='txl-invite'">
          <div class="top-text">
            全部邀请成功预计可得
            <span class="red-money">2200元</span>
          </div>
          <div class="btn-invite-all">
            一键全部邀请
          </div>
          <div class="invite-table">
            <div class="invite-row invite-t-head">
              <div>昵称</div>
              <div>手机号码</div>
              <div>收益</div>
              <div>操作</div>
            </div>
            <div class="invite-row invite-t-body">
              <div>李佳佳</div>
              <div>xxxxxxx1254</div>
              <div class="money">2元</div>
              <div>
                <span class="invite-btn">邀请加入</span>
              </div>
            </div>
            <div class="invite-row invite-t-body">
              <div>李佳佳</div>
              <div>xxxxxxx1254</div>
              <div class="money">2元</div>
              <div>
                <span class="invite-btn">邀请加入</span>
              </div>
            </div>
            <div class="invite-row invite-t-body">
              <div>李佳佳</div>
              <div>xxxxxxx1254</div>
              <div class="money">2元</div>
              <div>
                <span class="invite-btn">邀请加入</span>
              </div>
            </div>
            <div class="invite-row invite-t-body">
              <div>李佳佳</div>
              <div>xxxxxxx1254</div>
              <div class="money">2元</div>
              <div>
                <span class="invite-btn">邀请加入</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mNav from "@/components/m-nav";
import mBar from "@/components/m-bar";

export default {
  name: "home",
  components: {
    mNav,
    mBar
  },
  data() {
    return {
      // 当前展示的为
      // phone-invite  手机号邀请
      // txl_invite  通讯录邀请
      activeType:'phone-invite',
    };
  },
  methods: {
    focusTelphone(){
      this.$refs.telphone.focus();
    }

  }
};
</script>
<style lang='less' scoped>
  .invite{
    width:375px;
    height:100vh;
    display: flex;
    flex-direction: column;
    background:linear-gradient(180deg,rgba(144,20,31,1) 0%,rgba(199,10,26,1) 17%,rgba(173,39,45,1) 31%,rgba(174,39,45,1) 100%);
  }
  .main-wrapper {
    overflow: auto;
    flex:1;
    .banner{
      width: 375px;
      height: 122px;
      margin-top: 28px;
      background-image: url("./images/banner.png");
      background-size: 100% 100%;
    }
    .title-wrapper{
      display: flex;
      flex-direction: row;
      align-items:flex-end;
      width: 344px;
      margin: 0 auto;
      .nav-title{
        position: relative;
        margin-top: -14px;
        width:172px;
        height: 45px;
        background:rgba(255,255,255,1);
        border-radius:10px 10px 0px 0px;
        background: #FDEAAB;
        text-align: center;
        font-size: 16px;
        color:#EB6515;
        p{
          line-height: 22px;
          margin: 9px 0 auto 0;
        }
        &.nav-title-active{
          height:50px;
          background: #FFF;
          color:#333333;
          p{
            margin: 14px 0;
          }
        }
      }
    }
    .content-wrapper{
      margin: 0 auto;
      width:344px;
      height:414px;
      background:rgba(255,255,255,1);
      border-radius:0px 0px 10px 10px;
      border: 1px solid transparent;
      // 手机号邀请
      .phone-invite{
        .title{
          width:236px;
          height:25px;
          margin: 19px auto 0 auto;
          background-image: url("./images/title_bg1.png");
          background-size: 100% 100%;
          font-size: 16px;
          color:#B50D1B;
          line-height: 22px;
          text-align: center;
        }
        .step{
          width: 100%;
          position: relative;
          &.step01{
            margin-top: 22px;
          }
          &.step02{
            margin-top: 31px;
          }
          .step-icon{
            position: absolute;
            width: 60px;
            height: 34px;
            left:-10px;
            top: 50%;
            transform: translateY(-50%);
            background-image: url("./images/step_icon.png");
            background-size: 100% 100%;
            color:#F9F993;
            text-align: center;
            font-size: 12px;
            line-height: 34px;
          }
          .txl-icon{
            position: absolute;
            width:30px;
            height:33px;
            left: 289px;
            top:50%;
            transform: translateY(-50%);
            background-image: url("./images/txl_icon.png");
            background-size: 100% 100%;
          }
          .input-wrapper{
            width:193px;
            height:41px;
            background:rgba(254,252,242,1);
            border-radius:3px;
            border:1px solid rgba(255,155,3,1);
            margin: 0 auto;
            position: relative;
            .tel-icon{
              position: absolute;
              display: inline-block;
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
              width:13px;
              height:20px;
              background-image: url("./images/tel_icon.png");
              background-size: 100% 100%;
            }
            >input{
              &::-webkit-input-placeholder{
                color:#DED5C7;
              }
              position: absolute;
              left:35px;
              top:50%;
              transform: translateY(-50%);
              width:130px;
              height:20px;
              font-size:14px;
              font-weight:500;
              line-height:20px;
              color:#000;
              background:rgba(254,252,242,1);
              outline:none;
              border:0px;
            }
          }
          .invite-btn{
            position: relative;
            margin: 0 auto;
            width:210px;
            height:46px;
            background:linear-gradient(180deg,rgba(253,131,50,1) 0%,rgba(249,94,29,1) 100%);
            box-shadow:0px 5px 5px 0px rgba(174,39,45,0.2);
            border-radius:23px;
            .xhb-icon{
              position: absolute;
              left:40px;
              top:50%;
              transform: translateY(-50%);
              width:27px;
              height:33px;
              background-image: url("./images/xhb_icon.png");
              background-size: 100% 100%;
            }
            .text{
              margin-left: 75px;
              font-size:14px;
              font-weight:normal;
              color:rgba(255,255,255,1);
              line-height:46px;
            }
          }
        }
        .bottom-text{
          text-align: center;
          margin-top: 20px;
          height:20px;
          font-size:14px;
          color:rgba(250,104,35,1);
          line-height:20px;
        }
        .tips-wrapper{
          margin-top: 54px;
          display: flex;
          flex-direction: row;
          .tips-icon{
            width: 18px;
            height: 18px;
            background-image: url("images/tips_icon.png");
            background-size: 100% 100%;
            margin: 0 8px 0 24px;
          }
          .tips-text{
            width:270px;
            font-size:12px;
            color:rgba(102,102,102,1);
            line-height:18px;
            p{
              margin: 0;
            }
          }
        }
      }
      // 通讯录邀请
      .txl-invite{
        .top-text{
          height:22px;
          font-size:16px;
          color:rgba(51,51,51,1);
          line-height:22px;
          text-align: center;
          margin-top: 28px;
          .red-money{
            color:#D4080C;
          }
        }
        .btn-invite-all{
          margin: 16px auto 0 auto;
          width:210px;
          height:46px;
          background:linear-gradient(180deg,rgba(254,205,51,1) 0%,rgba(243,152,32,1) 100%);
          box-shadow:0px 5px 5px 0px rgba(174,39,45,0.2);
          border-radius:23px;
          color:#FFF;
          line-height: 46px;
          text-align: center;
          font-size: 14px;
        }
        .invite-table{
          margin: 30px 13px 0 13px;
          .invite-row{
            display: flex;
            flex-direction: row;
            &.invite-t-head{
              >div{
                font-size: 14px;
                font-weight: bold;
                border-bottom: 1px #979797 dashed;
              }
            }
            &.invite-t-body{
              >div{
                &:nth-child(2){
                  font-size: 12px;
                }
              }
            }
            >div{
              flex:1;
              text-align: center;
              line-height: 42px;
              border-bottom: 1px #F2F2F2 solid;
              font-size: 13px;
              &:nth-child(1){
                width: 28px;
              }
              &:nth-child(2){
                width: 56px;
              }
              &:nth-child(3){
                width: 28px;
              }
              &:nth-child(4){
                width: 28px;
              }
              &.money{
                font-weight:600;
                color:#D4080C;
              }
              .invite-btn{
                font-size:10px;
                color:#FF8B29;
                padding: 0 8px;
                height:19px;
                border-radius:10px;
                border:1px solid rgba(255,139,41,1);
              }
            }
          }
        }
      }
    }
  }
</style>
