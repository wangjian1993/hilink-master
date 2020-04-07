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
		{ //本地内容
			path: '/cloudenglish',
			name: 'CloudEnglish',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/CloudEnglish.vue'),
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
		/* 新后台内容云----------------------------------------*/
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
		// {
		// 	path: '/cloudContent/listen',
		// 	name: 'cloudListen',
		// 	component: () => import('@/views/cloudContent/listen.vue'),
		// 	meta: {
		// 		title: "火火兔内容云",
		// 		keepAlive: true
		// 	}
		// },
		//火火兔云内容听儿歌详情页
		// {
		// 	path: '/cloud/listenDetail',
		// 	name: 'cloudListenDetail',
		// 	component: () => import( /* webpackChunkName: "cloudListenDetail" */ '@/views/cloudContent/listenDetail.vue'),
		// 	meta: {
		// 		keepAlive: false,
		// 	}
		// },
		{
			path: '/cloud/allDown',
			name: 'cloudAllDown',
			component: () => import( /* webpackChunkName: "cloudListenDetail" */ '@/views/cloud/allDown.vue'),
			meta: {
				keepAlive: false,
			}
		},
		{
			path: '/cloud/allEnshrine',
			name: 'cloudAllEnshrine',
			component: () => import( /* webpackChunkName: "cloudListenDetail" */ '@/views/cloud/allEnshrine.vue'),
			meta: {
				keepAlive: false,
			}
		},
		// //火火兔云内容主播详情页面
		// {
		// 	path: '/cloud/hostDetail',
		// 	name: 'cloudHostDetail',
		// 	component: () => import('@/views/tcloud/hostDetail.vue'),
		// 	meta: {
		// 		keepAlive: false,
		// 		title: "优选主播",
		// 	}
		// },
		//火火兔云内容视频详情页面
		// {
		// 	path: '/cloud/video',
		// 	name: 'cloudVideo',
		// 	component: () => import('@/views/tcloud/video.vue'),
		// 	meta: {
		// 		keepAlive: false
		// 	}
		// },
		{
			path: '/cloud/home',
			name: 'cloudHome',
			component: () => import('@/views/cloud/home.vue'),
			meta: {
				title: "火火兔早教",
				keepAlive: true
			}
		},
		{
			path: "/cloud/albumList",
			name: 'albumList',
			component: () => import('@/views/cloud/albumList.vue'),
			meta: {
				title: "专辑列表"
			}
		},
		{
			path: "/cloud/ssec",
			name: "ssec",
			component: () => import('@/views/cloud/ssec.vue'),
			meta: {
				title: "听讲赏学"
			}
		},
		{
			path: "/cloud/albumDetail",
			name: 'albumDetail',
			component: () => import('@/views/cloud/albumDetail.vue'),
			meta: {
				title: "专辑详情"
			}
		},
		{
			path: "/cloud/rank",
			name: 'rank',
			component: () => import('@/views/cloud/rank.vue'),
			meta: {
				title: "排行榜",
				keepAlive: true
			}
		},
		{
			path: "/cloud/video",
			name: "video",
			component: () => import('@/views/cloud/video.vue'),
			meta: {
				title: "视频"
			}
		},
		{
			path: "/cloud/history",
			name: "history",
			component: () => import('@/views/cloud/history.vue'),
			meta: {
				title: "历史记录"
			}
		},
		{
			path: '/cloud/videoList',
			name: 'cloudVideoList',
			component: () => import('@/views/cloud/videoList.vue'),
			meta: {
				title: "视频推荐",
				keepAlive: false
			}
		},
		
		
		
		/* 旧后台内容云-------------------------------------------------**/
		//火火兔云内容首页
		{
			path: '/old/index',
			name: 'OldIndex',
			component: () => import('@/views/OldCloud/home.vue'),
			meta: {
				title: "火火兔内容云",
				keepAlive: true,
			}
		},
		//火火兔云内容听儿歌页
		{
			path: "/old/ssec",
			name: "OldSsec",
			component: () => import('@/views/OldCloud/ssec.vue'),
			meta: {
				title: "听讲赏学"
			}
		},
		//火火兔云内容听儿歌详情页
		{
			path: "/old/albumDetail",
			name: 'OldAlbumDetail',
			component: () => import('@/views/OldCloud/albumDetail.vue'),
			meta: {
				title: "专辑详情"
			}
		},
		//火火兔云内容搜索页
		{
			path: '/old/search',
			name: 'OldSearch',
			component: () => import('@/views/OldCloud/search.vue'),
			meta: {
				title: "搜索",
				keepAlive: true,
			}
		},
		{
			path: "/old/rank",
			name: 'OldRank',
			component: () => import('@/views/OldCloud/rank.vue'),
			meta: {
				title: "排行榜",
				keepAlive: true
			}
		},
		{
			path: "/old/albumList",
			name: 'OldAlbumList',
			component: () => import('@/views/OldCloud/albumList.vue'),
			meta: {
				title: "专辑列表"
			}
		},
		{
			path: "/old/differentAge",
			name: 'OldDifferentAge',
			component: () => import('@/views/OldCloud/differentAge.vue'),
			meta: {
				title: "分龄推荐"
			}
		},
	]
})
