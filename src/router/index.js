import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
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
		{ //内容
			path: '/content',
			name: 'content',
			component: () => import( /* webpackChunkName: "content" */ '@/views/Content/Content.vue')
		},
		{
			path:'/instructions',
			name:'instructions',
			component:()=>import( /* webpackChunkName: "instructions" */'@/views/Home/Instructions.vue')
		},
		{ //启蒙英语
			path: '/locallist',
			name: 'locallist',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/LocalList.vue')
		},
		{ //本地内容
			path: '/english',
			name: 'english',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/English.vue')
		},
		{ //首页
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '@/views/Content/About.vue')
		},
		{
			path: '*',
			component: () => import( /* webpackChunkName: "home" */ '@/views/Home/Home.vue')
		}
	]
})
