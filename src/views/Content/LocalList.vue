<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<!-- <van-tabs>
			  <van-tab v-for="index in 8" :title="'标签 ' + index">
			    内容 {{ index }}
			  </van-tab>
			</van-tabs> -->
			<van-tabs v-model="active" sticky ellipsis lazy-render @click="onClick">
				<van-tab v-for="(item, index) in localList.channels" :title="item.name" :id="item.cid">
					<div class="local-list">
						<ul>
							<li v-for="(opt, index) in localSongList">
								<p @click="localSongPut(index)">{{ opt.name }}</p>
								<!-- <span><img src="../../assets/images/gif.gif" alt="" /></span> -->
								<span @click="songDel(opt, index)"><img src="../../assets/images/delete.png" alt="" /></span>
							</li>
						</ul>
					</div>
				</van-tab>
			</van-tabs>
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
			offset: 0
		};
	},
	computed: {
		...mapState({
			localList: state => state.localList,
			localSongList: state => state.localSongList,
			localTotal: state => state.localTotal
			// awaitFlag: state => state.awaitFlag
		})
	},
	created() {
		if (window.hilink != undefined && this.localList.length == 0) {
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 405
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			// console.log('获取本地列表=============');
			this.setDeviceInfo(data);
		}
		// console.log('获取歌曲列表===================');
		this.onClick(0);
	},
	methods: {
		onClick(id, title) {
			let data = [];
			this.cid = id;
			this.cname = title;
			this.offset = 0;
			this.getLocalSongsList();
			this.setLocalCidFun(id);
			this.localList(data);
		},
		setLocalCidFun(data) {
			let self = this;
			self.setLocalCid(data);
		},
		getLocalSongsList() {
			let self = this;
			console.log('可以调用0000000000000==============');
			if (self.localSongList.length == 0 && self.offset == 0) {
				console.log('第一次请求=======');
				let body = {
					from: 'DID:0',
					to: 'UID:-1',
					action: 401,
					channel: self.cid,
					offset: self.offset * 2
				};
				let json = JSON.stringify(body);
				let data = { custom: { function: json, name: 'function' } };
				self.setDeviceInfo(data);
				// setTimeout(function() {
				self.offset = self.offset + 1;
				if (self.awaitFlag) {
					console.log('开始调用第二次============');
					self.getLocalSongsList();
				}
				// }, 500);
			} else {
				console.log('第二次调用==========', self.offset);
				if (self.offset <= self.localTotal) {
					let body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 401,
						channel: self.cid,
						offset: self.offset * 2
					};
					let json = JSON.stringify(body);
					let data = { custom: { function: json, name: 'function' } };
					console.log('第二次添加111111111=====================');
					self.setDeviceInfo(data);
					console.log('第二次添加2222222222=====================');
					// self.awaitFlag(false);
					// self.offset = self.offset + 1;
					// console.log('self.awaitFlag', self.awaitFlag);
					console.log('第二次添加33333333333=====================');
					if (localStorage.getItem('awaitFlag')) {
						console.log('可以调用==============',localStorage.getItem('awaitFlag'));			
						localStorage.setItem()('awaitFlag', false);
						self.getLocalSongsList();
					}
				}
			}
		},
		songDel(item, index) {
			let self = this;
			self.$dialog
				.confirm({
					title: '提示',
					message: '确定删除歌曲'
				})
				.then(() => {
					let body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 423,
						cid: self.cid,
						url: item.res[0].url,
						channelname: self.cname,
						songname: item.name
					};
					let json = JSON.stringify(body);
					let data = { custom: { function: json, name: 'function' } };
					self.setDeviceInfo(data);
				})
				.catch(() => {
					// on cancel
				});

			console.log(item);
		},
		localSongPut(index) {
			let self = this;
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 11,
				channel: self.cid,
				idx: index
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.setDeviceInfo(data);
		},
		awaitFlag(data) {
			let self = this;
			self.setAwaitFlag(data);
		},
		localList(data) {
			let self = this;
			self.putLocalList(data);
		},
		...mapActions(['putLocalList', 'setAwaitFlag'])
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
