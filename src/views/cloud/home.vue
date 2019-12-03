<template>
	<div class="app">
		<!-- 搜索 -->
		<div class="cloud-content" v-if="!isLoaded">
			<div class="search-box">
				<router-link to="/cloudContent/search" class="search">
					<img src="../../assets/images/home_icon_search.png" />
					<div class="search-text">搜索</div>
					<div class="search-rigth"></div>
				</router-link>
			</div>
			<!-- 轮播 -->
			<van-swipe :autoplay="3000" class="van_swipe">
				<van-swipe-item v-for="(item, index) in bannerData" :key="index" v-if="item.linktype == 2" @click="swiperClick(item.link, item.linktype)"><img :src="item.path" /></van-swipe-item>
			</van-swipe>

			<!-- tab -->
			<div class="options">
				<div class="option_item" @click="goListen(1)">
					<img src="../../assets/images/home_icon_erge.png" />
					<div>听儿歌</div>
				</div>
				<div class="option_item" @click="goListen(2)">
					<img src="../../assets/images/home_icon_gushi.png" />
					<div>讲故事</div>
				</div>
				<div class="option_item" @click="goListen(3)">
					<img src="../../assets/images/home_icon_yingyu.png" />
					<div>学英语</div>
				</div>
				<div class="option_item" @click="goListen(4)">
					<img src="../../assets/images/home_icon_guoxue.png" />
					<div>赏国学</div>
				</div>
				<router-link tag="div" to="/cloudContent/rank" class="option_item">
					<img src="../../assets/images/home_icon_paihang.png" />
					<div>排行榜</div>
				</router-link>
			</div>
			<!-- 历史记录 宝宝哄睡 -->
			<div class="history_baby">
				<img src="../../assets/images/home_lishi.png" @click="goHistory" />
				<img src="../../assets/images/home_hongshui.png" @click="goSleepZone" />
			</div>
			<!-- 分年龄推荐 -->
			<div class="title">
				<p class="main-name">分龄推荐</p>
				<!-- <p class="sub-name">{{title}}</p> -->
				<router-link tag="div" to="/cloudContent/differentAge">
					更多
					<img src="../../assets/images/more.png" class="more" alt />
				</router-link>
			</div>
			<van-tabs v-model="active" color="#4da6ff" @change="getAgeData" swipeable>
				<van-tab title="0-1岁"><music-list :items="ageData" name="2760" :showIndex="false" :isReload="isReload"></music-list></van-tab>
				<van-tab title="1-2岁"><music-list :items="ageData" name="2761" :showIndex="false" :isReload="isReload"></music-list></van-tab>
				<van-tab title="2-3岁"><music-list :items="ageData" name="2762" :showIndex="false" :isReload="isReload"></music-list></van-tab>
				<van-tab title="3-4岁"><music-list :items="ageData" name="2763" :showIndex="false" :isReload="isReload"></music-list></van-tab>
				<van-tab title="4-5岁"><music-list :items="ageData" name="2764" :showIndex="false" :isReload="isReload"></music-list></van-tab>
				<van-tab title="5-6岁"><music-list :items="ageData" name="2765" :showIndex="false" :isReload="isReload"></music-list></van-tab>
			</van-tabs>
			<div class="next" @click="nextSong">
				<img src="../../assets/images/icon_refresh.png" alt />
				<span>换一批</span>
			</div>
			<!-- 精品推荐 -->
			<swiper-list :name="title[0].name" :title="title[0].title" :item="recommend" :num="title[0].num"></swiper-list>
			<!-- 英语启蒙 -->
			<list :name="title[10].name" :title="title[10].title" :item="yingyuData" :num="title[10].num" :size="163" :isShowMore="false"></list>
			<!-- 国学经典 -->
			<list :name="title[5].name" :title="title[5].title" :item="gxxtData" :num="title[5].num" :size="105" :isShowMore="true"></list>
			<!-- 最新上线 -->
			<swiper-list :name="title[9].name" :title="title[9].title" :item="newData" :num="count"></swiper-list>
			<!-- 安全教育知识普及 -->
			<list :name="title[11].name" :title="title[11].title" :item="safeData" :num="title[11].num" :size="348" :isShowMore="false"></list>
			<!-- 性格养成 -->
			<list :name="title[2].name" :title="title[2].title" :item="musicXGYC" :num="title[2].num" :size="105" :isShowMore="true"></list>
			<!-- 自信与勇气 -->
			<list :name="title[12].name" :title="title[12].title" :item="confidentData" :num="title[12].num" :size="105" :isShowMore="true"></list>
			<!-- 视频推荐 -->
			<!-- <video-list :name="title[1].name" :title="title[1].title" :item="videoData" :num="title[1].num"></video-list> -->
			<!-- 付费精选 -->
			<!-- 热门主播 -->
			<!-- <fm-list :name="title[4].name" :title="title[4].title" :item="HostFMData" :num="title[4].num"></fm-list> -->
			<!-- 情商培养 -->
			<list :name="title[7].name" :title="title[7].title" :item="qspyData" :num="title[7].num" :size="165" :isShowMore="true"></list>
			<!-- 财商启蒙 -->
			<list :name="title[6].name" :title="title[6].title" :item="csqmData" :num="title[6].num" :size="165" :isShowMore="true"></list>
			<!-- 哄睡儿歌 -->
			<!-- <list :name="title[8].name" :title="title[8].title" :item="sleepData" :num="title[8].num"></list> -->
			<!-- 回到顶部 -->
			<scroll-into :backToTop="backToTop"></scroll-into>
		</div>
		<!-- <div class="bottom"></div> -->
		<div class="loadingding center" v-show="isLoaded"><van-loading size="30px" vertical color="#007DFF">加载中</van-loading></div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import musicList from '../../components/musicList.vue';
