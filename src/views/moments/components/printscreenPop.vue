<template>
  <transition>
    <div class="pop" @touchmove.prevent>
      <div class="content">
        <div class="title">截图方式</div>
        <div class="content_text">
          <p>IOS手机，同时按住"电源键"和"Home键"两秒左右，截图会自动保存到相册</p>
          <p>安卓手机，同时按住“音量减键”和“电源键”两秒左右，截图就会自动保存到相册</p>
        </div>
        <div class="but" @click.self="closeFn">关闭</div>
      </div>
      <van-icon name="close" class="close" @click.self="closeFn" />
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 300px;
    background: #fff;
    border-radius: 9px;
    padding: 26px 32px 30px;
    .title {
      font-size: 17px;
      color: #333;
    }
    .content_text {
      font-size: 14px;
      color: #999;
    }
    .but {
      width: 140px;
      height: 40px;
      background: #367dfd;
      border-radius: 5px;
      font-size: 15px;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>