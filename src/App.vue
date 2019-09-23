<template>
	<div id="app">
		<transition :name="transitionName">
			<keep-alive><router-view></router-view></keep-alive>
			<Play v-if="isPlay"></Play>
		</transition>
	</div>
</template>
<script>
import Play from '@/components/play';
export default {
	data() {
		return {
			isPlay: false,
			transitionName: null
		};
	},
	created() {
		/**隐藏顶部导航 */
		if (window.hilink != undefined) {
			window.hilink.setTitleVisible(false, 'titleVisibleCallback');
		}
	},
	mounted() {
		if (window.hilink != undefined) {
			window['titleVisibleCallback'] = resultStr => {
				console.log('导航回调函数====', resultStr);
			};
		}
	},
	watch: {
		$route(e) {
			console.log('路由信息', e);
			if (e.name != 'home' && e.name != 'help') {
				this.isPlay = true;
			} else {
				this.isPlay = false;
			}
		},
		$route(to, from) {
			const toDepth = to.path.split('/').length;
			const fromDepth = from.path.split('/').length;
			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
		}
	},
	components: {
		Play
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
.router-view{
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
