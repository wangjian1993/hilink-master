<template>
	<div class="container">
		<div class="content" v-show="isLoaded">
			<div class="videoBox" v-show="isShowVideo">
				<video-player
					class="video-player-box"
					ref="videoPlayer"
					:options="playerOptions"
					:playsinline="true"
					customEventName="customstatechangedeventname"
					@play="onPlayerPlay($event)"
					@pause="onPlayerPause($event)"
					@ended="onPlayerEnded($event)"
					@waiting="onPlayerWaiting($event)"
					@playing="onPlayerPlaying($event)"
					@loadeddata="onPlayerLoadeddata($event)"
					@timeupdate="onPlayerTimeupdate($event)"
					@canplay="onPlayerCanplay($event)"
					@canplaythrough="onPlayerCanplaythrough($event)"
					@statechanged="playerStateChanged($event)"
					@ready="playerReadied"
				></video-player>
			</div>
			<div v-if="!isSearchCome">
				<div class="intro">
					<p class="State">{{ dataList.name }}</p>
					<p class="description">{{ dataList.introduce }}</p>
				</div>
				<div class="albumListTitle">视频列表({{ dataList.childResCount }})</div>
				<div class="albumList">
					<div class="tab_item" v-for="(item, index) in dataList.videoVoList" :key="index" @click="goPlayVideo(item.coverImage, item.url)">
						<div class="video-img"><img :src="item.coverImage" alt /></div>
						<div class="tab_item_right">
							<div class="tab_item_right_name">
								<p>{{ item.name }}</p>
							</div>
							<div style="margin-top:8px;">
								<img src="../../assets/images/icon_times.png" alt />
								<span>{{ item.timeLength }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" vertical color="#007DFF">加载中</van-loading></div>
	</div>
</template>

<script>
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			dataList: [],
			isLoaded: false,
			playerOptions: {
				// videojs options
				muted: false,
				autoplay: true,
				language: 'en',
				aspectRatio: '16:9',
				playbackRates: [0.7, 1.0, 1.5, 2.0],
				sources: [
					{
						type: 'video/mp4',
						src: ''
					}
				],
				isSearchCome: false, //是否从搜索进入
				poster: ''
			},
			isShowVideo: false,
			title: null,
			isLoaded: false
		};
	},
	created() {
		this.isSearchCome = this.$route.query.isSearchCome ? true : false;
		console.log(this.isSearchCome);
	},
	mounted() {
		this.isLoaded = true;
		if (!this.isSearchCome) {
			this.$axios
				.getVideoData({
					videoGroupId: this.$route.query.id,
					channelId: 66,
					pageNo: 1,
					pageSize: 200
				})
				.then(res => {
					//转换播放时间
					res.data.data.videoVoList.forEach((v, i) => {
						if (v.timeLength / 60 < 10) {
							if (v.timeLength % 60 < 10) {
								v.timeLength = '0' + parseInt(v.timeLength / 60) + ':0' + (v.timeLength % 60);
							} else {
								v.timeLength = '0' + parseInt(v.timeLength / 60) + ':' + (v.timeLength % 60);
							}
						} else {
							if (v.timeLength % 60 < 10) {
								v.timeLength = parseInt(v.timeLength / 60) + ':0' + (v.timeLength % 60);
							} else {
								v.timeLength = parseInt(v.timeLength / 60) + ':' + (v.timeLength % 60);
							}
						}
					});
					this.dataList = res.data.data;
					this.isLoaded = true;
					if (localStorage.getItem('isLogin') == '1') {
						this.goPlayVideo(this.dataList.videoVoList[0].coverImage, this.dataList.videoVoList[0].url);
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			console.log(this.$route.query);
			this.goPlayVideo(this.$route.query.src, this.$route.query.videopath);
		}
		this.isLoaded = false;
	},
	methods: {
		//播放视频
		goPlayVideo(picurl, videopath) {
			console.log(picurl, videopath);
			this.isShowVideo = true;
			this.playerOptions.sources[0].src = videopath;
			this.playerOptions.poster = picurl;
			let that = this;

			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			let timer = setInterval(() => {
				let speed = -Math.ceil(scrollTop / 5);
				document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
				scrollTop = scrollTop + speed;
				if (document.documentElement.scrollTop <= 0) {
					clearInterval(timer);
					console.log(that.$refs.videoPlayer, this.isShowVideo);
				}
			}, 16);
		},
		// listen event
		onPlayerPlay(player) {
			// console.log('player play!', player)
		},
		onPlayerPause(player) {
			// console.log('player pause!', player)
		},
		// ...player event

		// or listen state event
		playerStateChanged(playerCurrentState) {
			// console.log('player current update state', playerCurrentState)
		},

		// player is ready
		playerReadied(player) {
			console.log('the player is readied', player);
			// you can use it to do something...
			// player.[methods]
		},
		onPlayerLoadeddata(player) {},
		onPlayerCanplay(player) {},
		onPlayerCanplaythrough(player) {},
		onPlayerTimeupdate(player) {},
		onPlayerPlaying(player) {},
		onPlayerWaiting(player) {},
		onPlayerEnded(player) {}
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player;
		}
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/video.less');
.State {
	font-size: 18px;
	font-weight: bold;
}
</style>
