<!--  -->
<template>
  <keep-alive>
    <div class>
      <van-steps :active="active" direction="vertical">
        <van-step>
          <template v-slot:active-icon>
            <van-icon name="close" />
          </template>
          <template v-slot:inactive-icon>
            <van-icon name="passed" />
          </template>
          提交审核
        </van-step>
        <van-step active-icon="checked" inactive-icon="service">
          <template v-slot:active-icon>
            <van-icon name="service" />
          </template>
          <template v-slot:inactive-icon>
            <van-icon name="service" />
          </template>
          客服审核
        </van-step>
        <van-step active-icon="checked" inactive-icon="medel">
          <template v-slot:active-icon>
            <van-icon name="medel" />
          </template>
          <template v-slot:inactive-icon>
            <van-icon name="medel" />
          </template>
          审核结果
        </van-step>
      </van-steps>
      <van-button type="primary" @click="fnSetActive">主要按钮</van-button>
    </div>
  </keep-alive>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fnSetActive() {
      this.active = this.active + 1 <= 3 ? this.active + 1 : 0;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>