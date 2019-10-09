<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<!-- <van-tabs>
			  <van-tab v-for="index in 8" :title="'标签 ' + index">
			    内容 {{ index }}
			  </van-tab>
			</van-tabs> -->
			<van-tabs v-model="active" swipeable sticky>
				<van-tab v-for="(item, index) in list" :title="item.name">内容 {{ index }}</van-tab>
			</van-tabs>
		</div>
	</div>
</template>
<script>
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			title: '本地内容',
			active: 0,
			list: [
				{
					name: '听儿歌',
				},
				{
					name: '讲故事',
				},
				{
					name: '学国学',
				},
				{
					name: '好习惯',
				},
			]
		};
	},
	created() {
		if (window.hilink != undefined) {
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 405,
			};
			let json = JSON.stringify(body);
			data = { custom: { function: json, name: 'function' } };
			this.setDeviceInfo(data);
		}
	},
	methods:{
		
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
.app{
	margin-top: 80px;
}
</style>
