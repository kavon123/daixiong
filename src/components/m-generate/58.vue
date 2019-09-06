<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" :class="show?'':'style_show'">
        <div class="dialog_ct" ref="capture">
          <img class="generate" src="./generate1.png" alt />
          <div class="centent">
            <div class="item">
              <div class="item_text">下载地址</div>
              <div class="item_input">{{data.downloadUrl}}</div>
            </div>
            <div class="item">
              <div class="item_text">用户名称</div>
              <div class="item_input">{{data.userId}}</div>
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
import html2canvas from "html2canvas";
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bOver: false,
      img: "./generate.png"
    };
  },

  methods: {
    funSetOver() {
      const _this = this;
      html2canvas(_this.$refs.capture, { allowTaint: true }).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.setAttribute("download", "图片canvas.png");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        _this.bOver = true;
        setTimeout(() => {
          this.bOver = false;
        }, 1000);
      });
    },
    fnClose() {
      this.$emit("close", "generateShow", false);
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
    background: linear-gradient(#af5f43, #542818);
    box-shadow: inset 0px 0px 5px rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    .generate {
      height: 22px;
      width: 188px;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .centent {
      width: 278px;
      background: #3b0f00;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      .item:last-child {
        margin-bottom: 0;
      }
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .item_text {
          color: #efc066;
          margin-right: 12px;
        }
        .item_input {
          background: #250e02;
          color: #d18900;
          height: 32px;
          width: 168px;
          border-radius: 16px;
          line-height: 32px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 0 15px;
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