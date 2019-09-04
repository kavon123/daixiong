import Vue from 'vue'
import Router from 'vue-router'
// import HomeYG from './views/HomeYG.vue'
// import Home58 from './views/Home58.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/58',
      name: '58',
      component: () => import(/* webpackChunkName: "58" */ './views/Home58.vue')
    },
    {
      path: '/yg',
      name: 'YG',
      component: () => import(/* webpackChunkName: "YG" */ './views/HomeYG.vue')
    },
    {
      path: '/promote',
      name: 'promoteList',
      component: () => import(/* webpackChunkName: "promoteList" */ './views/promoteList.vue')
    },
    {
      path: '/relative',
      name: 'relativeList',
      component: () => import(/* webpackChunkName: "relativeList" */ './views/relativeList.vue')
    }
  ]
})
