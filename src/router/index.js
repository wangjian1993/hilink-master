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
			component: () => import( /* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
			meta: {
				keepAlive: true,
			}
		},
		{ //离线帮助
			path: '/setting',
			name: 'setting',
			component: () => import( /* webpackChunkName: "setting" */ '@/views/Home/Setting.vue'),
			meta: {
				title: "设置",
			}
		},
		{
			path: '/instructions',
			name: 'instructions',
			component: () => import( /* webpackChunkName: "instructions" */ '@/views/Home/Instructions.vue')
		},
		{ //启蒙英语
			path: '/locallist',
			name: 'locallist',
			component: () => import( /* webpackChunkName: "locallist" */ '@/views/Content/LocalList.vue'),
			meta: {
				title: "本地歌曲",
				keepAlive: false,
			}
		},
		{ //启蒙英语
			path: '/localfile',
			name: 'localfile',
			component: () => import( /* webpackChunkName: "localfile" */ '@/views/Content/LocalFile.vue'),
			meta: {
				title: "本地内容",
				keepAlive: true,
			}
		},
		{ //本地内容
			path: '/english',
			name: 'english',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/English.vue'),
			meta: {
				title: "启蒙英语",
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
				keepAlive: true,
			}
		},
		//火火兔云内容搜索页
		{
			path: '/cloudContent/search',
			name: 'search',
			component: () => import('@/views/cloud/search.vue'),
			meta: {
				title: "搜索",
				keepAlive: true,
			}
		},
		//火火兔云内容听儿歌页
		{
			path: '/cloudContent/listen',
			name: 'cloudListen',
			component: () => import('@/views/cloudContent/listen.vue'),
			meta: {
				keepAlive: true
			}
		},
		//火火兔云内容听儿歌详情页
		{
			path: '/cloudContent/listenDetail',
			name: 'cloudListenDetail',
			component: () => import( /* webpackChunkName: "cloudListenDetail" */ '@/views/cloudContent/listenDetail.vue'),
			meta: {
				keepAlive: false,
			}
		},
		{
			path: '/cloudContent/allDown',
			name: 'cloudAllDown',
			component: () => import( /* webpackChunkName: "cloudListenDetail" */ '@/views/cloud/allDown.vue'),
			meta: {
				keepAlive: false,
			}
		},
		{
			path: '/cloudContent/allEnshrine',
			name: 'cloudAllEnshrine',
			component: () => import( /* webpackChunkName: "cloudListenDetail" */ '@/views/cloud/allEnshrine.vue'),
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
				keepAlive: false,
				title: "优选主播",
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
				title: "视频推荐",
				keepAlive: false
			}
		},
		{
			path: '/cloudContent/home',
			name: 'cloudHome',
			component: () => import('@/views/cloud/home.vue'),
			meta: {
				title: "火火兔早教",
				keepAlive: true
			}
		},
		{
			path: "/cloudContent/albumList",
			name: 'albumList',
			component: () => import('@/views/cloud/albumList.vue'),
			meta: {
				title: "专辑列表"
			}
		},
		{
			path: "/cloudContent/ssec",
			name: "ssec",
			component: () => import('@/views/cloud/ssec.vue'),
			meta: {
				title: "听讲赏学",
				keepAlive: false
			}
		},
		{
			path: "/cloudContent/albumDetail",
			name: 'albumDetail',
			component: () => import('@/views/cloud/albumDetail.vue'),
			meta: {
				title: "专辑详情"
			}
		},
		{
			path: "/cloudContent/rank",
			name: 'rank',
			component: () => import('@/views/cloud/rank.vue'),
			meta: {
				title: "排行榜",
				keepAlive: true
			}
		},
		{
			path: "/cloudContent/differentAge",
			name: 'differentAge',
			component: () => import('@/views/cloud/differentAge.vue'),
			meta: {
				title: "分龄推荐"
			}
		},
		{
			path: "/cloudContent/video",
			name: "video",
			component: () => import('@/views/cloud/video.vue'),
			meta: {
				title: "视频"
			}
		},
		{
			path: "/cloudContent/history",
			name: "history",
			component: () => import('@/views/cloud/history.vue'),
			meta: {
				title: "历史记录"
			}
		},
	]
})
