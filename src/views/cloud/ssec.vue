<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<album-list :dataList="dataList" v-show="isLoaded"></album-list>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" color="#81b4ff">加载中...</van-loading></div>
	</div>
</template>

<script>
import Header from '@/components/header.vue';
import albumList from '../../components/new/AlbumList.vue';
export default {
	data() {
		return {
			dataList: [],
			title: null,
			isLoaded: false
		};
	},
	components: {
		'v-header': Header,
		albumList
	},
	created() {
		this.title = this.$route.query.title;
		this.$axios
			.getSSECData({
				categoryId: this.$route.query.id,
				type: 1,
				channelId: 66,
				pageNo: 1,
				pageSize: 50
			})
			.then(res => {
				res.data.data.list.forEach((v, i) => {
					v.coverImage = v.coverImage + '?x-oss-process=image/resize,w_54/quality,Q_80';
				});
				this.dataList = res.data.data.list;
				this.isLoaded = true;
			})
			.catch(err => {
				console.log(err);
			});
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	}
};
</script>
<style lang="less" scoped></style>
