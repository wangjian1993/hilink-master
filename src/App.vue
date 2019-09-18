<template>
	<div id="app">
		<keep-alive><router-view></router-view></keep-alive>
		<Play v-if="isPlay"></Play>
	</div>
</template>
<script>
import Play from '@/components/play';
export default {
	data() {
		return {
			isPlay: false
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
			if (e.name != 'home' && e.name != "help") {
				this.isPlay = true;
			} else {
				this.isPlay = false;
			}
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
</style>
