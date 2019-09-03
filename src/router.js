import Vue from 'vue'
import Router from 'vue-router'
import HomeYG from './views/HomeYG.vue'
import Home58 from './views/Home58.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home1',
      component: Home58
    },
    {
      path: '/home2',
      name: 'home2',
      component: HomeYG
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
