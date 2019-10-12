<template>
	<div class="home">
		<v-header :title="title" :type="headerType"></v-header>
		<!-- 产品图 -->
		<div class="devices-img">
			<img src="../../assets/images/img_toutu_red.png" alt="" />
			<img src="../../assets/images/logo.png" alt="" />
		</div>
		<!-- 故事机开关 -->
		<div class="devices-status">
			<div class="devices-status-text">{{ isLine == 0 ? '已关闭' : '已开启' }}</div>
			<div class="devices-status-time" :class="!devTime ? 'timeActive' : ''">
				<div>
					<p>65:00</p>
					<p>定时关机</p>
				</div>
			</div>
			<div class="devices-status-btn" @click="devicesSwitch(0)">
				<p :class="isLine == 1 ? 'switchAcitve' : ''"><img :src="switchIcon()" alt="" /></p>
			</div>
		</div>
		<div class="devices-audio" style="background: #F7F7F7;">
			<!-- 歌曲控制 -->
			<div class="devices-audio-contro-box" :class="isLine == 0 ? '' : 'lineAcitve'">
				<div class="devices-audio-control">
					<div class="devices-audio-control-text">
						<div>
							<p>
								<van-notice-bar
									color="#000"
									speed="30"
									background="#fff"
									:text="audioInfo.data.song != '' ? audioInfo.data.song : '歌曲正在路上'"
									style="padding: 0;"
								/>
							</p>
							<p></p>
						</div>
					</div>
					<div class="devices-audio-control-icon">
						<div>
							<p @click="devicesSwitch(3)"><img src="../../assets/images/ic_last.png" alt="" /></p>
						</div>
						<div>
							<p @click="devicesSwitch(5)">
								<img v-if="audioInfo.data.play == 1" src="../../assets/images/ic_playing.png" alt="" />
								<img v-if="audioInfo.data.play == 0" src="../../assets/images/ic_stop.png" alt="" />
							</p>
						</div>
						<div>
							<p @click="devicesSwitch(4)"><img src="../../assets/images/ic_next.png" alt="" /></p>
						</div>
					</div>
				</div>
				<!-- 音量 -->
				<div class="devices-audio-volume">
					<div><p>音量</p></div>
					<div><van-slider v-model="volume" bar-height="2px" @change="onVolumeChange" active-color="#007DFF" /></div>
					<div>
						<span>{{ volume }}%</span>
					</div>
				</div>
			</div>
			<!-- 其他控制 -->
			<div class="devices-audio-else-controle">
				<ul>
					<div class="devices-audio-else-mode" v-show="audioMode">
						<ul>
							<li @click="devicesModeAction(1)" :class="isLine == 0 ? '' : 'lineAcitve'"><p>列表循环</p></li>
							<li @click="devicesModeAction(0)" :class="isLine == 0 ? '' : 'lineAcitve'"><p>单曲循环</p></li>
							<!-- <li>
								<p>随机循环</p>
							</li> -->
						</ul>
					</div>
					<li @click="devicesMode()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>模式</p>
								<p>{{ playMode == 1 ? '列表循环' : '单曲循环' }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon">
							<img v-if="playMode == -1" src="../../assets/images/ic_liebiao.png" alt="" />
							<img v-if="playMode == 0" src="../../assets/images/ic_danqu_hover.png" alt="" />
							<img v-if="playMode == 1" src="../../assets/images/ic_liebiao_hover.png" alt="" />
						</div>
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
					<li :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>耳灯</p>
								<p>{{ earLight.data.on == 0 ? '已关闭' : '已开启' }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon" @click="devicesSwitch(1)">
							<img v-if="earLight.data.on == 0" src="../../assets/images/ic_fengsu_off5.png" alt="" />
							<img v-if="earLight.data.on == 1" src="../../assets/images/ic_fengsu_on5.png" alt="" />
						</div>
					</li>
					<li :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>表情灯</p>
								<p>{{ faceLight.data.on == 0 ? '已关闭' : '已开启' }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon" @click="devicesSwitch(2)">
							<img v-if="faceLight.data.on == 0" src="../../assets/images/ic_shuimian_off.png" alt="" />
							<img v-if="faceLight.data.on == 1" src="../../assets/images/ic_shuimian_on.png" alt="" />
						</div>
					</li>
				</ul>
			</div>
			<div class="devices-audio-look" @click="devicesLockSwitch()" v-show="isFold" :class="isLine == 0 ? '' : 'lineAcitve'">
				<div>
					<p>童锁</p>
					<div>
						<img v-if="lookData == 1" src="../../assets/images/ic_tongsuo_on.png" alt="" />
						<img v-else src="../../assets/images/ic_tongsuo_off.png" alt="" />
					</div>
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
			lampSwitch: [], //开关
			audioInfo: [], //歌曲信息
			earLight: [], //耳灯
			faceLight: [], //表情灯
			volume: 0,
			devTime: false,
			timePopup: false,
			lookData: 0, //童锁
			isLine: 0, //是否在线
			isFold: false, //折叠展开
			foldText: '展开更多',
			playMode: -1,
			switchText: '已关闭',
			title: '火火兔故事机',
			headerType: 'home',
			audioMode: false, //音乐模式
			foldIcon: require('../../assets/images/ic_shouqi.png')
		};
	},
	computed: {
		// ...mapState(["devicesInfo"])
	},
	created() {
		if (window.hilink != undefined) {
			this.getDevicesAll();
		}
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['resultCallback'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				self.devicesAction(405, 0);
				data.services.forEach(function(item, index) {
					let type = item.sid;
					switch (type) {
						case 'switch':
							self.lampSwitch = item || [];
							self.isLine = item.data.on;
							break;
						case 'Music':
							self.devicesPlayInfo(item);
							self.audioInfo = item || [];
							self.volume = item.data.volume;
							break;
						case 'earLight':
							self.earLight = item || [];
							break;
						case 'faceLight':
							self.faceLight = item || [];
							break;
						case 'custom':
							if (item.data.action == '104') {
								localStorage.setItem("mode",item.data.playmode)
								self.playMode = item.data.playmode;
							} else if (item.data.action == '637') {
							}
							break;
						default:
							break;
					}
				});
			};
			window['deviceInfoCallback'] = resultStr => {
				console.log('获取设备单独信息======', resultStr);
			};
			//设备主动上报回调信息
			window['deviceEventCallback'] = event => {
				let data = self.praseResponseData(event);
				let type = data.sid;
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
					case 'custom':
						console.log('custom返回数据=================', data.data);
						let json = self.$base64.doDecode(data.data.function);
						let customData = JSON.parse(json);
						console.log('josn数据=======', customData);
						if (customData.action == '910') {
							localStorage.setItem("mode",customData.playmode)
							self.playMode = customData.playmode;
							console.log('self.playMode===', self.playMode);
						} else if (customData.action == '628') {
							self.lookData = customData.on;
							console.log('self.lookDat===', self.lookData);
						} else if (customData.action == '406') {					
							self.devicesLocal(customData.lists[0]);
						} else if (customData.action == '402') {
							localStorage.setItem("awaitFlag",true)
							console.log('本地歌单================');
							console.log('customData.songs=============', customData.songs);
							self.devicesPutLocal(customData);
						}
						break;
					default:
						break;
				}
			};
		}
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
		devicesLocal(data) {
			let self = this;
			self.getLocalList(data);
		},
		devicesLocal(data) {
			let self = this;
			self.getLocalList(data);
		},
		awaitFlag(data){
			let self =this;
			self.setAwaitFlag(data)
		},
		//本地歌曲
		devicesPutLocal(data, id) {
			let self = this;
			console.log('402==========', data);
			self.putLocalList(data);
		},
		//设置播放器信息
		devicesPlayInfo(data) {
			let self = this;
			self.setPlayData(data);
		},
		//获取设备全部信息
		getDevicesAll() {
			let self = this;
			if (window.hilink != undefined) {
				self.getDevCacheAll();
			}
		},
		/*
		 *设备开关控制
		 * type:   开挂那类型
		 * 0:关机
		 * 1:耳灯
		 * 2:表情灯
		 * 3:上一曲
		 * 4:下一曲
		 * 5:播放暂停
		 * 6:童锁
		 */
		devicesSwitch(type) {
			console.log('设备开关');
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: '请旋转火火兔的尾巴开机',
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			if (window.hilink != undefined) {
				var data;
				var on;
				switch (type) {
					case 0:
						if (self.lampSwitch.data.on == 0) {
							this.$toast({
								message: '请旋转火火兔的尾巴开机',
								position: 'bottom',
								duration: '3000',
								className: 'toastActive'
							});
							return;
						} else {
							on = self.lampSwitch.data.on == 1 ? 0 : 0;
							data = { switch: { on: on, name: 'switch' } };
						}
						break;
					case 1:
						on = self.earLight.data.on == 1 ? 0 : 1;
						data = { earLight: { on: on, name: 'earLight' } };
						break;
					case 2:
						on = self.faceLight.data.on == 1 ? 0 : 1;
						data = { faceLight: { on: on, name: 'faceLight' } };
						break;
					case 3:
						data = { Music: { cutSong: 0, name: 'cutSong' } };
						break;
					case 4:
						data = { Music: { cutSong: 1, name: 'cutSong' } };
						break;
					case 5:
						on = self.audioInfo.data.play == 1 ? 0 : 1;
						data = { Music: { play: on, name: 'play' } };
					case 6:
						var body = {
							from: 'DID:0',
							to: 'UID:-1',
							action: 627,
							on: 0
						};
						var json = JSON.stringify(body);
						data = { custom: { function: json, name: 'function' } };
					default:
						break;
				}
				console.log(data);
				self.setDeviceInfo(data);
			}
		},
		//播放模式选择
		devicesMode() {
			let self = this;
			self.audioMode = !self.audioMode;
		},
		devicesAction(action, type, on) {
			let self = this;
			var body;
			if (type == 0) {
				body = {
					from: 'DID:0',
					to: 'UID:-1',
					action: action
				};
			} else {
				body = {
					from: 'DID:0',
					to: 'UID:-1',
					action: action,
					on: on
				};
			}
			let json = JSON.stringify(body);
			let data = { custom: { function: json } };
			console.log('setDeviceInfo===', data);
			self.setDeviceInfo(data);
		},
		//故事机童锁开关
		devicesLockSwitch() {
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: '请旋转火火兔的尾巴开机',
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			let on = self.lookData == 1 ? 0 : 1;
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 627,
				on: on
			};
			var json = JSON.stringify(body);
			var data = { custom: { function: json, name: 'function' } };
			self.setDeviceInfo(data);
		},
		//故事机播放模式
		devicesModeAction(mode) {
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: '请旋转火火兔的尾巴开机',
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 909,
				playmode: mode
			};
			self.audioMode = !self.audioMode;
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.setDeviceInfo(data);
		},
		//故事机音量调节
		onVolumeChange(value) {
			let self = this;
			let data = { Music: { volume: value, name: 'volume' } };
			self.setDeviceInfo(data);
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
				dataStr = dataStr.replace(/\n/g, '');
				return JSON.parse(dataStr);
			}
		},
		//进入内容
		contentBtn(type) {
			var url;
			if (self.isLine == 0 && type !=0) {
				this.$toast({
					message: '请旋转火火兔的尾巴开机',
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			if (type == 0) {
				url = 'cloudIndex'; //火火兔内容云
			} else if (type == 1) {
				url = 'english'; //启蒙英语
			} else if (type == 2) {
				url = 'locallist';
			} else if (type == 3) {
				url = 'locallist';
			}
			this.$router.push({
				name: url
			});
		},
		...mapActions(['setPlayData', 'getLocalList', 'putLocalList', 'setLocalCid','setAwaitFlag'])
	},
	components: {
		'v-picker': picker,
		'v-header': Header
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/css/home.less';
</style>
