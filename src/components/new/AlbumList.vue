<template>
	<div class="content">
		<div class="tab_item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
			<div><img :src="item.coverImage" alt class="tab_avator" /></div>
			<div class="tab_item_right">
				<div class="tab_item_right_name">
					<p>{{ item.name }}</p>
					<img src="../../assets/images/diandiandian.png" alt="" v-if="isComeFavorPage" @click.stop="showMore(item, index)" />
					<img src="../../assets/images/goMore.png" alt="" v-if="!isComeFavorPage" style="position:absolute;right:0;top:17px;;" />
				</div>
				<div style="margin-top:8px;">
					<img src="../../assets/images/music.png" alt />
					<span>{{ item.childResCount }}首</span>
				</div>
			</div>
		</div>
		<div class="bottom"></div>
	</div>
</template>
<script>
export default {
	props: {
		isComeFavorPage: false,
		dataList: {
			type: Array
		},
		name: ''
	},
	data() {
		return {
			
		};
	},
	methods: {
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
.tab_item {
	width: 100%;
	height: 80px;
	display: flex;
	padding: 13px 15px 13px 15px;
	font-size: 15px;
	.tab_avator {
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
}
.description {
	width: 240px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.bottom {
	width: 100%;
	height: 50px;
}
.music_actionSheet {
	width: 375px;
	height: 292px;
	background-color: #ffffff;
	border-radius: 6px 6px 0px 0px;
	z-index: 999;
	.music_actionSheet_title {
		width: 100%;
		height: 56px;
		font-size: 16px;
		color: #333333;
		border-bottom: 1px solid #eeeeee;
	}
	.music_actionSheet_content_cell {
		width: 100%;
		height: 48px;
		display: flex;
		.music_actionSheet_content_cell_left {
			width: 45px;
			height: inherit;
			img {
				width: 24px;
				height: 24px;
			}
		}
		.music_actionSheet_content_cell_right {
			width: 330px;
			height: inherit;
			border-bottom: 1px solid #eeeeee;
			font-size: 14px;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
	.music_actionSheet_content_cancel {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 55px;
		font-size: 16px;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.setCenter {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
