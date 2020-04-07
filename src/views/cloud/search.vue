<template>
	<div class="container">
		<!--顶部-->
		<div class="top center">
			<div class="search">
				<div class="searchIcon center"><img src="../../assets/images/home_icon_search.png" /></div>
				<div class="searchInput">
					<van-cell-group>
						<form action="javascript:return true" style="border:0px">
							<van-field class="field" v-model="serchValue" placeholder="搜索专辑、音频、视频" type="search" @blur="SearchResult" />
						</form>
					</van-cell-group>
				</div>
			</div>
			<div class="cancel" @click="goBack">{{ cancelOrDelete }}</div>
		</div>
		<!--热门搜索-->

		<div class="hotSearch" v-if="!isShowResult">
			<div class="hotKey">热门搜索</div>
			<div class="hotSearchList">
				<div class="hotSearchCell" v-for="(item, index) in hotKeyList" :key="index" @click="hotSearch(item.name)">{{ item.name }}</div>
			</div>
		</div>
		<!--搜索结果-->
		<van-tabs v-model="active" color="#81b4ff" sticky class="tabs" v-if="isShowResult">
			<van-tab title="音频">
				<div slot="title" class="tab">音频</div>
				<div>
					<div class="search_null" v-if="audioIsRecommend">
						<img src="../../assets/images/404.png" alt="" />
						<p>啊哦，沒搜索到~</p>
					</div>
					<p class="search_recommend" v-if="audioIsRecommend">为你推荐</p>
					<music-list :items="singleList"></music-list>
				</div>
			</van-tab>
			<van-tab title="专辑">
				<div slot="title" class="tab">专辑</div>
				<div>
					<div class="search_null" v-if="albumIsRecommend">
						<img src="../../assets/images/404.png" alt="" />
						<p>啊哦，沒搜索到~</p>
					</div>
					<p class="search_recommend" v-if="albumIsRecommend">为你推荐</p>
					<album-list :dataList="albumList"></album-list>
				</div>
			</van-tab>
		</van-tabs>
		<div style="width:100%;height:80px"></div>
		<!-- <p class="PageBottom" v-show="isNoMore">暂无更多</p> -->
		<div class="loadingding center" v-show="isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中...</van-loading></div>
	</div>
</template>

