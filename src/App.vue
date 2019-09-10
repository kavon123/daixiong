<template>
  <div id="app" v-if="noPC">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { judgeClient } from "@/util/methods.js";
export default {
  name: "App",
  data() {
    return {
      noPC: false
    };
  },
  methods: {
    ...mapMutations({
      setIsIOS: "SET_IS_IOS"
    })
  },
  created() {
    const platform = judgeClient();
    this.noPC = platform !== "PC";
    this.setIsIOS(platform === "IOS");
  }
};
</script>
