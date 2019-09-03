import Vue from 'vue'
import Router from 'vue-router'
import HomeYG from './views/HomeYG.vue'
import Home58 from './views/Home58.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home58
    // },
    {
      path: '/',
      name: 'home',
      component: HomeYG
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
