import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ '@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    //火火兔云内容首页
    {
      path: '/cloudContent/index',
      name: 'cloudIndex',
      component: () => import('@/views/cloudContent/index.vue')
    },
     //火火兔云内容搜索页
     {
      path: '/cloudContent/search',
      name: 'cloudSearch',
      component: () => import('@/views/cloudContent/search.vue')
    },
     //火火兔云内容听儿歌页
     {
      path: '/cloudContent/listen',
      name: 'cloudListen',
      component: () => import('@/views/cloudContent/listen.vue'),
      meta:{
        keepAlive: false
      }
    },
    //火火兔云内容听儿歌详情页
    {
      path: '/cloudContent/listenDetail',
      name: 'cloudListenDetail',
      component: () => import('@/views/cloudContent/listenDetail.vue'),
      meta:{
        keepAlive:false
      }
    },
    //火火兔云内容主播详情页面
    {
      path: '/cloudContent/hostDetail',
      name: 'cloudHostDetail',
      component: () => import('@/views/cloudContent/hostDetail.vue'),
      meta:{
        keepAlive:false
      }
    },
    //火火兔云内容视频详情页面
    {
      path: '/cloudContent/video',
      name: 'cloudVideo',
      component: () => import('@/views/cloudContent/video.vue'),
      meta:{
        keepAlive:false
      }
    },
  ]
})


router.beforeEach((to, from, next) => {
  next()
 })
export default router