<script>
import musicList from '../../components/new/musicList.vue';
import albumList from '../../components/new/AlbumList.vue';
export default {
	data() {
		return {
			serchValue: '',
			albumList: [],
			singleList: [],
			videoList: [],
			isShowResult: false,
			src: '',
			isLoaded: false,
			active: 0,
			toIndex: -1,
			isNoMore: false,
			showIndex: -1,
			dataList: [],
			audioIsRecommend: false,
			albumIsRecommend: false,
			videoIsRecommend: false,
			hotKeyList: [] //热门关键词
		};
	},
	created() {},
	mounted() {
		this.audio = new Audio();
		this.hotKey();
	},
	destroyed() {},
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
		//热门关键词
		hotKey() {
			this.$axios.hotKey({ channelId: 66 }).then(res => {
				this.hotKeyList = res.data.data;
				this.serchValue = this.hotKeyList[Math.floor(Math.random() * res.data.data.length)].name;
			});
		},
		//搜索结果
		async SearchResult() {
			this.albumList = this.singleList = [];
			this.isShowResult = true;
			this.isLoaded = true;
			this.showIndex = -1;
			await this.$axios
				.getSearch(66, this.serchValue, 40)
				.then(res => {
					this.albumIsRecommend = res.data.data.isRecommend;
					this.albumList = res.data.data.list;
				})
				.catch(err => {
					console.log(err);
				});
			await this.$axios
				.getSearch(66, this.serchValue, 10)
				.then(res => {
					this.audioIsRecommend = res.data.data.isRecommend;
					res.data.data.list.forEach((v, i) => {
						if (v.timeLength / 60 < 10) {
							if (v.timeLength % 60 < 10) {
								v.timelengths = '0' + parseInt(v.timeLength / 60) + ':0' + (v.timeLength % 60);
							} else {
								v.timelengths = '0' + parseInt(v.timeLength / 60) + ':' + (v.timeLength % 60);
							}
						} else {
							if (v.timeLength % 60 < 10) {
								v.timelengths = parseInt(v.timeLength / 60) + ':0' + (v.timeLength % 60);
							} else {
								v.timelengths = parseInt(v.timeLength / 60) + ':' + (v.timeLength % 60);
							}
						}
					});
					this.singleList = res.data.data.list;
				})
				.catch(err => {});
			// await this.$axios
			// 	.getSearch(66, this.serchValue, 20)
			// 	.then(res => {
			// 		this.videoIsRecommend = res.data.data.isRecommend;
			// 		res.data.data.list.forEach((v, i) => {
			// 			if (v.timeLength / 60 < 10) {
			// 				if (v.timeLength % 60 < 10) {
			// 					v.timelengths = '0' + parseInt(v.timeLength / 60) + ':0' + (v.timeLength % 60);
			// 				} else {
			// 					v.timelengths = '0' + parseInt(v.timeLength / 60) + ':' + (v.timeLength % 60);
			// 				}
			// 			} else {
			// 				if (v.timeLength % 60 < 10) {
			// 					v.timelengths = parseInt(v.timeLength / 60) + ':0' + (v.timeLength % 60);
			// 				} else {
			// 					v.timelengths = parseInt(v.timeLength / 60) + ':' + (v.timeLength % 60);
			// 				}
			// 			}
			// 		});
			// 		this.videoList = res.data.data.list;
			// 	})
			// 	.catch(err => {});

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
			this.$router.push({ name: 'cloudListenDetail', params: { id: item } });
		},
		//热门搜索
		hotSearch(val) {
			console.log(val);
			this.serchValue = val;
			this.SearchResult();
		},
		//显示点播收藏
		show(index) {
			if (this.showIndex == index) {
				return;
			}
			this.showIndex = index;
		}
	},
	components: {
		musicList,
		albumList
	},
	destroyed() {
		document.querySelector('body').removeAttribute('style');
	},
	beforeRouteEnter(to, from, next) {
		document.title = '搜索';
		next();
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		if (to.path == '/home') {
			this.audioIsRecommend = this.albumIsRecommend = this.videoIsRecommend = this.isShowResult = false;
			this.albumList = this.singleList = this.videoList = [];
		}
		next();
	},
	computed: {
		cancelOrDelete: {
			get: function() {
				if (this.serchValue) {
					return (this.cancelOrDelete = '清除');
				} else {
					this.isShowResult = false;
					return (this.cancelOrDelete = '取消');
				}
			},
			set: function(v) {}
		}
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/search.less');

.albumList {
	width: 100%;
	padding: 0px 0px;
}
.tab_item {
	width: 100%;
	height: 80px;
	display: flex;
	padding: 13px 15px 13px 15px;
	font-size: 15px;
	> img {
		width: 54px;
		height: 54px;
		border-radius: 5px;
	}
}
.tab_item_right {
	margin-left: 8px;
	width: 100%;
	p:nth-child(1) {
		color: #333333;
		font-size: 16px;
		line-height: 16px;
		padding-top: 6px;
		width: 260px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	span {
		color: #999999;
		font-size: 11px;
		// line-height: 11px;
	}
	img {
		width: 20px;
		height: 20px;
		// opacity: 0.5;
	}
}
.tab_item_right_name {
	display: flex;
	position: relative;
	justify-content: space-between;
	img {
		width: 20px;
		height: 20px;
		opacity: 1;
	}
}
.search_null {
	width: 100%;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	img {
		width: 150px;
		height: 150px;
	}
	p {
		margin-top: 20px;
	}
}
.search_recommend {
	font-size: 20px;
	margin-left: 15px;
	margin-top: 16px;
}
.container {
	padding: 0;
}
</style>
