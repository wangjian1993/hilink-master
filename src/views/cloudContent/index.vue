<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<!--搜索-->
		<div class="content-box" v-if="!isLoaded">
			<div class="search" @click="goSearch">
				<div class="searchIcon center"><img src="../../assets/images/home_icon_search.png" /></div>
				<div class="searchInput">
					<van-cell-group><van-field class="field" v-model="serchValue" :placeholder=search /></van-cell-group>
				</div>
				<div class="selectIcon center"><img src="../../assets/images/home_icon_shaixuan.png" /></div>
			</div>
			<!--标签-->
			<div class="label">
				<div class="labelCell center" @click="goListen(1)">{{$t('m.Songs')}}</div>
				<div class="labelCell center" @click="goListen(2)">{{$t('m.Stories')}}</div>
				<div class="labelCell center" @click="goListen(3)">{{$t('m.English')}}</div>
				<div class="labelCell center" @click="goListen(4)">{{$t('m.Classics')}}</div>
			</div>
			<!--轮播-->
			<div class="swiper">
				<van-swipe :autoplay="3000" class="swipe">
					<van-swipe-item v-for="(image, index) in swiperList" :key="index" @click="goDetail(image.link)" v-if="image.linktype == 2"><img :src="image.path" /></van-swipe-item>
				</van-swipe>
			</div>
			<!--精品推荐-->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Featured')}}</div>
						<div class="titleLeftBottom">{{$t('m.Recommended')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in recommendSpecialList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<!--视频推荐-->
		<!-- 	<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Videos')}}</div>
						<div class="titleLeftBottom">{{$t('m.VideosMiss')}}</div>
					</div>
					<router-link to="/cloudContent/videoList" class="titleRight"><img src="../../assets/images/home_icon_more.png" /></router-link>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in videoList" :key="index" v-if="index < 4" @click="goVideoDetail(item.id)">
						<img :src="item.picurl" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
					</div>
				</div>
			</div> -->
			<!--广告位-->
			<div class="banner" @click="goVideoDetail(link)"><img class="content" :src="getVideoAdPath" /></div>
			<!--性格养成 -->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Build')}}</div>
						<div class="titleLeftBottom">{{$t('m.Nurture')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in getMusicXGYCList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<!--付费精选-->
			<!--优选主播-->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Radio')}}</div>
						<div class="titleLeftBottom">{{$t('m.Learn')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content1">
					<div class="content1Cell" v-for="(item, index) in getHostFMList" :key="index" @click="goHostDetail(item.id)">
						<div class="img"><img :src="item.pic" /></div>
						<div class="text">
							<div class="textName">{{ item.name }}</div>
							<div class="introduct">{{ item.introduction }}</div>
							<!-- <div class="hot"><div class="text">100万人气</div></div> -->
						</div>
					</div>
				</div>
			</div>
			<!--国学熏陶 -->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Chinese')}}</div>
						<div class="titleLeftBottom">{{$t('m.Grow')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in getgxxtDataList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<!--财商启蒙 -->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Financial')}}</div>
						<div class="titleLeftBottom">{{$t('m.Start')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in getcsqmDataList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<!--情商培养 -->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.EQ')}}</div>
						<div class="titleLeftBottom">{{$t('m.Help')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in getqspyDataList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<!--哄睡儿歌 -->
			<div class="part">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Children')}}</div>
						<div class="titleLeftBottom">{{$t('m.Sweet')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in getSleepDataList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<!--最新上架 -->
			<div class="part content-buttom">
				<div class="title">
					<div class="titleLeft">
						<div class="titleLeftTop">{{$t('m.Latest')}}</div>
						<div class="titleLeftBottom">{{$t('m.New')}}</div>
					</div>
					<div class="titleRight"><!-- <img src="../../assets/images/home_icon_more.png"/> --></div>
				</div>
				<div class="content">
					<div class="contentCell" v-for="(item, index) in getNewSpecialsList" :key="index" @click="goDetail(item.id)">
						<img :src="item.coverpath" />
						<div class="text">{{ item.name }}</div>
						<div class="text1">{{ item.description }}</div>
						<!--absolute-->
						<!-- <div class="pay center">付费</div> -->
						<div class="number">
							<img src="../../assets/images/home_icon_yinyue.png" />
							{{ item.musicCount }}首
						</div>
					</div>
				</div>
			</div>
			<p class="PageBottom" v-show="isShowNoMore">{{$t('m.Classics')}}暂无更多</p>
		</div>
		<div class="loadingding center" v-show="isLoaded"><van-loading size="30px" vertical color="#007DFF">加载中</van-loading></div>
		<!-- <div class="goTop" v-show="isBottom" @click="goTop"><img src="../../assets/images/top.png" /></div> -->
	</div>
</template>

<script>
import http from '../../api/index.js';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			serchValue: '',
			swiperList: [],
			recommendSpecialList: [],
			getMusicXGYCList: [],
			getPayDataList: [],
			getHostFMList: [],
			getgxxtDataList: [],
			getcsqmDataList: [],
			getqspyDataList: [],
			getSleepDataList: [],
			getNewSpecialsList: [],
			videoList: [],
			getVideoAdPath: '',
			isLoaded: false,
			page: 0,
			isShowNoMore: false,
			isBottom: false,
			search:'',
			title:this.$t('m.AliloCloud')
		};
	},
	created() {},
	methods: {
		//跳转视频详情页
		goVideoDetail(id) {
			this.$router.push({ name: 'cloudVideo', params: { id: id } });
		},
		//跳转主播详情页
		goHostDetail(id) {
			this.$router.push({ name: 'cloudHostDetail', query: { id: id } });
		},
		//跳转详情页
		goDetail(id) {
			if (!parseInt(id)) {
				return;
			}
			this.$router.push({ name: 'cloudListenDetail', query: { id: id } });
		},
		//跳转搜索页
		goSearch() {
			this.$router.push('/cloudContent/search');
		},
		//跳转听儿歌页
		goListen(type) {
			this.$router.push({ name: 'cloudListen' });
			console.log(type);
			this.$store.state.params = type;
		},
		//回到顶部
		// goTop() {
		// 	let scrollTop = document.documentElement.scrollTop || document.body.crollTop;
		// 	let timer = setInterval(() => {
		// 		let speed = -(Math.ceil(scrollTop) / 5);
		// 		scrollTop = scrollTop + speed;
		// 		document.documentElement.scrollTop = document.body.crollTop = scrollTop;
		// 		if (speed == 0) {
		// 			clearInterval(timer);
		// 		}
		// 	});
		// }
	},
	async mounted() {
		this.search = this.$i18n.t('m.Search')
		//轮播
		this.isLoaded = true;
		await http
			.getBannerList()
			.then(res => {
				this.swiperList = res.data.content.bannerList;
			})
			.catch(err => {
				console.log(err);
			});
		//精品推荐
		await http
			.recommendSpecial()
			.then(res => {
				this.recommendSpecialList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//视频列表
		await http
			.getMusicXGYC()
			.then(res => {
				this.getMusicXGYCList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//付费首选
		await http
			.getPayData()
			.then(res => {
				this.getPayDataList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//优选主播
		await http
			.getHostFM()
			.then(res => {
				this.getHostFMList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//国学熏陶
		await http
			.getgxxtData()
			.then(res => {
				this.getgxxtDataList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//财商启蒙
		await http
			.getcsqmData()
			.then(res => {
				this.getcsqmDataList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//情商培养
		await http
			.getqspyData()
			.then(res => {
				this.getqspyDataList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//哄睡儿歌
		await http
			.getSleepData()
			.then(res => {
				this.getSleepDataList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//最新上架
		await http
			.getNewSpecials(0)
			.then(res => {
				this.getNewSpecialsList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		//广告
		await http
			.getVideoAd()
			.then(res => {
				this.getVideoAdPath = res.data.content.ad.path;
				this.link = res.data.content.ad.link;
			})
			.catch(err => {
				console.log(err);
			});
		//视频推荐
		await http
			.getVideoAlbumList()
			.then(res => {
				this.videoList = res.data.content.list;
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = false;
		var that = this;
		// window.onscroll = function() {
		// 	//变量scrollTop是滚动条滚动时，距离顶部的距离
		// 	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
		// 	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
		// 	var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
		// 	if (scrollTop + windowHeight == scrollHeight) {
		// 		if (that.getNewSpecialsList.length % 10 != 0) {
		// 			this.isShowNoMore = true;
		// 			return;
		// 		}
		// 		++that.page;
		// 		(that.isLoaded = true),
		// 			//最新上架
		// 			http
		// 				.getNewSpecials(that.page)
		// 				.then(res => {
		// 					that.getNewSpecialsList = that.getNewSpecialsList.concat(res.data.content.list);
		// 					that.isLoaded = false;
		// 				})
		// 				.catch(err => {
		// 					console.log(err);
		// 				});
		// 	}
		// 	if (scrollTop > windowHeight) {
		// 		that.isBottom = true;
		// 	} else {
		// 		that.isBottom = false;
		// 	}
		// };
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import '../../assets/css/cloud/index.less';
@import '../../assets/css/cloud/common.less';
</style>
