<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="content album-content" v-show="isLoaded">
			<div class="head">
				<div class="head_content">
					<div class="head_content_left">
						<img :src="audioInfoData.coverImage" />
						<img src="../../assets/images/albumBg.png" alt="" />
					</div>
					<div class="head_content_right">
						<p>{{ audioInfoData.name }}</p>
						<div class="head_content_intro">{{ audioInfoData.introduce }}</div>
						<div class="head_content_data">
							<img src="../../assets/images/icon_gequ.png" alt />
							<span>共{{ audioInfoData.childResCount }}首</span>
							<img class="secondImg" src="../../assets/images/icon_video.png" alt />
							<span>{{ audioInfoData.browseCount }}万</span>
						</div>
						<div class="head_content_tag">
							<span v-for="(item, index) in audioInfoData.tag" :key="index" v-show="audioInfoData.tag.length > 1">{{ item }}</span>
						</div>
					</div>
				</div>

				<!-- <div class="head_buttom" v-if="albumFavor">
					<img src="../../assets/images/icon_add.png" alt="" />
					<span>已收藏</span>
				</div>
				<div class="head_buttom" @click="setFavorAlbum" v-else>
					<img src="../../assets/images/icon_add.png" alt="" />
					<span>{{ setFavor }}</span>
				</div> -->
			</div>
			<div class="play_all">
				<div class="play_all_left">
					歌曲列表
				</div>
				<div class="play_all_right" v-if="isLine">
					<!-- <img :src="asc ? require('../../assets/images/asc.png') : require('../../assets/images/dec.png')" alt="" @click="changeSort" /> -->
					<img src="../../assets/images/downAll.png" alt="" @click="goDownload" />
				</div>
			</div>
			<music-list :items="musicList" :rePlay="rePlay" :asc="asc" ref="musicList" :isAlbumDetail="isAlbumDetail" :albumId="albumid" :audioInfoData="audioInfoData"></music-list>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中</van-loading></div>
	</div>
