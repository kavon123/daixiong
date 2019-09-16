<template>
  <div class="invite" @click.prevent>
    <div class="main-wrapper">
      <div class="title-wrapper">
        <div
          class="nav-title"
          v-bind:class="activeType==='phone-invite'?'nav-title nav-title-active':'nav-title'"
          @click="activeType='phone-invite'"
        >
          <p>手机号邀请</p>
        </div>
        <div
          class="nav-title"
          v-bind:class="activeType!=='phone-invite'?'nav-title nav-title-active':'nav-title'"
          @click="activeType='txl-invite'"
        >
          <p>通讯录邀请</p>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="phone-invite" v-if="activeType==='phone-invite'" key="1">
          <div class="title">请输入对方手机号码</div>
          <div class="step step01">
            <div class="step-icon">第一步</div>
            <div class="input-wrapper" @click="focusTelphone">
              <span class="tel-icon"></span>
              <input
                type="text"
                placeholder="请输入11位手机号"
                @input="fnInput"
                v-model="phone"
                maxlength="11"
                ref="telphone"
              />
            </div>
            <div class="txl-icon" @click="fnBest(true)"></div>
          </div>
          <div class="step step02">
            <div class="step-icon">第二步</div>
            <div class="invite-btn" @click="fnSubmit" :class="phone?'':'gray'">
              <div class="invite-btn_1">
                <div class="xhb-icon"></div>
                <div class="text">邀请亲友赚现金</div>
              </div>
            </div>
          </div>
          <div class="bottom-text" @click="fnPop('qrcodeShow',true)">亲友在身边直接扫码</div>
          <div class="tips-wrapper">
            <van-icon name="warning" class="tips-icon" />
            <!-- <div class="tips-icon"></div> -->
            <div class="tips-text">
              <p>选择通讯录好友发送短信给好友，好友通过短信中的链接注册58棋牌账号</p>
              <p>好友进入游戏5分钟，您即可获得5元奖励</p>
            </div>
          </div>
        </div>
        <div class="txl-invite" v-if="activeType==='txl-invite'" key="2">
          <div class="top-text">
            全部邀请成功预计可得
            <span class="red-money">{{moneyAll}}元</span>
          </div>
          <!-- <div class="btn-invite-all" @click="fnInvitationAll">一键全部邀请</div> -->
          <div class="invite-table">
            <div class="invite-row invite-t-head">
              <div>昵称</div>
              <div>手机号码</div>
              <div>收益</div>
              <div>操作</div>
            </div>
            <div class="list_ct">
              <template v-if="lists.length===0">
                <img src="./images/permissions.png" alt v-if="!permissions" @click="fnBest(false)" />
                <img src="./images/noList.png" alt v-else />
              </template>
            </div>
            <div class="invite_ov">
              <div class="invite-row invite-t-body" v-for="(item,i) in lists" :key="'row'+i">
                <div>{{item.name}}</div>
                <div>{{item.phone}}</div>
                <div class="money">5元</div>
                <div>
                  <span class="invite-btn" @click="fnInvitation(item.phone)">邀请加入</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-icon name="close" class="close" @click="fnClose" />
    </div>
    <m-qrcode type="58" v-if="qrcodeShow" @close="fnPop" />
  </div>
</template>

