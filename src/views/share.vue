






<template>
  <div class="groupDetails_page">
    <div class="scroll_view">
      <!-- <div class="header">
        <div class="searsh">
          <input type="text" placeholder value="快来! 我已经成功提现!" />
          <img src="@/views/sharePro/img/refresh.png" alt />
        </div>
      </div>-->
      <div class="copyTip" v-if="copyFlag">复制链接成功！</div>
      <div class="content">
        <div class="title">简单三步, 拿现金红包</div>
        <div class="flow">
          <ul class="left">
            <li class="list">
              <img src="@/views/sharePro/img/1.png" alt />
            </li>
            <li>
              <div></div>
            </li>
            <li class="list">
              <img src="@/views/sharePro/img/2.png" alt />
            </li>
            <li>
              <div></div>
            </li>
            <li class="list">
              <img src="@/views/sharePro/img/3.png" alt />
            </li>
          </ul>
          <ul class="right">
            <li class="title">下载APP</li>
            <li>
              <div>
                <img src="@/views/sharePro/img/dolong.png" alt />
                <img src="@/views/sharePro/img/loging.png" alt />
                <img src="@/views/sharePro/img/er.png" alt />
                <img src="@/views/sharePro/img/loging.png" alt />
                <img src="@/views/sharePro/img/eior.png" alt />
              </div>
              <div>
                <span>下载APP</span>
                <span>注册登录</span>
                <span>打开任务面板</span>
              </div>
            </li>
            <li class="title">加入队伍</li>
            <li>
              <div>
                <img src="@/views/sharePro/img/join_btn.png" alt />
              </div>
              <div>
                <img src="@/views/sharePro/img/join_copy.png" alt />
              </div>
            </li>
            <li class="title">完成任务并领钱</li>
            <li>
              <div>
                <img src="@/views/sharePro/img/join_tema.png" alt />
              </div>
            </li>
          </ul>
        </div>
        <div class="state">奖励自动派发至钱包！我已经成功提现，快加入吧！</div>
      </div>
      <div class="btn_row">
        <div class="cop_link" @click="copyLinl">复制链接邀请</div>
        <!-- <div>
          <a href="dxapp://android.dxmovie.com/open?name=daixiong">打开APP</a>
        </div>-->
        <div class="down_btn" @click="down">下载APP领钱</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      copyFlag: false
    };
  },
  components: {
    ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  created() {},
  mounted() {},
  computed: {},
  activated() {
    document.title = "快来！我已经成功提现";
  },
  methods: {
    copy(data) {
      let inp = document.createElement("input");
      inp.value = data;
      document.body.appendChild(inp);
      inp.select();
      let rtesult = document.execCommand("Copy");
      if (rtesult) {
        this.copyFlag = true;
        setTimeout(() => {
          this.copyFlag = false;
        }, 2000);
      }
    },
    copyLinl() {
      let msg = window.location.href;
      this.copy(msg);
    },

    down() {
      let getUrl = window.location.href;
      let itemUrl = getUrl.split("#/")[0];
      let json = {};
      var arr = getUrl.substr(getUrl.indexOf("?") + 1).split("&");
      arr.forEach(item => {
        var tmp = item.split("=");
        json[tmp[0]] = tmp[1];
      });
      this.copyLinl();
      // IOS打开链接
      var ios_schema = "dxapp://ios.dxmovie.com/open";
      // IOS下载URL
      var ios_download_url = "https://daixiong.tv/";
      // android 打开APP URL
      //name = "TaskCenter"  就跳到任务中心， name="Dx58TaskShare"  就跳到 团队分享
      var android_schema = `dxapp://android.dxmovie.com/open?name=TaskCenter&url=${itemUrl}#/groupTask?webHasHead=1&teamId=${json.teamId}`;
      // android下载链接
      var android_download_url = "https://daixiong.tv/";
      // 安卓判断
      if (/(Android)/i.test(navigator.userAgent)) {
        var startTime = Date.now();
        var ifr = document.createElement("iframe");
        ifr.style.display = "none";
        ifr.src = android_schema;
        document.body.appendChild(ifr);
        window.setTimeout(function() {
          var endTime = Date.now();
          var time = endTime - startTime;
          // 通过时间差判断，是否要去下载页
          // alert(time);
          if (time < 2100) {
            document.body.removeChild(ifr);
            location.href = android_download_url;
          } else {
            widows.close();
          }
        }, 2000);
      } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        var startTime = Date.now();
        var install = false;
        var loadTime = new Date();
        location.href = ios_schema;
        setTimeout(function() {
          var endTime = Date.now();
          var time = endTime - startTime;
          // 通过时间差判断，是否要去下载页
          if (time < 800) {
            if (confirm("检测到您手机可能没有安装app,马上去苹果商店下载吧~ ")) {
              location.href = ios_download_url;
            }
          }
        }, 800);
      } else {
        location.href = ios_download_url;
      }
    }
  }
};
</script>


