<template>
	<div class="container">
		<div class="album" :style="{ backgroundImage: 'url(' + dataList.zb.coverpath + ')', backgroundSize: '100% 100%' }">
			<div class="albumCell">
				<span>{{ dataList.zb.name }}</span>
				<span class="albumTag">&nbsp;&nbsp;&nbsp;{{ dataList.zb.tag }}</span>
			</div>
		</div>
		<div class="intro">
			<p class="introCell1">个人简介</p>
			<p class="introCell2">{{ dataList.zb.introduction }}</p>
		</div>
		<div class="albumListTitle">专辑({{ dataList.zb.specialcount }})</div>
		<div class="albumList">
			<div class="cell" v-for="(item, index) in dataList.specialList" :key="index" @click="goDetail(item.id)">
				<div class="cellLeft center"><img :src="item.coverpath" class="cellLeftImg" /></div>
				<div class="cellRight">
					<div>
						<p class="cellName">{{ item.name }}</p>
						<p class="cellMusic">共{{ item.musicCount }}首</p>
					</div>
					<div class="cellAdd"><img class="cellAddImg" src="../../assets/images/zhubo_icon_tianjia.png" /></div>
				</div>
			</div>
		</div>
		<p class="PageBottom">暂无更多</p>
		<div class="loadingding center" v-show="isLoaded"><van-loading size="50px">加载中...</van-loading></div>
	</div>
</template>

<script>
import http from '../../api/index.js';
export default {
	data() {
		return {
			dataList: [],
			isLoaded: false
		};
	},
	async mounted() {
		this.isLoaded = true;
		await http
			.getHostDetail(this.$route.params.id)
			.then(res => {
				this.dataList = res.data.content;
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = false;
	},
	methods: {
		goDetail(id) {
			this.$router.push({ name: 'cloudListenDetail', params: { id: item } });
		}
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	},
	components: {}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/hostDetail.less');
</style>
