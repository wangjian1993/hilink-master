<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<div class="videoContent" v-show="isLoaded">
			<div v-show="!isShowVideo" class="album"><img :src="picurl" alt="" /></div>
			<div class="videoBox" v-show="isShowVideo">
				<video
					tabindex="-1"
					id="myVideo"
					:src="videoUrl"
					controls="controls"
					width="100%"
					height="160"
					:poster="vidoePoster"
					playsinline
					x-webkit-airplay
					webkit-playsinline
				></video>
			</div>
			<div class="intro">
				<p class="State">说明:</p>
				<p class="description">{{ description }}</p>
			</div>
			<div class="albumListTitle">视频({{ dataList.total }})</div>
			<div class="albumList">
				<div class="cell" v-for="(item, index) in dataList.list" :key="index">
					<div class="cellLeft center"><img :src="item.picurl" class="img" /></div>
					<div class="cellRight" @click="goPlayVideo(item.picurl, item.videopath)">
						<div>
							<p class="name">{{ item.name }}</p>
							<p class="timelong">{{ item.timelong }}</p>
						</div>
						<div class="play">播放</div>
					</div>
				</div>
			</div>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中...</van-loading></div>
	</div>
</template>

<script>
import http from '../../api/index.js';
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
			title: null,
			picurl: null,
			description: null,
			videoUrl: null,
			vidoePoster: null
		};
	},
	async mounted() {
		await http
			.getVideoList(this.$route.params.id)
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
				this.title = res.data.content.videoAlbum.name;
				this.picurl = res.data.content.videoAlbum.picurl;
				this.description = res.data.content.videoAlbum.description;
				this.videoUrl = res.data.list[0].videopath;
				this.vidoePoster = res.data.list[0].picurl;
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = true;
	},
	methods: {
		//播放视频
		goPlayVideo(picurl, videopath) {
			this.isShowVideo = true;
			this.videoUrl = videopath;
			console.log("videopath",videopath)
			this.vidoePoster = picurl;
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
		}
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	},
	computed: {
		// player() {
		// 	return this.$refs.videoPlayer.player;
		// }
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/video.less');
</style>
