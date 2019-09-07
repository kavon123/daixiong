<template>
  <div id="app" v-if="noPC">
    <transition>
      <keep-alive :include="keepALivePages">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { judgeClient } from "@/util/methods.js";
export default {
  name: "App",
  data() {
    return {
      keepALivePages: ["58", "YG"],
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
