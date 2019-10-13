<template>
  <div class="swpier-video">
    <swiper :options="swiperOpt"
            ref="videoSwiper">
      <swiper-slide class="swp-item"
                    v-for="(item,index) in videoList"
                    :key="index">
        <img :src="item.attribute2"
             alt="">
        <div class="play-btn"></div>
      </swiper-slide>
      <swiper-slide class="swp-item">
        <img style="display:block;height:100%;width:70px;"
             src="./../image/video-back.png"
             alt="">
      </swiper-slide>
    </swiper>
    <van-popup class="modal-content"
               v-model="showFullVideo">
      <video v-if="showFullVideo"
             autoplay="autoplay"
             muted
             webkit-playsinline="true"
             playsinline="true"
             :poster="videoList[currVideo].attribute2"
             controls
             controlsList='nofullscreen nodownload noremote footbar'
             style="width:100%; height:100%;object-fit: fill">
        您的浏览器不支持 HTML5 video 标签。
        <source :src="videoList[currVideo].attribute1"
                type="video/mp4">
      </video>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currVideo: 0,
      swiperOpt: {
        initialSlide: 0,
        autoHeight: true,
        slidesPerView: 1.28,
        // loop: true,
        spaceBetween: 10,
        //  loopedSlides:2,
        on: {
          slideChangeTransitionEnd: () => {
            let swiper = this.$refs.videoSwiper.swiper
            if (swiper) {
              let realIndex = swiper.realIndex
              this.$emit("slideChangeEnd", realIndex)
              if (realIndex >= this.videoList.length - 1) {
                swiper.allowSlideNext = false
              } else {
                swiper.allowSlideNext = true
              }
            }
          },
          click: () => {
            let swiper = this.$refs.videoSwiper.swiper
            if (swiper) {
              let realIndex = swiper.realIndex
              this.$emit("slideChangeEnd", realIndex)
              this.showFullVideo = true
              this.currVideo = realIndex
            }
          }
        }
      },
      showFullVideo: false,
      listVideo: [{
        itemId: 1,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4",
        attribute2: "http://image.heimaozicode.com/video/M00/02/7D/mtcfk12XI0uAM9dlAAB61JGwxF4401.png"
      },
      {
        itemId: 2,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4",
        attribute2: "http://image.heimaozicode.com/video/M00/02/7D/mtcfk12XI0uAM9dlAAB61JGwxF4401.png"
      },
      {
        itemId: 3,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4",
        attribute2: "http://image.heimaozicode.com/video/M00/02/7D/mtcfk12XI0uAM9dlAAB61JGwxF4401.png"
      }, {
        itemId: 4,
        url: "http://jiasu-aliyun.heimaozicode.com/original/f57496ded6ba4a3d9022b4bb870dbfbe/552e5b8b-16d76ee0825.mp4",
        attribute2: "http://image.heimaozicode.com/video/M00/02/7D/mtcfk12XI0uAM9dlAAB61JGwxF4401.png"
      }]
    }
  },
  props: {
    videoList: {
      type: Array,
      default: []
    },
    videoHasData: {
      type: Boolean,
      default: false
    }
  },
  watch: {

  },
  mounted () {
    console.log(this.videoList)
  }
}
</script>

<style lang='less' scoped>
.modal-content {
  width: 100%;
  max-height: 80vh;
}
.swpier-video {
  width: 100%;
  .swp-item {
    height: 117px;
    background: #000;
    position: relative;
    .play-btn {
      position: absolute;
      top: 30px;
      left: 80px;
      width: 60px;
      height: 60px;
      background: url("./../image/video-play.png") no-repeat;
      background-size: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
