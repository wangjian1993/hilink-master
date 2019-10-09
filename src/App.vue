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
			window['resultCallback'] = resultStr => {
				console.log('全部信息=====', resultStr);
				let data = self.praseResponseData(resultStr);
				console.log("data.services========",data.services);
				self.devicesInfo(data.services);
				// data.services.forEach(function(item, index) {
				// 	let type = item.sid;
				// 	console.log('设备全部信息======', type);
				// 	console.log("item.data=======",item.data)
				// 	switch (type) {					
				// 		case 'switch':
				// 			self.lampSwitch = item || [];
				// 			self.isLine = item.data.on;
				// 			break;
				// 		case 'Music':
				// 			self.devicesPlayInfo(item);
				// 			self.audioInfo = item || [];
				// 			self.volume = item.data.volume;
				// 			break;
				// 		case 'earLight':
				// 			self.earLight = item || [];
				// 			break;
				// 		case 'faceLight':
				// 			self.faceLight = item || [];
				// 			break;
				// 		default:
				// 			break;
				// 	}
				// });
			};
			window['deviceInfoCallback'] = resultStr => {
				console.log('获取设备单独信息======', resultStr);
			};
			//设备主动上报回调信息
			window['deviceEventCallback'] = event => {
				let data = self.praseResponseData(event);
				let type = data.sid;
				console.log('设备返回========', type);
				console.log('设备返回数据========', data);
				switch (type) {
					case 'switch':
						self.lampSwitch.data.on = data.data.on || [];
						self.isLine = data.data.on;
						break;
					case 'earLight':
						self.earLight.data.on = data.data.on || [];
						break;
					case 'faceLight':
						self.faceLight.data.on = data.data.on || [];
						break;
					case 'Music':
						self.devicesPlayInfo(data);
						self.audioInfo.data = data.data || [];
						self.volume = data.data.volume;
						break;
					default:
						break;
				}
			};
		}
	},
	methods: {
		//回调函数转换
		praseResponseData(resData) {
			try {
				return JSON.parse(resData);
			} catch (error) {
				var dataStr = resData.replace(/:"{/g, ':{');
				dataStr = dataStr.replace(/}",/g, '},');
				dataStr = dataStr.replace(/\\/g, '');
				return JSON.parse(dataStr);
			}
		},
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
