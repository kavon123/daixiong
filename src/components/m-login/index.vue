<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent @click.prevent>
        <div class="dialog_ct">
          <div class="title">登录YG电竞</div>
          <div class="input_ct">
            <span class="input_prompt" v-show="sUserName">输入用户名</span>
            <input type="text" placeholder="输入用户名" @blur="fnBlur" v-model="sUserName" class="input" />
            <van-icon
              name="clear"
              class="clear"
              v-show="sUserName"
              @click="fnClearInput('sUserName')"
            />
          </div>
          <div class="input_ct">
            <span class="input_prompt" v-show="sPassword">输入密码</span>
            <input
              type="password"
              placeholder="输入密码"
              @blur="fnBlur"
              v-model="sPassword"
              class="input"
            />
            <van-icon
              name="clear"
              class="clear"
              v-show="sPassword"
              @click="fnClearInput('sPassword')"
            />
          </div>
          <div class="forgot_password" @click="forgetPaw">忘记密码</div>

          <div class="but" @click="fnLogin">登录</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import $api from "@/util/api.js";

export default {
  data() {
    return {
      bOver: false,
      sUserName: "",
      sPassword: ""
    };
  },
  computed: {
    ...mapGetters(["ygUserinfo", "isIOS"])
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO_YG"
    }),
    forgetPaw() {
      if (this.isIOS) {
        this.$bridge.callhandler("DX_gotoBrowser", this.ygUserinfo.loginUrl);
      } else {
        android.DX_gotoBrowser(this.ygUserinfo.loginUrl);
      }
    },
    fnBlur() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    fnClose() {
      this.$emit("close", "loginShow", false);
    },
    fnClearInput(key) {
      this[key] = "";
    },
    fnLogin() {
      const _this = this;
      const { sUserName, sPassword } = _this;
      if (!sUserName) {
        this.$toast.fail("请输入用户名");
        return;
      }
      if (!sPassword) {
        this.$toast.fail("请输入密码");
        return;
      }
      _this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "正在登陆..."
      });
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          {
            loginType: 1,
            account: _this.sUserName,
            pwd: _this.sPassword
          },
          data => {
            this.fnLoginReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({
            loginType: 1,
            account: _this.sUserName,
            pwd: _this.sPassword
          })
        );
        this.fnLoginReq(data);
      }
    },
    fnLoginReq(data) {
      $api
        .postRequest("/user/v3/loginYg", data)
        .then(res => {
          this.$toast.clear();
          if (res.code === 0) {
            this.$emit("fnInfoAll");
            const oUserinfo = Object.assign(this.ygUserinfo, res.datas);
            this.setUserInfo(oUserinfo);
            this.$toast.success("登录成功");
            this.sUserName = "";
            this.sPassword = "";
            this.$emit("close", "bIsLogin", false);
            this.show = true;
            setTimeout(() => {
              this.fnClose();
            }, 500);
          } else {
            this.$toast.fail(res.msg);
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
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .dialog_ct {
    width: 300px;
    height: 300px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 37px;
    border-radius: 5px;
    .title {
      color: #333333;
      height: 30px;
      font-size: 17px;
      margin-top: 20px;
      margin-bottom: 8px;
    }
    .input_ct {
      position: relative;
      width: 226px;
      border-bottom: 1px solid #d1d1d1;
      padding: 6px 10px;
      margin-top: 22px;
      .input_prompt {
        color: #999999;
        position: absolute;
        left: 12px;
        top: -8px;
      }
      .input {
        width: 90%;
        font-size: 14px;
        border: none;
      }
      .clear {
        color: #ccc;
        font-size: 14px;
      }
    }
    .forgot_password {
      width: 226px;
      text-align: right;
      padding-top: 6px;
      color: #367dfd;
    }
    .but {
      width: 140px;
      height: 40px;
      background: #367dfd;
      border-radius: 5px;
      font-size: 15px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin-top: 30px;
    }
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}

.dialog_m {
  background: rgba(0, 0, 0, 0);
}

.message {
  position: absolute;
  width: 130px;
  height: 84px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .passed {
    font-size: 28px;
    margin-bottom: 12px;
    color: #fff;
  }
  .message_text {
    color: #fff;
  }
}
.style_show {
  display: none;
}
</style>