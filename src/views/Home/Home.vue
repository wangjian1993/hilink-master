<template>
	<div class="home">
		<v-header :title="$store.state.devName" :type="headerType"></v-header>
		<!-- 产品图 -->
		<div class="devices-img">
			<div class="bubble-box" :class="this.$i18n.locale == 'en-US' ? 'bubbleActive' : ''" v-if="isBubble" @click="bubbleClick()">
				<div class="bubble">
					<p>{{ $t('m.hint') }}</p>
					<p>{{ $t('m.Gotit') }}</p>
				</div>
			</div>
			<img src="../../assets/images/img_toutu_red.png" alt />
			<img src="../../assets/images/logo.png" alt />
		</div>
		<!-- 故事机开关 -->
		<div class="devices-status">
			<div class="devices-status-text">{{ isLine == 0 ? $t('m.off') : $t('m.open') }}</div>
			<div class="devices-status-time">
				<div v-show="deviceTime != 0 && isLine == 1">
					<p>
						<van-count-down :time="deviceTime" @finish="deviceTimeFinish()">
							<template v-slot="timeData">
								<span class="item" v-if="timeData.hours != 0">{{ timeRepair(timeData.hours) }}:</span>
								<span class="item">{{ timeRepair(timeData.minutes) }}:</span>
								<span class="item">{{ timeRepair(timeData.seconds) }}</span>
							</template>
						</van-count-down>
					</p>
					<p>{{ deviceTime == 0 ? $t('m.timer') : $t('m.timeroff') }}</p>
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
								<marquee
									class="songstitle"
									direction="left"
									behavior="scroll"
									scrollamount="2"
									scrolldelay="0"
									loop="-1"
									align="absmiddle"
									width="100%"
									height="100%"
									style="font-size: 16px;color: #000000;opacity: .9;"
								>
									{{ audioInfo.song != '' ? audioInfo.song : $t('m.Loading') }}
								</marquee>
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
								<img v-if="audioInfo.play == 1 && audioInfo.song != ''" src="../../assets/images/ic_playing.png" alt />
								<img v-if="audioInfo.play == 0 && audioInfo.song != ''" src="../../assets/images/ic_stop.png" alt />
								<img v-if="audioInfo.song == '' && isLine == 1" src="../../assets/images/ic_stop.png" style="background: #000000;opacity: .4;" alt />
								<img v-if="audioInfo.song == null" src="../../assets/images/ic_stop.png" alt />
							</p>
						</div>
						<div>
							<p @click="devicesSwitch(4)"><img src="../../assets/images/ic_next.png" alt /></p>
						</div>
					</div>
				</div>
				<!-- 音量 -->
				<div class="devices-audio-volume" :class="this.$i18n.locale == 'en-US' ? 'volumeActiveEN' : 'volumeActiveZH'">
					<div>
						<p>{{ $t('m.Volume') }}</p>
					</div>
					<div><van-slider v-model="$store.state.volume" :disabled="isLine == 0" bar-height="2px" @change="onVolumeChange" active-color="#007DFF" /></div>
					<div>
						<span>{{ volume }}%</span>
					</div>
				</div>
			</div>
			<!-- 其他控制 -->
			<div class="devices-audio-else-controle">
				<ul>
					<div class="devices-audio-else-mode" v-show="audioMode">
						<div class="devices-audio-else-mode-ul">
							<div @click="devicesModeAction(1)" :class="[isLine == 0 ? '' : 'lineAcitve', playMode == 1 ? 'modeActive' : '']">
								<p>{{ $t('m.Loopp') }}</p>
							</div>
							<span class="mode-wire"></span>
							<div @click="devicesModeAction(0)" :class="[isLine == 0 ? '' : 'lineAcitve', playMode == 0 ? 'modeActive' : '']">
								<p>{{ $t('m.Loops') }}</p>
							</div>
						</div>
					</div>
					<li @click="devicesMode()" :class="isLine == 0 ? '' : 'lineAcitve'">
						<div class="devices-audio-else-text">
							<div :class="this.$i18n.locale == 'en-US' ? 'enActive' : 'zhActive'">
								<p>{{ $t('m.Mode') }}</p>
								<p :class="isLine == 0 ? '' : 'colorActice'">{{ playMode == 1 ? $t('m.Loopp') : $t('m.Loops') }}</p>
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
							<div :class="this.$i18n.locale == 'en-US' ? 'enActive' : 'zhActive'">
								<p>{{ deviceTime == 0 ? $t('m.timer') : $t('m.timeroff') }}</p>
								<p :class="deviceTime == 0 ? '' : 'colorActice'" v-if="deviceTime != 0 && isLine == 1">
									<van-count-down :time="deviceTime">
										<template v-slot="timeData">
											<span class="item" v-if="timeData.hours != 0">{{ timeRepair(timeData.hours) }}:</span>
											<span class="item">{{ timeRepair(timeData.minutes) }}:</span>
											<span class="item">{{ timeRepair(timeData.seconds) }}</span>
										</template>
									</van-count-down>
								</p>
							</div>
						</div>
						<div class="devices-audio-else-icon">
							<img v-if="deviceTime == 0" src="../../assets/images/ic_dingshi_off.png" alt />
							<img v-else src="../../assets/images/ic_dingshi_on.png" alt />
						</div>
					</li>
				</ul>
				<ul v-show="isFold">
					<li :class="isLine == 0 ? '' : 'lineAcitve'" @click="devicesSwitch(1)">
						<div class="devices-audio-else-text">
							<div :class="this.$i18n.locale == 'en-US' ? 'enActive' : 'zhActive'">
								<p>{{ $t('m.Earlight') }}</p>
								<p :class="earLight.on == 0 ? '' : 'colorActice'" v-if="earLight.on == 1">{{ earLight.on == 0 ? $t('m.off') : $t('m.on') }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon">
							<img v-if="earLight.on == 0" src="../../assets/images/ic_fengsu_off5.png" alt />
							<img v-if="earLight.on == 1" src="../../assets/images/ic_fengsu_on5.png" alt />
						</div>
					</li>
					<li :class="isLine == 0 ? '' : 'lineAcitve'" @click="devicesSwitch(2)">
						<div class="devices-audio-else-text">
							<div :class="this.$i18n.locale == 'en-US' ? 'enActive' : 'zhActive'">
								<p>{{ $t('m.Facelight') }}</p>
								<p :class="faceLight.on == 0 ? '' : 'colorActice'" v-if="faceLight.on == 1">{{ faceLight.on == 0 ? $t('m.off') : $t('m.on') }}</p>
							</div>
						</div>
						<div class="devices-audio-else-icon">
							<img v-if="faceLight.on == 0" src="../../assets/images/ic_shuimian_off.png" alt />
							<img v-if="faceLight.on == 1" src="../../assets/images/ic_shuimian_on.png" alt />
						</div>
					</li>
				</ul>
			</div>
			<div class="devices-audio-look" @click="devicesLockSwitch()" v-show="isFold" :class="isLine == 0 ? '' : 'lineAcitve'">
				<div class="devices-audio-look-content">
					<div class="devices-audio-look-text">
						<div :class="this.$i18n.locale == 'en-US' ? 'enActive' : 'zhActive'">
							<p>{{ $t('m.Childlock') }}</p>
							<p :class="lookData == 0 ? '' : 'colorActice'" v-if="lookData == 1">{{ lookData == 0 ? $t('m.off') : $t('m.on') }}</p>
						</div>
					</div>
					<div class="devices-audio-look-icon" :class="this.$i18n.locale == 'en-US' ? 'enActive' : 'zhActive'">
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
			<h3>{{ $t('m.Recommendations') }}</h3>
			<ul>
				<li @click="contentBtn(0)">
					<img src="../../assets/images/img_huohuotuneirongyun.png" alt />
					<p>{{ $t('m.AliloCloud') }}</p>
				</li>
				<li @click="contentBtn(1)">
					<img src="../../assets/images/img_qimengjiaoyu.png" alt />
					<p>{{ $t('m.Learning') }}</p>
				</li>
				<li @click="contentBtn(2)">
					<img src="../../assets/images/img_bendineir.png" alt />
					<p>{{ $t('m.Local') }}</p>
				</li>
				<li @click="englishBtn()">
					<img src="../../assets/images/img_wodeshoucang.png" alt />
					<p>{{ $t('m.Favorites') }}</p>
				</li>
			</ul>
		</div>
		<van-popup v-model="$store.state.upDate && $store.state.isShare && isLine ==1" class="updata-box" round :close-on-click-overlay="false" position="bottom">
			<div v-if="upflag == 2">
				<div class="updata-msg">检测到设备有最新固件.是否升级?</div>
				<div class="updata-btn">
					<p @click="upDataBtn(1)">取消</p>
					<p @click="upDataBtn(2)">升级</p>
				</div>
			</div>
			<div v-if="upflag == 3">
				<div class="updata-msg">1/2 正在升级设备固件...</div>
				<div class="updata-btn" @click="cloneDevic()"><p>确定</p></div>
			</div>
			<div v-if="upflag == 4">
				<div class="updata-msg">2/2 设备正在重启...</div>
				<div class="updata-btn" @click="cloneDevic()"><p>确定</p></div>
			</div>
		</van-popup>
		<div class="popup1" v-if="modePopup" @click="modePopupClick()"></div>
		<div class="popup" v-if="timePopup" @click="popupClick()"></div>
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
			modePopup: false,
			noticeValue: 30,
			isFold: false, //折叠展开
			foldText: this.$t('m.Unfold'),
			headerType: 'home',
			// loadingFlag: true,
			audioMode: false, //音乐模式
			foldIcon: require('../../assets/images/ic_shouqi.png'),
			songsCid: -1,
			time: 0
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
			'loadingFlag',
			'devName',
			'isBubble',
			'istimePopu',
			'upflag'
		]),
		deviceTime: {
			get() {
				return this.$store.state.deviceTime;
			},
			set() {
				this.$store.dispatch('setDeviceTime');
			}
		}
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['backPressedCallback'] = resultStr => {
				console.log('resultStr====', resultStr);
			};
			window['goBack'] = resultStr => {
				if (this.timePopup) {
					this.timePopup = false;
				} else {
					// console.log('url--info====', this.$route.path);
					// if (this.$route.path == '/' || this.$route.path == '/home') {
					window.hilink.overrideBackPressed(false, 'backPressedCallback');
					// } else {
					// 	this.$router.go(-1);
					// }
				}
			};
		}
	},
	created() {
		this.$store.dispatch('getDevCacheAll');
		this.$store.dispatch('getDeviceAll');
		this.$store.dispatch('setBackPressed');
		this.getDevicesTime();
	},
	methods: {
		timeRepair(time) {
			if (time < 10) {
				return '0' + time;
			} else {
				return time;
			}
		},
		//升级弹窗
		upDataBtn(type) {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
			var body;
			if (type == 1) {
				body = {
					from: 'DID:0',
					to: 'UID:-1',
					action: 4000,
					setupgrade: 0
				};
			} else if (type == 2) {
				body = {
					from: 'DID:0',
					to: 'UID:-1',
					action: 4000,
					setupgrade: 1
				};
				// localStorage.setItem("updata", true);
			}
			let json = JSON.stringify(body);
			let data = { custom: { function: json } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag', false);
			self.$store.dispatch('actionsUpFlag', false);
		},
		//退出设备页面
		cloneDevic() {
			window.hilink.finishDeviceActivity();
		},
		bubbleClick() {
			let self = this;
			this.$store.dispatch('setDeviceidFlag', false);
			// self.isBubble = false;
		},
		onConfirm() {
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: this.$t('m.Twist'),
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			console.log('定时关机==', self.timePopup);
			self.timePopup = !self.timePopup; //显示
		},
		popupClick() {
			let self = this;
			self.timePopup = false; //显示
		},
		modePopupClick() {
			let self = this;
			self.modePopup = false; //显示
			self.audioMode = false;
		},
		deviceTimeFinish() {
			this.deviceTime = 0;
			console.log('取消定时关机===============', this.istimePopu);
			if (this.istimePopu) {
				this.$store.dispatch('deviceSwitch', 0);
			}
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
					message: this.$t('m.Twist'),
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
								message: this.$t('m.Twist'),
								position: 'bottom',
								duration: '3000',
								className: 'toastActive'
							});
							return;
						} else {
							self.$dialog
								.confirm({
									title: this.$t('m.offMsg'),
									message: this.$t('m.offMsgText')
								})
								.then(() => {
									on = self.lampSwitch.on == 1 ? 0 : 0;
									data = { switch: { on: on } };
									let logdate = self.logTime();
									self.$store.dispatch('setDevInfo', data);
									self.$store.dispatch('setLoadingFlag', false);
								})
								.catch(() => {
									self.$store.dispatch('setLoadingFlag', true);
									return;
								});
						}
						break;
					case 1:
						on = self.earLight.on == 1 ? 0 : 1;
						data = { earLight: { on: on } };
						break;
					case 2:
						on = self.faceLight.on == 1 ? 0 : 1;
						data = { faceLight: { on: on } };
						break;
					case 3:
						data = { Music: { cutSong: 0 } };
						this.audioInfo.song = this.audioInfo.song;
						break;
					case 4:
						data = { Music: { cutSong: 1 } };
						this.audioInfo.song = this.audioInfo.song;
						break;
					case 5:
						on = self.audioInfo.play == 1 ? 0 : 1;
						data = { Music: { play: on } };
						if (self.audioInfo.song == '') {
							return;
						}
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
				let logdate = self.logTime();
				self.$store.dispatch('setDevInfo', data);
				self.$store.dispatch('setLoadingFlag', false);
			}
		}, 200),
		logTime() {
			var d = new Date();
			// 获取当前日期与当前时间
			var getHours = d.getHours();
			// 获取到当前分钟：
			var getMinutes = d.getMinutes();
			// 获取到当前秒：
			var getSeconds = d.getSeconds();
			// 获取到当前毫秒：
			var getMilliseconds = d.getMilliseconds();
			// console.log("getMilliseconds======",getMilliseconds)
			return getHours + ':' + getMinutes + ':' + getSeconds + ':' + getMilliseconds;
		},
		//播放模式选择
		getDevicesTime() {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
			let time = setTimeout(function() {
				self.$store.dispatch('getDevLocal');
			}, 1000);
		},
		devicesMode() {
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: this.$t('m.Twist'),
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			self.audioMode = !self.audioMode;
			self.modePopup = !self.modePopup;
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
			self.audioMode = false;
			let json = JSON.stringify(body);
			let data = { custom: { function: json } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag', false);
		}, 300),
		//故事机童锁开关
		devicesLockSwitch: _debounce(function(mode) {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
			if (self.isLine == 0) {
				this.$toast({
					message: this.$t('m.Twist'),
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
			self.audioMode = false;
			var json = JSON.stringify(body);
			let logdate = self.logTime();
			var data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag', false);
		}, 300),
		//故事机播放模式
		devicesModeAction: _debounce(function(mode) {
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: this.$t('m.Twist'),
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
			self.modePopup = false;
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag', false);
		}, 200),
		//故事机音量调节
		onVolumeChange: _debounce(function(value) {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
			if (self.isLine == 0) {
				console.log('1111111111111');
				this.$toast({
					message: this.$t('m.Twist'),
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			let data = { Music: { volume: value } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag', false);
		}, 200),
		/*
		 *展开折叠
		 */
		foldClick() {
			let self = this;
			self.isFold = !self.isFold;
			if (self.isFold) {
				self.foldText = this.$t('m.PackUp');
				self.foldIcon = require('../../assets/images/ic_zhankai.png');
			} else {
				self.foldText = this.$t('m.Unfold');
				self.devicesAction(627, 1, 2);
				self.foldIcon = require('../../assets/images/ic_shouqi.png');
			}
		},
		englishBtn() {
			let self = this;
			if (self.isLine == 0) {
				this.$toast({
					message: this.$t('m.Twist'),
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			let data = {
				total: 0,
				channel: -1,
				songs: []
			};
			this.$store.dispatch('putLocalList', data);
			this.$store.dispatch('setLocalCid', self.loveCid);
			this.$store.dispatch('locaFlagActions', false);
			this.$store.dispatch('loadingImgActions', true);
			self.$router.push({
				name: 'locallist',
				params: { id: self.loveCid, name: '我的收藏' }
			});
		},
		//进入内容
		contentBtn(type) {
			var url;
			let self = this;
			if (self.isLine == 0 && type != 0) {
				this.$toast({
					message: this.$t('m.Twist'),
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			if (type == 0) {
				url = 'cloudHome'; //火火兔内容云
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
