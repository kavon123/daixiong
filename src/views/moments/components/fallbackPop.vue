<template>
  <transition>
    <div class="pop" @touchmove.prevent>
      <div class="content">
        <div class="pading_">
          <div class="title">提示</div>
          <div class="content_text">
            <p>退出将放弃正在提交的任务，确认退出？</p>
          </div>
        </div>

        <div class="but_group">
          <div class="but" @click="closeFn">取消</div>
          <div class="but" @click="fnDetermine">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    closeFn: {
      type: Function,
      default: () => {}
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
.pop {
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

  .content {
    width: 300px;
    background: #fff;
    border-radius: 9px;

    .pading_ {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: 26px 32px 10px;
    }
    .title {
      font-size: 17px;
      color: #333;
    }
    .content_text {
      font-size: 14px;
      color: #999;
    }
    .but_group {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 43px;
      border-top: 1px solid #e5e5e5;
      .but {
        height: 42px;
        flex: 1;
        font-size: 15px;
        color: #333;
        text-align: center;
        line-height: 42px;
      }
      .but:last-child {
        color: #367dfd;
        border-left: 1px solid #e5e5e5;
      }

      //   width: 140px;
      //   background: #367dfd;
      //   border-radius: 5px;
      //   font-size: 15px;
      //   color: #fff;
      //   text-align: center;
      //   line-height: 40px;
    }
  }
}
</style>