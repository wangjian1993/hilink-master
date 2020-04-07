<template>
	<div class="app">
		<!-- width=165px -->
		<div v-if="size == '165'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore" class="more_box">
					更多
					<img src="../../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="content">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="goAudio(item.id)" :key="index">
					<div class="list-img">
						<img v-lazy="item.coverImage" alt class="list-pic" />
						<p>
							<span>
								<img src="../../assets/images/home_icon_yinyue.png" alt />
								{{ item.childResCount }}首
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.introduce }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
		<!-- width=105px -->
		<div v-if="size == '105'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore">
					更多
					<img src="../../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="content1">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="goAudio(item.id)" :key="index">
					<div class="list-img">
						<img v-lazy="item.coverImage" alt class="list-pic" />
						<p>
							<span>
								<img src="../../assets/images/home_icon_yinyue.png" alt />
								{{ item.childResCount }}首
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.introduce }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
		<!-- 音频 -->
		<div v-if="size == '1050'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore">
					更多
					<img src="../../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="content1">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="deviceOrMobile(item.url, index, item.id, item, item.length)" :key="index">
					<div class="list-img">
						<img v-lazy="item.coverImage" alt class="list-pic" />
						<p>
							<span>
								<img src="../../assets/images/home_icon_yinyue.png" alt />
								{{ item.browseCount }}
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.introduce }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { _debounce } from '@/hilink/public';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			titles: [], //安全模块 标签
			safeData: [], //安全模块数据
			audioInfoData:[]
		};
	},
	props: {
		name: '',
		num: '',
		item: {
			type: Array
		},
		title: '',
		isMore: false,
		moreText: '正在加载中...',
		size: '',
		isShowMore: false,
		id: '' //橱窗位id
	},
	mounted() {},
	watch: {
		$route(to, from) {
			this.$audio.pause();
		}
	},
	computed: {
		...mapState(['isLine'])
	},
	created() {
		this.$audio = new Audio();
	},
	methods: {
		//试听播放或者离线
		deviceOrMobile(src, index, id, data, length) {
			data.total = length;
			data.index = index;
			if (this.isLine) {
				console.log(data);
				this.devicesMusic(1, data, index);
			} else {
				this.play(src, index, id, data);
			}
		},
		//手机播放音乐
		play(src, index, id, data) {
			this.$store.dispatch('savePlayHistory', data);
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
			var path = item.url.indexOf('https:') > -1 ? item.url.replace('https', 'http') : item.url;
			switch (type) {
				case 1:
					self.$store.dispatch('savePlayHistory', item);
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 203,
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
					if (item.copyrightId == 0) {
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
						songlistid: self.audioInfoData.id,
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
		//设备播放音乐
		devicePlay(data, id) {
			console.log();
			if (this.deviceOnline) {
				this.addHistory(id);
			} else {
				this.$toast('故事机离线');
			}
		},
		goAudio(id) {
			// console.log("进入详情",id)
			this.$router.push({
				name: 'albumDetail',
				query: {
					id: id
				}
			});
		},
		goMore() {
			this.$router.push({
				name: 'albumList',
				query: {
					name: this.name,
					id: this.id
				}
			});
		}
	},
	components: {}
};
</script>
<style lang="less" scoped>
.app {
	margin: 0.813rem 0;
	.title {
		width: 92%;
		margin: 0 auto;
		display: flex;
		color: #999999;
		align-items: center;
		font-size: 13px;
		justify-content: space-between;
		.main-name {
			font-size: 20px;
			color: #222222;
		}
		.sub-name {
			font-size: 0.32rem;
			color: #666666;
		}
		.more_box {
			font-size: 13px;
		}
	}
	.content {
		width: 92%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.content-list {
			width: 160px;
			margin-top: 15px;
			.list-img {
				width: 100%;
				height: 163px;
				text-align: center;
				position: relative;
				margin: 0 auto;
				overflow: hidden;
				border-radius: 0.2rem;
				.list-pic {
					width: 100%;
					height: 100%;
					display: block;
					z-index: 200;
					border-radius: 0.2rem;
				}
				p {
					width: 60px;
					height: 20px;
					position: absolute;
					bottom: 0px;
					background: url('../../assets/images/home_mokuai_bg.png') no-repeat;
					background-size: 100%;
					z-index: 300;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span {
						font-size: 11px;
						display: flex;
						color: #fff;
						img {
							width: 16px;
							height: 16px;
							margin-left: 5px;
						}
					}
				}
			}
			.list-name {
				display: block;
				width: 165px;
				margin: 0.15rem auto;

				font-size: 15px;
				color: #222222;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				width: 165px;
				margin: 0rem auto;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				font-size: 14px;
				color: #aaaaaa;
			}
		}
		.more-box {
			width: 92%;
			margin: 0 auto;
			text-align: center;
			p {
				padding: 0.5rem 0;
			}
		}
	}
	.content1 {
		width: 92%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.content-list {
			width: 105px;
			margin-top: 15px;
			.list-img {
				width: 105px;
				height: 106px;
				text-align: center;
				position: relative;
				overflow: hidden;
				border-radius: 0.2rem;
				.list-pic {
					width: 100%;
					height: 100%;
					display: block;
					z-index: 200;
					border-radius: 0.2rem;
				}
				p {
					width: 60px;
					height: 20px;
					position: absolute;
					bottom: 0px;
					background: url('../../assets/images/home_mokuai_bg.png') no-repeat;
					background-size: 100%;
					z-index: 300;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span {
						font-size: 11px;
						display: flex;
						color: #fff;
						img {
							width: 16px;
							height: 16px;
							margin-left: 5px;
						}
					}
				}
			}
			.list-name {
				display: block;
				width: 105px;
				margin: 0.15rem auto;
				font-size: 15px;
				color: #222222;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				width: 105px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 14px;

				color: #aaaaaa;
			}
		}
		.more-box {
			width: 92%;
			margin: 0 auto;
			text-align: center;
			p {
				padding: 0.5rem 0;
			}
		}
	}
	.content2 {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.content-list {
			width: 163px;
			margin-top: 15px;
			.list-img {
				width: 163px;
				height: 94px;
				text-align: center;
				position: relative;
				overflow: hidden;
				border-radius: 0.2rem;
				.list-pic {
					width: 100%;
					height: 100%;
					display: block;
					z-index: 200;
					border-radius: 0.2rem;
				}
				p {
					width: 60px;
					height: 20px;
					position: absolute;
					bottom: 0px;
					background: url('../../assets/images/home_mokuai_bg.png') no-repeat;
					background-size: 100%;
					z-index: 300;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span {
						font-size: 11px;
						display: flex;
						color: #fff;
						img {
							width: 16px;
							height: 16px;
							margin-left: 5px;
						}
					}
				}
			}
			.list-name {
				display: block;
				width: 163px;
				margin: 0.15rem auto;
				font-size: 15px;
				color: #222222;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				width: 163px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 14px;

				color: #aaaaaa;
			}
		}
		.more-box {
			width: 92%;
			margin: 0 auto;
			text-align: center;
			p {
				padding: 0.5rem 0;
			}
		}
	}
	.more {
		width: 20px;
		height: 20px;
		margin-left: auto;
		vertical-align: middle;
	}
}
.picture_content {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	margin-top: 10px;
	font-size: 16px;
	color: #333333;
	.picture_list {
		width: 90%;
		height: 151px;
		border-radius: 5px;
		position: relative;
	}
	p {
		color: #333333;
		font-size: 16px;
		margin-top: 10px;
		line-height: 16px;
	}
	span {
		color: #aaaaaa;
		font-size: 11px;
		margin-top: 12px;
		height: 21px;
		margin: 10px 0;
		// background-color: #f2f2f2;
		border-radius: 10px;
		padding: 5px 9px;
	}
}
.list_bigPic {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border-radius: 5px;
}
.special {
	position: absolute;
	right: 0;
	top: 0;
	width: 46px;
	height: 23px;
	background-color: #ff6666;
	border-radius: 0px 5px 0px 5px;
	color: #ffffff;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.number {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 46px;
	height: 21px;
	background-color: #000000;
	opacity: 0.5;
	border-radius: 0px 5px 0px 5px;
	font-size: 11px;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 9px;
		height: 8px;
		margin-right: 5px;
	}
}
</style>
