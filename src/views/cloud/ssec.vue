<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<album-list :type="dataType"></album-list>
	</div>
</template>

<script>
import Header from '@/components/header.vue';
import albumList from '../../components/AlbumList.vue';
export default {
	data() {
		return {
			dataType: -1,
			title: null
		};
	},
	components: {
		'v-header': Header,
		albumList
	},
	created() {
		this.dataType = this.$route.query.type;
		if(this.dataType == 1){
			this.title = '听儿歌';
		}else if(this.dataType == 2){
			this.title = '讲故事';
		}else if(this.dataType == 3){
			this.title = '学英语';
		}else if(this.dataType == 4){
			this.title = '赏国学';
		}
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	}
};
</script>
<style lang="less" scoped></style>
