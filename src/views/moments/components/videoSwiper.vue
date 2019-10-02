<template>
  <div class="swpier-video">
    <swiper :options="swiperOpt">
         <swiper-slide class="swiper-item" v-for="(item,index) in listVideo" :key="item.itemId">
          <!-- <div class="swipe_video" :style="'background-image: url('+item.attribute1+')'">
            <div :class="'qrcode'+index" :id="'qrcode'+index+'_YG'"></div>
          </div> -->
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
      listVideo:[{
          itemId: 1,
          url: ""
      },
      {
          itemId: 1,
          url: ""
      }]
    }
  }
}
</script>

<style lang='less' scoped>
.swpier-video{
    .swiper-item{
        width: 200px;
        height: 100px;
        background: red;
    }
}
</style>