const List = () => import('@/components/list');
const videoList = () => import('@/components/videoList');
const scrollInto = () => import('@/components/scrollInto');
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
			confidentData: [], //自信与勇气
			page: 0, //页数
			count: 0, //总页数
			sunCount: 0, //总条数
			isLoading: true,
			backToTop: false, //回到顶部按钮
			isLoaded: true,
			title: [
				{
					name: '精品推荐',
					title: '最热门的内容都在这里',
					num: 6
				},
				{
					name: '视频推荐',
					title: '益智视频,精彩不断',
					num: 6
				},
				{
					name: '性格养成',
					title: '从小养成好性格',
					num: 3
				},
				{
					name: '付费精选',
					title: '学习知识好帮手',
					num: 4
				},
				{
					name: '优选主播',
					title: '陪孩子一起听世界',
					num: 3
				},
				{
					name: '国学熏陶',
					title: '培养孩子良好品德素养',
					num: 6
				},
				{
					name: '财商启蒙',
					title: '孩子的财商是这么玩出来的',
					num: 4
				},
				{
					name: '情商培养',
					title: '从小就坐聪明人',
					num: 4
				},
				{
					name: '哄睡儿歌',
					title: '小摇床,轻轻晃,月亮伴我入梦乡',
					num: 4
				},
				{
					name: '最新上架',
					title: '好多新内容,快来听听吧',
					num: 3
				},
				{
					name: '英语启蒙',
					title: '好多新内容,快来听听吧',
					num: 2
				},
				{
					name: '安全教育知识普及',
					title: '好多新内容,快来听听吧',
					num: 3
				},
				{
					name: '自信与勇气',
					title: '好多新内容,快来听听吧',
					num: 3
				}
			],
			active: 0,
			tabActive: 0,
			isReload: 1, //播放列表样式重载
			ageData: [] //分龄数据
		};
	},
	computed: {
		...mapState(['isLine'])
	},
	created() {
		this.bannerList();
		this.getRecommendData();
		this.getNewSpecialsData();
	},
	mounted() {
		// Bus.$on("reLoad", data => {
		localStorage.getItem('deviceType');
		// });
	},
	methods: {
		//微信登陆
		getWeixin() {
			this.$axios
				.weixin({
					userName: localStorage.getItem('openID'),
					channel: 'weixin_h5',
					from: 'weixin',
					head: localStorage.getItem('head'),
					nickName: localStorage.getItem('nickName'),
					phone: localStorage.getItem('phone')
				})
				.then(res => {
					if (res.data.success) {
						// localStorage.setItem("phone", res.data.data.phone);
						localStorage.setItem('token', res.data.data.token);
						localStorage.setItem('userId', res.data.data.userId);
						// this.$toast(res.data.data.userId);
					}
				});
		},
		// 轮播图
		bannerList() {
			var that = this;
			that.$axios.getBannerList().then(function(res) {
				that.bannerData = res.data.content.bannerList;
			});
		},
		//宝宝哄睡
		goSleepZone() {
			this.$router.push({ name: 'albumList', query: { name: '宝宝哄睡' } });
		},
		//历史记录
		goHistory() {
			this.$router.push({ path: '/history' });
		},
		//专辑列表
		getRecommendData() {
			var that = this;
			//视频
			that.$axios.getVideoData().then(function(res) {
				that.videoData = res.data.content.list;
			});
			//习惯养成
			that.$axios.getMusicXGYC(0,6).then(res => {
				that.musicXGYC = res.data.content.list;
			});
			//付费精选
			that.$axios.getPayData().then(function(res) {
				that.payData = res.data.content.list;
			});
			// 国学熏陶
			that.$axios.getgxxtData(0,6).then(res => {
				that.gxxtData = res.data.content.list;
			});
			//财商启蒙
			that.$axios.getcsqmData(0,6).then(res => {
				that.csqmData = res.data.content.list;
			});
			//情商培养
			that.$axios.getqspyData(0,4).then(res => {
				that.qspyData = res.data.content.list;
			});
			//分龄推荐
			that.$axios.getSpecialInfo('2760').then(res => {
				that.ageData = res.data.content.musicList.splice(0, 5);
				//转换格式
				that.ageData.forEach((v, i) => {
					let s = (parseInt(v.timelength % 60) + '').padStart(2, '0');
					let m = (parseInt(v.timelength / 60) + '').padStart(2, '0');
					v.timelengths = m + ':' + s;
				});
				console.log(that.ageData);
			});
			//英语启蒙
			that.$axios.getAudioSpecialByIDs('2767,2766').then(res => {
				that.yingyuData = res.data.content.audioSpeicalList;
			});
			//安全教育普及
			that.$axios.getAudioSpecialByIDs('2769,2768,2770,2771').then(res => {
				res.data.content.audioSpeicalList[1].title = res.data.content.audioSpeicalList[0].title.split('，');
				that.safeData = res.data.content.audioSpeicalList.splice(1);
				console.log(that.safeData);
			});
			//自信与勇气
			that.$axios.getAudioSpecialByIDs('2772,2773,2774').then(res => {
				that.confidentData = res.data.content.audioSpeicalList;
			});
			setTimeout(function() {
				that.isLoaded =false;
			}, 200);
		},
		getNewSpecialsData() {
			//最新上架
			let that = this;
			that.$axios.getNewSpecials({}).then(res => {
				console.log('请求');
				if (that.page == 0) {
					let nub = res.data.content.total;
					that.sunCount = nub;
					that.count = Math.ceil(nub / 5);
				}
				let data = res.data.content.list;
				that.isLoading = false;
				that.newData = data.sort(this.randomArray);
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
		goListen(type) {
			this.$router.push({ name: 'ssec', query: { type: type } });
			console.log(type);
			this.$store.state.params = type;
		},
		//换一批
		nextSong() {
			this.isReload++;
			this.$axios.getSpecialInfo(this.active + 2760).then(res => {
				this.ageData = res.data.content.musicList.splice(parseInt(Math.random() * (res.data.content.musicList.length - 5)), 5);
				this.ageData.forEach((v, i) => {
					let s = (parseInt(v.timelength % 60) + '').padStart(2, '0');
					let m = (parseInt(v.timelength / 60) + '').padStart(2, '0');
					v.timelengths = m + ':' + s;
				});
			});
		},
		//获取分龄儿童数据
		getAgeData(name, title) {
			this.isReload++;
			//统计
			this.$axios.getSpecialInfo(name + 2760).then(res => {
				this.ageData = res.data.content.musicList.splice(0, 5);
				this.ageData.forEach((v, i) => {
					let s = (parseInt(v.timelength % 60) + '').padStart(2, '0');
					let m = (parseInt(v.timelength / 60) + '').padStart(2, '0');
					v.timelengths = m + ':' + s;
				});
			});
		},

		//轮播跳转
		swiperClick(link, typelink) {
			switch (typelink) {
				case 1:
					break;
				case 2:
					this.$router.push({
						name: 'albumDetail',
						query: {
							id: link
						}
					});
					break;
				case 3:
					break;
				case 4:
					location.href = link;
					break;
				case 5:
					break;
				default:
					break;
			}
		},
		change(e) {
			console.log(this.$refs.dataNum.dataset.num);
		}
	},
	components: {
		List,
		videoList,
		scrollInto,
		musicList
	},
	beforeRouteEnter(to, from, next) {
		next();
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/index/index.less');
@import url('../../assets/css/swiper.min.css');
.app {
	background: #fff;
	margin-top: 80px;
}
.loadingding{
    position:fixed;
    left:50%;
    top:50%;
    width:100px;
    height:100px;
    margin:-50px 0 0 -50px;
    color: #81b4ff;
    text-align: center
}
</style>
