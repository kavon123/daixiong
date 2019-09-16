<template>
  <div class="main">
    <div class="head">
      <div class="nav">
        <van-icon name="arrow-left" class="icon" @click="fnGoBack" />
        <div class="title">等待审核</div>
        <van-icon name="arrow-left" class="icon" style="visibility: hidden;" />
      </div>
    </div>
    <div class="body">
      <div class="steps_content">
        <div class="steps_icon">
          <img class="icon" src="@/views/moments/image/success.png" alt />
          <div class="line active"></div>
          <img class="icon" src="@/views/moments/image/wait.png" alt />
          <div class="line" :class="{active:data.status >=1}"></div>

          <img
            class="icon"
            src="@/views/moments/image/throughImg.png"
            alt
            v-if="data.status ==1||data.status ==3"
          />
          <img class="icon" src="@/views/moments/image/errImg.png" alt v-else-if="data.status ==2" />
          <img class="icon" src="@/views/moments/image/credit.png" alt v-else />
        </div>
        <div class="steps_text">
          <div class="item">
            <p class="title active">提交审核成功</p>
            <p class="time">{{data.time}}</p>
          </div>
          <div class="item title active">客服审核</div>
          <div class="item">
            <p class="title" :class="{active:data.status>=1}">{{auditText}}</p>
            <p class="time" v-if="data.status >=1">{{data.update}}</p>
          </div>
        </div>
      </div>
      <div class="instructions color">
        <div class="failure" v-if="data.status==2">未通过原因</div>
        {{describe}}
      </div>
      <div class="but" :class="{but_get:data.status==1}" @click="fnEnsure">{{butText}}</div>
    </div>
    <transition>
      <reward-pop v-if="rewardPop" :reward="reward"></reward-pop>
    </transition>
  </div>
</template>

<script>
import $api from "@/util/api.js";
import { mapGetters } from "vuex";
import { getDateAll } from "@/util/methods.js";
import rewardPop from "@/views/moments/components/rewardPop.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    rewardPop
  },
  data() {
    //这里存放数据
    return {
      reward: "",
      userId: "",
      rewardPop: false,
      butText: "确定",
      auditText: "审核通过，发放奖励",
      describe:
        "审核时间不超过24小时，审核通过后，奖励将会发放至您的钱包余额。",
      data: {
        time: "",
        update: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["taskConfigCode", "isIOS"])
  },
  //方法集合
  methods: {
    fnEnsure() {
      const type = this.taskConfigCode == "SharePoster_58" ? "58 " : "YG";
      if (this.data.status != 1) {
        this.$router.push(`/moments/${type}`);
      } else {
        if (this.isIOS) {
          this.$bridge.callhandler(
            "DX_encryptionRequest",
            { taskConfigCode: this.taskConfigCode },
            data => {
              this.fnEnsureReq(data);
            }
          );
        } else {
          const data = android.DX_encryptionRequest(
            JSON.stringify({ taskConfigCode: this.taskConfigCode })
          );
          this.fnEnsureReq(data);
        }
      }
    },
    fnEnsureReq(data) {
      $api
        .postRequest("/user/task/v3/receivePosterAward", data)
        .then(res => {
          if (res.code == 0) {
            this.rewardPop = true;
            this.reward = `+${res.datas}红包券`;
            this.fuGetDetail();
            setTimeout(() => {
              this.rewardPop = false;
            }, 1000);
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    fnGoBack() {
      this.$router.back(-1);
    },
    fuGetDetail() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { id: this.userId },
          data => {
            this.fuGetDetailReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ id: this.userId })
        );
        this.fuGetDetailReq(data);
      }
    },
    fuGetDetailReq(data) {
      $api
        .postRequest("/poster/searchSharePosterDetail", data)
        .then(res => {
          this.$toast.clear();
          if (res.code == 0 && res.datas) {
            this.data = res.datas;
            this.data.time = getDateAll(res.datas.createdDate);
            this.data.update = getDateAll(res.datas.updateDate);
            switch (res.datas.status) {
              case "1":
                this.butText = "领取";
                this.describe = "审核已通过，请领取奖励";
                this.auditText = "审核通过";
                break;
              case "2":
                this.butText = "确定";
                this.auditText = "审核未通过";
                this.describe = res.datas.remark;
                break;
              case "3":
                this.butText = "确定";
                this.auditText = "审核通过";
                this.describe = "奖励已发放至您的钱包余额";
                break;
              default:
                this.butText = "确定";
                this.auditText = "审核通过，发放奖励";
                this.describe =
                  "审核时间不超过24小时，审核通过后，奖励将会发放至您的钱包余额。";
                break;
            }
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          this.$toast(err.message);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.userId = this.$route.params.id;
    this.fuGetDetail();
  }
};
</script>
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
  height: 100vh;
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
        font-size: 20px;
      }
    }
  }
  .body {
    height: calc(100vh - 113px);
    overflow: auto;
    margin: 79px 15px 34px;
    background: #fff;
    border-radius: 10px;
    .steps_content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 35px;
      border-bottom: 10px solid #f5f5f5;
      .steps_icon {
        width: 57px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon {
          width: 57px;
          height: 45px;
        }
        .line {
          width: 1px;
          height: 40px;
          background: #bababa;
        }
        .active {
          background: #6d5aff;
        }
      }
      .steps_text {
        flex: 1;
        .item {
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: 45px;
          margin-bottom: 40px;
          margin-left: 30px;
        }
        .item:last-child {
          margin-bottom: 0;
        }
        .title {
          color: #bababa;
          font-size: 15px;
        }
        .active {
          color: #443f6b;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .failure {
      color: #ff4b4e;
      font-size: 16px;
      padding-bottom: 14px;
    }
    .instructions {
      padding: 32px;
      color: #999;
      font-size: 13px;
    }
    .color {
      color: #4d4871;
    }
    .but {
      width: 210px;
      height: 45px;
      background: linear-gradient(#a28bff 0%, #826cff 50%, #a28bff 100%);
      border-radius: 6px;
      margin: 8px auto 0;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 45px;
    }
    .but_get {
      background: linear-gradient(#fce317 0%, #ffba0f 50%, #fce317 100%);
    }
  }
}
</style>