<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog" @touchmove.prevent @click.prevent>
        <div class="dialog_ct" ref="capture">
          <img class="generate" src="./generate1.png" alt />
          <div class="centent">
            <div class="item">
              <div class="item_text">下载地址</div>
              <div class="item_input">{{oUserinfo.url}}</div>
            </div>
            <div class="item">
              <div class="item_text">用户名称</div>
              <div class="item_input">{{oUserinfo.userId}}</div>
            </div>
            <div class="item">
              <div class="item_text">初始密码</div>
              <div class="item_input">{{password}}</div>
            </div>
          </div>
          <div class="footer">
            <img src="./save.png" alt @click="funSetOver" />
          </div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import Html2canvas from "html2canvas";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isIOS", "oUserinfo"])
  },
  props: ["password"],
  methods: {
    funSetOver(event) {
      const _this = this;
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      Html2canvas(_this.$refs.capture, {
        allowTaint: true
      }).then(canvas => {
        let url = canvas.toDataURL("image/png");

        if (_this.isIOS) {
          _this.$bridge.callhandler(
            "DX_save_share_Image",
            { type: "save", image: url },
            data => {
              if (data == 1) {
                _this.$toast.success(`保存图片成功`);
              } else {
                _this.$toast.fail(`保存失败`);
              }
            }
          );
        } else {
          const data = android.DX_save_share_Image(
            JSON.stringify({
              type: "save",
              image: url
            })
          );
          if (data == 1) {
            _this.$toast.success(`保存图片成功`);
          } else {
            _this.$toast.fail(`保存失败`);
          }
        }
      });
    },
    fnClose() {
      this.$emit("close", "generateShow", false);
    }
  }
};
</script>
<style lang='less' scoped>
img {
  width: 100%;
  height: 100%;
}
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
    background: linear-gradient(#963304, #481401);
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