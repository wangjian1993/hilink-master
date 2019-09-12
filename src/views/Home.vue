<template>
	<div class="home">
		<!-- 导航 -->
		<div class="home-header">
			<div class="home-header-back"><img src="../assets/images/ic_fanhui.png" alt="" /></div>
			<div class="home-header-title"><p>火火兔故事机</p></div>
			<div class="home-header-more">
				<p><img src="../assets/images/ic_yichang01.png" alt="" /></p>
				<p><img src="../assets/images/ic_gengduo.png" alt="" /></p>
			</div>
		</div>
		<!-- 产品图 -->
		<div class="devices-img">
			<img src="../assets/images/img_toutu_bule.png" alt="" />
			<img src="../assets/images/logo.png" alt="" />
		</div>
		<!-- 故事机开关 -->
		<div class="devices-status">
			<div class="devices-status-text">已关闭</div>
			<div class="devices-status-time">
				<div>
					<p>65:00</p>
					<p>定时关机</p>
				</div>
			</div>
			<div class="devices-status-btn">
				<p><img src="../assets/images/swich.png" alt="" /></p>
			</div>
		</div>
		<div class="devices-audio">
			<div class="devices-audio-control">
				<div class="devices-audio-control-text">
					<div>
						<p>小宝贝快快睡</p>
						<p>未知</p>
					</div>
				</div>
				<div class="devices-audio-control-icon">
					<div>
						<p><img src="../assets/images/ic_last.png" alt="" /></p>
					</div>
					<div>
						<p><img src="../assets/images/ic_playing.png" alt="" /></p>
					</div>
					<div>
						<p><img src="../assets/images/ic_next.png" alt="" /></p>
					</div>
				</div>
			</div>
			<div class="devices-audio-volume">
				<div><p>音量</p></div>
				<div><van-slider v-model="volume" bar-height="4px" active-color="#ee0a24" /></div>
				<div><span>68%</span></div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
	name: 'home',
	data() {
		return {
			erdengSwitch: [],
			volume: 100
		};
	},
	computed: {
		...mapState(['devicesstate'])
	},
	created() {
		// this.getDevicesAll();
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
			console.log('设备返回========', type);
			switch (type) {
				case 'switch':
					self.erdengSwitch.data.on = data.data.on;
					break;
				case 'biaoqing':
					console.log('表情灯');
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
@import '../assets/css/home.less';
</style>
