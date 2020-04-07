<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="content" v-show="isLoaded">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadingData" v-show="isLoaded">
				<div class="tab_item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
					<img v-lazy="item.coverImage" class="tab-item-coverpath" alt />
					<div class="tab_item_right">
						<p class="van-ellipsis">{{ item.name }}</p>
						<p class="description">{{ item.subName }}</p>
						<img src="../../assets/images/icon_gequ_gray.png" alt />
						<span>{{ item.childResCount }}首</span>
					</div>
				</div>
			</van-list>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" vertical color="#007DFF">加载中</van-loading></div>
	</div>
</template>

<script>
import Header from '@/components/header.vue';
import albumList from '../../components/new/AlbumList.vue';
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
		this.title = this.$route.query.name;
		this.loadingData();
	},
	methods: {
		loadingData() {
			var that = this;
			setTimeout(function() {
				that.isLoaded = true;
			}, 500);
			this.$axios
				.getActiveData({
					activityId: this.$route.query.id,
					pageId: 65,
					channelId: 66,
					pageSize: 50,
					pageNo: 1
				})
				.then(res => {
					res.data.data.resList.forEach((v, i) => {
						v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_54/quality,Q_80';
					});
					this.dataList = res.data.data.resList;
				});
			// 加载状态结束
			this.loading = false;
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
				name: 'albumDetail',
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
