import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Bridge from '@/util/bridge'
import './assets/style/base.less'
import './vantconfig'


Vue.config.productionTip = false;

Vue.prototype.$bridge = Bridge;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log("进入路有守卫")
  next()
})
