<template>
	<div class="container">
		<!-- <v-header :title="dataList.videoAlbum.name"></v-header> -->
		<div v-show="!isShowVideo" class="album" :style="{ backgroundImage: 'url(' + dataList.videoAlbum.picurl + ')', backgroundSize: '100% 100%' }"></div>
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
		<div class="intro">
			<p class="State">说明:</p>
			<p class="description">{{ dataList.videoAlbum.description }}</p>
		</div>
		<div class="albumListTitle">视频列表({{ dataList.total }})</div>
		<div class="albumList">
			<div class="cell" v-for="(item, index) in dataList.list" :key="index" @click="goPlayVideo(item.picurl, item.videopath)">
				<div class="cellLeft center">
					<img :src="item.picurl" class="img" />
					<p class="timelong center">{{ item.timelong }}</p>
				</div>
				<div class="cellRight">
					<div>
						<p class="name">{{ item.name }}</p>
					</div>
					<!-- <div class="play">播放</div> -->
				</div>
			</div>
		</div>
		<p class="PageBottom">暂无更多</p>
		<div class="loadingding center" v-show="isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中...</van-loading></div>
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

				poster: ''
			},
			isShowVideo: false,
			title: null
		};
	},
	created() {
		document.title = '视频';
	},
	mounted() {
		this.isLoaded = true;
		this.$axios
			.getVideoList(this.$route.query.id)
			.then(res => {
				//转换播放时间
				res.data.content.list.forEach((v, i) => {
					if (v.timelong / 60 < 10) {
						if (v.timelong % 60 < 10) {
							v.timelong = '0' + parseInt(v.timelong / 60) + ':0' + (v.timelong % 60);
						} else {
							v.timelong = '0' + parseInt(v.timelong / 60) + ':' + (v.timelong % 60);
						}
					} else {
						if (v.timelong % 60 < 10) {
							v.timelong = parseInt(v.timelong / 60) + ':0' + (v.timelong % 60);
						} else {
							v.timelong = parseInt(v.timelong / 60) + ':' + (v.timelong % 60);
						}
					}
				});
				this.dataList = res.data.content;
				this.goPlayVideo(this.dataList.list[0].picurl, this.dataList.list[0].videopath);
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = false;
		console.log(this.dataList);
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
				if (document.documentElement.scrollTop == 0) {
					clearInterval(timer);
					console.log(that.$refs.videoPlayer);
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
