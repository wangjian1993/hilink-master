import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{ //首页
			path: '/',
			name: 'home',
			component: () => import( /* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
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
		{ //启蒙英语
			path: '/english',
			name: 'english',
			component: () => import( /* webpackChunkName: "english" */ '@/views/Content/Content.vue')
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
