<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<div class="loading-box" v-if="loadingImg"><van-loading size="24px" type="spinner" vertical color="#007DFF">加载中</van-loading></div>
			<div class="loading-box1" v-if="isClickBtn"><van-loading size="24px" type="spinner" vertical color="#007DFF">加载中</van-loading></div>
			<div class="local-list" v-if="loading">
				<ul>
					<li v-for="(opt, index) in localSongList.songs">
						<p @click="localSongPut(index)" :class="cid == musicData.channel && index == musicData.idx ? 'textActive' : ''">{{ opt.name }}</p>
						<span><img v-if="cid == musicData.channel && index == musicData.idx ? 'textActive' : ''" src="../../assets/images/gif.gif" alt="" /></span>
						<span @click="songDel(opt, index)"><img src="../../assets/images/delete.png" alt="" /></span>
					</li>
					<p class="moreBtn" @click="listMore()" v-if="locaFlag">{{ locaTip }}</p>
					<!-- <p class="moreBtn" v-if="localTotal == 0">文件夹没有歌曲</p> -->
					<!-- <p class="moreBtn" @click="getSongsTotal(1)" v-if="ifDefeated">拉取失败,点击重新加载</p> -->
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
			beginNumber: 0,
			isStop: false,
			delIndex: -1,
			delPage: 0,
			isMore: true,
			isNull: false,
			isBottom: false,
			
			// tip: '点击加载更多...',
			sumPage: 0,
			ifDefeated: false
		};
	},
	computed: {
		...mapState(['localSongList', 'localTotal', 'musicData', 'loadingFlag', 'limitNumber', 'locaFlag', 'locaTip', 'isClickBtn','loadingImg'])
	},
	created() {
		this.$store.dispatch('isClickBtnActions', false);
		this.cid = this.$route.params.id;
		this.cname = this.$route.params.name;
		if (this.$route.params.name == '我的收藏') {
			this.title = this.$t('m.Favorites');
		} else if (this.$route.params.name == '/') {
			this.title = '根目录';
		} else {
			this.title = this.$route.params.name;
		}
		this.getSongsTotal(0);
		this.beginNumber = 0;
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
					// self.isClickBtn = false;
					if (self.beginNumber == 0) {
						self.loading = true;
					}
					self.beginNumber = self.beginNumber + 1;
				}
				if (data.errcode == 408 || data.errcode == -41 || data.errcode == -1) {
					self.loading = true;
					self.$store.dispatch('locaTipActions', '网络忙,点击重新加载');
					// self.isClickBtn = false;
					self.ifDefeated = true;
					self.$store.dispatch('isClickBtnActions', false);
					self.$store.dispatch('locaFlagActions', true);
				}
			};
			window['delListBack'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					let list = self.localSongList.songs;
					if (self.delIndex < self.musicData.idx) {
						self.musicData.idx = self.musicData.idx - 1;
					}
					self.delPage = self.delPage + 1;
					list.splice(self.delIndex, 1);
					if (list.length == 0) {
						self.beginNumber = 0;
					}
				}
			};
		}
	},
	methods: {
		//获取歌曲总数量
		getSongsTotal(type) {
			let self = this;
			self.loading = false;
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 401,
				channel: self.cid,
				offset: 0
			};
			console.log("body=========",body);
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.setDeviceSongsInfo(data, 'songsListBack');
		},
		getLocalSong: _debounce(function(type) {
			let self = this;
			// if (type == 0) {
			// 	self.loading = false;
			// }
			if (self.beginNumber >= self.limitNumber && !self.ifDefeated) {
				console.log('没有了000000000000000000===================');
				self.cangetlocal = true;
				// self.tip = '暂无更多';
				self.$store.dispatch('locaTipActions', '暂无更多');
				return true;
			}
			let page = self.beginNumber * 4 - self.delPage;
			var sumPage;
			if (0 < page) {
				sumPage = page;
			} else {
				sumPage = 0;
			}
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 401,
				channel: self.cid,
				offset: self.beginNumber * 4 - self.delPage
			};
			let json = JSON.stringify(body);
			console.log('json============', json);
			let data = { custom: { function: json, name: 'function' } };
			console.log('beginNumberbeginNumber111111===========', self.beginNumber);
			self.setDeviceSongsInfo(data, 'songsListBack');
		}, 50),
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
					let time = setTimeout(function() {
						self.$store.dispatch('getDeviceAll');
					}, 3000);
				})
				.catch(() => {
					// on cancel
				});
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
			setTimeout(function() {
				self.cangetlocal = true;
			}, 3000);
		}, 400),
		listMore() {
			let that = this;
			console.log("that.ifDefeated",that.ifDefeated)
			if (that.ifDefeated) {
				that.getLocalSong(0);
				return;
			}
			if (!that.cangetlocal) {
				return;
			}
			if (that.beginNumber < that.limitNumber) {
				console.log('加载更多=========', that.localSongList.songs);
				let list = that.localSongList.songs;
				if (list.length == 0) {
					console.log('没有了111=======');
					that.beginNumber = 0;
				}
				that.cangetlocal = false;
				that.$store.dispatch('isClickBtnActions', true);
				that.getLocalSong();
			} else {
				// that.tip = '暂无更多';
				that.$store.dispatch('locaTipActions', '暂无更多');
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
		// 		if (that.cangetlocal && that.beginNumber < that.limitNumber) {
		// 			let list = that.localSongList.songs;
		// 			if (list.length == 0) {
		// 				console.log('没有了=======');
		// 				that.beginNumber = 0;
		// 			} else {
		// 				that.beginNumber = that.beginNumber + 1;
		// 			}
		// 			that.cangetlocal = false;
		// 			that.getLocalSong();
		// 		} else {
		// 			console.log('没有了222222222222222222222222222222');
		// 			that.tip = '暂无更多';
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
.loading-box1 {
	position: fixed;
	left: 50%;
	top: 50%;
	width: 100px;
	height: 100px;
	background: rgba(0, 0, 0, 0.1);
	margin: -50px 0 0 -50px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #81b4ff;
	text-align: center;
}
.nullBox {
	width: 95%;
	margin: 0 auto;
	text-align: center;
	font-size: 14px;
}
.app {
	margin-top: 80px;
	background: #fff;
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
