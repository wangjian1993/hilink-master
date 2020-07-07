<template>
	<div class="app">
		<!-- 轮播 -->
		<div class="content" v-show="isLoaded">
			<div class="search-box">
				<router-link to="/cloudContent/search" class="search">
					<img src="../../assets/images/home_icon_search.png" />
					<div class="search-text">搜索</div>
				</router-link>
				<div class="history" @click="goHistory"><img src="../../assets/images/historyIcon.png" alt="" /></div>
			</div>
			<van-swipe :autoplay="3000" class="van_swipe" indicator-color="white">
				<van-swipe-item v-for="(item, index) in bannerData" :key="index" v-if="swipeSlip(item.links)" @click="swiperClick(item.links)">
					<img v-lazy="item.coverImage" />
				</van-swipe-item>
			</van-swipe>
			<!-- tab -->
			<div class="options">
				<div class="option_item" @click="goListen(item.referId, item.name)" v-for="(item, index) in categoryList" :key="index">
					<img :src="item.url" />
					<div>{{ item.name }}</div>
				</div>
				<router-link tag="div" to="/cloud/rank" class="option_item">
					<img src="../../assets/images/home_icon_paihang.png" />
					<div>排行榜</div>
				</router-link>
			</div>
			<!-- 历史记录 宝宝哄睡 -->
			<!-- <div class="history_baby">
				<div><img src="../../assets/images/home_lishi.png" @click="goHistory" /></div>
				<div><img src="../../assets/images/home_hongshui.png" @click="goSleepZone" /></div>
			</div> -->
			<!-- 分年龄推荐 -->
			<div class="title">
				<p class="main-name">分龄推荐</p>
				<!-- <router-link tag="div" :to="{ path: '/differentAge', query: { id: ageId } }">
					更多
					<img src="../../assets/images/more.png" class="more" alt />
				</router-link> -->
			</div>
			<swiper-customize :dataList="ageData"></swiper-customize>
			<div class="content_list" v-for="(item, index) in activityVoList" :key="item + index">
				<list v-if="item.type == 40 && item.styleStr[2] == '两'" :name="item.name" :item="item.resList" :id="item.id" :num="2" :size="165" :isShowMore="true"></list>
				<list v-if="item.type == 40 && item.styleStr[2] == '三'" :name="item.name" :item="item.resList" :id="item.id" :num="3" :size="105" :isShowMore="true"></list>
				<list v-if="item.type == 10" :name="item.name" :item="item.resList" :id="item.id" :num="3" :size="1050" :isShowMore="false"></list>
				<swiper-list v-if="item.type == 40 && item.styleStr[2] == '多'" :name="item.name" :item="item.resList" :num="6" :id="item.id"></swiper-list>
				<video-list v-if="item.type == 50" :name="item.name" :item="item.resList" :id="item.id" :num="2"></video-list>
			</div>
			<!-- 回到顶部 -->
			<div class="bottom"></div>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" vertical color="#007DFF">加载中</van-loading></div>
	</div>
