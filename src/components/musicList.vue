<template>
	<div class="content">
		<div v-for="(item, index) in items" :key="index">
			<div class="music_cell">
				<div class="music_cell_index" v-show="showIndex">{{ index + 1 }}</div>
				<div class="music_cell_left" @click="showMore(index)">
					<p :class="[active == index ? 'selectInx' : '']">{{ item.name }}</p>
					<div class="music_cell_left_sub">
						<img src="../assets/images/icon_time.png" alt />
						<span>{{ item.timelengths }}</span>
						<img class="secondImg" src="../assets/images/icon_shouting.png" alt />
						<span>{{ item.browse }}次</span>
					</div>
				</div>
				<div class="music_cell_right" @click="listenOrOffline(item.path, index, item.id, item)" v-show="isLine == 0">
					<img class="secondImg" :src="active != index ? require('../assets/images/icon_listen_pause.png') : require('../assets/images/icon_listen_playing.png')" />
					<p :class="{ opacity: !deviceOnline }">试听</p>
				</div>
				<div class="music_cell_right" @click="devicesMusic(1, item, index)" v-show="isLine == 1">
					<img class="secondImg" src="../assets/images/huiben_xiangqing_black.png"/>
					<span style="color:#999999">点播</span>
				</div>
			</div>
			<div class="music_show_cell" v-show="showActive == index">
				<div class="show_cell_cell" @click="listenOrOffline(item.path, index, item.id, item)" :class="{ opacity: !deviceOnline }">
					<img class="secondImg" :src="active != index ? require('../assets/images/icon_listen_pause.png') : require('../assets/images/icon_listen_playing.png')" />
					<p :class="{ opacity: !deviceOnline }">试听</p>
				</div>
				<div class="show_cell_cell" @click="devicesMusic(2, item)" :class="{ opacity: !deviceOnline }">
					<img src="../assets/images/sc.png" alt />
					<p>收藏</p>
				</div>
				<div class="show_cell_cell" @click="devicesMusic(3, item)" :class="{ opacity: !deviceOnline }">
					<img src="../assets/images/icon_download_1.png" alt />
					<p>下载</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { _debounce } from '@/hilink/public';
export default {
	props: {
		routeLeave: false,
		items: {
			type: Array
		},
		showIndex: {
			type: Boolean,
			default: true
		},
		isReload: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			$audio: null,
			active: -1,
			showActive: -1
		};
	},
	watch: {
		items(newVal) {
			//清除特殊符号
			let regex = /[!.、0-9]/g;
			newVal.forEach((v, i) => {
				v.name = v.name.substring(0, 3).replace(regex, '') + v.name.substring(3);
			});
		},
		isReload(newVal) {
			this.active = -1;
		}
	},
	mounted() {},
	computed: {
		...mapState(['deviceOnline', 'isLine'])
	},
	created() {
		this.$audio = new Audio();
	},
	methods: {
		//试听播放或者离线
		listenOrOffline(src, index, id, data) {
			this.play(src, index, id, data);
		},
		//手机播放音乐
		play(src, index, id, data) {
			if (src == this.src) {
				if (this.$audio.paused) {
					this.active = index;
					this.$audio.play();
				} else {
					this.$audio.pause();
					this.active = -1;
				}
			} else {
				//统计
				this.active = index;
				this.$audio.pause();
				this.src = this.$audio.src = src;
				this.$audio.play();
				this.$audio.onended = () => {
					this.active = -1;
					// console.log('************************')
					this.play(this.items[index + 1].path, index + 1, this.items[index + 1].id, this.items[index + 1]);
				};
			}
		},
		//展示点播，下载
		showMore(index) {
			if (this.isLine == 0) {
				return;
			}
			if (this.showActive == index) {
				this.showActive = -1;
			} else {
				this.showActive = index;
			}
		},
		/**
		 * 推送歌曲到设备
		 * 1.点播
		 * 2.收藏
		 * 3.下载
		 * */
		devicesMusic: _debounce(function(type, item, index) {
			let self = this;
			var body;
			var path = item.path.indexOf('https:') > -1 ? item.path.replace('https', 'http') : item.path;
			console.log(type);
			switch (type) {
				case 1:
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 203,
						songs: [
							{
								id: item.music_id || item.radioid,
								singer: '',
								posters: '',
								language: '国语',
								name: item.name,
								albumname: item.specialname,
								albumid: item.special_id,
								type: 5,
								total: self.total,
								index: index,
								res: [
									{
										filesize: '',
										lrc: '',
										fmt: 'mp3',
										duration: item.lengthOfTime,
										url: path
									}
								]
							}
						]
					};
					self.$toast({
						message: '歌曲点播成功',
						position: 'bottom',
						duration: '3000',
						className: 'toastActive'
					});
					break;
				case 2:
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 416,
						songs: [
							{
								id: item.music_id || item.radioid,
								name: item.name,
								url: path
							}
						]
					};
					self.$toast({
						message: '歌曲添加收藏成功',
						position: 'bottom',
						duration: '3000',
						className: 'toastActive'
					});
					break;
				case 3:
					var id = item.music_id.toString();
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 409,
						songlistname: '最新下载',
						songlistid: self.info.id,
						songs: [
							{
								id: id,
								name: item.name,
								fmt: 'mp3',
								url: path
							}
						]
					};
					self.$toast({
						message: '歌曲下载添加成功',
						position: 'bottom',
						duration: '3000',
						className: 'toastActive'
					});
					break;
				default:
					break;
			}
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
		}, 300)
	},
	beforeDestroy() {
		this.$audio.pause();
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	}
};
</script>
<style lang="less" scoped>
.content {
	width: 92%;
	margin: 0 auto;
	// display: flex;
	flex-direction: column;
	align-items: center;
}
.music_cell {
	width: 100%;
	margin: 0 auto;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;
	p {
		width: 272px;
		height: 20px;
		font-size: 16px;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.music_cell_left_sub {
		margin-top: 10px;
		font-size: 12px;
		color: #999999;
		img {
			width: 12px;
			height: 12px;
			vertical-align: text-top;
		}
		span {
			padding-left: 3px;
		}
		.secondImg {
			margin-left: 20px;
		}
	}
	.music_cell_right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 50px;
		img {
			width: 20px;
			height: 20px;
		}
		span {
			font-size: 14px;
			margin-top: 3px;
		}
	}
	.music_cell_index {
		font-size: 14px;
	}
	.selectInx {
		color: #4da6ff;
	}
}
.music_show_cell {
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	.show_cell_cell {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;
		height: 50px;
		img {
			width: 22px;
			height: 16px;
		}
		p {
			font-size: 12px;
			margin-top: 3px;
		}
	}
}
.opacity {
	opacity: 0.65;
}
</style>
