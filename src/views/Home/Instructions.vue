<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="instructions-head"><img src="../../assets/images/shezhi_qita_banner.png" alt="" /></div>
		<div class="list" v-for="(item, index) in list">
			
		</div>
	</div>
</template>

<script>
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			title: '操作指南',
			list: [
				{
					name: '按键说明',
					imgPath: '../../assets/images/instructions/caozuo_anjian.png'
				},
				{
					name: '网络配置',
					imgPath: 'img/instructions/index/caozuo_wangluo.png'
				},
				{
					name: '智能语音',
					imgPath: 'img/instructions/index/caozuo_zhineng.png'
				},
				{
					name: '微信对讲',
					imgPath: 'img/instructions/index/caozuo_wechat.png'
				},
				{
					name: '资源扩展与点播',
					imgPath: 'img/instructions/index/caozuo_ziyuan.png'
				},
				{
					name: '英语启蒙',
					imgPath: 'img/instructions/index/caozuo_yingyu.png'
				},
				{
					name: 'FM功能',
					imgPath: 'img/instructions/index/caozuo_fm.png'
				},
				{
					name: '其他说明',
					imgPath: 'img/instructions/index/caozuo_qita.png'
				}
			]
		};
	},
	methods: {},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
.instructions-head {
	width: 100%;
	height: 100%;
	img {
		width: 100%;
	}
}
</style>
