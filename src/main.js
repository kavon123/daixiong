import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vantconfig'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log("进入路有守卫")
  next()
})
