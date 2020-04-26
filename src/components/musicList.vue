<template>
	<div class="content">
		<div class="center" v-if="items.length == 0"><p>暂无更多</p></div>
		<div v-for="(item, index) in items" :key="index">
			<div class="music_cell">
				<!-- <div class="music_cell_index" v-show="showIndex">{{ index + 1 }}</div> -->
				<div class="music_cell_left" @click="showMore(index)">
					<p :class="[active == index ? 'selectInx' : '']">{{ item.name }}</p>
					<div class="music_cell_left_sub">
						<img src="../assets/images/icon_time.png" alt />
						<span>{{ item.timelengths }}</span>
						<img class="secondImg" src="../assets/images/icon_shouting.png" alt />
						<span>{{ item.browse }}次</span>
					</div>
				</div>
				<div class="gitActive" v-if="item.id == musicData.songid || item.name == musicData.song"><img src="../assets/images/gif.gif" alt="" /></div>
				<div class="music_cell_right" @click="listenOrOffline(item.path, index, item.id, item)" v-show="isLine == 0">
					<img class="secondImg" :src="active != index ? require('../assets/images/icon_listen_pause.png') : require('../assets/images/icon_listen_playing.png')" />
					<span>试听</span>
				</div>
				<div class="music_cell_right" @click="devicesMusic(1, item, index)" v-show="isLine == 1">
					<img class="secondImg" src="../assets/images/task_icon_pause@3x.png" v-if="item.id == musicData.songid || item.name == musicData.song" />
					<img class="secondImg" src="../assets/images/task_icon_play@3x.png" v-else />
					<span>点播</span>
				</div>
			</div>
			<div class="music_show_cell" v-show="showActive == index">
				<div class="show_cell_cell" @click="listenOrOffline(item.path, index, item.id, item)">
					<img class="secondImg" :src="active != index ? require('../assets/images/icon_listen_pause.png') : require('../assets/images/icon_listen_playing.png')" />
					<p>试听</p>
				</div>
				<div class="show_cell_cell" @click="devicesMusic(2, item)">
					<img src="../assets/images/sc.png" alt />
					<p>收藏</p>
				</div>
				<div class="show_cell_cell" @click="devicesMusic(3, item)">
					<img src="../assets/images/icon_download_1.png" v-if="item.copyrightId == 0" alt class="downloadImg" />
					<img src="../assets/images/icon_download_1.png" v-else alt />
					<p :class="item.copyrightId == 0 ? 'downloadImg' : ''">下载</p>
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
		},
		albumId: {
			type: Number
		},
		total: {
			type: Number
		},
		isHistory: {
			type: Boolean,
			default: false
		},
		audioInfoData: {
			type: Number
		}
	},
	data() {
		return {
			// $audio: null,
			active: -1,
			showActive: -1,
			isPaused: false
		};
	},
	watch: {
		$route(to, from) {
			this.$audio.pause();
		},
		items(newVal) {
			//清除特殊符号
			let regex = /[!.、0-9]/g;
			newVal.forEach((v, i) => {
				if (v.name.indexOf('.') != -1) {
					let str = v.name.split('.');
					v.name = str[1];
				} else {
					v.name = v.name;
				}
			});
		},
		isReload(newVal) {
			this.active = -1;
		}
	},
	mounted() {},
	computed: {
		...mapState(['isLine', 'musicData', 'audioId', '$audio'])
	},
	created() {
		// this.$audio = new Audio();
	},
	methods: {
		//试听播放或者离线
		clear(str) {
			let name = str.replace(/,、/g, ''); //取消字符串中出现的所有逗号
			console.log('name===========', name);
			return name;
		},
		listenOrOffline(src, index, id, data) {
			this.play(src, index, id, data);
		},
		//手机播放音乐
		play(src, index, id, data) {
			let self = this;
			this.$store.dispatch('savePlayHistory', data);
			this.$audio.pause();
			console.log('试听====', id);
			console.log('试听====1111111111', self.audioId);
			if (id == self.audioId) {
				if (this.isPaused) {
					console.log('试听====33333');
					this.active = -1;
					this.$audio.pause();
					this.isPaused = false;
				} else {
					console.log('试听====4444');
					this.$audio.play();
					this.active = index;
					this.isPaused = true;
				}
			} else {
				//统计
				// self.audioId = id;
				this.$store.dispatch('setAudioId', id);
				this.active = index;
				this.$audio.pause();
				this.isPaused = true;
				this.$audio.src = src;
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
			if (this.isHistory) {
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
			switch (type) {
				case 1:
					self.$store.dispatch('savePlayHistory', item);
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
								albumid: self.audioInfoData,
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
					if (item.copyrightId == 0) {
						self.$toast({
							message: '应版权方要求,暂无法下载',
							position: 'bottom',
							duration: '3000',
							className: 'toastActive'
						});
						return;
					}
					var id = item.music_id.toString();
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 409,
						songlistname: '最新下载',
						songlistid: self.albumId,
						songs: [
							{
								id: id,
								name: item.name,
								fmt: 'mp3',
								url: path
							}
						]
					};
					console.log('body===========', body);
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
		console.log('销毁=============');
		this.$audio.pause();
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		this.$audio.pause();
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
.center {
	text-align: center;
	width: 100%;
	font-size: 14px;
}
.music_cell {
	width: 100%;
	margin: 0 auto;
	height: 50px;
	display: flex;
	position: relative;
	// justify-content: space-between;
	// align-items: center;
	margin-top: 15px;
	p {
		width: 230px;
		height: 20px;
		font-size: 16px;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.music_cell_left {
		width: 75%;
		padding-left: 10px;
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
	.music_cell_index {
		width: 5%;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.selectInx {
		color: #4da6ff;
	}
}
.music_cell_right {
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	img {
		width: 22px;
		margin: 0 auto;
		padding-top: 3px;
	}
	span {
		display: block;
		font-size: 14px;
		margin-top: 4px;
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
			// width: 22px;
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
.downloadImg {
	opacity: 0.3;
}
.gitActive {
	width: 5%;
	width: 28px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.gitActive img {
	width: 28px;
	height: 28px;
}
</style>