</template>
<script>
import musicList from '../../components/new/musicList.vue';
import Header from '@/components/header.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			audioData: [],
			audioInfoData: [],
			audioId: '',
			total: 0,
			musicList: [],
			brief: false,
			introduce: false,
			active: 0,
			isJ7: false,
			asc: true, //排序,
			rePlay: 0, //播放全部
			pageNo: 1,
			noMoreData: false,
			albumFavor: false, //专辑是否已收藏
			setFavor: '收藏',
			isAlbumDetail: true,
			title: '',
			isLoaded: false,
			albumid: -1
		};
	},
	created() {
		console.log('1111111');
		console.log(this.$route.query.id);
		this.albumid = this.$route.query.id;
		this.getAudioData(this.$route.query.id);
	},
	updated() {},
	computed: {
		...mapState(['isLine'])
	},
	mounted() {},
	methods: {
		//专辑信息
		getAudioData(id) {
			var that = this;
			that.$axios
				.getAudioData({
					audioGroupId: id,
					channelId: 66,
					pageSize: 200,
					pageNo: this.pageNo
				})
				.then(res => {
					if (res.data.success) {
						res.data.data.browseCount = Math.round(res.data.data.browseCount / 10000);
						res.data.data.coverImage = res.data.data.coverImage + '?x-oss-process=image/resize,w_105/quality,Q_80';
						that.audioInfoData = res.data.data;
						that.title = res.data.data.name;

						//转换格式
						res.data.data.audioVoList.forEach((v, i) => {
							let s = (parseInt(v.timeLength % 60) + '').padStart(2, '0');
							let m = (parseInt(v.timeLength / 60) + '').padStart(2, '0');
							v.timelengths = m + ':' + s;
						});
						that.musicList = res.data.data.audioVoList;
						that.isLoaded = true;
					} else {
						this.$toast(res.data.info);
						that.noMoreData = true;
					}
				});
		},
		updated() {
			console.log('aabb');
		},
		//批量下载
		goDownload() {
			this.$router.push({ name: 'cloudAllDown', query: { id: this.albumid } });
		},
		//排序
		changeSort() {
			this.musicList = this.musicList.reverse();
			this.asc = !this.asc;
		},
		//播放全部
		playAll() {
			++this.rePlay;
		},
		//收藏专辑
		setFavorAlbum() {
			if (localStorage.getItem('isLogin') != '1') {
				this.$router.push('/bundlePhone');
				return;
			}
			this.$axios
				.addFavorData({
					userId: localStorage.getItem('userId'),
					sourceId: this.audioId,
					sourceType: 40,
					channelId: 66
				})
				.then(res => {
					this.showActionSheet = false;
					if (res.data.success) {
						this.setFavor = '已收藏';
						this.$toast.success('收藏专辑成功');
						this.albumFavor = true;
					} else {
						this.$toast.fail(res.data.info);
					}
				});
		}
	},
	components: {
		musicList,
		'v-header': Header
	},
	beforeRouteEnter(to, from, next) {
		// document.title = '专辑详情';
		next(async vm => {
			// vm.pageNo = 1;
			// vm.musicList = [];
			// vm.albumFavor = false;
			// vm.setFavor = '收藏';
			// await vm.getAudioData(vm.$route.query.id);
			// await vm.isAlbumFavor(vm.$route.query.id);
			// vm.audioId = vm.$route.query.id;
		});
		next();
	}
	// beforeRouteLeave(to, from, next) {
	//   this.routeLeave = true;
	//   // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
	//   this.$destroy(true);

	//   next();
	// }
};
</script>
<style lang="less" scoped>
.album-content {
	margin-top: 84px;
}
.content {
	overflow: hidden;
	background: #f7f7f7;
	.head {
		width: 100%;
		// height: 204px;
		padding-bottom: 20px;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		background: #f2f2f2;
	}
	.head_content {
		width: 96%;
		margin-top: 25px;
		color: #131313;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		align-items: center;
		padding-left: 10px;
		.head_content_left {
			width: 118px;
			height: 105px;
			position: relative;
			img:nth-child(1) {
				width: 105px;
				height: 105px;
				border-radius: 5px;
				position: relative;
				z-index: 1;
			}
			img:nth-child(2) {
				width: 90px;
				height: 90px;
				position: absolute;
				bottom: 7.5px;
				right: 0;
			}
		}
		.head_content_right {
			font-size: 16px;

			margin-left: 14px;
			p {
				width: 200px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.head_content_data {
			font-size: 11px;
			line-height: 11px;
			margin-top: 12px;
			color: #999999;
			display: flex;
			align-items: center;
			img {
				width: 12px;
				height: 12px;
			}
			.secondImg {
				width: 12px;
				margin-left: 12px;
			}
			span {
				margin-left: 8px;
			}
		}
		.head_content_intro {
			width: 205px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			font-size: 13px;
			margin-top: 10px;
			padding: 8px 0;
			background-color: #ececec;
			border-radius: 4px;
			color: #999999;
			padding-left: 10px;
		}
		.head_content_tag {
			span {
				font-size: 11px;
				margin-right: 8px;
				background: black;
				opacity: 0.4;

				border-radius: 10px;
			}
		}
	}
	.head_buttom {
		width: 80px;
		height: 32px;
		margin: 16px auto;
		background-color: #4da6ff;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-size: 13px;
		img {
			width: 12px;
			height: 12px;
		}
		span {
			margin-left: 5px;
		}
	}
	.introduct {
		width: 100%;
	}
	.title {
		height: 60px;
		color: #999999;
		margin-left: 16px;
		font-size: 18px;
		display: flex;
		align-items: center;
	}
	.all {
		height: 90px;
		color: #a7a9ab;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 18px;
			height: 9px;
			margin-left: 22px;
		}
	}

	.text {
		width: 90%;

		font-family: SourceHanSansCN-Regular;
		font-size: 15px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 21px;
		letter-spacing: 0px;
		color: #555555;
		margin-left: 16px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.allText {
		text-overflow: initial;
		overflow: initial;
		text-overflow: initial;
		display: block;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.play_all {
		width: 92%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eeeeee;
		.play_all_left {
			width: 102px;
			height: inherit;
			display: flex;
			align-items: center;
			// justify-content: center;
			font-size: 15px;
			color: #121212;
			img {
				width: 24px;
				height: 24px;
				margin: 0 5px;
			}
		}
		.play_all_right {
			width: 95px;
			height: inherit;
			display: flex;
			align-items: center;
			img {
				width: 24px;
				height: 24px;
			}
			img:nth-child(1) {
				margin-left: auto;
				// margin-right: 20px;
			}
		}
	}
}
</style>
