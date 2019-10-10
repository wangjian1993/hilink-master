<template>
	<div id="app">
		<v-header :title="title"></v-header>
		<keep-alive><router-view></router-view></keep-alive>
		<v-play v-show="isPlay"></v-play>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Play from '@/components/play';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			isPlay: false,
			transitionName: null,
			path: '',
			title: '火火兔故事机'
		};
	},
	created() {
		/**隐藏顶部导航 */
		if (window.hilink != undefined) {
			window.hilink.setTitleVisible(false, 'titleVisibleCallback');
		}
	},
	mounted() {
		var self = this;
		if (window.hilink != undefined) {
			window['titleVisibleCallback'] = resultStr => {
				console.log('导航回调函数====', resultStr);
			};
			//获取设备全部信息回调
		}
	},
	methods: {
		//设置播放器信息
		devicesInfo(data) {
			let self = this;
			self.getDevicesInfo(data);
		},
		...mapActions(['getDevicesInfo'])
	},
	watch: {
		$route(e) {
			this.title = e.meta.title;
			if (e.name != 'home' && e.name != '') {
				this.isPlay = true;
				console.log('显示');
			} else {
				this.isPlay = false;
				console.log('隐藏');
			}
		},
	},
	components: {
		'v-play': Play,
		'v-header': Header
	}
};
</script>
<style>
@font-face {
	font-family: 'hwtext-zh';
	src: url('assets/font/zh/HuaweiFont-Regular.ttf');
}
@font-face {
	font-family: 'hwtext-en';
	src: url('assets/font/en/HuaweiSans-Regular.ttf');
}
body {
	background: #f7f7f7;
}
html {
	font-family: 'hwtext-zh', 'hwtext-en', Helvetica, STHeiTi, Arial, sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	font-size: 62.5%;
	background: #f7f7f7;
	margin-top: 24px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	will-change: transform;
	transition: all 500ms;
	position: absolute;
}
.slide-right-enter {
	opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
	opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
/* .router-view {
  width: 100%;
  height:100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
} */
.router-view {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: 0 auto;
	overflow: auto hidden;
	/* overflow: hidden; */
}
</style>
