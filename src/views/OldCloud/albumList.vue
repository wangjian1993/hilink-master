<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadingData">
			<div class="tab_item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
				<img v-lazy="item.coverpath" class="tab-item-coverpath" alt />
				<div class="tab_item_right">
					<p class="van-ellipsis">{{ item.name }}</p>
					<p class="description">{{ item.description }}</p>
					<img src="../../assets/images/icon_gequ_gray.png" alt />
					<span>{{ item.musicCount }}首</span>
				</div>
			</div>
		</van-list>
		<!-- <div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" vertical color="#007DFF">加载中</van-loading></div> -->
	</div>
</template>

<script>
import Header from '@/components/header.vue';
import albumList from '../../components/old/AlbumList.vue';
export default {
	data() {
		return {
			name: '',
			dataList: [],
			page: 0,
			pageSize: 20,
			isLoaded: false,
			loading: false,
			finished: false,
			total: 0,
			title: null
		};
	},
	created() {},
	mounted() {
		this.name = this.$route.query.name;
	},
	methods: {
		loadingData() {
			var that = this;
			switch (this.name) {
				case '精品推荐': //精品推荐
					this.title = '精品推荐';
					that.$axios.recommendSpecial(this.page, this.pageSize).then(res => {
						that.dataList = that.dataList.concat(res.data.content.list);
						that.total = res.data.content.total;
					});
					console.log(that.dataList);
					break;
				case '最新上架': //最新上架
					this.title = '最新上架';
					that.$axios.getNewSpecials(this.page, this.pageSize).then(res => {
						that.dataList = that.dataList.concat(res.data.content.list);
						that.total = res.data.content.total;
						console.log('that.dataList111111111111', that.dataList);
					});
					console.log(this.dataList);
					break;
				// 国学熏陶
				case '国学熏陶':
					this.title = '国学熏陶';
					that.$axios.getgxxtData(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;

				//财商启蒙
				case '财商启蒙':
					this.title = '财商启蒙';
					that.$axios.getcsqmData(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				//情商培养
				case '情商培养':
					this.title = '情商培养';
					that.$axios.getqspyData(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				//性格养成
				case '性格养成':
					this.title = '性格养成';
					that.$axios.getMusicXGYC(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				//英语启蒙
				case '英语启蒙':
					this.title = '英语启蒙';
					that.$axios.getAudioSpecialByIDs('2766,2767').then(res => {
						that.dataList = res.data.content.audioSpeicalList;
					});
					break;
				//安全教育知识普及
				case '安全教育知识普及':
					this.title = '安全教育知识普及';
					that.$axios.getAudioSpecialByIDs('2768,2769,2770,2771').then(res => {
						that.dataList = res.data.content.audioSpeicalList;
					});
					break;
				//自信与勇气
				case '自信与勇气':
					this.title = '自信与勇气';
					that.$axios.getAudioSpecialByIDs('2772,2773,2774').then(res => {
						that.dataList = res.data.content.audioSpeicalList;
					});
					break;
				//宝宝哄睡
				case '宝宝哄睡':
					this.title = '宝宝哄睡';
					that.$axios.getSleepData(this.page, this.pageSize).then(res => {
						that.dataList = this.dataList.concat(res.data.content.list);
						that.total = res.data.content.total;
					});
					break;
			}
			console.log(this.dataLis);
			// 加载状态结束
			this.loading = false;
			// this.isLoaded =true;
			// 数据全部加载完成
			console.log('this.dataList.length', this.dataList.length);
			console.log('this.total', this.total);
			if (this.dataList.length >= this.total) {
				that.finished = true;
			} else {
				that.page = that.page + 1;
			}
		},
		goDetail(id) {
			//统计
			this.$router.push({
				name: 'OldAlbumDetail',
				query: {
					id: id
				}
			});
		}
	},
	components: {
		albumList,
		'v-header': Header
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	}
};
</script>

<style lang="less" scoped>
.app {
	background: #fff;
	margin: 80px 0;
}
.tab_item {
	width: 92%;
	height: 85px;
	display: flex;
	margin: 0 auto;
	margin-top: 20px;
	font-size: 16px;
	.tab-item-coverpath {
		display: block;
		width: 75px;
		height: 75px;
	}
}
.tab_item_right {
	padding-left: 10px;
	p:nth-child(1) {
		width: 250px;
		color: #000;
		font-size: 16px;
	}
	p:nth-child(2) {
		color: #999999;
		font-size: 14px;
		// line-height: 14px;
		margin-top: 5px;
	}
	span {
		color: #999999;
		font-size: 12px;
		margin-left: 4px;
	}
	img {
		width: 10px;
		height: 10px;
	}
}
.description {
	width: 250px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
