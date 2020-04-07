<template>
	<div class="playBox">
		<div class="play-img"><img src="../assets/images/Photo_player_J7.100x100.png" alt="" /></div>
		<div class="play-text">
			<marquee class="songstitle" direction="left" behavior="scroll" scrollamount="2" scrolldelay="0" loop="-1" width="100%" height="100%">
				{{ audioInfo.song != '' ? audioInfo.song : $t('m.Loading') }}
			</marquee>
		</div>
		<div class="play-btn">
			<p @click="devicesSwitch(3)"><img src="../assets/images/icon_device_pre.png" alt="" /></p>
			<p @click="devicesSwitch(5)">
				<img v-if="audioInfo.play == 1" src="../assets/images/icon_device_play.png" alt="" />
				<img v-else src="../assets/images/icon_device_pause.png" alt="" />
			</p>
			<p @click="devicesSwitch(4)"><img src="../assets/images/icon_device_next.png" alt="" /></p>
			<p @click="devicesModeAction()">
				<img v-if="playMode == -1" class="play-mode" src="../assets/images/icon_device_loop.png" alt="" />
				<img v-if="playMode == 0" class="play-mode" src="../assets/images/icon_device_one.png" alt="" />
				<img v-if="playMode == 1" class="play-mode" src="../assets/images/icon_device_loop.png" alt="" />
			</p>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			// playData:[]
			// playmode:-1,
		};
	},
	computed: {
		...mapState(['playMode', 'audioInfo', 'isLine'])
	},
	created() {},
	watch: {},
	methods: {
		/*
		 *设备开关控制
		 * type:   开挂那类型
		 * 0:关机
		 * 1:耳灯
		 * 2:表情灯
		 * 3:上一曲
		 * 4:下一曲
		 * 5:播放暂停
		 */
		devicesSwitch(type) {
			let self = this;
			if (self.isLine == 0) {
				self.$toast({
					message: '若上次是通过app关机，则需要来回旋转一次火火兔尾巴开机',
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			if (window.hilink != undefined) {
				var data;
				var on;
				var timestamp = parseInt(new Date().getTime() / 1000);
				switch (type) {
					case 3:
						data = { Music: { cutSong: 0, time: timestamp } };
						break;
					case 4:
						data = { Music: { cutSong: 1, time: timestamp } };
						break;
					case 5:
						on = self.audioInfo.play == 1 ? 0 : 1;
						data = { Music: { play: on, name: 'play', time: timestamp } };
					default:
						break;
				}
				self.$store.dispatch('setDevInfo', data);
			}
		},
		//故事机播放模式
		devicesModeAction() {
			let self = this;
			let mode = self.playMode == 1 ? 0 : 1;
			var timestamp = parseInt(new Date().getTime() / 1000);
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 909,
				playmode: mode,
				time: timestamp
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
		}
	}
};
</script>

<style lang="less" scoped>
.playBox {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 60px;
	background: #fff;
	z-index: 9000;
	display: flex;
	.play-img {
		width: 18%;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 42px;
			height: 42px;
			display: block;
		}
	}
	.play-text {
		width: 32%;
		line-height: 60px;
		font-size: 14px;
		margin-right: 10px;
	}
	.play-btn {
		width: 50%;
		display: flex;
		p {
			flex: 4;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				/* margin: 0 auto; */
				width: 42px;
				height: 42px;
			}
			.play-mode {
				width: 28px;
				height: 22px;
			}
		}
	}
}
</style>
