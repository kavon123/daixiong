<template>
  <div class="main"
       ref="main"
       @click="()=>operationPop = false">
    <div class="head">
      <div class="nav">
        <van-icon name="arrow-left"
                  class="icon"
                  @click="fnGoBack" />
        <div class="title">分享朋友圈领红包券</div>
        <van-icon name="ellipsis"
                  @click.stop="fnSetOperationPop"
                  class="icon ellipsis" />
      </div>
    </div>
    <div class="body">
      <div class="prompt_copy">
        <div class="prompt_content">
          <p class="fixed_text">
            分享
             <span style="color:red">文案及海报</span> 到朋友圈，上传朋友圈截图给客服审核。审核通过后可在当前页面领取奖励。<span style="color:red" v-if="itemType=='58'">分享文案领3元，每三日可领取一次。</span> 
          </p>
          <!-- {{testMsg}} -->
          <p class="submit_text"
             v-if="resp.status==2">
            {{resp.remark}}
            <br />请重新上传截图并提交。
          </p>
        </div>
      </div>
      <div class="steps_content">
        <img class="title"
             src="./image/stepsTitle.png"
             alt />
        <div class="steps_mian">
          <div class="steps_group">
            <div class="steps_left">
              <img class="steps_img"
                   src="./image/steps1.png"
                   alt />
              <div class="steps_line"
                   :class="{'line_yg':itemType=='yg','line_58':itemType=='58'}"></div>
            </div>
            <div class="steps_right">
              <img class="steps_text1"
                   src="./image/steps_text1.png"
                   alt />
              <!-- <div class="steps_prompt">点击分享按钮，截取海报图片，分享文案及截图到朋友圈</div> -->
              <div class="steps_prompt">复制文案，保存海报截图，分享文案及截图到朋友圈</div>
              <div class="copy_text">
                <!-- {{copyText}} -->
                <span v-html="copyText"></span>
                <!-- <span v-if="itemType=='yg'">{{momentsUrl}}</span> -->
                <span v-if="itemType=='yg'">[太阳] YG电竞顶级代理招募中[太阳] <br>
                  [太阳] 【{{currentMon}}{{currentDay}}】戳这里：{{momentsUrl}} <br>
                  ✅加入YG电竞，领取188元新手红包！！ <br>
                </span>
                <div class="copy_but"
                     @click="fnCopyText(true)">复制</div>
              </div>
              <div class="img-tab">
                <!-- <div class="img-tab-item"
                :id="'imgBox'+0"
                   >
                   <img src="https://img-blog.csdnimg.cn/20190919120249357.jpg?x-oss-process=image/resize,m_fixed,h_64,w_64" alt="" srcset="">
                </div> -->
                <div class="img-tab-item"
                     :id="'imgBox'+k"
                     :ref="'imgBox'+k"
                     v-for="(v,k) in imgList"
                     :key="k">
                  <img :src="v.attribute1"
                       alt="">
                </div>
              </div>
              <!-- <img class="share_but"
                   @click="()=>{swipePop=true ; fnCopyText()}"
                   src="@/views/moments/image/shareBut.png"
                   alt /> -->
              <!-- <img class="share_but"
                   @click="saveImg"
                   src="@/views/moments/image/shareBut.png"
                   alt /> -->
              <img class="share_but"
                   @click="saveImg"
                   src="@/views/moments/image/btn-bg1.png"
                   alt />

            </div>
          </div>
          <div class="steps_group">
            <div class="steps_left">
              <img class="steps_img"
                   src="./image/steps2.png"
                   alt />
              <div class="steps_line"></div>
            </div>
            <div class="steps_right">
              <img class="steps_text2"
                   src="./image/steps_text2.png"
                   alt />
              <div class="steps_prompt">上传已分享的截图审核</div>
              <div class="uploader_img">
                <div class="prompt">示例图</div>
                <van-uploader v-model="fileList"
                              :max-count="2"
                              :before-read="beforeRead" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="steps_content mb30">
        <img class="title"
             src="./image/auditTitle.png"
             alt />
        <div class="steps_mian">
          <div class="item_text">
            <span></span>分享3小时后截图提交审核才有效
          </div>
          <div class="item_text">
            <span></span>朋友圈分享必须所有人可见
          </div>
          <div class="item_text">
            <span></span>P图或上传重复截图作弊者审核将会被拒绝
          </div>
          <div v-if="itemType=='yg'" class="item_text">
            <span></span>本任务每天可参与一次，每天0点刷新
          </div>
          <div class="item_text" v-if="itemType=='58'">
            <span></span>本任务每三日可领取一次，第四日零点刷新<br>
            &nbsp;&nbsp;&nbsp;&nbsp;如1月1日提交审核，需在1月4日做第二次提交
          </div>
          <div class="item_text">
            <span></span>
            仅限上传当日截图，非当日截图不予发放奖励
          </div>
        </div>
      </div>
    </div>
    <footer class="footer"
            :style="'height:'+paddingB+'px'">
      <div v-if="resp.status !=1"
           @click="fnSubmit"
           class="submit_but"
           :class="{submit_but_color:submitText=='提交审核'&&fileList.length==2}">{{submitText}}</div>
      <div v-else
           @click="fnGetReward"
           class="submit_but get_reward_but">
        <img src="@/views/moments/image/redIcon.png"
             alt />
        {{submitText}}
      </div>
    </footer>
    <transition>
      <div class="operation"
           v-if="operationPop">
        <span class="triangle-up"></span>
        <div class="item item-border"
             @click="fnJump">联系客服</div>
        <div class="item item-border"
             @click="()=>printscreenPop=true">如何截图</div>
        <div class="item"
             @click="()=>this.$router.push('/records')">审核记录</div>
      </div>
    </transition>
    <reward-pop v-if="rewardPop"
                :reward="reward"></reward-pop>
    <swipe-pop v-if="swipePop"
               :closeFn="()=>{swipePop=false}"
               :copyText="copyText"></swipe-pop>
    <fallback-pop v-if="fallbackPop"
                  :closeFn="()=>{fallbackPop=false}"
                  @determine="fnDetermine"></fallback-pop>
    <printscreenPop v-if="printscreenPop"
                    :closeFn="()=>{printscreenPop=false}"></printscreenPop>
    <van-popup v-model="showStopAct"
               overlay-class="modal-stop"
               closeable
               close-icon-position="top-left">
      <div class="stop-act-modal">
        <div class="stop-act-body">
          <div class="body-head">
            <img src="./image/sorry.png"
                 alt="">
          </div>
          <div class="body-main">
            <div class="txt"><b>YG电竞分享朋友圈任务</b>优化中，暂停提交</div>
            <div class="txt">您可继续完成分享58棋牌任务</div>
          </div>
          <!-- <div class="submit-btn"
               @click="goto58Task">去完成</div> -->
        </div>
        <div class="stop-act-foot">
          <div class="act-foot-close"
               @click="showStopAct=false"></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import $api from "@/util/api.js";
