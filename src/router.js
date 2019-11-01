import Vue from 'vue'
import Router from 'vue-router'
// import HomeYG from './views/HomeYG.vue'
// import Home58 from './views/Home58.vue'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [  
   
     
    {
      path: '/groupTask',
      name: 'groupTask',// 拼团任务
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupTask" */ './views/groupTask.vue')
    },     
    {
      path: '/58',
      name: '58',
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "58" */ './views/Home58.vue')
    },
    {
      path: '/yg',
      name: 'YG',
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "YG" */ './views/HomeYG.vue')
    },
    {
      path: '/relative',
      name: 'relativeList',
      component: () => import(/* webpackChunkName: "relativeList" */ './views/relativeList.vue')
    },
    {
      path: '/promote',
      name: 'promoteList',
      component: () => import(/* webpackChunkName: "promoteList" */ './views/promoteList.vue')
    },
    {
      path: '/moments/:type',
      name: 'MomentsTask',
      component: () => import(/* webpackChunkName: "YG" */ './views/moments/MomentsTask.vue')
    },
    {
      path: '/records',
      name: 'AuditRecords',
      component: () => import(/* webpackChunkName: "YG" */ './views/moments/AuditRecords.vue')
    },
    {
      path: '/status',
      name: 'AuditStatus',
      component: () => import(/* webpackChunkName: "YG" */ './views/moments/AuditStatus.vue')
    },
    {
      path: '/testPage',
      name: 'testPage',
      component: () => import(/* webpackChunkName: "relativeList" */ './views/testPage/index.vue')
    }
  ]
})
