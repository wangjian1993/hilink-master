<template>
	<div class="playBox">
		<div class="play-img"><img src="../assets/images/Photo_player_J7.100x100.png" alt="" /></div>
		<div class="play-text">
			<marquee class="songstitle" direction="left" behavior="scroll" scrollamount="2" scrolldelay="0" loop="-1" width="100%" height="100%">
				{{ playData.data.song != '' ? playData.data.song : '歌曲正在路上' }}
			</marquee>
		</div>
		<div class="play-btn">
			<p @click="devicesSwitch(3)"><img src="../assets/images/icon_device_pre.png" alt="" /></p>

			<p @click="devicesSwitch(5)">
				<img v-if="playData.data.play == 1" src="../assets/images/icon_device_play.png" alt="" />
				<img v-if="playData.data.play == 0" src="../assets/images/icon_device_pause.png" alt="" />
			</p>
			<p @click="devicesSwitch(4)"><img src="../assets/images/icon_device_next.png" alt="" /></p>
			<p @click="devicesModeAction()">
				<img v-if="playmode == 1" class="play-mode" src="../assets/images/icon_device_one.png" alt="" />
				<img v-else class="play-mode" src="../assets/images/icon_device_loop.png" alt="" />
			</p>
		</div>
	</div>
</template>

<script>
import {mapState ,mapGetters } from 'vuex';
export default {
	data() {
		return {
			// playData:[]
			playmode:-1,
		};
	},
	created() {
		this.playmode =localStorage.getItem("mode");
		console.log("this.playmode",this.playmode)
	},
	computed: {
		...mapState({
			playData: state => state.playData
		})
		// ...mapGetters(['gettersPlayData'])
	},
	watch: {
		// gettersPlayData(data) {
		// 	let self =this;
		// 	self.playData =[];
		// 	self.playData =data;
		// 	console.log("playData=====",self.playData.data.song)
		// }
	},
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
			console.log('设备开关');
			let self = this;
			if (window.hilink != undefined) {
				var data;
				var on;
				switch (type) {
					case 3:
						data = { Music: { cutSong: 0, name: 'cutSong' } };
						break;
					case 4:
						data = { Music: { cutSong: 1, name: 'cutSong' } };
						break;
					case 5:
						on = self.playData.data.play == 1 ? 0 : 1;
						data = { Music: { play: on, name: 'play' } };
					default:
						break;
				}
				console.log(data);
				self.setDeviceInfo(data);
			}
		},
		//故事机播放模式
		devicesModeAction() {
			let self = this;
			console.log()
			let mode =self.playmode ==1?0:1;
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 909,
				playmode: mode
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.setDeviceInfo(data);
		},
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
				width: 24px;
				height: 24px;
			}
		}
	}
}
</style>
