<template>
	<div class="content">
		<div v-for="(item, index) in items" :key="index" class="music-list">
			<div class="music_cell">
				<div class="music_cell_index" v-show="showIndex">
					<span v-if="isAlbumDetail">{{ asc ? index + 1 : items.length - index }}</span>
					<span v-else>{{ index + 1 }}</span>
				</div>
				<div class="music_cell_left" @click="deviceOrMobile(item.url, index, item.id, item, items.length)">
					<p :class="[item.id == musicData.songid ? 'selectInx' : '']">{{ item.name }}</p>
					<div class="music_cell_left_sub">
						<img src="../../assets/images/icon_video.png" alt />
						<span>{{ item.browseCount }}</span>
						<img class="secondImg" src="../../assets/images/icon_time.png" alt />
						<span>{{ item.timelengths }}</span>
					</div>
				</div>
				<div class="music_cell_right">
					<img
						src="../../assets/images/icon_listen_playing.png"
						v-if="isAudio && item.url == audioSrc"
						@click="deviceOrMobile(item.url, index, item.id, item, items.length)"
					/>
					<img src="../../assets/images/playing.png" v-if="item.id == musicData.songid && isLine" @click="deviceOrMobile(item.url, index, item.id, item, items.length)" />
					<img
						src="../../assets/images/icon_audio.png"
						v-else-if="item.id != musicData.songid && isLine"
						@click="deviceOrMobile(item.url, index, item.id, item, items.length)"
					/>
					<img src="../../assets/images/icon_audio.png" v-else @click="deviceOrMobile(item.url, index, item.id, item, items.length)" />
					<img src="../../assets/images/diandiandian.png" alt="" @click.self="showMore(item, index)" />
				</div>
			</div>
		</div>
		<div class="music-sheet">
			<van-action-sheet
				v-model="showActionSheet"
				safe-area-inset-bottom
				close-on-popstate
				close-on-click-action
				lazy-render
				close-icon
				round
				:title="songTitle"
				class="music_actionSheet"
				color="#007DFF"
			>
				<div class="music_actionSheet_title setCenter">歌曲:{{ showActionSheetData ? showActionSheetData.name : '' }}</div>
				<div class="music_actionSheet_content_cell" @click="devicesMusic(2, showActionSheetData)">
					<div class="music_actionSheet_content_cell_left setCenter"><img src="../../assets/images/willFavor.png" alt="" /></div>
					<div class="music_actionSheet_content_cell_right">收藏到设备</div>
				</div>
				<div class="music_actionSheet_content_cell" @click="devicesMusic(3, showActionSheetData)">
					<div class="music_actionSheet_content_cell_left setCenter"><img src="../../assets/images/download.png" alt="" /></div>
					<div class="music_actionSheet_content_cell_right">
						<span v-if="isDown == 1">下载到设备</span>
						<span v-else style="opacity: 0.5;">下载到设备</span>
					</div>
				</div>
				<div class="music_actionSheet_content_cell">
					<div class="music_actionSheet_content_cell_left setCenter">
						<img v-if="isLine" src="../../assets/images/icon_shouting.png" alt="" />
						<img v-if="!isLine" src="../../assets/images/wPlay.png" alt="" style="opacity:0.5" />
					</div>
					<div
						class="music_actionSheet_content_cell_right"
						@click="mobileOrDevice(showActionSheetData.url, showActionSheetData.index, showActionSheetData.id, showActionSheetData, showActionSheetData.length)"
					>
						<span v-if="isLine">手机试听</span>
						<span v-if="!isLine" style="opacity:0.5">点播到设备</span>
					</div>
				</div>
				<!-- <div class="music_actionSheet_content_cancel center" @click="showActionSheet = !showActionSheet">取消</div> -->
			</van-action-sheet>
		</div>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { _debounce } from '@/hilink/public';
