<template>
  <div id="app">
    <transition>
      <keep-alive :include="keepALivePages">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      keepALivePages: ["home"]
    };
  }
};
</script>
