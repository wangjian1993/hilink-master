<template>
	<div class="app">
		<music-list :items="playHistory" :isHistory="true"></music-list>
	</div>
</template>
<script>
import musicList from '../../components/musicList.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			musicData: []
		};
	},
	computed: {
		...mapGetters(['playHistory'])
	},
	created() {},
	methods: {},
	components: {
		musicList
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		next();
	}
};
</script>
<style lang="less" scoped>
.app{
	margin: 90px auto;
	background: #fff;
}
</style>
