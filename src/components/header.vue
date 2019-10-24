<template>
	<!-- 导航 -->
	<div class="app-header">
		<div class="home-header">
			<div class="home-header-back" @click="onClickLeft()"><img src="../assets/images/ic_fanhui.png" alt="" /></div>
			<div class="home-header-title">
				<p>{{ title }}</p>
			</div>
			<div class="home-header-more">
				<!-- <p v-if="type == 'home'" @click="helpRoute()"><img src="../assets/images/ic_yichang01.png" alt="" /></p> -->
				<p v-if="type == 'home'" ></p>
				<p v-if="type == 'home'" @click="onClickRight()"><img src="../assets/images/ic_gengduo.png" alt="" /></p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: '',
		type: ''
	},
	data() {
		return {};
	},
	mounted() {
		var self = this;
		if (window.hilink != undefined) {
			window['devicesInfo'] = res => {};
		}
	},
	computed: {},
	created() {},
	methods: {
		//获取设备全部信息
		onClickLeft() {
			//返回
			if (this.type == 'home') {
				if (window.hilink != undefined) {
					window.hilink.finishDeviceActivity();
				}
			} else {
				this.$router.go(-1); //返回上一层
			}
		},
		onClickRight() {
			//设置
			if (window.hilink != undefined) {
				// this.$router.push({ name: 'setting'});
				window.hilink.jumpTo('com.huawei.smarthome.deviceSettingActivity', 'devicesInfo');
			}
		},
		// 离线帮助
		helpRoute() {
			this.$router.push({
				path: 'instructions'
			});
		}
	}
};
</script>
<style lang="less">
.app-header {
	width: 100%;
	position: fixed;
	top: 0px;
	background: #f7f7f7;
	height: 80px;
	z-index: 1000;
}
.home-header {
	margin-top: 24px;
	height: 56px;
	display: flex;
	.home-header-back {
		display: flex;
		// justify-content: center;
		align-items: center;
		height: 100%;
		padding-left: 16px;
		img {
			display: block;
			width: 24px;
			height: 24px;
		}
	}
	.home-header-title {
		width: 218.3px;
		height: 100%;
		padding-left: 16px;
		p {
			color: #000000;
			text-align: left;
			font-size: 20px;
			margin-left: 0px;
			line-height: 56px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	.home-header-more {
		width: 85.2px;
		display: flex;
		p {
			position: relative;
			&:first-child {
				width: 22px;
				img {
					width: 22px;
					height: 22px;
					position: absolute;
					top: 50%;
					transform: translate(0%, -50%);
				}
			}
			&:last-child {
				margin-left: 23px;
				width: 22px;
				img {
					width: 22px;
					height: 22px;
					position: absolute;
					top: 50%;
					left: 0%;
					transform: translate(0%, -50%);
				}
			}
		}
	}
}
</style>
