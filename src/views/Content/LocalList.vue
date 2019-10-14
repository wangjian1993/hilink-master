<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="list-content">
			<div class="loading-box" v-if="!loading">
				<van-loading type="spinner" vertical color="#007DFF" />
				<!-- <van-loading size="24px" type="spinner" vertical color="#007DFF">加载中...</van-loading> -->
			</div>
			<div class="local-list" v-if="loading">
				<p class="nullBox" v-if="localSongList.songs.length == 0">暂无歌曲</p>
				<ul>
					<li v-for="(opt, index) in localSongList.songs">
						<p @click="localSongPut(index)" :class="cid == musicData.channel && index == musicData.idx?'textActive':''">{{ opt.name }}</p>
						<span><img v-if="cid == musicData.channel && index == musicData.idx?'textActive':''" src="../../assets/images/gif.gif" alt="" /></span>
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
			beginNumber: 0,
			limitNumber: 0,
			isStop:false,
			isBottom:false
		};
	},
	computed: {
		...mapState({
			localSongList: state => state.localSongList,
			localTotal: state => state.localTotal,
			musicData:state=>state.musicData
		})
	},
	created() {
		this.cid = this.$route.params.id;
		this.cname = this.$route.params.name;
		this.title = this.$route.params.name;
		console.log(this.cid);
		console.log(this.cname);
		this.getSongsTotal();
		this.beginNumber = 0;
		this.limitNumber = 0;
		this.getNumber = 0;
		window.addEventListener('scroll', () => {
			this.toBottom();
		});
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['songsListBack'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					self.cangetlocal = true;
					if (self.beginNumber == 0) {
						self.devicesPage();
						console.log('第一次调用=============');
					} else {
						if (self.beginNumber <= 2) {
							console.log('第2次调用=============');
							self.getLocalSong();
							self.isBottom =true;					
						}else {
							console.log('第3次调用=============');			
							self.isBottom =true;
							self.getLocalSong();
						}
					}
				}
			};
			window['delListBack']=resultStr =>{
				let data = self.praseResponseData(resultStr);
				console.log("删除====")
			}
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
		},
		devicesPage: _debounce(function() {
			let self = this;
			if (!self.cangetlocal) return false;
			self.limitNumber = (self.getNumber + 1) * 10< self.localTotal ? (self.getNumber + 1) * 10 : self.localTotal;
			self.beginNumber = self.getNumber * 10;
			console.log('limitNumber===========', self.limitNumber);
			console.log('beginNumber===========', self.beginNumber);
			console.log('getNumber===========', self.getNumber);
			self.beginNumber = 1;
			self.getLocalSong();
		}, 300),
		getLocalSong: _debounce(function() {
			let self = this;
			console.log('limitNumber111===========', self.limitNumber);
			console.log('beginNumber111===========', self.beginNumber);
			console.log('getNumber11111===========', self.getNumber);
			if (self.beginNumber >= self.limitNumber) {
				self.cangetlocal = true;
				// self.devicesSwitch();
				return true;
			}
			// self.$toast.loading({
			//   mask: true,
			//   message: '加载中...'
			// });
			let body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 401,
				channel: self.cid,
				offset: self.beginNumber * 6
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.beginNumber = self.beginNumber + 1;
			console.log('beginNumberbeginNumber111111===========', self.beginNumber);
			self.setDeviceSongsInfo(data, 'songsListBack');
			self.getNumber =self.getNumber + 1;
		}, 400),
		songDel(item, index) {
			let self = this;
			console.log(item);
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
						sidx:index
					};
					let json = JSON.stringify(body);
					let data = { custom: { function: json, name: 'function' } };
					console.log("删除歌曲====",data)
					self.setDeviceSongsInfo(data,'delListBack');
				})
				.catch(() => {
					// on cancel
				});

			console.log(item);
		},
		localSongPut(index) {
			let self = this;
			if(!self.cangetlocal){
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
			self.setDeviceInfo(data);
		},
		toBottom() {
			let that = this;
			let scrollH = document.body.scrollTop || document.documentElement.scrollTop;
			var docH, windowH; //滚动条滚动高度
			docH = document.body.scrollHeight || document.documentElement.scrollHeight; //文档高度
			windowH = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight; //浏览器窗口高度
			if (scrollH + windowH >= docH && !that.isStop) {
				console.log("加载1111======")
				//滚动到底部和页面没有正在执行请求网络数据的过程中的条件要同时成立才可以执行请求请求数据操作
				if (that.isBottom && that.beginNumber <= that.limitNumber) {
					console.log("加载2222======")
					that.devicesPage();
					that.isBottom=false;
				}
			}
		},
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
.local-list li p.textActive{
	color: #ff444a;
}
</style>
