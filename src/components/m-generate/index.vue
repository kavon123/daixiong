<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" :class="show?'':'style_show'">
        <div class="dialog_ct">
          <img class="generate" src="./generate.png" alt />
          <div class="centent">
            <div class="item">
              <div class="item_text">YG网址</div>
              <div class="item_input">baidu,com</div>
            </div>
            <div class="item">
              <div class="item_text">用户名称</div>
              <div class="item_input">嗡嗡按销售出身</div>
            </div>
            <div class="item">
              <div class="item_text">手机号码</div>
              <div class="item_input">15788523221</div>
            </div>
            <div class="item">
              <div class="item_text">初始密码</div>
              <div class="item_input">123456</div>
            </div>
          </div>
          <div class="footer">
            <img src="./save.png" alt @click="funSetOver" />
          </div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
    <transition>
      <div class="dialog dialog_m" :class="bOver?'':'style_show'">
        <div class="message">
          <van-icon name="passed" class="passed" />
          <div class="message_text">保存成功</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bOver: false
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
    height: 340px;
    background: linear-gradient(#9680cd, #262180);
    box-shadow: inset 0px 0px 5px rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    .generate {
      height: 30px;
      width: 144px;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .centent {
      width: 278px;
      height: 222px;
      background: #27266f;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 0;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .item_text {
          color: #bccee3;
          margin-right: 12px;
        }
        .item_input {
          background: #161850;
          color: #b3b4e4;
          height: 32px;
          width: 168px;
          border-radius: 16px;
          line-height: 32px;
          text-align: center;
        }
      }
    }
    .footer {
      width: 122px;
      height: 32px;
      margin: 18px 0;
    }
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 30px;
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