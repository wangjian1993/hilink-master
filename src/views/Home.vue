<template>
	<div class="home">
		<!-- 导航 -->
		<van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<!-- 产品图 -->
		<div class="devices-img"><img src="../assets/images/j7.png" /></div>
		<div class="devices-status">
			<div class="devices-status-text"><span>已关闭</span></div>
			<div class="devices-status-img"><img src="../assets/images/on.png" alt="" /></div>
		</div>
		<div class="devices-action-list"></div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
	name: 'home',
	computed: {
		
	},
	created() {
		
	},
	methods: {
		//获取设备全部信息
		onClickLeft() {
			//返回
		},
		onClickRight() {
			//搜索
		}
	},
	components: {}
};
</script>
<style lang="less" scoped>
.devices-img {
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
	}
}
.devices-status {
	width: 95%;
	margin: 0 auto;
	display: flex;
	height: 100px;
	line-height: 100px;
	.devices-status-text {
		font-size: 14px;
		flex: 2;
		text-align: center;
	}
	.devices-status-img {
		flex: 2;
		text-align: center;
	}
}
</style>
