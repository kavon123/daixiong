<template>
  <div class="main">
    <div class="head">
      <div class="nav">
        <van-icon name="arrow-left" class="icon" @click="fnGoBack" />
        <div class="title">审核记录</div>
        <van-icon name="arrow-left" class="icon" style="visibility: hidden;" />
      </div>
    </div>
    <div class="body" @scroll="scroll" ref="scroll">
      <div class="item" v-for="item in lists" :key="item.id" @click="fnViewStatus(item.id)">
        <div class="left">
          <div>{{item.dates[0]}}</div>
          <div class="time">{{item.dates[1]}}</div>
        </div>
        <div class="center">
          <div v-if="item.status==1||item.status==3">{{item.attribute4}}</div>
        </div>
        <div class="right" :class="{error:item.status==2,through:item.status==1||item.status==3}">
          {{statusList[item.status]}}
          <van-icon name="arrow" class="icon" />
        </div>
      </div>
      <div v-if="lists.length" class="no_data">只保留三个月内的数据！</div>
      <div v-if="!lists.length" class="no_data">暂无数据！</div>
    </div>
  </div>
</template>

<script>
import $api from "@/util/api.js";
import { mapGetters } from "vuex";
import { getDates } from "@/util/methods.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      page: 1,
      totalSize: 0,
      statusList: ["正在审核", "审核已通过", "审核失败", "审核已通过"],
      lists: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["taskConfigCode", "isIOS"])
  },
  //方法集合
  methods: {
    fnGoBack() {
      this.$router.back(-1);
    },
    fnViewStatus(id) {
      this.$router.push({ name: "AuditStatus", params: { id } });
    },
    fnGetList() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          {
            taskConfigCode: this.taskConfigCode,
            imageList: [{ type: "WeChatMoments", page: this.page, size: 20 }]
          },
          data => {
            this.fnGetListReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({
            taskConfigCode: this.taskConfigCode,
            imageList: [{ type: "WeChatMoments", page: this.page, size: 20 }]
          })
        );
        this.fnGetListReq(data);
      }
    },
    fnGetListReq(data) {
      $api
        .postRequest("/poster/searchSharePosterHistoryTask", data)
        .then(res => {
          this.$toast.clear();
          if (res.code == 0) {
            this.page = this.page + 1;
            this.totalSize = res.datas.totalSize;
            const lists = res.datas.infoList.map(item => {
              item.dates = getDates(item.createdDate);
              return item;
            });
            this.lists = this.lists.concat(lists);
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    scroll(event) {
      const bottom = this.$refs.scroll.offsetHeight - event.target.scrollTop;
      if (bottom <= 100 && this.lists.length < this.totalSize) {
        this.fnGetList();
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fnGetList();
  }
};
</script>
<style lang='less' scoped>
.no_data {
  font-size: 12px;
  height: 30px;
  text-align: center;
  color: #999;
  line-height: 30px;
}
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
  overflow: hidden;
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
    .item {
      height: 60px;
      margin: 0 10px;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #443f6b;
      .left {
        width: 110px;
        .time {
          font-size: 12px;
          color: #999;
        }
      }
      .center {
        flex: 1;
        color: #f8456e;
        text-align: center;
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex: 1;
      }
      .error {
        color: #ff4b4e;
      }
      .through {
        color: #999;
      }
      .icon {
        font-size: 20px;
        color: #9c9c9c;
      }
    }
  }
}
</style>