<template>
	<div class="container">
		<!--顶部-->
		<v-header :title="title"></v-header>
		<div class="top center">
			<div class="search">
				<div class="searchIcon center"><img src="../../assets/images/home_icon_search.png" /></div>
				<div class="searchInput">
					<van-cell-group><van-field class="field" v-model="serchValue" :placeholder="$t('m.Search')" @change="SearchResult" ref="blurSearch" /></van-cell-group>
				</div>
			</div>
			<div class="cancel" :class="this.$i18n.locale == 'en-US' ? 'searchActive' : ''" @click="goBack">{{ cancelOrDeleteFn }}</div>
		</div>
		<!--热门搜索-->

		<div class="hotSearch" v-if="!isShowResult">
			<div class="hotKey">{{ $t('m.Topsearches') }}</div>
			<div class="hotSearchList">
				<div class="hotSearchCell" @click="hotSearch('爸爸')">爸爸</div>
				<div class="hotSearchCell" @click="hotSearch('妈妈')">妈妈</div>
				<div class="hotSearchCell" @click="hotSearch('火火兔')">火火兔</div>
				<div class="hotSearchCell" @click="hotSearch('西游记')">西游记</div>
				<div class="hotSearchCell" @click="hotSearch('三国演义')">三国演义</div>
			</div>
		</div>
		<!--搜索结果-->
		<van-tabs v-model="active" color="#81b4ff" sticky class="tabs" v-if="isShowResult">
			<van-tab title="专辑">
				<div slot="title" class="tab">专辑</div>
				<div>
					<div class="cell" v-for="(item, index) in albumList" :key="index" @click="goDetail(item.id)">
						<div class="imgBox"><img :src="item.coverpath" class="img" /></div>
						<div>
							<div class="name">{{ item.name }}</div>
							<div class="music">共{{ item.musicCount }}首</div>
						</div>
					</div>
				</div>
			</van-tab>
			<van-tab title="单曲">
				<div slot="title" class="tab">单曲</div>
				<div>
					<div v-for="(item, index) in singleList" :key="index">
						<div v-bind:class="[toIndex == index ? 'active' : '', 'musicList']">
							<div class="left" @click="show(index)">
								<p class="inroName">{{ item.name }}</p>
								<p class="inroName">{{ item.timelength }}</p>
							</div>
							<div class="playCell" @click="devicesMusic(1, item)">
								<img src="../../assets/images/icon_demand.png" />
								<p>点播</p>
							</div>
						</div>
						<div class="playOrFavor" v-if="showIndex == index">
							<div class="right" @click="play(item.path, index)">
								<img src="../../assets/images/icon_listen_pause.png" class="rightImg" v-show="toIndex != index" />
								<img src="../../assets/images/icon_listen_playing.png" class="rightImg" v-show="toIndex == index" />
								<div class="rightTry">试听</div>
							</div>
							<div class="playCell" @click="devicesMusic(2, item)">
								<img src="../../assets/images/sc.png" />
								<p>收藏</p>
							</div>
							<div class="playCell" @click="devicesMusic(3, item)">
								<img src="../../assets/images/icon_download_1.png" v-if="item.copyrightId == 0" alt class="downloadImg" />
								<img src="../../assets/images/icon_download_1.png" v-else alt />
								<p :class="item.copyrightId == 0 ? 'downloadImg' : ''">下载</p>
							</div>
						</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
		<p class="PageBottom" v-show="isNoMore">暂无更多</p>
		<div class="loadingding center" v-show="isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中...</van-loading></div>
	</div>
</template>

<script>
import http from '../../api/index.js';
import { _debounce } from '@/hilink/public';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			serchValue: '',
			albumList: [],
			singleList: [],
			isShowResult: false,
			src: '',
			isLoaded: false,
			active: 0,
			toIndex: -1,
			isNoMore: false,
			showIndex: -1,
			title: this.$t('m.Search')
			// cancelOrDelete:'取消',
		};
	},
	mounted() {
		this.audio = new Audio();
	},
	activated() {
		this.isShowResult = false;
		this.albumList = [];
		this.singleList = [];
		this.isNoMore = false;
		this.toIndex = -1;
		this.showIndex = -1;
		this.active = 0;
	},
	methods: {
		//返回或者清除
		goBack() {
			this.isNoMore = false;
			if (this.cancelOrDelete == '取消') {
				this.$router.go(-1);
			} else {
				this.serchValue = '';
			}
		},
		//搜索结果
		async SearchResult() {
			this.albumList = this.singleList = [];
			this.isShowResult = true;
			this.isLoaded = true;
			this.showIndex = -1;
			await http
				.getSearch(1, this.serchValue)
				.then(res => {
					this.albumList = res.data.content.list;
				})
				.catch(err => {
					console.log(err);
				});
			await http
				.getSearch(2, this.serchValue)
				.then(res => {
					res.data.content.list.forEach((v, i) => {
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
					this.singleList = res.data.content.list;
					this.$refs.blurSearch.blur();
				})
				.catch(err => {
					console.log(err);
				});

			this.isLoaded = false;
			this.isNoMore = true;
		},
		//播放音乐
		play(src, index) {
			if (src == this.src) {
				if (this.audio.paused) {
					this.toIndex = index;
					this.audio.play();
				} else {
					this.audio.pause();
					this.toIndex = -1;
				}
			} else {
				this.toIndex = index;
				this.audio.pause();
				this.src = this.audio.src = src;
				this.audio.play();
				this.audio.onended = () => {
					this.toIndex = -1;
				};
			}
		},
		//进入详情页
		goDetail(item) {
			// this.$router.push({ name: 'cloudListenDetail', query: { id: item } });
			this.$router.push({
				name: 'albumDetail',
				query: {
					id: item
				}
			});
		},
		//热门搜索
		hotSearch(val) {
			this.serchValue = val;
			this.SearchResult();
		},
		//显示点播收藏
		show(index) {
			if (this.showIndex == index) {
				return;
			}
			this.showIndex = index;
		},
		devicesMusic: _debounce(function(type, item) {
			let self = this;
			console.log(type);
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
						songlistid: id,
						songs: [
							{
								id: id,
								name: item.name,
								fmt: 'mp3',
								url: path
							}
						]
					};
					console.log('body===', body);
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
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		// this.$destroy(true)
		this.audio.pause();
		next();
	},
	components: {
		'v-header': Header
	},
	computed: {
		cancelOrDeleteFn: function() {
			let self = this;
			if (self.serchValue) {
				return (self.cancelOrDelete = this.$t('m.Empty'));
			} else {
				self.isShowResult = false;
				return (self.cancelOrDelete = this.$t('m.CANCEL'));
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/search.less');
</style>
