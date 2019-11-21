<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<div class="content" v-show="isLoaded">
			<div class="musicTitle">
				<div class="musicImgBox"><img :src="info.coverpath" class="musicImg" /></div>
				<div>
					<div class="musicName">{{ info.name }}</div>
					<div class="musicMusic">共{{ info.musicCount }}首</div>
				</div>
				<div class="all-down" @click="allDownClick()">
					<p><img src="../../assets/images/icon_download_no.png" alt="" /></p>
				</div>
			</div>
			<div class="musicIntro">
				专辑介绍
				<div class="">{{ info.description }}</div>
			</div>
			<div class="music-list">
				<div v-for="(item, index) in musicList" :key="index">
					<div v-bind:class="[active == index ? 'active' : '', 'musicList']">
						<div class="left" @click="show(index)">
							<p class="inroName">{{ item.name }}</p>
							<p class="inroName">{{ item.timelength }}</p>
						</div>
						<div class="right" @click="devicesMusic(1, item)">
							<img src="../../assets/images/icon_demand.png" />
							<div style="color: #000000;">点播</div>
						</div>
					</div>
					<div class="playOrFavor" v-if="showIndex == index && showTab">
						<div class="playCell" @click="play(item.path, index)">
							<img src="../../assets/images/icon_listen_pause.png" class="rightImg" v-show="active != index" />
							<img src="../../assets/images/icon_listen_playing.png" class="rightImg" v-show="active == index" />
							<p v-bind:class="[active == index ? 'active' : '']">试听</p>
						</div>
						<div class="playCell" @click="devicesMusic(2, item)">
							<img src="../../assets/images/sc.png" />
							<p>收藏</p>
						</div>
						<div class="playCell" @click="devicesMusic(3, item)">
							<img src="../../assets/images/icon_download_1.png" />
							<p>下载</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中</van-loading></div>
	</div>
</template>

<script>
import { _debounce } from '@/hilink/public';
import http from '../../api/index.js';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			musicList: [],
			info: [],
			audio: null,
			src: '',
			active: -1,
			isLoaded: false,
			showIndex: -1,
			showTab: true,
			title: null
		};
	},
	created() {},
	async mounted() {
		await http
			.getSpecialInfo(this.$route.query.id)
			.then(res => {
				//转换播放时间
				res.data.content.musicList.forEach((v, i) => {
					if (v.timelength / 60 < 10) {
						if (v.timelength % 60 < 10) {
							v.timelength = '0' + parseInt(v.timelength / 60) + ':0' + (v.timelength % 60);
						} else {
							v.timelength = '0' + parseInt(v.timelength / 60) + ':' + (v.timelength % 60);
						}
					} else {
						if (v.timelength % 60 < 10) {
							v.timelength = parseInt(v.timelength / 60) + ':0' + (v.timelength % 60);
						} else {
							v.timelength = parseInt(v.timelength / 60) + ':' + (v.timelength % 60);
						}
					}
				});

				this.musicList = res.data.content.musicList;
				this.info = res.data.content.info;
				this.title = res.data.content.info.name;
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = true;
		this.audio = new Audio();
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		this.audio.pause();
		next();
	},
	methods: {
		//播放音乐
		play(src, index) {
			if (src == this.src) {
				if (this.audio.paused) {
					this.active = index;
					this.audio.play();
				} else {
					this.audio.pause();
					this.active = -1;
				}
			} else {
				this.active = index;
				this.audio.pause();
				this.src = this.audio.src = src;
				this.audio.play();
				this.audio.onended = () => {
					this.active = -1;
				};
			}
		},
		logTime() {
			var d = new Date();
			// 获取当前日期与当前时间
			var getHours = d.getHours();
			// 获取到当前分钟：
			var getMinutes = d.getMinutes();
			// 获取到当前秒：
			var getSeconds = d.getSeconds();
			// 获取到当前毫秒：
			var getMilliseconds = d.getMilliseconds();
			// console.log("getMilliseconds======",getMilliseconds)
			return getHours + ':' + getMinutes + ':' + getSeconds + ':' + getMilliseconds;
		},
		allDownClick() {
			let id = this.$route.query.id;
			if (!parseInt(id)) {
				return;
			}
			this.$router.push({ name: 'cloudAllDown', query: { id: id } });
		},
		//显示点播收藏
		show(index) {
			if (this.showIndex == index) {
				this.showTab = !this.showTab;
				return;
			}
			this.showTab = true;
			this.showIndex = index;
		},
		/**
		 * 推送歌曲到设备
		 * 1.点播
		 * 2.收藏
		 * 3.下载
		 * */
		devicesMusic: _debounce(function(type, item) {
			let self = this;
			var body;
			var path = item.path.indexOf('https:') > -1 ? item.path.replace('https', 'http') : item.path;
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
						message: "歌曲添加收藏成功",
						position: "bottom",
						duration: "3000",
						className: "toastActive"
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
			let logdate =self.logTime();
			console.log('发送数据给设备=============', logdate);
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch("setDevInfo", data);
		}, 300)
	},

	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/listenDetail.less');
</style>
