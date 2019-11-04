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
      path: '/share',
      name: 'share',// 分享落地页
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "sharePro_m" */ './views/share.vue')
    }, 
    // {      
    //   path: '/sharePro_m',
    //   name: 'sharePro_m',// 分享落地页-移动端
    //   meta: {
    //     keepAlive: true
    //   },
    //   component: () => import(/* webpackChunkName: "sharePro_m" */ './views/sharePro/sharePro_mob.vue')
    // }, 
    {      
      path: '/groupDetails',
      name: 'groupDetails',// 组队详情
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupDetails" */ './views/groupDetails.vue')
    }, 
    {      
      path: '/groupLog',
      name: 'groupLog',// 组队记录
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupLog" */ './views/groupLog.vue')
    },      
    {
      path: '/groupTask',
      name: 'groupTask',//组队分享任务
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
