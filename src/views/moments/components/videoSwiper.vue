<template>
  <div class="swpier-video">
    <swiper :options="swiperOpt">
      <swiper-slide class="swp-item"
                    v-for="(item,index) in listVideo"
                    :key="index">
        <video width="215"
               height="114">
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
        // autoHeight: true,
        roundLengths : true,
        slidesPerView: 1.28,
         spaceBetween: 10,
      },
      listVideo: [{
        itemId: 1,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      },
      {
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
  width: 100%;
  .swp-item {
    height: 117px;
    background: red;
    &:first-child{
      background: blue;
    }
    &:last-child{
      background: green;
    }
  }
}
</style>
