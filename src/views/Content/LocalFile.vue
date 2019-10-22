<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<div class="loading-box"></div>
			<div class="file-box"><van-cell v-for="(item, index) in localList.channels" :title="item.name" is-link @click="localClick(item)" /></div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			title: '本地内容',
			active: 0,
			cid: 0,
			cname: null,
			offset: 0,
			loading: false,
			offsetFlag: false
		};
	},
	computed: {
		...mapState({
			localList: state => state.localList
		})
	},
	created() {
		if (this.localList.length == 0) {
			this.devicesAction();
		}
	},
	methods: {
		localClick(item) {
			let data = {
				total: 0,
				channel: -1,
				songs: []
			};
			this.$router.push({ name: 'locallist', params: { id: item.cid, name: item.name } });
			this.$store.dispatch('setLocalCid', item.cid);
			this.$store.dispatch('putLocalList', data);
		},
		devicesAction() {
			let self = this;
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 405
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json } };
			self.setDeviceInfo(data);
			self.loading = true;
		}
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
.app {
	margin-top: 80px;
}
.local-list {
	width: 92%;
	margin: 0 auto;
	li {
		display: flex;
		height: 50px;
		p {
			width: 80%;
			font-size: 14px;
			color: #000000;
			line-height: 50px;
		}
		span {
			display: block;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 50px;
			height: 100%;
			&:nth-of-type(2) {
				margin-left: 5px;
			}
			img {
				width: 32px;
				height: 30px;
			}
		}
	}
}
</style>
