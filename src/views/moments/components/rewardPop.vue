<template>
  <transition>
    <div class="pop" @touchmove.prevent>
      <div class="content">
        <div class="reward_sum">{{reward}}</div>
        <img class="reward_img" src="@/views/moments/image/reward.png" />
        <p class="t1">恭喜您完成{{pttext}}代理任务</p>
        <p class="t2">已放入钱包</p>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    reward: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["itemCode"]),
    pttext() {
      return this.itemCode == "58_SHARE_URL" ? "58棋牌" : "YG电竞";
    }
  },
  methods: {
    fnDetermine() {
      this.$emit("determine");
    }
  }
};
</script>
<style lang='less' scoped>
p {
  margin: 5px 0;
}
.pop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .content {
    position: relative;
    padding: 15px;
    background: rgba(0, 0, 0, 0.66);
    border-radius: 4px;
    .reward_sum {
      position: absolute;
      color: #fff;
      width: 104px;
      height: 44px;
      left: 52px;
      top: 92px;
      text-align: center;
      line-height: 44px;
      font-size: 13px;
      font-weight: 500;
    }
    .reward_img {
      width: 177px;
      height: 128px;
    }
    .t1 {
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .t2 {
      font-size: 14px;
      color: #fdf019;
      text-align: center;
    }
  }
}
</style>