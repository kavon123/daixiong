<template>
  <div class="main" @click="()=>operationPop = false">
    <div class="head">
      <div class="nav">
        <van-icon name="arrow-left" class="icon" @click="fnGoBack" />
        <div class="title">分享朋友圈领红包券</div>
        <van-icon name="ellipsis" @click.stop="fnSetOperationPop" class="icon ellipsis" />
      </div>
    </div>
    <div class="body">
      <div class="prompt_copy">
        <div class="prompt_content">
          <p class="fixed_text">分享文案与海报到朋友圈，上传朋友圈截图给客服审核，通过后奖励将发放到账户余额</p>
          <p class="submit_text">
            您的审核未通过，经检查你上传的图片涉嫌P图，失败原因，后台上传。
            <br />请重新上传截图并提交。
          </p>
        </div>
      </div>
      <div class="steps_content">
        <img class="title" src="./image/stepsTitle.png" alt />
        <div class="steps_mian">
          <div class="steps_group">
            <div class="steps_left">
              <img class="steps_img" src="./image/steps1.png" alt />
              <div class="steps_line"></div>
            </div>
            <div class="steps_right">
              <img class="steps_text1" src="./image/steps_text1.png" alt />
              <div class="steps_prompt">点击分享按钮，分享文案与海报至朋友圈</div>
              <div class="copy_text">
                YG电竞顶级代理招募中，长按图片识别图中二维码，即可加入YG电竞，领取188元新手红包！
                www.baidu.com
                <div class="copy_but">复制</div>
              </div>
              <img
                class="share_but"
                @click="()=>swipePop=true"
                src="@/views/moments/image/shareBut.png"
                alt
              />
            </div>
          </div>
          <div class="steps_group">
            <div class="steps_left">
              <img class="steps_img" src="./image/steps2.png" alt />
              <div class="steps_line"></div>
            </div>
            <div class="steps_right">
              <img class="steps_text2" src="./image/steps_text2.png" alt />
              <div class="steps_prompt">上传已分享的截图审核</div>
              <div class="uploader_img">
                <div class="prompt">示例图</div>
                <van-uploader v-model="fileList" :max-count="2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="steps_content mb30">
        <img class="title" src="./image/auditTitle.png" alt />
        <div class="steps_mian">
          <div class="item_text">
            <span></span>分享3小时后截图提交审核才有效
          </div>
          <div class="item_text">
            <span></span>朋友圈分享必须所有人可见
          </div>
          <div class="item_text">
            <span></span>未P图、或者上传重复截图作弊
          </div>
          <div class="item_text">
            <span></span>本任务每周可参与一次，每周一0点刷新
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="submit_but">{{submitText}}</div>
    </footer>
    <transition>
      <div class="operation" v-if="operationPop">
        <span class="triangle-up"></span>
        <div class="item item-border">联系客服</div>
        <div class="item item-border" @click="()=>printscreenPop=true">如何截图</div>
        <div class="item" @click="()=>this.$router.push('/records')">审核记录</div>
      </div>
    </transition>
    <swipe-pop v-if="swipePop" :closeFn="()=>{swipePop=false}"></swipe-pop>
    <fallback-pop v-if="fallbackPop" :closeFn="()=>{fallbackPop=false}" @determine="fnDetermine"></fallback-pop>
    <printscreenPop v-if="printscreenPop" :closeFn="()=>{printscreenPop=false}"></printscreenPop>
  </div>
</template>