<style lang='less' scoped>
.groupDetails_page {
  overflow-y: scroll;
  .scroll_view {
    // margin-top: 64px;
    margin-bottom: 90px;
    background-image: url("./sharePro/img/sologan.png");
    background-size: 100%;
    padding-top: 235px;
    .copyTip {
      background: rgb(75, 69, 69);
      width: 100%;
      font-size: 18px;
      text-align: center;
      line-height: 30px;
      height: 30px;
      color: #ff404e;
      margin: 30px;
      border-radius: 5px;
      position: fixed;
      top: 500px;
      z-index: 10;
    }
    .header {
      background: #fff;
      position: fixed;
      top: 0;
      height: 64px;
      width: 100%;
      z-index: 100;
      .searsh {
        margin: 24px 10px 4px 10px;
        height: 36px;
        background: #e6e6e6;
        border-radius: 5px;
        line-height: 36px;
        input {
          width: 320px;
          height: 36px;
          border: 0;
          background: #e6e6e6;
          font-size: 14px;
          color: #333333;
          font-weight: 400;
          text-align: center;
          border-radius: 5px;
        }
        img {
          width: 17px;
          height: 20px;
          vertical-align: middle;
          margin-top: -7px;
        }
      }
    }
  }
  .content {
    background: #fef8e3;
    .title {
      font-size: 20px;
      color: #711010;
      font-weight: 600;
      width: 192px;
      height: 28px;
      margin: 14px 91px 16px 91px;
    }
    .flow {
      position: relative;
      .left {
        position: absolute;
        left: 15px;
        top: 2px;
        width: 36px;
        .list {
          width: 20px;
          height: 20px;
          text-align: center;
          // border: 1px dashed #888888;
          img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }
        li:nth-child(2) {
          div {
            height: 138px;
            width: 11px;
            border-right: 1px solid #db1725;
          }
        }
        li:nth-child(4) {
          div {
            height: 446px;
            width: 11px;
            border-right: 1px solid #db1725;
          }
        }
      }
      .right {
        margin-left: 40px;
        .title {
          margin: 0;
          height: 24px;
          color: #da1624;
          font-size: 17px;
          font-weight: 600;
          text-align: left;
        }
        li:nth-child(2) {
          div:nth-child(1) {
            margin: 15px 0;
            img {
              vertical-align: middle;
            }
            img:nth-child(2n-1) {
              width: 52px;
              height: 52px;
              // border: 1px dashed #ff3366;
            }
            img:nth-child(2n) {
              margin: 0 16px;
              width: 26;
              height: 22px;
              // border: 1px dashed #ff3366;
            }
          }
          div:nth-child(2) {
            margin-bottom: 31px;
            span {
              display: inline-block;
              width: 102px;
              color: #333333;
              font-size: 14px;
              font-weight: 500;
            }
          }
        }
        li:nth-child(4) {
          margin-top: 10px;
          margin-bottom: 20px;
          div {
            width: 305px;
            text-align: center;
            // border: 1px dashed #ff3366;
            vertical-align: middle;
          }
          div:nth-child(1) {
            img {
              width: 305px;
              height: 180px;
            }
          }
          div:nth-child(2) {
            img {
              height: 220px;
            }
          }
        }
        li:nth-child(6) {
          margin-top: 10px;
          margin-bottom: 20px;
          div {
            width: 305px;
            text-align: center;
            // border: 1px dashed #ff3366;
            vertical-align: middle;
            img {
              width: 305px;
              height: 271px;
            }
          }
        }
      }
    }
    .state {
      width: 306px;
      height: 55px;
      color: #711010;
      font-size: 18px;
      font-weight: 600;
      margin-left: 50px;
      padding-bottom: 90px;
    }
  }
  .btn_row {
    position: fixed;
    bottom: 0;
    height: 90px;
    width: 100%;
    background: #fff6d6;
    line-height: 90px;
    text-align: center;
    div {
      display: inline-block;
      margin: 0 7px;
    }
    .cop_link {
      width: 120px;
      height: 45px;
      border: 1px solid #ff404e;
      border-radius: 6px;
      text-align: center;
      line-height: 45px;
      font-size: 16px;
      color: #ff404e;
      font-weight: 600;
    }
    .down_btn {
      width: 180px;
      height: 45px;
      background: #ff404e;
      border-radius: 6px;
      text-align: center;
      line-height: 45px;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>