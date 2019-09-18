<template>
	<div class="home">
		<v-header :title="title" :type="headerType"></v-header>
		<!-- 产品图 -->
		<div class="devices-img">
			<img src="../../assets/images/img_toutu_bule.png" alt="" />
			<img src="../../assets/images/logo.png" alt="" />
		</div>
		<!-- 故事机开关 -->
		<div class="devices-status">
			<div class="devices-status-text">{{ isLine == 0 ? '已关闭' : '已开启' }}</div>
			<div class="devices-status-time" v-show="">
				<div>
					<p>65:00</p>
					<p>定时关机</p>
				</div>
			</div>
			<div class="devices-status-btn" @click="devicesSwitch()">
				<p :class="isLine == 1 ? 'switchAcitve' : ''"><img :src="switchIcon()" alt="" /></p>
			</div>
		</div>
		<div class="devices-audio" style="background: #F7F7F7;">
			<!-- 歌曲控制 -->
			<div class="devices-audio-contro-box" :class="isLine == 0 ? '' : 'lineAcitve'">
				<div class="devices-audio-control">
					<div class="devices-audio-control-text">
						<div>
							<p>小宝贝快快睡</p>
							<p>未知</p>
						</div>
					</div>
					<div class="devices-audio-control-icon">
						<div>
							<p><img src="../../assets/images/ic_last.png" alt="" /></p>
						</div>
						<div>
							<p><img src="../../assets/images/ic_playing.png" alt="" /></p>
						</div>
						<div>
							<p><img src="../../assets/images/ic_next.png" alt="" /></p>
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
					<li @click="devicesActionSwitch()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>模式</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../../assets/images/ic_danqu.png" alt="" /></div>
					</li>
					<li @click="onConfirm()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>定时关机</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../../assets/images/ic_dingshi_off.png" alt="" /></div>
					</li>
				</ul>
				<ul v-show="isFold">
					<li @click="devicesActionSwitch()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>耳灯</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../../assets/images/ic_fengsu_off5.png" alt="" /></div>
					</li>
					<li @click="devicesActionSwitch()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>表情灯</p>
								<p>列表循环</p>
							</div>
						</div>
						<div class="devices-audio-else-icon"><img src="../../assets/images/ic_shuimian_off.png" alt="" /></div>
					</li>
				</ul>
			</div>
			<div class="devices-audio-look" @click="devicesActionSwitch()" v-show="isFold" :class="isLine == 0 ? '' : 'lineAcitve'">
				<div>
					<p>童锁</p>
					<div><img src="../../assets/images/ic_tongsuo_off.png" alt="" /></div>
				</div>
			</div>
		</div>
		<div class="devices-fold">
			<div @click="foldClick()">
				<p>{{ foldText }}</p>
				<img :src="foldIcon" alt="" />
			</div>
		</div>
		<div class="devices-content">
			<h3>内容推荐</h3>
			<ul>
				<li @click="contentBtn(0)">
					<img src="../../assets/images/img_huohuotuneirongyun.png" alt="" />
					<p>火火兔内容云</p>
				</li>
				<li @click="contentBtn(1)">
					<img src="../../assets/images/img_qimengjiaoyu.png" alt="" />
					<p>启蒙英语</p>
				</li>
				<li @click="contentBtn(2)">
					<img src="../../assets/images/img_bendineir.png" alt="" />
					<p>本地内容</p>
				</li>
				<li @click="contentBtn(3)">
					<img src="../../assets/images/img_wodeshoucang.png" alt="" />
					<p>我的收藏</p>
				</li>
			</ul>
		</div>
		<v-picker :timePopup.sync="timePopup"></v-picker>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState } from 'vuex';
import picker from '@/components/picker.vue';
import Header from '@/components/header.vue';
export default {
	name: 'home',
	data() {
		return {
			lampSwitch: [],
			volume: 10,
			show: false,
			timePopup: false,
			isLine: 0, //是否在线
			isFold: false, //折叠展开
			foldText: '展开更多',
			switchText: '已关闭',
			title:"火火兔讲故事",
			headerType:"home",
			foldIcon: require('../../assets/images/ic_shouqi.png')
		};
	},
	computed: {
		// ...mapState(["timePopup"])
	},
	created() {
		if (window.hilink != undefined) {
			this.getDevicesAll();
		}
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
						self.lampSwitch = item;
						self.isLine = item.data.on;
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
					self.lampSwitch.data.on = data.data.on;
					self.isLine = data.data.on;
					break;
				case 'biaoqing':
					console.log('表情灯');
					break;
				default:
					break;
			}
		};
		window['devicesInfo'] = event => {
			console.log('设备设置');
		};
	},
	methods: {
		onConfirm() {
			let self = this;
			self.timePopup = !self.timePopup; //显示
		},
		//设置开关图片
		switchIcon() {
			let self = this;
			if (self.isLine == 1) {
				return require('../../assets/images/ic_power_on.png');
			} else {
				return require('../../assets/images/swich.png');
			}
		},
		//设备全部信息
		devicesInfoAll(data) {
			let self = this;
			self.getDevicesState(data);
		},
		//获取设备全部信息
		getDevicesAll() {
			let self = this;
			if (window.hilink != undefined) {
				self.getDevCacheAll();
			}
		},
		//切换耳灯
		devicesSwitch() {
			console.log('设备开关');
			let self = this;
			if (window.hilink != undefined) {
				let on = self.lampSwitch.data.on == 1 ? 0 : 1;
				let data = { switch: { on: on, name: 'switch' } };
				self.setDeviceInfo(data);
			}
		},
		/*
		 *设备功能开关
		 *
		 */
		devicesActionSwitch(type) {
			let self = this;
			//判断设备是否在线
			if (self.isLine == 0) {
				this.$toast({
					message: '请旋转火火兔的尾巴开机',
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
		},
		/*
		 *展开折叠
		 */
		foldClick() {
			let self = this;
			self.isFold = !self.isFold;
			if (self.isFold) {
				self.foldText = '收起';
				self.foldIcon = require('../../assets/images/ic_zhankai.png');
			} else {
				self.foldText = '展开更多';
				self.foldIcon = require('../../assets/images/ic_shouqi.png');
			}
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
		//进入内容
		contentBtn(type) {
			var url;
			if (type == 0) {
				url = '/content'; //火火兔内容云
			} else if (type == 1) {
				url = '/english'; //启蒙英语
			} else if (type == 2) {
			} else if (type == 3) {
			}
			this.$router.push({
				path: url
			});
		},
		...mapActions(['getDevicesState'])
	},
	components: {
		"v-picker":picker,
		"v-header":Header
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/css/home.less';
</style>