<script>
import printscreenPop from "@/views/moments/components/printscreenPop.vue";
import swipePop from "@/components/m-but-pop/swipePop.vue";
import fallbackPop from "@/views/moments/components/fallbackPop.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    printscreenPop,
    swipePop,
    fallbackPop
  },
  data() {
    //这里存放数据
    return {
      fallbackPop: false,
      swipePop: false,
      operationPop: false,
      printscreenPop: false,
      active: 0,
      submitText: "提交中",
      fileList: [
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" }
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fnPop(key, val) {
      this[key] = val;
    },
    fnSetOperationPop() {
      this.operationPop = !this.operationPop;
    },
    fnSetActive() {
      this.printscreenPop = true;
      // this.active = this.active + 1 <= 3 ? this.active + 1 : 0;
    },
    fnGoBack() {
      this.fallbackPop = true;
    },
    fnDetermine() {
      this.fallbackPop = false;
      this.$bridge.callhandler("DX_goBack");
    },
    fnInfo() {
      _this.$bridge.callhandler(
        "DX_encryptionRequest",
        { taskConfigCode: "SharePoster_58" },
        function(data) {
          console.log(data);
        }
      );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.params.id);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.uploader_img {
  position: relative;
  .prompt {
    position: absolute;
    width: 21.333vw;
    height: 4vw;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    color: #fff;
    text-align: center;
    line-height: 15px;
    bottom: 4px;
  }
  .van-uploader__preview,
  .van-uploader__upload {
    margin-bottom: 0;
  }
  .van-image,
  .van-uploader__upload {
    width: 80px;
    height: 144px;
  }
  .van-uploader__preview:first-child {
    .van-icon {
      display: none;
    }
  }
}
</style>
<style lang='less' scoped>
p {
  margin: 0;
}
.g_bg {
  background-color: #fff;
  border-radius: 8px;
}
.g_flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 100vw;
  overflow: auto;
  background-image: url("./image/bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #4c38d8;
  .head {
    position: fixed;
    background: linear-gradient(to right, #27abf3, #3177f0);
    .nav {
      .g_flex;
      width: 100vw;
      height: 40px;

      color: #fff;
      font-weight: 500;
      padding: 0 15px;
      margin-top: 24px;
      .title {
        flex: 1;
        font-size: 18px;
        text-align: center;
      }
      .icon {
        width: 20px;
        font-size: 20px;
      }
      .ellipsis {
        transform: rotate(90deg);
      }
    }
  }
  .body {
    margin-top: 234px;
    padding: 0 14px;
    .prompt_copy {
      background-color: #5800d7;
      padding: 18px 16px;
      border-radius: 8px;
      .prompt_content {
        .g_bg;
        padding: 30px 20px;
        font-size: 14px;
        .fixed_text {
          color: #7b73ae;
        }
        .submit_text {
          padding-top: 16px;
          color: #cc3b3b;
        }
      }
    }
    .steps_content {
      .g_bg;
      margin-top: 38px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .title {
        width: 140px;
        height: 42px;
        margin-top: -12px;
      }
      .steps_mian {
        padding: 14px;
        width: 100%;
        .item_text {
          font-size: 14px;
          color: #7b73ae;
          margin-bottom: 16px;
          span {
            display: inline-block;
            width: 3px;
            height: 12px;
            background: rgba(255, 168, 0, 1);
            border-radius: 1px;
            margin: 0 8px;
          }
        }
      }

      .steps_group {
        width: 100%;
        .g_flex;
        .steps_left {
          width: 20px;
          .g_flex;
          flex-direction: column;
          .steps_img {
            width: 20px;
            height: 22px;
            display: block;
          }
          .steps_line {
            width: 1px;
            background: #6d5aff;
            height: 280px;
            margin-top: -2px;
          }
        }
        .steps_right {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
          margin-left: 22px;
          margin-bottom: 20px;

          .steps_text1,
          .steps_text2 {
            height: 17px;
            display: block;
          }
          .steps_text1 {
            width: 49px;
          }
          .steps_text2 {
            width: 144px;
          }
          .steps_prompt {
            color: #7b73ae;
            font-size: 14px;
            padding: 12px 0 16px 0;
          }
          .copy_text {
            color: #6153be;
            font-size: 12px;
            width: 259px;
            background-color: #f7f6ff;
            padding: 15px 10px;
          }
          .copy_but {
            width: 50px;
            height: 20px;
            background: #7561ff;
            border-radius: 5px;
            color: #fff;
            line-height: 20px;
            text-align: center;
            margin: 0 auto;
            margin-top: 15px;
          }
          .share_but {
            width: 220px;
            height: 60px;
            margin: 14px auto;
          }
        }
      }
      .steps_group:last-child {
        margin-top: -2px;
        .steps_right {
          margin-bottom: 0;
        }
        .steps_line {
          height: 200px;
        }
      }
    }
    .mb30 {
      margin-bottom: 30px;
    }
  }
  .footer {
    .g_flex;
    background: rgba(0, 0, 0, 0.6);
    height: 75px;

    .submit_but {
      width: 210px;
      height: 45px;
      background: rgba(160, 146, 252, 0.3);
      border-radius: 6px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      line-height: 14px;
      line-height: 45px;
    }
  }
}
.operation {
  .g_flex;
  flex-direction: column;
  position: fixed;
  top: 70px;
  right: 6px;
  border-radius: 10px;
  width: 120px;
  height: 120px;
  background-color: #fff;
  .triangle-up {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 12px solid #fff;
    position: absolute;
    top: -12px;
    right: 9px;
  }
  .item {
    font-size: 14px;
    color: #333;
    text-align: center;
    flex: 1;
    height: 40px;
    line-height: 40px;
    width: 95%;
  }

  .item-border {
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>