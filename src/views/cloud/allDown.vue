<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<div class="music-list" v-if="isLoaded">
			<p class="downMsg">*应版权方要求,部分歌曲暂无法提供下载</p>
			<van-checkbox-group v-model="result" checked-color="#07c160" ref="checkboxGroup" :max="checkboxMax">
				<van-cell-group>
					<van-cell
						v-for="(item, index) in musicList"
						:title="item.name"
						clickable
						:key="index"
						@click="toggle(index)"
						:class="item.copyrightId == 0 ? 'isDownActive' : ''"
					>
						<van-checkbox :name="index" ref="checkboxes" slot="right-icon" v-if="item.isDownload == 1"/>
					</van-cell>
				</van-cell-group>
			</van-checkbox-group>
		</div>
		<div class="downBtn" @click="downAllList()">下载</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" color="#81b4ff">加载中...</van-loading></div>
	</div>
</template>

<script>
import { _debounce } from '@/hilink/public';
import http from '../../api/index.js';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			musicList: [],
			info: [],
			audio: null,
			src: '',
			result: [],
			active: -1,
			isLoaded: false,
			showIndex: -1,
			showTab: true,
			checkboxMax: 8,
			loadingFlag: true,
			title: '批量下载'
		};
	},
	created() {},
	async mounted() {
		let that = this;
		await that.$axios
			.getAudioData({
				audioGroupId: this.$route.query.id,
				channelId: 66,
				pageSize: 200,
				pageNo: this.pageNo
			})
			.then(res => {
				if (res.data.success) {
					that.audioInfoData = res.data.data;
					// that.total = res.data.data.total;

					//转换格式
					res.data.data.audioVoList.forEach((v, i) => {
						let s = (parseInt(v.timeLength % 60) + '').padStart(2, '0');
						let m = (parseInt(v.timeLength / 60) + '').padStart(2, '0');
						v.timelengths = m + ':' + s;
					});
					that.musicList = that.musicList.concat(res.data.data.audioVoList);
					that.isLoaded = true;
				} else {
					that.noMoreData = true;
				}
			});
		window['songAllDown'] = resultStr => {
			let data = this.praseResponseData(resultStr);
			if (data.errcode == 0) {
				this.loadingFlag = true;
				this.$toast({
					message: '歌曲添加下载成功',
					position: 'bottom',
					duration: '2000',
					className: 'toastActive'
				});
				this.$router.go(-1); //返回上一层
			}
		};
	},
	methods: {
		toggle(index) {
			let self = this;
			console.log(index);
			self.$refs.checkboxes[index].toggle();
			console.log('self.result.length', self.result);
			if (self.result.length == 8) {
				this.$toast({
					message: '批量下载每次最多添加八首',
					position: 'bottom',
					duration: '2000',
					className: 'toastActive'
				});
			}
		},
		downAllList() {
			let self = this;
			var dataArray = [];
			console.log('self.result=====', self.result);
			if (self.result.length == 0) {
				self.$toast({
					message: '请选择要下载的歌曲',
					position: 'bottom',
					duration: '2000',
					className: 'toastActive'
				});
				return;
			}
			if (!self.loadingFlag) {
				return;
			}
			self.result.forEach(function(item, index) {
				dataArray.push(self.musicList[item]);
			});
			var songsData = [];
			dataArray.forEach(function(item, index) {
				let path = item.url.indexOf('https:') > -1 ? item.url.replace('https', 'http') : item.url;
				let json = {
					id: item.id.toString(),
					name: item.name,
					fmt: 'mp3',
					url: path
				};
				songsData.push(json);
			});
			var timestamp = parseInt(new Date().getTime() / 1000);
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 409,
				songlistname: '最新下载',
				songlistid: self.audioInfoData.id,
				songs: songsData,
				time:timestamp,
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.setDeviceSongsInfo(data, 'songAllDown');
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
		}
	},

	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/listenDetail.less');
.downMsg {
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #c81624;
}
.isDownActive {
	opacity: 0.4;
}
</style>
