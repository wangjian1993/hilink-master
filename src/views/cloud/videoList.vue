<template>
	<div class="content">
		<div class="tab_item" v-for="(item, index) in videoList" :key="index" @click="goVideo(item.picurl, item.videopath, item.id)">
			<img :src="item.coverImage" alt />
			<div class="tab_item_right">
				<div class="tab_item_right_name">
					<p>{{ item.name }}</p>
					<img src="../../assets/images/goMore.png" alt="" style="position:absolute;right:0;top:17px;;" />
				</div>
				<div style="margin-top:8px;">
					<img src="../../assets/images/video.png" alt />
					<span>{{ item.childResCount }}集</span>
				</div>
			</div>
		</div>
		<div class="bottom"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			videoList: [],
			id: ''
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			this.$axios
				.getActiveData({
					activityId: this.$route.query.id,
					pageId: 65,
					channelId: 66,
					pageSize: 50,
					pageNo: 1
				})
				.then(res => {
					this.videoList = res.data.data.resList;
					console.log(this.videoList);
				})
				.catch(err => {
					console.log(err);
				});
		},
		goVideo(picurl, videopath, id) {
			this.$router.push({
				name: 'video',
				query: {
					id: id,
					src: picurl,
					videopath: videopath
				}
			});
		}
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	}
};
</script>
<style lang="less" scoped>
.tab_item {
	width: 92%;
	margin: 0 auto;
	height: 80px;
	display: flex;
	align-items: center;
	font-size: 15px;
	> img {
		width: 54px;
		height: 54px;
		border-radius: 5px;
	}
}
.tab_item_right {
	width: 100%;
	margin-left: 8px;
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
.bottom {
	width: 100%;
	height: 50px;
}
</style>
