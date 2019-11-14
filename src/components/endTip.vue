



<template>
  <div class="win" @touchmove.prevent>
    <div class="conten">
      <div class="title">规则说明</div>
      <p>本次队伍中有未完成任务的队员，提前结束后奖励金截止当前金额，是否确认提前结束？</p>
      <div class="botton">
        <div class="affirm" @click="end(parms.teamId,parms.status)">确认</div>
        <div class="cancel" @click="sendMsg">取消</div>
      </div>
    </div>
    <div class="closeBtn">
      <img src="@/assets/scol/close.png" alt @click="sendMsg" />
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
      isIOS: this.$store.state.isIOS
    };
  },
  props: ["parms"],
  components: {
    // ...mapGetters(["oUserinfo", "barString", "isIOS"])
  },
  created() {
    this.getParms();
  },
  mounted() {},
  computed: {},
  methods: {
    endReq(parms) {
      $api
        .postRequest("/user/task/v6/close58Team ", parms)
        .then(res => {
          if (res.code == 0) {
            this.$toast.success(res.datas);
            this.sendMsg();
            this.$emit("refresh");
          } else {
            this.$toast.fail(code.message);
          }
        })
        .catch(err => {
          // this.$toast.fail(err.message);
        });
    },
    end(id, status) {
      if (this.isIOS) {
        this.$bridge.callhandler(
          "DX_encryptionRequest",
          { teamId: id },
          data => {
            this.endReq(data);
          }
        );
      } else {
        const data = android.DX_encryptionRequest(
          JSON.stringify({ teamId: id })
        );
        this.endReq(data);
      }
    },
    sendMsg() {
      this.$emit("func");
    }
  }
};
</script>


<style lang='less' scoped>
.win {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .conten {
    margin: auto;
    margin-top: 250px;
    width: 300px;
    height: 222px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 1);
    padding: 26px 31px 30px 31px;
    .title {
      text-align: center;
      font-size: 17px;
      font-weight: 400;
      height: 24px;
      line-height: 24px;
    }
    p {
      font-size: 14px;
      color: #888;
      line-height: 20px;
      font-weight: 400;
    }
    .botton {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      .affirm {
        line-height: 44px;
        text-align: center;
        width: 110px;
        height: 44px;
        border: 1px solid #367dfd;
        border-radius: 5px;
        color: #367dfd;
        font-size: 15px;
        font-weight: 400;
      }
      .cancel {
        text-align: center;
        width: 110px;
        height: 44px;
        border-radius: 5px;
        line-height: 44px;
        background: #367dfd;
        color: #fff;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
  .closeBtn {
    text-align: center;
    margin-top: 10px;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
}
</style>