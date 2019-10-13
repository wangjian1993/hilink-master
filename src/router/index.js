import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	//<<<<<<< HEAD
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [{ //首页
			path: '/',
			name: 'home',
			component: () => import( /* webpackChunkName: "home" */ '@/views/Home/Home.vue')
		},
		{ //离线帮助
			path: '/help',
			name: 'help',
			component: () => import( /* webpackChunkName: "help" */ '@/views/Home/Help.vue')
		},
		{
			path: '/instructions',
			name: 'instructions',
			component: () => import( /* webpackChunkName: "instructions" */ '@/views/Home/Instructions.vue')
		},
		{ //启蒙英语
			path: '/locallist',
			name: 'locallist',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/LocalList.vue'),
			meta: {
				title: "本地歌曲",
				keepAlive: false,
			}
		},
		{ //启蒙英语
			path: '/localfile',
			name: 'localfile',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/LocalFile.vue'),
			meta: {
				title: "本地歌曲列表",
				keepAlive: false,
			}
		},
		{ //本地内容
			path: '/english',
			name: 'english',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/English.vue'),
			meta: {
				title: "英语启蒙",
				keepAlive: false,
			}
		},
		{ //首页
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '@/views/Content/About.vue')
		},
		//火火兔云内容首页
		{
			path: '/cloudContent/index',
			name: 'cloudIndex',
			component: () => import('@/views/cloudContent/index.vue'),
			meta: {
				title: "火火兔内容云"
			}
		},
		//火火兔云内容搜索页
		{
			path: '/cloudContent/search',
			name: 'cloudSearch',
			component: () => import('@/views/cloudContent/search.vue'),
			meta: {
				title: "搜索"
			}
		},
		//火火兔云内容听儿歌页
		{
			path: '/cloudContent/listen',
			name: 'cloudListen',
			component: () => import('@/views/cloudContent/listen.vue'),
			meta: {
				title: "火火兔内容云"
			}
		},
		//火火兔云内容听儿歌详情页
		{
			path: '/cloudContent/listenDetail',
			name: 'cloudListenDetail',
			component: () => import(/* webpackChunkName: "cloudListenDetail" */'@/views/cloudContent/listenDetail.vue'),
			meta: {
				keepAlive: false,
			}
		},
		//火火兔云内容主播详情页面
		{
			path: '/cloudContent/hostDetail',
			name: 'cloudHostDetail',
			component: () => import('@/views/cloudContent/hostDetail.vue'),
			meta: {
				keepAlive: false
			}
		},
		//火火兔云内容视频详情页面
		{
			path: '/cloudContent/video',
			name: 'cloudVideo',
			component: () => import('@/views/cloudContent/video.vue'),
			meta: {
				keepAlive: false
			}
		},
		//火火兔云内容视频列表页面
		{
			path: '/cloudContent/videoList',
			name: 'cloudVideoList',
			component: () => import('@/views/cloudContent/videoList.vue'),
			meta: {
				keepAlive: false
			}
		},
	]
})