<script>
import mQrcode from "@/components/m-qrcode";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    mQrcode
  },
  computed: {
    ...mapGetters(["Phone", "contactsList", "oUserinfo", "isIOS"])
  },
  created() {
    this.lists = this.contactsList;
    this.moneyAll = this.contactsList.length * 5;
  },
  data() {
    return {
      qrcodeShow: false,
      // 当前展示的为
      // phone-invite  手机号邀请
      // txl_invite  通讯录邀请
      activeType: "phone-invite",
      phone: "",
      copyPhone: "",
      permissions: false,
      moneyAll: 0,
      lists: []
    };
  },

  methods: {
    ...mapMutations({
      setContactsList: "SET_CONTACTS_LIST"
    }),
    fnPop(key, val) {
      this[key] = val;
    },
    fnBest(state) {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_getContactsList", {}, data => {
          const obj = JSON.parse(data);
          if (obj.status == 1) {
            this.lists = obj.list;
            this.moneyAll = obj.list.length * 5;
            this.setContactsList(obj.list);
            if (state) {
              this.$router.push("/relative");
            }
          }
        });
      } else {
        const data = android.DX_getContactsList({});
        const obj = JSON.parse(data);
        if (obj.status == 1) {
          this.lists = obj.list;
          this.moneyAll = obj.list.length * 5;
          this.setContactsList(obj.list);
          if (state) {
            this.$router.push("/relative");
          }
        }
      }
    },
    focusTelphone() {
      this.$refs.telphone.focus();
    },
    fnInput(event) {
      if (!/^\d{0,11}$/.test(event.target.value)) {
        this.phone = this.copyPhone;
        return false;
      }
      this.copyPhone = event.target.value;
    },
    fnSubmit() {
      const { phone, oUserinfo } = this;
      if (!phone) {
        this.$toast("请输入手机号!");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$toast("手机号码有误，请重填!");
        return false;
      }
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_openSystemMessage",
          {
            type: "58",
            url: oUserinfo.downloadUrl,
            number: phone
          },
          data => {
            if (data == 1) {
              this.$emit("close", "inviteShow", false);
              this.$emit("close", "winShow", true);
            } else {
              this.$toast("邀请失败！请再次邀请");
            }
          }
        );
      } else {
        const data = android.DX_openSystemMessage(
          JSON.stringify({
            type: "58",
            url: oUserinfo.downloadUrl,
            number: phone
          })
        );
        if (data == 1) {
          this.$emit("close", "inviteShow", false);
          this.$emit("close", "winShow", true);
        } else {
          this.$toast("邀请失败！请再次邀请");
        }
      }
    },
    fnInvitation(val) {
      this.phone = val;
      this.activeType = "phone-invite";
    },
    fnInvitationAll() {
      console.log("fnInvitationAll");
    },
    fnClose() {
      this.$emit("close", "inviteShow", false);
    }
  },
  watch: {
    Phone(val) {
      this.phone = val;
    },
    contactsList(val) {
      this.lists = val;
      this.moneyAll = val.length * 5;
    }
  }
};
</script>
<style lang='less' scoped>
.list_ct {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-top: 50px;
    width: 140px;
    height: 153px;
  }
}
.invite {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  width: 375px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 344px;
    margin: 0 auto;
    .nav-title {
      position: relative;
      margin-top: -14px;
      width: 172px;
      height: 45px;
      border-radius: 10px 10px 0px 0px;
      background: #6e2605;
      text-align: center;
      font-size: 16px;
      color: #eb6515;
      p {
        line-height: 22px;
        margin: 9px 0 auto 0;
      }
      &.nav-title-active {
        height: 50px;
        background: #98380c;
        color: #fcebbd;
        p {
          margin: 14px 0;
        }
      }
    }
  }
  .content-wrapper {
    margin: 0 auto;
    width: 344px;
    background: linear-gradient(#99380c, #6e2605);
    border-radius: 0px 0px 10px 10px;
    // 手机号邀请
    .phone-invite {
      .title {
        width: 236px;
        height: 25px;
        margin: 16px auto 0 auto;
        background-size: 100% 100%;
        font-size: 16px;
        color: #f9e467;
        line-height: 22px;
        text-align: center;
      }
      .step {
        width: 100%;
        position: relative;
        &.step01 {
          margin-top: 22px;
        }
        &.step02 {
          margin-top: 31px;
        }
        .step-icon {
          position: absolute;
          width: 60px;
          height: 34px;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          background-image: url("./images/step_icon.png");
          background-size: 100% 100%;
          color: #f9f993;
          text-align: center;
          font-size: 12px;
          line-height: 34px;
        }
        .txl-icon {
          position: absolute;
          width: 30px;
          height: 33px;
          left: 289px;
          top: 50%;
          transform: translateY(-50%);
          background-image: url("./images/txl_icon.png");
          background-size: 100% 100%;
        }
        .input-wrapper {
          width: 193px;
          height: 42px;
          background: #3d1704;
          border-radius: 42px;
          margin: 0 auto;
          position: relative;
          .tel-icon {
            position: absolute;
            display: inline-block;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 13px;
            height: 20px;
            background-image: url("./images/tel_icon.png");
            background-size: 100% 100%;
          }
          > input {
            &::-webkit-input-placeholder {
              color: #a46c00;
            }

            position: absolute;
            left: 35px;
            top: 50%;
            transform: translateY(-50%);
            width: 130px;
            height: 24px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: #fff;
            outline: none;
            border: 0px;
            background: none;
            outline: none;
            border: 0px;
          }
        }

        .invite-btn {
          position: relative;
          margin: 0 auto;
          width: 210px;
          height: 46px;
          background: url("images/butbg.png") no-repeat;
          background-size: cover;
          .xhb-icon {
            position: absolute;
            left: 34px;
            top: 50%;
            transform: translateY(-43%);
            width: 27px;
            height: 33px;
            background-image: url("./images/xhb_icon.png");
            background-size: 100% 100%;
          }
          .text {
            margin-left: 66px;
            font-size: 14px;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            line-height: 46px;
          }
        }
      }
      .bottom-text {
        text-align: center;
        margin-top: 20px;
        height: 20px;
        font-size: 14px;
        color: #f4e42d;
        line-height: 20px;
      }
      .tips-wrapper {
        margin-top: 42px;
        display: flex;
        flex-direction: row;
        .tips-icon {
          font-size: 20px;
          color: #e69402;
          margin: 0 8px 0 24px;
        }
        .tips-text {
          width: 270px;
          font-size: 12px;
          color: #c5870e;
          line-height: 20px;
          margin-bottom: 25px;
          p {
            margin: 0;
          }
        }
      }
    }
    // 通讯录邀请
    .txl-invite {
      .top-text {
        height: 22px;
        font-size: 16px;
        color: #efc066;
        line-height: 22px;
        text-align: center;
        margin-top: 16px;
        .red-money {
          color: #f4e42d;
        }
      }
      .btn-invite-all {
        margin: 16px auto 0 auto;
        width: 210px;
        height: 46px;
        background: url("images/butbg.png") no-repeat;
        background-size: cover;
        color: #502309;
        line-height: 46px;
        text-align: center;
        font-size: 14px;
      }
      .invite_ov {
        max-height: 260px;
        overflow: auto;
      }
      .invite-table {
        margin: 30px 13px;
        .invite-row {
          display: flex;
          flex-direction: row;
          &.invite-t-head {
            > div {
              font-size: 14px;
              font-weight: bold;
              border-bottom: 1px #aa4a1e dashed;
              color: #efc066;
            }
          }
          &.invite-t-body {
            > div {
              &:nth-child(2) {
                font-size: 12px;
              }
            }
          }
          > div {
            flex: 1;
            text-align: center;
            line-height: 42px;
            border-bottom: 1px #aa4a1e solid;
            color: #efc066;
            font-size: 13px;
            &:nth-child(1) {
              width: 28px;
            }
            &:nth-child(2) {
              width: 56px;
            }
            &:nth-child(3) {
              width: 28px;
            }
            &:nth-child(4) {
              width: 28px;
            }
            &.money {
              font-weight: 600;
              color: #f4e42d;
            }
            .invite-btn {
              font-size: 10px;
              color: #f4e42d;
              padding: 0 8px;
              height: 19px;
              border-radius: 10px;
              border: 1px solid #f4e42d;
            }
          }
        }
      }
    }
  }
}
.close {
  font-size: 35px;
  color: #fff;
  margin-top: 20px;
}
</style>