</template>
<script>
// import Swiper from "../../assets/js/swiper.min.js";
import musicList from '../../components/new/musicList.vue';
import SwiperCustomize from '../../components/new/SwiperCustomize.vue';
const List = () => import('@/components/new/list');
const swiperList = () => import('@/components/new/swiperList');
const videoList = () => import('@/components/new/videoList');
const payList = () => import('@/components/new/payList');
const fmList = () => import('@/components/new/FMList');
const scrollInto = () => import('@/components/new/scrollInto');
import ActivityVoList from "@/components/activity-vo-list/Index";
import * as UTILS from '@/utils/index';
// let swiper;
export default {
	data() {
		return {
			bannerData: [], //轮播图
			recommend: [], //最新推荐
			videoData: [], //视频
			videoAd: [], //视频广告
			musicXGYC: [],
			payData: [],
			HostFMData: [],
			gxxtData: [], //国学熏陶
			csqmData: [],
			qspyData: [], //情商培养
			sleepData: [], //哄睡儿歌
			newData: [], //最新上架
			yingyuData: [], //英语启蒙
			safeData: [], //安全教育普及
			confidentData: [], //认知启蒙

			recommendID: [], //最新推荐
			videoDataID: [], //视频
			videoAdID: [], //视频广告
			musicXGYCID: [],
			payDataID: [],
			HostFMDataID: [],
			gxxtDataID: [], //国学熏陶
			csqmDataID: [],
			qspyDataID: [], //情商培养
			sleepDataID: [], //哄睡儿歌
			newDataID: [], //最新上架
			yingyuDataID: [], //英语启蒙
			safeDataID: [], //安全教育普及
			confidentDataID: [], //认知启蒙
			babyID: '',
			page: 0, //页数
			count: 0, //总页数
			sunCount: 0, //总条数
			isLoading: true,
			backToTop: false, //回到顶部按钮
			active: 0,
			tabActive: 0,
			isReload: 1, //播放列表样式重载
			ageData: [], //分龄数据
			categoryList: [], //banner分类数据,
			ageId: '', //分龄推荐专辑id集
			babyAvator: '', //宝宝头像
			isShowLoading: true,
			hasBaby: false, //是否有宝宝
			activityVoList: [],
			isLoaded: false
		};
	},
	created() {
		this.getData();
		// this.getCommonToken();
		// this.getRecommendData();
	},
	mounted() {
		localStorage.getItem('deviceType');
	},
	methods: {
		async getData() {
			this.$axios.getCategoryCode({ code: 'all', channelId: 66 }).then(res => {
				this.categoryList = res.data.data;
			});
			await this.$axios.differAge({ channelId: 80 }).then(res => {
				// res.data.data[0].title = '默认成长推荐';
				this.ageData.push(res.data.data);
			});
			await this.$axios.differAge({ channelId: 80, birthDate: UTILS.getDate() }).then(res => {
				res.data.data[0].title = '0-1岁成长推荐';
				this.ageData.push(res.data.data);
			});
			await this.$axios.differAge({ channelId: 80, birthDate: UTILS.getDate(1) }).then(res => {
				res.data.data[0].title = '1-3岁成长推荐';
				this.ageData.push(res.data.data);
			});
			await this.$axios.differAge({ channelId: 80, birthDate: UTILS.getDate(3) }).then(res => {
				res.data.data[0].title = '3+成长推荐';
				this.ageData.push(res.data.data);
			});
			this.$axios.getHomeData().then(res => {
				let result = res.data.data.activityVoList;
				console.log(result);
				//轮播
				result[0].resList.forEach((v, i) => {
					v.linkType = v.links.split(';')[0];
					v.link = v.links.split(';')[1];
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_345/quality,Q_80';
				});
				this.bannerData = result[0].resList;
				this.babyID = result[1].id;
				//分龄推荐
				let idGroup = [];
				result[2].resList.forEach((v, i) => {
					idGroup.push(v.id);
				});
				this.ageId = idGroup = idGroup.join(',');
				//
				//精品推荐
				this.recommend = result[3].resList;
				this.recommend.forEach((v, i) => {
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_105/quality,Q_80';
				});
				this.recommendID = result[3].id;
				//英语启蒙
				this.yingyuData = result[4].resList;
				this.yingyuData.forEach((v, i) => {
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_163/quality,Q_80';
				});
				this.yingyuDataID = result[4].id;
				//国学熏陶
				this.gxxtData = result[5].resList;
				this.gxxtData.forEach((v, i) => {
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_105/quality,Q_80';
				});
				this.gxxtDataID = result[5].id;
				//最新上架
				this.newData = result[6].resList;
				this.newData.forEach((v, i) => {
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_105/quality,Q_80';
				});
				this.newDataID = result[6].id;
				//性格养成
				this.musicXGYC = result[7].resList;
				this.musicXGYC.forEach((v, i) => {
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_105/quality,Q_80';
				});
				this.musicXGYCID = result[7].id;
				//认知启蒙
				// this.confidentData = result[8].resList;
				// this.confidentData.forEach((v, i) => {
				// 	v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_105/quality,Q_80';
				// });
				// this.confidentDataID = result[8].id;
				//精彩动画
				// this.videoData = result[9].resList.splice(0, 2);
				// this.videoData.forEach((v, i) => {
				// 	v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_163/quality,Q_80';
				// });
				// this.videoDataID = result[9].id;

				// this.activityVoList = result.splice(3);
				// console.log(this.activityVoList);
				this.isLoaded = true;
			});
		},
		goSearchPage() {
			this.$router.push('./search');
		},
		swipeSlip(id) {
			let linkType = id.split('+')[0];
			return linkType == 40;
		},
		//宝宝哄睡
		goSleepZone() {
			this.$router.push({
				path: '/albumList',
				query: { name: '宝宝哄睡', id: this.babyID }
			});
		},
		//历史记录
		goHistory() {
			this.$router.push({ name: 'history' });
		},
		//专辑列表
		getRecommendData() {
			var that = this;
			//付费精选
			that.$axios.getPayData().then(function(res) {
				that.payData = res.data.content.list;
				setTimeout(() => {
					that.isShowLoading = false;
				}, 500);
			});
		},
		//跳转设备
		goDevice(path) {
			this.$router.push(path);
		},
		//随机数组
		randomArray(a, b) {
			return Math.random() > 0.5 ? -1 : 1;
			//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		},
		//根据专辑id集合获取多个音频专辑信息
		getCookie(name) {
			var arr,
				reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
			// if ((arr = document.cookie.match(reg))) return  unescape(arr[2]);
			if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
			else return null;
		},
		//跳转听儿歌页
		goListen(id, name) {
			console.log(name);
			this.$router.push({ name: 'ssec', query: { id: id, title: name } });
		},
		//轮播跳转
		swiperClick(links) {
			let linkType = links.split('+')[0];
			let id = links.split('+')[1];
			switch (linkType) {
				case '40':
					this.$router.push({
						name: 'albumDetail',
						query: {
							id: id
						}
					});
					break;
				case '10':
					this.$router.push({
						name: 'albumDetail',
						query: {
							id: id
						}
					});
					break;
				case '20':
					this.$router.push({
						path: '/video',
						query: {
							id: id
						}
					});
					break;
				default:
					window.open(links, '_blank');
					break;
			}
		},
		// destroyed() {
		//   window.removeEventListener("scroll", this.toBottom());
		// },
		change(e) {
			console.log(this.$refs.dataNum.dataset.num);
		}
	},
	components: {
		List,
		videoList,
		payList,
		fmList,
		scrollInto,
		swiperList,
		musicList,
		SwiperCustomize,
		ActivityVoList
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			console.log(from);
			if (from.path == '/addBaby' || from.path == '/editBaby') {
				vm.$axios.getBabyData({ userId: localStorage.getItem('userId') }).then(res => {
					if (res.data.data.length != 0) {
						vm.hasBaby = true;
					}
					res.data.data.forEach((v, i) => {
						if (v.isAuto == '1') {
							vm.babyInfo = v;
						}
					});
					vm.babyAvator = vm.babyInfo.head ? vm.babyInfo.head : require('../../assets/images/default.png');
					vm.exChangeAge(res.data.data);
				});
			}
		});
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/index.less');
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/swiper.min.css');
.app {
	margin-top: 84px;
	background: #f7f7f7;
}
</style>
