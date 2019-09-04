<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" :class="show?'':'style_show'">
        <div class="dialog_ct">
          <div class="title">登录YG电竞</div>
          <div class="input_ct">
            <span class="input_prompt" v-show="sUserName">输入用户名</span>
            <input type="text" placeholder="输入用户名" v-model="sUserName" class="input" />
            <van-icon
              name="clear"
              class="clear"
              v-show="sUserName"
              @click="fnClearInput('sUserName')"
            />
          </div>
          <div class="input_ct">
            <span class="input_prompt" v-show="sPassword">输入密码</span>
            <input type="password" placeholder="输入密码" v-model="sPassword" class="input" />
            <van-icon
              name="clear"
              class="clear"
              v-show="sPassword"
              @click="fnClearInput('sPassword')"
            />
          </div>
          <div class="forgot_password">忘记密码</div>

          <div class="but" @click="fnLogin">登录</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
    <transition>
      <div class="dialog dialog_m" :class="bOver?'':'style_show'">
        <div class="message">
          <van-loading type="spinner" class="passed" v-if="!bLogin" />
          <van-icon name="passed" class="passed" v-if="bLogin" />
          <div class="message_text">{{sPromptText}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bOver: false,
      sUserName: "",
      sPassword: "",
      bLogin: false,
      sPromptText: "正在登录"
    };
  },

  methods: {
    funSetOver() {
      this.bOver = true;
      setTimeout(() => {
        this.bOver = false;
      }, 1000);
    },
    fnClose() {
      this.$emit("close", false);
    },
    fnClearInput(key) {
      this[key] = "";
    },
    fnLogin() {
      this.bOver = true;
      setTimeout(() => {
        this.sPromptText = "登录成功";
        this.bLogin = true;
      }, 1000);
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
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