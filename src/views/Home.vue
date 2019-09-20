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
			<div class="devices-status-btn" @click="devicesSwitch()">
				<p><img src="../assets/images/swich.png" alt="" /></p>
			</div>
		</div>
		<div class="devices-audio">
			<!-- 歌曲控制 -->
			<div class="devices-audio-contro-box">
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
				<!-- 音量 -->
				<div class="devices-audio-volume">
					<div><p>音量</p></div>
					<div><van-slider v-model="volume" bar-height="2px" active-color="#007DFF" /></div>
					<div>
						<span>{{ volume }}%</span>
					</div>
				</div>
			</div>
			<!-- 其他控制 -->
			<div class="devices-audio-else-controle">
				<ul>
					<li>
						<div class="devices-audio-else-text">
							<div>
								<p>模式</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../assets/images/ic_danqu.png" alt="" /></div>
					</li>
					<li>
						<div class="devices-audio-else-text">
							<div>
								<p>定时关机</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../assets/images/ic_dingshi_off.png" alt="" /></div>
					</li>
					<li>
						<div class="devices-audio-else-text">
							<div>
								<p>耳灯</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../assets/images/ic_fengsu_off5.png" alt="" /></div>
					</li>
					<li>
						<div class="devices-audio-else-text">
							<div>
								<p>表情灯</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../assets/images/ic_shuimian_off.png" alt="" /></div>
					</li>
				</ul>
			</div>
			<div class="devices-audio-look" @click="onConfirm()">
				<div>
					<p>童锁</p>
					<div><img src="../assets/images/ic_tongsuo_off.png" alt="" /></div>
				</div>
			</div>
		</div>
		<div class="devices-fold">
			<div>
				<p>收起</p>
				<img src="../assets/images/ic_zhankai.png" alt="" />
			</div>
		</div>
		<div class="devices-content">
			<h3>内容推荐</h3>
			<ul>
				<li @click="goCloud">
					<img src="../assets/images/img_huohuotuneirongyun.png" alt="" />
					<p>火火兔内容云</p>
				</li>
				<li>
					<img src="../assets/images/img_qimengjiaoyu.png" alt="" />
					<p>启蒙英语</p>
				</li>
				<li>
					<img src="../assets/images/img_bendineir.png" alt="" />
					<p>本地内容</p>
				</li>
				<li>
					<img src="../assets/images/img_wodeshoucang.png" alt="" />
					<p>我的收藏</p>
				</li>
			</ul>
		</div>
		<picker :timePopup.sync="timePopup"></picker>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState } from 'vuex';
import picker from '@/components/picker.vue';
export default {
	name: 'home',
	data() {
		return {
			erdengSwitch: [],
			volume: 10,
			show: false,
			timePopup:false,
			// currentTime: '12:00'
		};
	},
	computed: {
		// ...mapState(["timePopup"])
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
		//跳转火火兔云内容
		goCloud(){
			this.$router.push('/cloudContent/index')
		},
		onConfirm() {
			let self = this;
			self.timePopup = !self.timePopup;  //显示
		},
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
		devicesSwitch() {
			console.log('设备开关');
			this.$toast({
				message: '今日签到+3',
				position: 'bottom',
				duration: '3000',
				className: 'toastActive'
			});
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
	components: {
		picker
	}
};
</script>
<style lang="less" scoped>
@import '../assets/css/home.less';
</style>
