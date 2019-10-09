<template>
  <div class="swpier-video">
    <swiper :options="swiperOpt" ref="videoSwiper">
      <swiper-slide class="swp-item"
                    v-for="(item,index) in videoList"
                    :key="index">
        <video 
               :poster="item.attribute2" 
               controls style="width:100%; height:100%;object-fit: fill">
          <source :src="item.attribute1"
                  type="video/mp4">
        </video>
      </swiper-slide>
       <swiper-slide style="width:50px;"></swiper-slide>
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
        slidesPerView: 1.28,
        // loop: true,
         spaceBetween: 10,
         loopedSlides:2,
         on: {
          slideChangeTransitionEnd: () => {
            let swiper = this.$refs.videoSwiper.swiper
            console.log("出发了")
            if(swiper){
            let realIndex = swiper.realIndex
            this.$emit("slideChangeEnd", realIndex)
            }
          }
        }
      },
      listVideo: [{
        itemId: 1,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      },
      {
        itemId: 2,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      },
      {
        itemId: 3,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      },{
        itemId: 4,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4"
      }]
    }
  },
  props: {
    videoList: {
      type: Array,
      default: []
    },
    videoHasData:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    
  },
  mounted(){
    console.log(this.videoList)
  }
}
</script>

<style lang='less' scoped>
.swpier-video {
  width: 100%;
  .swp-item {
    height: 117px;
    background: #000;
  }
}
</style>