import { mapMutations, mapGetters } from "vuex";
import printscreenPop from "@/views/moments/components/printscreenPop.vue";
import swipePop from "@/components/m-but-pop/swipePop.vue";
import fallbackPop from "@/views/moments/components/fallbackPop.vue";
import rewardPop from "@/views/moments/components/rewardPop.vue";
import { getBase64Image, creatImg, getBase64, getReImgBase64 } from "@/util/tools.js"
import Html2canvas from "html2canvas";

const _58IMG = require("./image/58.jpg");
const _YGIMG = require("./image/yg.jpg");
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    printscreenPop,
    swipePop,
    fallbackPop,
    rewardPop
  },
  data () {
    //这里存放数据
    return {
      itemType: "",
      copyText:
        // "58棋牌顶级代理招募中，打开链接，即可加入58棋牌，领取188元新手红包！"
        "",
      reward: "",
      resp: {
        status: null,
        remark: ""
      },
      rewardPop: false,
      fallbackPop: false,
      swipePop: false,
      operationPop: false,
      printscreenPop: false,
      active: 0,
      submitText: "提交审核",
      fileList: [{ url: _58IMG }],
      paddingB: 72,
      itemText: "本任务每天可参与一次，每天0点刷新",
      showStopAct: false,
      currentDay: "",
      currentMon: "",
      testMsg: "",
      imgList: [],
      saveClick: true,
      cSaveImg: 0
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["taskConfigCode", "itemCode", "isIOS", "momentsUrl"])
  },
  //方法集合
  methods: {
    ...mapMutations({
      setPlatformType: "SET_PLATFORM_TYPE",
      setTaskConfigCode: "SET_TASK_CONFIG_CODE",
      setItemCode: "SET_ITEM_CODE",
      setMomentsUrl: "SET_MOMENTS_URL"
    }),
    beforeRead (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.$toast.fail("请上传不超过10M的图片!");
        return false;
      }
      if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png"
      ) {
        this.$toast.fail("上传图片格式 jpg、jpeg、png");
        return false;
      }

      return true;
    },
    fnJump () {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_gotoBrowser",
          "https://jq.qq.com/?_wv=1027&k=5ooi2Pw"
        );
      } else {
        android.DX_gotoBrowser("https://jq.qq.com/?_wv=1027&k=5ooi2Pw");
      }
    },
    fnSetOperationPop () {
      this.operationPop = !this.operationPop;
    },
    fnGoBack () {
      if (this.fileList.length == 2) {
        this.fallbackPop = true;
      } else {
        if (this.isIOS) {
          this.$bridge.callhandler("DX_goBack");
        } else {
          android.DX_goBack({});
        }
      }
    },
    fnDetermine () {
      this.fallbackPop = false;
      if (this.isIOS) {
        this.$bridge.callhandler("DX_goBack");
      } else {
        android.DX_goBack({});
      }
    },
    fnInfo () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { taskConfigCode: this.taskConfigCode },
          data => {
            this.fnInfoReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({
            taskConfigCode: this.taskConfigCode
          })
        );
        this.fnInfoReq(data);
      }
    },
    fnInfoReq (data) {
      $api
        .postRequest("/poster/searchSharePosterTask", data)
        .then(res => {
          if (res.code == 0) {
            this.resp.status = res.datas.status;
            this.resp.remark = res.datas.remark;
            switch (res.datas.status) {
              case "0":
                this.submitText = "审核中，请耐心等待";
                break;
              case "1":
                this.submitText = "审核通过，领奖励";
                break;
              default:
                this.submitText = "提交审核";
                break;
            }
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },

    fnSubmit () {
      // if (this.itemCode == "YG_SHARE_URL") {
      //   this.showStopAct = true;
      //   return
      // }
      if (this.submitText == "提交审核") {
        if (this.fileList.length !== 2) {
          this.$toast.fail("请上传截图后提交审核");
          return;
        }
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: "提交中..."
        });
        let base64 = this.fileList[1].content.split(",");
        if (this.isIOS) {
          this.$bridge.callhandler(
            "DX_encryptionRequest",
            {
              taskConfigCode: this.taskConfigCode,
              imageList: [
                {
                  type: "WeChatMoments",
                  base64List: [base64[1]]
                }
              ]
            },
            data => {
              this.fnSubmitReq(data);
            }
          );
        } else {
          const data = android.DX_encryptionRequest(
            JSON.stringify({
              taskConfigCode: this.taskConfigCode,
              imageList: [
                {
                  type: "WeChatMoments",
                  base64List: [base64[1]]
                }
              ]
            })
          );
          this.fnSubmitReq(data);
        }
      }
    },
    fnSubmitReq (data) {
      $api
        .postRequest("/user/task/v3/sharePoster", data)
        .then(res => {
          this.$toast.clear();
          if (res.code == 0) {
            this.$toast.success("提交成功等待审核！");
            this.fnInfo();
            this.$router.push({
              name: "AuditStatus",
              params: { id: res.datas }
            });
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    fnGetReward () {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { taskConfigCode: this.taskConfigCode },
          data => {
            this.fnGetRewardReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ taskConfigCode: this.taskConfigCode })
        );
        this.fnGetRewardReq(data);
      }
    },
    fnGetRewardReq (data) {
      $api
        .postRequest("/user/task/v3/receivePosterAward", data)
        .then(res => {
          if (res.code == 0) {
            this.rewardPop = true;
            this.reward = `+${res.datas}红包券`;
            this.fnInfo();
            this.$toast.clear();
            setTimeout(() => {
              this.rewardPop = false;
            }, 3000);
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    fnCopyText (type) {
      var copy;
      if (this.itemType == "58") {
        copy = `[太阳] 58棋牌顶级代理招募中[太阳] \n[太阳] 【${this.currentMon}${this.currentDay}】戳这里：${this.momentsUrl}\n✅加入58棋牌，领取188元新手红包！！`
      } else if (this.itemType == "yg") {
        copy = `[太阳] YG电竞顶级代理招募中[太阳] \n[太阳] 【${this.currentMon}${this.currentDay}】戳这里：${this.momentsUrl} \n✅加入YG电竞，领取188元新手红包！！`
      }
      if (this.isIOS) {
        this.$bridge.callhandler("DX_copy", copy, data => {
          if (data == 1 && type) {
            this.$toast.success("复制成功！");
          }
        });
      } else {
        const data = android.DX_copy(copy);
        if (data == 1 && type) {
          this.$toast.success("复制成功！");
        }
      }
    },
    fnGetUrl () {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode: "EXTERNAL_SHARE_URL", itemCode: this.itemCode },
          data => {
            this.fnGetUrlReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({
            classCode: "EXTERNAL_SHARE_URL",
            itemCode: this.itemCode
          })
        );
        this.fnGetUrlReq(data);
      }
    },
    fnGetUrlReq (data) {
      $api
        .postRequest("/lookup/searchLookupItem", data)
        .then(res => {
          if (res.code == 0) {
            this.setMomentsUrl(res.datas[0].attribute1);
            if (this.itemType == "58") {
              this.copyText = `[太阳] 58棋牌顶级代理招募中[太阳] </br>[太阳] 【${this.currentMon}${this.currentDay}】戳这里：${this.momentsUrl}</br>✅加入58棋牌，领取188元新手红包！！`
            }
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    goto58Task () {
      location.href = "http://ifsfg.ruilaisieducation.com/dist1/#/moments/58"
    },
    queryImg (shareType) {
      let classCode
      if (shareType == "1") {
        if (this.itemType == 'yg') {
          classCode = "WECHAT_POSTER_YG_2"
        } else if (this.itemType == '58') {
          classCode = "WECHAT_POSTER_58_2"
        }
      } else if (shareType == "2") {
        if (this.itemType == 'yg') {
          classCode = "WECHAT_PYQ_VIDEO_YG"
        } else if (this.itemType == '58') {
          classCode = "WECHAT_PYQ_VIDEO_58"
        }
      }
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { classCode: classCode },
          data => {
            this.getImgList(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ classCode: classCode })
        );
        this.getImgList(data);
      }
    },
    getImgList (data) {
      $api
        .postRequest("/external/friend/searchWeChatPoster", data)
        .then(res => {
          if (res.code == 0) {
            this.testMsg = res
            this.imgList = res.datas
            this.$toast.clear();
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    appSaveImg (imgData, k) {
      // let length = imgList.length
      // let imgData = imgList[k].attribute2
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_save_share_Image",
          { type: "save", image: imgData },
          data => {
            if (data == 1) {
              if (k == this.imgList.length - 1) {
                this.$toast.success("保存成功");
                this.saveClick = true;
              }
            }
          }
        );
      } else {
        const data = android.DX_save_share_Image(
          JSON.stringify({
            type: "save",
            image: imgData
          })
        );
        if (data == 1) {
          // this.$toast.success("保存成功");
          // if(k < length -1){
          //    this.cSaveImg++
          //    this.appSaveImg(this.imgList, this.cSaveImg)
          // }
          // else if (k == length - 1) {
          //   this.$toast.success("保存成功");
          // }
          if (k == this.imgList.length - 1) {
            this.$toast.success("保存成功");
            // this.saveClick = true;
          }
        }
      }
    },
    saveImg () {
      // alert(this.saveClick)
      // this.$toast.loading({
      //   duration: 0,
      //   forbidClick: true, // 禁用背景点击
      //   message: "中..."
      // });
      console.log(this.saveClick)
      if (!this.saveClick) {
        this.$toast.success("保存成功！");
        return
      }
      this.saveClick = false;
      var newLisr = this.imgList.concat()
      var androdiList = newLisr.reverse();
      if (this.isIOS) {
        newLisr.map((v, k) => {
          this.appSaveImg(v.attribute2, k)
        })
      } else {
        androdiList.map((v, k) => {
          this.appSaveImg(v.attribute2, k)
        })
      }
      // this.appSaveImg(this.imgList, this.cSaveImg)
      //  alert(this.saveClick)

    }
  },
  mounted () {
    var myDate = new Date();
    this.currentMon = myDate.getMonth() + 1;
    this.currentDay = myDate.getDate();
    this.currentMon = this.currentMon < 10 ? "0" + this.currentMon : this.currentMon
    this.currentDay = this.currentDay < 10 ? "0" + this.currentDay : this.currentDay
    this.itemType = this.$route.params.type;
    if (this.$route.params.type == "yg") {
      this.fileList[0].url = _YGIMG;
      this.setPlatformType(2);
      this.setTaskConfigCode("SharePoster_yg");
      this.setItemCode("YG_SHARE_URL");
      this.$refs.main.className = "main main2";
      this.copyText = "";
        // "YG电竞顶级代理招募中，打开链接，即可加入YG电竞，领取188元新手红包！";
        // "怎么愉快过国庆长假？来YG电竞领188红包，还能日赚斗金，戳→";
      this.itemText = "本任务每三天可参与一次";
      // this.showStopAct = true
    } else if (this.$route.params.type == "58") {
      this.copyText = `[太阳] 58棋牌顶级代理招募中[太阳]</br>[太阳] 【${this.currentMon}${this.currentDay}】戳这里：${this.momentsUrl}</br>✅加入58棋牌，领取188元新手红包！！`
    }
    this.fnInfo();
    this.fnGetUrl();
    this.queryImg(1);
    const h = window.screen.height;
    if (h >= 812) {
      this.paddingB = 35 + 71;
    }
    if (!this.isIOS) {
      android.DX_dismisLoading();
    }
  }
};
</script>
<style>
.van-popup--center {
  background: rgba(0, 0, 0, 0);
}
.stop-act-modal {
  width: 265px;
}
.stop-act-body {
  background: url("./image/stop_modal.png") no-repeat;
  background-size: 100% auto;
  height: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stop-act-body .body-head {
  padding-top: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stop-act-body .body-head img {
  width: 128px;
  height: 28px;
}
.stop-act-body .body-main {
  margin-top: 70px;
  width: 190px;
  height: 55px;
  color: #443e61;
  font-size: 13px;
}
.stop-act-body .body-main .txt {
  padding-bottom: 3px;
  letter-spacing: 1px;
}
.stop-act-body .submit-btn {
  margin-top: 36px;
  width: 190px;
  height: 40px;
  background: url("./image/btn-prup.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  font-size: 16px;
}
.stop-act-foot {
  display: flex;
  justify-content: center;
}
.act-foot-close {
  width: 32px;
  height: 32px;
  background: url("./image/close.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
}
</style>
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
  background-image: url("./image/58bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #4c38d8;
  .head {
    position: fixed;
    background: linear-gradient(to right, #27abf3, #3177f0);
    background-color: #4c38d8;
    .nav {
      .g_flex;
      width: 100vw;
      height: 40px;

      color: #fff;
      font-weight: 500;
      padding: 0 15px;
      margin-top: 30px;
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
          padding-bottom: 15px;
        }
        .fixed_text:last-child {
          padding-bottom: 0;
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
            margin-top: -2px;
            &.line_yg {
              height: 480px;
            }
            &.line_58 {
              height: 480px;
            }
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
            width: 240px;
            height: 60px;
            margin: 14px auto;
          }
          .img-tab {
            margin-left: -5px;
            display: flex;
            flex-wrap: wrap;
            width: 268px;
            .img-tab-item {
              width: 83px;
              height: 83px;
              margin-left: 5px;
              margin-top: 5px;
              img {
                width: 100%;
                height: 100%;
              }
            }
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
      margin-bottom: 105px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 98;
    bottom: 0;
    width: 100%;
    background: #1e1656;
    height: 71px;
    padding-top: 13px;

    .submit_but {
      width: 210px;
      height: 45px;
      border: 1px solid #fff;
      // background: rgba(160, 146, 252, 0.3);
      border-radius: 6px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      line-height: 14px;
      line-height: 45px;
    }
    .submit_but_color {
      background: linear-gradient(#a28bff 0%, #826cff 50%, #a28bff 100%);
      border: none;
    }
    .get_reward_but {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(#fce317 0%, #ffba0f 50%, #fce317 100%);
      border: none;
      img {
        width: 19px;
        height: 22px;
        margin-right: 15px;
      }
    }
  }
}
.main2 {
  background-image: url("./image/ygbg.png");
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