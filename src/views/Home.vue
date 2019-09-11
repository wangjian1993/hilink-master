<template>
	<div class="home">
		<!-- 导航 -->
		<van-nav-bar title="火火兔" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<!-- 产品图 -->
		<div class="devices-img"><img src="../assets/images/j7.png" /></div>
		<div class="devices-status" @click="cheackErdeng()">
			<div class="devices-status-text">
				<span v-if="erdengSwitch.data.on == 1">已开启</span>
				<span v-else>已关闭</span>
			</div>
			<div class="devices-status-img"><img src="../assets/images/on.png" alt="" /></div>
		</div>
		<div class="devices-action-list"></div>
		<!-- <div class="infoAll"><p>设备信息---{{devicesstate}}</p></div> -->
	</div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
	name: 'home',
	data() {
		return {
			erdengSwitch: []
		};
	},
	computed: {
		...mapState(['devicesstate'])
	},
	created() {
		this.getDevicesAll();
	},
	mounted() {
		var self = this;
		//获取设备全部信息回调
		window['resultCallback'] = resultStr => {
			self.devicesInfoAll(resultStr);
			let data = self.praseResponseData(resultStr);
			data.services.forEach(function(item, index) {
				let type = item.sid;
				switch (type) {
					case 'switch':
						self.erdengSwitch = item;
						console.log(self.erdengSwitch);
						break;
					default:
						break;
				}
			});
		};
		//设备主动上报回调信息
		window['deviceEventCallback'] = event => {
			let data = self.praseResponseData(event);
			let type = data.sid;
			console.log("设备返回========",type)
			switch (type) {
				case 'switch':
					self.erdengSwitch.data.on = data.data.on;
					break;
				case 'biaoqing':
					console.log("表情灯")
					break;
				default:
					break;
			}
		};
	},
	methods: {
		//设备全部信息
		devicesInfoAll(data) {
			let self = this;
			self.getDevicesState(data);
		},
		//获取设备全部信息
		getDevicesAll() {
			let self = this;
			self.getDevCacheAll();
		},
		//切换耳灯
		cheackErdeng() {
			let self = this;
			console.log('设置信息===', self.erdengSwitch);
			let on = self.erdengSwitch.data.on == 1 ? 0 : 1;
			let data = { switch: { on: on, name: 'dengguang' } };
			self.setDeviceInfo(data);
		},
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
		//获取设备全部信息
		onClickLeft() {
			//返回
		},
		onClickRight() {
			//搜索
		},
		...mapActions(['getDevicesState'])
	},
	components: {}
};
</script>
<style lang="less" scoped>
.infoAll {
	font-size: 14px;
}
.devices-img {
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
	}
}
.devices-status {
	width: 95%;
	margin: 0 auto;
	display: flex;
	height: 100px;
	line-height: 100px;
	.devices-status-text {
		font-size: 14px;
		flex: 2;
		text-align: center;
	}
	.devices-status-img {
		flex: 2;
		text-align: center;
	}
}
</style>
