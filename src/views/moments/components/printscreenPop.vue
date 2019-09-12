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
@import url("../style/index.less");
</style>