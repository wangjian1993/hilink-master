<template>
	<div class="content">
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="tab_item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
				<img v-lazy="item.coverpath" class="tab-item-coverpath" alt />
				<div class="tab_item_right">
					<p class="van-ellipsis">{{ item.name }}</p>
					<p class="description">{{ item.description }}</p>
					<img src="../assets/images/icon_gequ_gray.png" alt />
					<span>{{ item.musicCount }}首</span>
				</div>
			</div>
		</van-list>
		<div class="bottom"></div>
	</div>
</template>
<script>
export default {
	props: {
		type:"",
		name: ''
	},
	data() {
		return {
			dataList: [],
			loading: false,
			finished: false,
			page: 0,
			isMore: true
		};
	},
	activated() {
		this.page = 0;
	},
	methods: {
		onLoad() {
			// 异步更新数据
			var total;
			if (!this.isMore) {
				return false;
			}
			console.log("this.page====",this.page)
			this.isMore = false;
			this.$axios
				.getAlbumsData(this.page, this.type)
				.then(res => {
					this.dataList = this.dataList.concat(res.data.content.list);
					this.total = res.data.content.total;
				})
				.catch(err => {
					console.log(err);
				});
			// 加载状态结束
			this.loading = false;

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
	}
};
</script>
<style lang="less" scoped>
.content {
	padding-top: 80px;
	background: #fff;
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
.bottom {
	width: 100%;
	height: 50px;
}
</style>
