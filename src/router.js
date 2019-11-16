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
      path: '/myTeam',
      name: 'myTeam',// 分享落地页-PC端
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "sharePro" */ './views/myTeam.vue')
    },
    {
      path: '/share',
      name: 'share',// 分享落地页-移动端
      meta: {
        keepAlive: true
      },
      component: () => {
        if (/Android|webOS| iPhone | iPad | iPod |BlackBerry|opera mini|opera mobile|appleWebkit.*mobile|mobile/i.test(
          navigator.userAgent)) {
          return import(/* webpackChunkName: "sharePro_m" */ './views/share.vue')
        } else {
          return import(/* webpackChunkName: "sharePro" */ './views/sharePro.vue')
        }

      }
    },
    {
      path: '/sharePro',
      name: 'sharePro',// 分享落地页-PC端
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "sharePro" */ './views/sharePro.vue')
    },
    {
      path: '/groupDetails',
      name: 'groupDetails',// 组队详情
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupDetails" */ './views/groupDetails.vue')
    },
    {
      path: '/groupLog1',
      name: 'groupLog1',// 组队记录
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupLog" */ './views/groupLog.vue')
    },
    {
      path: '/groupLog',
      name: 'groupLog',// 组队记录
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupLog" */ './views/groupLog1.vue')
    },
    {
      path: '/',
      name: 'groupTask1',//组队分享任务
      meta: {
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "groupTask" */ './views/groupTask1.vue')
    },
    // {
    //   path: '/groupTask1',
    //   name: 'groupTask1',//组队分享任务
    //   meta: {
    //     keepAlive: true
    //   },
    //   component: () => import(/* webpackChunkName: "groupTask" */ './views/groupTask1.vue')
    // },
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
