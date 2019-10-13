<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<div class="loading-box" v-if="!loading">
				<van-loading type="spinner" vertical color="#007DFF" />
				<!-- <van-loading size="24px" type="spinner" vertical color="#007DFF">加载中...</van-loading> -->
			</div>
			<div class="local-list" v-if="loading">
				<p class="nullBox">暂无歌曲</p>
				<ul>
					<li v-for="(opt, index) in localSongList.songs">
						<p @click="localSongPut(index)">{{ opt.name }}</p>
						<!-- <span><img src="../../assets/images/gif.gif" alt="" /></span> -->
						<span @click="songDel(opt, index)"><img src="../../assets/images/delete.png" alt="" /></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { _debounce } from '@/hilink/public';
import { mapActions, mapMutations, mapState } from 'vuex';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			title: '',
			active: 0,
			cid: 0,
			loading: false,
			cname: null,
			offset: 1,
			getNumber: 0,
			offsetFlag: false,
			cangetlocal: true,
			beginNumber:0,
			limitNumber:0
		};
	},
	computed: {
		...mapState({
			localSongList: state => state.localSongList,
			localTotal: state => state.localTotal
		})
	},
	created() {
		this.cid = this.$route.params.id;
		this.cname = this.$route.params.name;
		this.title = this.$route.params.name;
		console.log(this.cid);
		console.log(this.cname);
		this.getSongsTotal();
		this.beginNumber =0;
		// this.getLocalSongsList(false);
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['songsListBack'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					console.log('获取成功=================');
					self.cangetlocal = true;
					if (self.beginNumber <= 8) {
						self.getLocalSong();
					}
					
				}
			};
		}
	},
	methods: {
		//获取歌曲总数量
		getSongsTotal() {
			let self = this;
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 401,
				channel: self.cid,
				offset: 0
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.setDeviceSongsInfo(data, 'songsListBack');
			self.loading = true;
			self.devicesSwitch();
		},
		devicesSwitch: _debounce(function() {
			let self = this;
			if (!self.cangetlocal) return false;
			console.log("self.localTotal======",self.localTotal)
			self.limitNumber = (self.getNumber + 1) * 10 < self.localTotal ? (self.getNumber + 1) * 10 : self.localTotal;
			self.beginNumber = self.getNumber * 10;
			console.log("limitNumber===========",self.limitNumber)
			onsole.log("beginNumber===========",self.beginNumber)
		}, 300),
		getLocalSong:_debounce(function(){
			let self = this;
			if (self.beginNumber >= self.limitNumber) {
				self.cangetlocal = true;
				return true;
			}
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 401,
				channel: self.cid,
				offset:self.beginNumber
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.beginNumber =self.beginNumber + 1 ;
			console.log("beginNumberbeginNumber111111===========",self.beginNumber)
			self.setDeviceSongsInfo(data, 'songsListBack');
		},400),
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
		// awaitFlag(data) {
		// 	let self = this;
		// 	self.setAwaitFlag(data);
		// },
		//回调函数转换
		praseResponseData(resData) {
			try {
				return JSON.parse(resData);
			} catch (error) {
				var dataStr = resData.replace(/:"{/g, ':{');
				dataStr = dataStr.replace(/}",/g, '},');
				dataStr = dataStr.replace(/\\/g, '');
				dataStr = dataStr.replace(/\n/g, '');
				return JSON.parse(dataStr);
			}
		},
		localList(data) {
			let self = this;
			self.putLocalList(data);
		},
		...mapActions(['putLocalList'])
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
.loading-box {
	width: 100%;
	height: 100%;
}
.nullBox {
	width: 95%;
	text-align: center;
	font-size: 14px;
}
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
