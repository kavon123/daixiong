<template>
  <div class="home">
    <van-button type="default" @click="goToPage">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    goToPage() {
      this.$router.push("/about");
    }
  }
};
</script>
