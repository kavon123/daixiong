<!--  -->
<template>
  <transition>
    <div class="but_pop" :class="show?'':'style_show'">
      <van-swipe @change="onChange" class="swipe" :width="375">
        <van-swipe-item class="item">
          <img class="swipe_img" src="./logo.png" alt />
        </van-swipe-item>
        <van-swipe-item class="item">
          <img class="swipe_img" src="./logo.png" alt />
        </van-swipe-item>
        <van-swipe-item class="item">
          <img class="swipe_img" src="./logo.png" alt />
        </van-swipe-item>
        <van-swipe-item class="item">
          <img class="swipe_img" src="./logo.png" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="choose">
        <div>
          <img src="./logo.png" alt />
          <div>微信</div>
        </div>
        <div>
          <img src="./logo.png" alt />
          <div>朋友圈</div>
        </div>
        <div>
          <img src="./logo.png" alt />
          <div>QQ</div>
        </div>
        <div @click="fnBook">
          <img src="./logo.png" alt />
          <div>通讯录</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    onChange(index) {
      this.activeIndex = index;
    },
    fnBook() {
      this.$router.push("/invite");
    }
  }
};
</script>
<style lang='less' scoped>
.but_pop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .choose {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: absolute;
    height: 80px;
    background: #fff;
    bottom: 0;
    animation: myfirst 0.4s;
    div {
      width: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .swipe {
    width: 100%;
    height: 300px;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      .swipe_img {
        width: 200px;
        height: 200px;
      }
    }
  }
}

@keyframes myfirst {
  from {
    bottom: -80px;
  }
  to {
    bottom: 0;
  }
}
.style_show {
  display: none;
}
</style>