export default {
	props: {
		isComeFavorPage: false,
		isAlbumDetail: false,
		albumId: {},
		asc: {
			type: Boolean
		},
		rePlay: {
			default: 0,
			type: Number
		},
		audioInfoData: {
			default: function() {
				return { name: 0, id: 0, childResCount: 0 };
			}
		},
		items: {},
		showIndex: {
			type: Boolean,
			default: true
		},
		isReload: {
			type: Number,
			default: 0
		},
		isHistory: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			$audio: null,
			showActive: -1,
			showActionSheet: false,
			songTitle: null,
			showActionSheetData: null,
			audio: null,
			favorListId: [], //收藏列表
			isFirstEx: true, //第一次执行
			audioSrc: null,
			isAudio: false,
			isDown: -1
			// audioInfoData: []
		};
	},
	watch: {
		$route(to, from) {
			this.$audio.pause();
		},
		items(newVal) {
			//清除特殊符号
			let regex = /[!._、0-9]/g;
			newVal.forEach((v, i) => {
				if (!/[\u4e00-\u9fa5]/.test(v.name.substring(0, 1))) {
					v.name = v.name.substring(0, 4).replace(regex, '') + v.name.substring(4);
				}
				if (/[_]/.test(v.name.substring(v.name.length - 1))) {
					v.name = v.name.substring(0, v.name.length - 1);
				}
			});
		},
		isReload(newVal) {},
		//播放全部
		rePlay: {
			deep: true,
			handler: function(newVal, oldVal) {
				console.log(newVal, oldVal);
				const { url, id, length } = this.items[0];
				this.play(url, 0, id, this.items);
			}
		},
		//排序
		asc: {
			deep: true,
			handler: function(newVal, oldVal) {}
		}
	},
	mounted() {},
	computed: {
		...mapState(['isLine', 'musicData', 'audioId'])
	},
	created() {
		this.$audio = new Audio();
	},
	methods: {
		//播放或试听
		deviceOrMobile(src, index, id, data, length) {
			data.total = length;
			data.index = index;
			if (this.isLine) {
				console.log('点播====');
				this.devicesMusic(1, data, index);
			} else {
				this.play(src, index, id, data);
			}
		},
		//试听或播放
		mobileOrDevice(src, index, id, data, length) {
			data.total = length;
			data.index = index;
			this.play(src, index, id, data);
			this.showActionSheet = false;
		},
		//试听播放或者离线
		listenOrOffline(src, index, id, data, length) {
			data.total = length;
			data.index = index;
			if (this.isLine) {
				this.devicesMusic(1, data, index);
			} else {
				this.play(src, index, id, data);
			}
		},
		//手机播放音乐
		play(src, index, id, data) {
			if (!this.isHistory) {
				this.$store.dispatch('savePlayHistory', data);
			}
			this.isAudio = true;
			this.$audio.pause();
			console.log('试听====');
			if (src == this.audioSrc) {
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
				console.log('试听====22222');
				//统计
				this.active = index;
				this.$audio.pause();
				this.isPaused = true;
				this.audioSrc = this.$audio.src = src;
				this.$audio.play();
				this.$audio.onended = () => {
					this.active = -1;
					// console.log('************************')
					this.play(this.items[index + 1].url, index + 1, this.items[index + 1].id, this.items[index + 1]);
				};
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
			console.log('1111', item);
			// if (self.audioInfoData == undefined) {
			// 	self.audioInfoData = {
			// 		name: 0,
			// 		id: 0,
			// 		childResCount: 0
			// 	};
			// }
			var path = item.url.indexOf('https:') > -1 ? item.url.replace('https', 'http') : item.url;
			var timestamp = parseInt(new Date().getTime() / 1000);
			switch (type) {
				case 1:
					if (!self.isHistory) {
						self.$store.dispatch('savePlayHistory', item);
					}
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 203,
						time:timestamp,
						songs: [
							{
								id: item.id,
								singer: '',
								posters: '',
								language: '国语',
								name: item.name,
								albumname: self.audioInfoData.name || 0,
								albumid: self.audioInfoData.id || 0,
								type: 5,
								total: self.audioInfoData.childResCount || 0,
								index: index,
								res: [
									{
										filesize: '',
										lrc: '',
										fmt: 'mp3',
										duration: item.timeLength,
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
					console.log('收藏');
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 416,
						time:timestamp,
						songs: [
							{
								id: item.id,
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
					if (item.isDownload == 0) {
						self.$toast({
							message: '应版权方要求,暂无法下载',
							position: 'bottom',
							duration: '3000',
							className: 'toastActive'
						});
						return;
					}
					var id = item.id.toString();
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 409,
						songlistname: '最新下载',
						time:timestamp,
						songlistid: self.audioInfoData.id || 0,
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
		}, 300),
		//展示actionSheet
		showMore(item, index) {
			if (!this.isLine) {
				this.$toast({
					message: this.$t('m.Twist'),
					position: 'bottom',
					duration: '3000',
					className: 'toastActive'
				});
				return;
			}
			this.showActionSheet = true;
			this.showActionSheetData = item;
			this.isDown = item.isDownload;
			console.log(item);
			this.showActionSheetData.index = index;
		},
		//下载
		downLoad(data) {
			// this.$toast(this.isLine);
			if (this.isLine) {
				this.showActionSheet = false;
				Bus.$emit('downLoad', data);
			} else {
				this.$toast('故事机离线');
			}
		}
	},
	beforeDestroy() {
		this.$audio.pause();
		console.log('aabb');
	}
};
</script>
<style lang="less" scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 70px;
	.setCenter {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.music-list {
		width: 92%;
		margin: 0 auto;
	}
	.music_cell {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-top: 15px;
		p {
			width: 200px;
			height: 20px;
			font-size: 16px;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.music_cell_left {
			width: 200px;
		}
		.music_cell_left_sub {
			margin-top: 10px;
			font-size: 12px;
			color: #999999;
			display: flex;
			align-items: center;
			img {
				width: 12px;
				height: 12px;
				vertical-align: text-top;
				margin-right: 5px;
			}
			.secondImg {
				margin-left: 20px;
			}
		}
		.music_cell_right {
			padding-left: 30px;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			width: 90px;
			height: 46px;
			img {
				width: 20px;
				height: 20px;
			}
			span {
				font-size: 15px;
			}
		}
		.music_cell_index {
			font-size: 14px;
			opacity: 0.5;
			margin-top: 3px;
			img {
				width: 24px;
				height: 24px;
			}
		}
		.selectInx {
			color: #4da6ff;
		}
	}
	.music_actionSheet {
		width: 100%;
		height: 292px;
		background-color: #ffffff;
		border-radius: 10px 10px 0px 0px;
		z-index: 999;
		.music_actionSheet_title {
			width: 100%;
			height: 56px;
			font-size: 16px;
			color: #333333;
			border-bottom: 1px solid #eeeeee;
		}
		.music_actionSheet_content_cell {
			width: 100%;
			height: 48px;
			display: flex;
			.music_actionSheet_content_cell_left {
				width: 45px;
				height: inherit;
				img {
					width: 24px;
					height: 24px;
				}
			}
			.music_actionSheet_content_cell_right {
				width: 330px;
				height: inherit;
				border-bottom: 1px solid #eeeeee;
				font-size: 14px;
				color: #333333;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
		}
		// .music_actionSheet_content_cancel {
		// 	position: fixed;
		// 	bottom: 0;
		// 	width: 100%;
		// 	height: 55px;
		// 	font-size: 16px;
		// 	color: #999999;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// }
	}
}
</style>
