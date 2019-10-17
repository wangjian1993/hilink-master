<template>
	<div class="home">
		<v-header :title="title" :type="headerType"></v-header>
		<!-- 产品图 -->
		<div class="devices-img">
			<img src="../../assets/images/img_toutu_red.png" alt />
			<img src="../../assets/images/logo.png" alt />
		</div>
		<!-- 故事机开关 -->
		<div class="devices-status">
			<div class="devices-status-text">{{ isLine == 0 ? '已关闭' : '已开启' }}</div>
			<div class="devices-status-time" :class="deviceTime == 0 ? 'timeActive' : ''">
				<div>
					<p>{{ deviceTime }}分钟</p>
					<p>定时关机</p>
				</div>
			</div>
			<div class="devices-status-btn" @click="devicesSwitch(0)">
				<p :class="isLine == 1 ? 'switchAcitve' : ''"><img :src="switchIcon()" alt /></p>
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
									:speed="noticeValue"
									background="#fff"
									:text="audioInfo.song != '' ? audioInfo.song : '歌曲正在路上'"
									style="padding: 0;"
								/>
							</p>
							<p></p>
						</div>
					</div>
					<div class="devices-audio-control-icon">
						<div>
							<p @click="devicesSwitch(3)"><img src="../../assets/images/ic_last.png" alt /></p>
						</div>
						<div>
							<p @click="devicesSwitch(5)">
								<img v-if="audioInfo.play == 1" src="../../assets/images/ic_playing.png" alt />
								<img v-if="audioInfo.play == 0" src="../../assets/images/ic_stop.png" alt />
							</p>
						</div>
						<div>
							<p @click="devicesSwitch(4)"><img src="../../assets/images/ic_next.png" alt /></p>
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
							<li @click="devicesModeAction(1)" :class="isLine == 0 ? '' : 'lineAcitve'"><p>全部循环</p></li>
							<li @click="devicesModeAction(0)" :class="isLine == 0 ? '' : 'lineAcitve'"><p>单曲循环</p></li>
						</ul>
					</div>
					<li @click="devicesMode()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>模式</p>
								<p :class="isLine == 0 ? '' : 'colorActice'">{{ playMode == 1 ? '全部循环' : '单曲循环' }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon">
							<img v-if="playMode == -1" src="../../assets/images/ic_liebiao.png" alt />
							<img v-if="playMode == 0" src="../../assets/images/ic_danqu_hover.png" alt />
							<img v-if="playMode == 1" src="../../assets/images/ic_liebiao_hover.png" alt />
						</div>
					</li>
					<li @click="onConfirm()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>定时关机</p>
								<p :class="deviceTime == 0 ? '' : 'colorActice'" v-if="deviceTime != 0">{{ deviceTime }}分钟</p>
							</div>
						</div>
						<div class="devices-audio-else-icon">
							<img v-if="deviceTime == 0" src="../../assets/images/ic_dingshi_off.png" alt />
							<img v-else src="../../assets/images/ic_dingshi_on.png" alt />
						</div>
					</li>
				</ul>
				<ul v-show="isFold">
					<li :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>耳灯</p>
								<p :class="earLight.on == 0 ? '' : 'colorActice'">{{ earLight.on == 0 ? '已关闭' : '已开启' }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon" @click="devicesSwitch(1)">
							<img v-if="earLight.on == 0" src="../../assets/images/ic_fengsu_off5.png" alt />
							<img v-if="earLight.on == 1" src="../../assets/images/ic_fengsu_on5.png" alt />
						</div>
					</li>
					<li :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div>
								<p>表情灯</p>
								<p :class="faceLight.on == 0 ? '' : 'colorActice'">{{ faceLight.on == 0 ? '已关闭' : '已开启' }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon" @click="devicesSwitch(2)">
							<img v-if="faceLight.on == 0" src="../../assets/images/ic_shuimian_off.png" alt />
							<img v-if="faceLight.on == 1" src="../../assets/images/ic_shuimian_on.png" alt />
						</div>
					</li>
				</ul>
			</div>
			<div class="devices-audio-look" @click="devicesLockSwitch()" v-show="isFold" :class="isLine == 0 ? '' : 'lineAcitve'">
				<div>
					<p>童锁</p>
					<div>
						<img v-if="lookData == 1" src="../../assets/images/ic_tongsuo_on.png" alt />
						<img v-if="lookData == 0" src="../../assets/images/ic_tongsuo_off.png" alt />
					</div>
				</div>
			</div>
		</div>
		<div class="devices-fold">
			<div @click="foldClick()">
				<p>{{ foldText }}</p>
				<img :src="foldIcon" alt />
			</div>
		</div>
		<div class="devices-content">
			<h3>内容推荐</h3>
			<ul>
				<li @click="contentBtn(0)">
					<img src="../../assets/images/img_huohuotuneirongyun.png" alt />
					<p>火火兔内容云</p>
				</li>
				<li @click="contentBtn(1)">
					<img src="../../assets/images/img_qimengjiaoyu.png" alt />
					<p>启蒙英语</p>
				</li>
				<li @click="contentBtn(2)">
					<img src="../../assets/images/img_bendineir.png" alt />
					<p>本地内容</p>
				</li>
				<li @click="contentBtn(3)">
					<img src="../../assets/images/img_wodeshoucang.png" alt />
					<p>我的收藏</p>
				</li>
			</ul>
		</div>
		<v-picker :timePopup.sync="timePopup"></v-picker>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import picker from '@/components/picker.vue';
import Header from '@/components/header.vue';
import { _debounce } from '@/hilink/public';
export default {
	name: 'home',
	data() {
		return {
			devTime: false,
			timePopup: false,
			noticeValue: 30,
			isFold: false, //折叠展开
			foldText: '展开更多',
			switchText: '已关闭',
			title: '火火兔故事机',
			headerType: 'home',
			// loadingFlag: true,
			audioMode: false, //音乐模式
			foldIcon: require('../../assets/images/ic_shouqi.png'),
			songsCid: -1
		};
	},
	computed: {
		...mapState([
			'localSongList',
			'localList',
			'resultStrAll',
			'lampSwitch',
			'volume',
			'earLight',
			'faceLight',
			'isLine',
			'audioInfo',
			'lookData',
			'playMode',
			'loveCid',
			'deviceTime',
			'loadingFlag'
		])
	},
	created() {
		this.$store.dispatch('getDevCacheAll');
		this.$store.dispatch('init');
		this.getDevicesTime();
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
		// 改变场数
		devicesSwitch: _debounce(function(type) {
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
				if (!self.loadingFlag) {
					return;
				}
				switch (type) {
					case 0:
						if (self.lampSwitch.on == 0) {
							this.$toast({
								message: '请旋转火火兔的尾巴开机',
								position: 'bottom',
								duration: '3000',
								className: 'toastActive'
							});
							return;
						} else {
							on = self.lampSwitch.on == 1 ? 0 : 0;
							data = { switch: { on: on } };
						}
						break;
					case 1:
						on = self.earLight.on == 1 ? 0 : 1;
						data = { earLight: { on: on } };
						break;
					case 2:
						console.log('表情灯设置===', self.faceLight.on);
						on = self.faceLight.on == 1 ? 0 : 1;
						data = { faceLight: { on: on } };
						break;
					case 3:
						data = { Music: { cutSong: 0 } };
						break;
					case 4:
						data = { Music: { cutSong: 1 } };
						break;
					case 5:
						on = self.audioInfo.play == 1 ? 0 : 1;
						data = { Music: { play: on } };
						break;
					case 6:
						var body = {
							from: 'DID:0',
							to: 'UID:-1',
							action: 627,
							on: 0
						};
						var json = JSON.stringify(body);
						data = { custom: { function: json } };
						break;
					default:
						break;
				}
				self.$store.dispatch('setDevInfo', data);
				self.$store.dispatch('setLoadingFlag',false);
			}
		}, 200),
		//播放模式选择
		getDevicesTime() {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 631,
				type: 4,
				doaction: 'query'
			};
			var json = JSON.stringify(body);
			var data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag',false);
		},
		devicesMode() {
			let self = this;
			self.audioMode = !self.audioMode;
		},
		devicesAction: _debounce(function(action, type, on) {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
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
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag',false);
		}, 300),
		//故事机童锁开关
		devicesLockSwitch: _debounce(function(mode) {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
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
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag',false);
		}, 300),
		//故事机播放模式
		devicesModeAction: _debounce(function(mode) {
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
			if (!self.loadingFlag) {
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
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag',false);
		}, 200),
		//故事机音量调节
		onVolumeChange(value) {
			let self = this;
			let data = { Music: { volume: value, name: 'volume' } };
			self.$store.dispatch('setDevInfo', data);
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
				self.devicesAction(627, 1, 2);
				self.foldIcon = require('../../assets/images/ic_shouqi.png');
			}
		},
		// englishBtn() {
		// 	let self = this;
		// 	if (self.localList.length == 0) {
		// 		self.devicesAction(405, 0);
		// 	}
		// 	let data = {
		// 		total: 0,
		// 		channel: -1,
		// 		songs: []
		// 	};
		// 	this.$store.dispatch('putLocalList', data);
		// 	setTimeout(function() {
		// 		self.$router.push({
		// 			name: 'locallisEn'
		// 		});
		// 	}, 10);
		// },
		//进入内容
		contentBtn(type) {
			var url;
			let self = this;
			if (self.isLine == 0 && type != 0) {
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
				url = 'localfile';
			} else if (type == 3) {
				url = 'localfile';
			}
			this.$router.push({
				name: url
			});
		}
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
