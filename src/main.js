import Vue from 'vue'
import VConsole from 'vconsole'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Bridge from '@/util/bridge'
import './assets/style/base.less'
import './vantconfig'


Vue.config.productionTip = false;

Vue.prototype.$bridge = Bridge;

const vConsole = new VConsole();
console.log(vConsole.version)
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log("进入路有守卫")
  next()
})
