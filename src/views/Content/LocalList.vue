<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<div class="loading-box" v-if="!loading"><van-loading size="24px" type="spinner" vertical color="#007DFF">加载中</van-loading></div>
			<div class="local-list" v-if="loading">
				<ul>
					<li v-for="(opt, index) in localSongList.songs">
						<p @click="localSongPut(index)" :class="cid == musicData.channel && index == musicData.idx ? 'textActive' : ''">{{ opt.name }}</p>
						<span><img v-if="cid == musicData.channel && index == musicData.idx ? 'textActive' : ''" src="../../assets/images/gif.gif" alt="" /></span>
						<span @click="songDel(opt, index)"><img src="../../assets/images/delete.png" alt="" /></span>
					</li>
					<p class="moreBtn" @click="listMore()" v-if="!isMore">点击加载更多...</p>
					<p class="moreBtn" v-if="isMore">暂无更多</p>
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
			loading: null,
			cname: null,
			offset: 1,
			getNumber: 0,
			offsetFlag: false,
			cangetlocal: true,
			beginNumber: 0,
			limitNumber: 0,
			isStop: false,
			delIndex: -1,
			isMore: false,
			isBottom: false
		};
	},
	computed: {
		...mapState(['localSongList', 'localTotal', 'musicData', 'loadingFlag'])
	},
	created() {
		this.cid = this.$route.params.id;
		this.cname = this.$route.params.name;
		this.title = this.$route.params.name;
		this.getSongsTotal();
		this.beginNumber = 0;
		this.limitNumber = 0;
		this.getNumber = 0;
		// window.addEventListener('scroll', () => {
		// 	this.toBottom();
		// });
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['songsListBack'] = resultStr => {
				console.log('获取文件歌曲列表', resultStr);
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					self.cangetlocal = true;
					if (self.beginNumber == 0) {
						self.devicesPage();
						self.loading = true;
					}
				}
			};
			window['delListBack'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					let list = self.localSongList.songs;
					console.log('self.delIndex===', self.delIndex);
					list.splice(self.delIndex, 1);
					console.log('list.length====', list.length);
					if (list.length == 0) {
						self.beginNumber = 0;
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
		},
		devicesPage: _debounce(function() {
			let self = this;
			if (!self.cangetlocal) return false;
			self.limitNumber = Math.ceil(self.localTotal / 6);
			if (self.limitNumber <= 1) {
				self.isMore = true;
			}
			// self.getLocalSong();
		}, 300),
		getLocalSong: _debounce(function() {
			let self = this;
			if (self.beginNumber >= self.limitNumber) {
				self.cangetlocal = true;
				self.isMore = true;
				return true;
			}
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 401,
				channel: self.cid,
				offset: self.beginNumber * 6
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			console.log('beginNumberbeginNumber111111===========', self.beginNumber);
			self.setDeviceSongsInfo(data, 'songsListBack');
		}, 400),
		songDel(item, index) {
			let self = this;
			if (!self.cangetlocal) {
				return;
			}
			self.delIndex = index;
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
						channelname: self.cname,
						songname: item.name,
						sidx: index
					};
					let json = JSON.stringify(body);
					let data = { custom: { function: json, name: 'function' } };
					self.setDeviceSongsInfo(data, 'delListBack');
				})
				.catch(() => {
					// on cancel
				});

			console.log(item);
		},
		localSongPut: _debounce(function(index) {
			let self = this;
			console.log('self.loadingFlag', self.loadingFlag);
			if (!self.loadingFlag) {
				return;
			}
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 11,
				channel: self.cid,
				idx: index
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
			self.$store.dispatch('setLoadingFlag', false);
		}, 400),
		listMore() {
			let that = this;
			if (that.cangetlocal && that.beginNumber <= that.limitNumber) {
				console.log('加载更多=========', that.localSongList.songs);
				let list = that.localSongList.songs;
				if (list.length == 0) {
					that.beginNumber = 0;
				} else {
					that.beginNumber = that.beginNumber + 1;
				}
				that.cangetlocal = false;
				that.getLocalSong();
			} else {
				that.isMore = true;
			}
		},
		// toBottom() {
		// 	let that = this;
		// 	let scrollH = document.body.scrollTop || document.documentElement.scrollTop;
		// 	var docH, windowH; //滚动条滚动高度
		// 	docH = document.body.scrollHeight || document.documentElement.scrollHeight; //文档高度
		// 	windowH = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight; //浏览器窗口高度
		// 	if (scrollH + windowH >= docH && !that.isStop) {
		// 		console.log('加载1111======');
		// 		//滚动到底部和页面没有正在执行请求网络数据的过程中的条件要同时成立才可以执行请求请求数据操作
		// 		if (that.isBottom && that.beginNumber <= that.limitNumber) {
		// 			console.log('that.beginNumber222====', that.beginNumber);
		// 			console.log('that.limitNumber222====', that.limitNumber);
		// 			console.log('加载2222======');
		// 			that.getNumber = that.getNumber + 1;
		// 			that.isBottom = false;
		// 			that.devicesPage();
		// 		}
		// 	}
		// },
		//回调函数转换
		praseResponseData(resData) {
			try {
				return JSON.parse(resData);
			} catch (error) {
				var dataStr = resData.replace(/:"{/g, ':{');
				dataStr = dataStr.replace(/}",/g, '},');
				dataStr = dataStr.replace(/}"/g, '}');
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
	margin: 0 auto;
	text-align: center;
	font-size: 14px;
}
.app {
	margin-top: 80px;
}
.local-list {
	width: 92%;
	margin: 0 auto;
	padding-bottom: 70px;
	li {
		display: flex;
		height: 50px;
		p {
			width: 80%;
			font-size: 14px;
			color: #000000;
			line-height: 50px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
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
				width: 28px;
				height: 22px;
			}
		}
	}
}
.moreBtn {
	width: 90%;
	margin: 10px auto;
	text-align: center;
	font-size: 14px;
}
.local-list li p.textActive {
	color: #ff444a;
}
</style>
