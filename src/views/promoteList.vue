<!--  -->
<template>
  <div class="promote">
    <m-nav title="我的邀请" :arrow="true" />
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
            <van-col span="6">{{setDate(item.createdDate)}}</van-col>
            <van-col span="6" class="state">
              {{item.state===2?"已发放":"未游戏"}}
              <span class="alert" v-if="item.state!==2">提醒</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myPromise from "@/util/tolo.js";
import { getDate } from "@/util/methods.js";

import mNav from "@/components/m-nav";

export default {
  components: {
    mNav
  },
  data() {
    //这里存放数据
    return {
      lists: []
    };
  },
  methods: {
    getUserFriend() {
      myPromise(1, {
        code: 0,
        msg: "",
        datas: {
          infoList: [
            {
              parentUserId: 123,
              createdDate: 1567158741000,
              updateDate: 1567158741000,
              mobile: "18022226666",
              name: "l76v1zvcn8",
              status: "1",
              source: "1",
              amount: 0
            }
          ],
          totalSize: 5,
          totalPage: 1,
          currPage: 1
        }
      })
        .then(res => {
          if (res.code === 0) {
            this.lists = res.datas.infoList;
          }
        })
        .catch(err => {});
    },
    setDate(time) {
      return getDate(time);
    }
  },
  created() {
    this.getUserFriend();
  }
};
</script>
<style lang='less' scoped>
.centent {
  height: calc(100vh - 46px);
  overflow: hidden;
  .scroll {
    height: calc(100vh - 94px);
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