<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<van-tabs v-model="active" color="#81b4ff" @click="refresh" class="tabs">
			<van-tab title="0">
				<div slot="title" class="tab">
					{{ $t('m.Latest') }}
					<van-icon name="arrow-down" class="arrowDown" />
				</div>
				<div>
					<div class="cell" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
						<div class="cellImgBox"><img :src="item.coverpath" class="cellImg" /></div>
						<div>
							<div class="cellName van-ellipsis">{{ item.name }}</div>
							<div class="cellMusic">共{{ item.musicCount }}首</div>
						</div>
					</div>
				</div>
			</van-tab>
			<van-tab title="1">
				<div slot="title" class="tab">
					{{ $t('m.Rankings') }}
					<van-icon name="arrow-down" class="arrowDown" />
				</div>
				<div>
					<div class="cell" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
						<div class="cellImgBox"><img :src="item.coverpath" class="cellImg" /></div>
						<div>
							<div class="cellName">{{ item.name }}</div>
							<div class="cellMusic">共{{ item.musicCount }}首</div>
						</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
		<p class="PageBottom" v-show="isShowNoMore">暂无更多</p>
		<div class="loadingding center" v-show="isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中</van-loading></div>
	</div>
</template>

<script>
import http from '../../api/index.js';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			active: 0,
			type: 1,
			dataList: [],
			tabTitle: 0,
			isLoaded: true,
			page: 0,
			isShowNoMore: false,
			params: null,
			pageNum: 0,
			total: 0,
			title: this.$t('m.AliloCloud')
		};
	},
	activated() {
		//获取页面数据
		console.log('hahahh11111111');
		this.isLoaded = true;
		var type = this.tabTitle == 0 ? 1 : 2;
		this.isShowNoMore = false;
		this.params = this.$store.state.params;
		http.getAlbumsData(type, 0, this.params)
			.then(res => {
				this.dataList = res.data.content.list;
				this.total = res.data.content.total;
				this.pageNum = Math.ceil(res.data.content.total / 20);
				this.isLoaded = false;
			})
			.catch(err => {
				console.log(err);
			});
		var that = this;
		window.onscroll = function() {
			//变量scrollTop是滚动条滚动时，距离顶部的距离
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
			if (scrollTop + windowHeight == scrollHeight) {
				if (that.dataList.length >= that.total) {
					console.log("没有了==================")
					that.isShowNoMore = true;
					return;
				}
				++that.page;
				//刷新数据
				var type = that.tabTitle == 0 ? 1 : 2;
				console.log('执行================');
				http.getAlbumsData(type, that.page, that.params)
					.then(res => {
						console.log('请求数据================');
						that.dataList = that.dataList.concat(res.data.content.list);
					})
					.catch(err => {
						console.log(err);
					});
			}
		};
	},
	beforeRouteLeave(to, from, next) {
		next();
		this.page = 0;
	},
	methods: {
		//刷新数据
		async refresh(name, title) {
			this.isShowNoMore = false;
			if (name == this.tabTitle) {
				return;
			}
			this.page = 0;
			this.tabTitle = name;
			this.isLoaded = true;
			var type = name == 0 ? 1 : 2;
			await http
				.getAlbumsData(type, this.page, this.params)
				.then(res => {
					this.dataList = res.data.content.list;
					this.total = res.data.content.total;
					this.pageNum = Math.ceil(res.data.content.total / 20);
				})
				.catch(err => {
					console.log(err);
				});
			this.isLoaded = false;
		},
		goDetail(item) {
			this.$router.push({ name: 'cloudListenDetail', query: { id: item } });
		}
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/listen.less');
.container {
	margin-bottom: 130px;
}
</style>
