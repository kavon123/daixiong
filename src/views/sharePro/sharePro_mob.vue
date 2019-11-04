






<template>
  <div class="groupDetails_page">
    <div class="scroll_view">
      <div class="header">
       快来我已经成功提现
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import $api from "@/util/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      temashow: false,
      teamList: [],
      swipertop: {
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1.1,
        spaceBetween: 8,
        loop: false
      }
    };
  },
  components: {},
  created() {},
  mounted() {},
  computed: {},
  methods: {}
};
</script>


<style lang='less' scoped>
.groupDetails_page {
  overflow-y: scroll;
  .scroll_view {
    margin-top: 64px;
    background: #f5f5f5;
    .header {
      height: 64px;
      width: 100%;   
    }
   
  }
}
</style>