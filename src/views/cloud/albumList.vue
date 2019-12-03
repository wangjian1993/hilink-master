<template>
	<div class="app">
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
import albumList from '../../components/AlbumList.vue';
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
			total: 0
		};
	},
	created() {
		document.title = '专辑列表';
	},
	mounted() {
		this.name = this.$route.query.name;
	},
	methods: {
		loadingData() {
			var that = this;
			switch (this.name) {
				case '精品推荐': //精品推荐
					document.title = '精品推荐';
					that.$axios.recommendSpecial(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				case '最新上架': //最新上架
					document.title = '最新上架';
					that.$axios.getNewSpecials(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				// 国学熏陶
				case '国学熏陶':
					document.title = '国学熏陶';
					that.$axios.getgxxtData(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;

				//财商启蒙
				case '财商启蒙':
					document.title = '财商启蒙';
					that.$axios.getcsqmData(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				//情商培养
				case '情商培养':
					document.title = '情商培养';
					that.$axios.getqspyData(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				//性格养成
				case '性格养成':
					document.title = '性格养成';
					that.$axios.getMusicXGYC(this.page, this.pageSize).then(res => {
						that.dataList = res.data.content.list;
					});
					break;
				//英语启蒙
				case '英语启蒙':
					document.title = '英语启蒙';
					that.$axios.getAudioSpecialByIDs('2766,2767').then(res => {
						that.dataList = res.data.content.audioSpeicalList;
					});
					break;
				//安全教育知识普及
				case '安全教育知识普及':
					document.title = '安全教育知识普及';
					that.$axios.getAudioSpecialByIDs('2768,2769,2770,2771').then(res => {
						that.dataList = res.data.content.audioSpeicalList;
					});
					break;
				//自信与勇气
				case '自信与勇气':
					document.title = '自信与勇气';
					that.$axios.getAudioSpecialByIDs('2772,2773,2774').then(res => {
						that.dataList = res.data.content.audioSpeicalList;
					});
					break;
				//宝宝哄睡
				case '宝宝哄睡':
					document.title = '宝宝哄睡';
					that.$axios.getSleepData(this.page, this.pageSize).then(res => {
						this.dataList = this.dataList.concat(res.data.content.list);
						this.total = res.data.content.total;
					});
					break;
			}
			// 加载状态结束
			this.loading = false;
			// this.isLoaded =true;
			// 数据全部加载完成
			if (this.dataList.length >= this.total) {
				this.finished = true;
			} else {
				this.isMore = true;
				this.page = this.page + 1;
			}
		},
		goDetail(id) {
			//统计
			this.$router.push({
				name: 'albumDetail',
				query: {
					id: id
				}
			});
		}
	},
	components: {
		albumList
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
