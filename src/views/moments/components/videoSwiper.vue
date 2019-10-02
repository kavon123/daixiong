<template>
  <div class="swpier-video">
    <swiper :options="swiperOpt">
      <swiper-slide class="swiper-item"
                    v-for="(item,index) in listVideo"
                    :key="index">
        <!-- <div class="swipe_video" :style="'background-image: url('+item.attribute1+')'">
            <div :class="'qrcode'+index" :id="'qrcode'+index+'_YG'"></div>
          </div> -->
        <video width="320"
               height="240"
               controls>
          <source src="http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
                  type="video/mp4">
        </video>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOpt: {
        initialSlide: 0,
        spaceBetween: 16
      },
      listVideo: [{
        itemId: 1,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      },
      {
        itemId: 1,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      }]
    }
  },
  props: {
    videoList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang='less' scoped>
.swpier-video {
  .swiper-item {
    // width: 200px;
    // height: 100px;
    background: red;
  }
}
</style>
