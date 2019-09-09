<!--  -->
<template>
  <div class="promote">
    <div class="centent">
      <div class="table_head">
        <van-row type="flex">
          <van-col span="6">用户名</van-col>
          <van-col span="6">收益</van-col>
          <van-col span="6">日期</van-col>
          <van-col span="6">状态</van-col>
        </van-row>
      </div>
      <div class="scroll">
        <div class="table_body" v-for="(item,i) in lists" :key="i">
          <van-row type="flex" justify="center">
            <van-col span="6">
              <div class="name">{{item.name}}</div>
              <div>{{item.mobile}}</div>
            </van-col>
            <van-col span="6" class="sum">{{item.amount}}元</van-col>
            <van-col span="6">{{item.time}}</van-col>
            <van-col span="6" class="state">
              {{item.status==2?"已发放":"未游戏"}}
              <span
                class="alert"
                v-if="item.status!=2"
                @click="fnRemind"
              >提醒</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <van-icon name="close" class="close" @click="fnClose" />
  </div>
</template>

<script>
import $api from "@/util/api.js";
import { mapGetters } from "vuex";

import { getDate } from "@/util/methods.js";

export default {
  data() {
    return {
      lists: []
    };
  },
  computed: {
    ...mapGetters(["platformType"])
  },
  created() {
    this.fngetUserFriend(1, this.platformType);
  },
  methods: {
    fnClose() {
      this.$emit("close", "promoteShow", false);
      this.$emit("close", "pre", false);
    },
    fnRemind() {
      const _this = this;
      this.$bridge.callhandler("DX_openWX_QQ_58", platform, function(data) {
        if (data == 0) {
          _this.$toast(`未安装微信!请安装`);
        }
      });
    },
    fngetUserFriend(page, type) {
      const _this = this;
      _this.$bridge.callhandler(
        "DX_encryptionRequest",
        {
          source: type,
          page,
          size: 20
        },
        function(data) {
          $api
            .postRequest("/user/v3/searchUserFriendPage", data)
            .then(res => {
              if (res.code === 0) {
                res.datas.infoList = res.datas.infoList.map(item => {
                  item.time = getDate(item.createdDate);
                  return item;
                });
                if (res.datas.totalPage > res.datas.currPage) {
                  _this.fngetUserFriend(res.datas.currPage + 1);
                }
                _this.lists = _this.lists.concat(res.datas.infoList);
              } else {
                _this.$toast(res.msg);
              }
            })
            .catch(err => {
              _this.$toast(err.message);
            });
        }
      );
    }
  }
};
</script>
<style lang='less' scoped>
.close {
  font-size: 35px;
  color: #fff;
  margin-top: 20px;
}
.promote {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.centent {
  height: 500px;
  width: 90%;
  overflow: hidden;
  background: #fff;
  .scroll {
    height: calc(500px - 48px);
    overflow: auto;
  }
}
.table_head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid #f5f5f5;
  .van-row {
    width: 92%;
    height: 48px;
    display: flex;
    align-items: center;
    .van-col {
      text-align: center;
      color: #333333;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
.table_body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  .van-row {
    width: 92%;
    height: 53px;
    display: flex;
    align-items: center;
    .van-col {
      text-align: center;
      color: #666;
      font-size: 12px;
      .name {
        color: #333;
      }
    }
    .sum {
      font-size: 14px;
      color: #d4080c;
    }
    .state {
      position: relative;
      .alert {
        color: #ff8b29;
        position: absolute;
        right: -6px;
      }
    }
  }
}
</style>