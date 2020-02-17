<template>
	<div id="app" class="hhtApp">
		<v-header :title="title"></v-header>
		<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
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
			type: 'AliloCloud',
			title: this.$t('m.AliloCloud')
		};
	},
	created() {
		this.$store.dispatch('init');
		/**隐藏顶部导航 */
		if (window.hilink != undefined) {
			window.hilink.setTitleVisible(false, 'titleVisibleCallback');
			// window.hilink.getVersion('systemResultCallback');
		}
		var lang_flag;
		var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
		lang = lang.substr(0, 2); //截取lang前2位字符
		if (lang == 'zh') {
			lang_flag = 0;
			console.log('中文');
			this.lang = 'zh-CN';
			this.$i18n.locale = this.lang; //关键语句
		} else {
			lang_flag = 1;
			console.log('英语');
			this.lang = 'en-US';
			this.$i18n.locale = this.lang; //关键语句
		}
	},
	mounted() {
		var self = this;
		if (window.hilink != undefined) {
			window['titleVisibleCallback'] = resultStr => {
				console.log('导航回调函数====', resultStr);
			};
			window['onResume'] = res => {
				console.log('手机恢复后台');
				self.$store.dispatch('getDevCacheAll');
			};
			// window['deviceEventCallback'] = res => {
			// 	console.log("11111111111111")
			// 	// console.log(res);
			// 	// console.log("devName============",res.devName);
			// 	// console.log('deviceEventCallback========', res);
			// };
			//获取设备全部信息回调
		}
	},
	methods: {
		//设置播放器信息
		// devicesInfo(data) {
		// 	let self = this;
		// 	self.getDevicesInfo(data);
		// },
		// ...mapActions(['getDevicesInfo'])
	},
	watch: {
		$route(e) {
			this.title = e.meta.title;
			if (e.name != 'home' && e.name != '' && e.name != 'cloudAllEnshrine' && e.name != "cloudAllDown" && e.name != 'setting') {
				this.isPlay = true;
				//console.log('显示');
			} else {
				this.isPlay = false;
				//console.log('隐藏');
			}
		}
	},
	components: {
		'v-play': Play,
		'v-header': Header
	}
};
</script>
<style lang="less">
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
.van-overlay {
	background-color: rgba(0, 0, 0, 0.3);
}
.popup {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.3);
	top: 0;
	left: 0;
	box-sizing: border-box;
}
.popup1 {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 1000;
	background: rgba(0, 0, 0, 0);
	top: 0;
	left: 0;
	box-sizing: border-box;
}
.van-picker-column__item--selected {
	color: #007dff;
	font-size: 18px;
	// height: 56px;
	// line-height: 56px;
}
.van-picker {
	width: 312px;
	margin: 0 auto;
}
.van-picker-column__item {
	/* font-size: 16px; */
	/* opacity: .9; */
	// height: 36px;
}
.van-toast {
	background: rgba(217, 217, 217, 0.95);
	color: #000000;
	border-radius: 35px;
}
</style>