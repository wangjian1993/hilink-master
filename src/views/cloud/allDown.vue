<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<div class="music-list">
			<p class="downMsg">*应版权方要求,部门歌曲暂无法提供下载</p>
			<van-checkbox-group v-model="result" checked-color="#07c160" ref="checkboxGroup" :max="checkboxMax">
				<van-cell-group>
					<van-cell v-for="(item, index) in musicList" :title="item.name"  clickable
			      :key="index"  @click="toggle(index)">
						<van-checkbox :name="index"  ref="checkboxes" slot="right-icon"  v-if="item.copyrightId == 1"/>			
					</van-cell>
				</van-cell-group>
			</van-checkbox-group>
		</div>
		<div class="downBtn" @click="downAllList()">下载</div>
		<!-- <div class="loadingding center" v-show="isLoaded"><van-loading size="50px" color="#81b4ff">加载中...</van-loading></div>
		<p class="PageBottom">暂无更多</p> -->
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
			checkboxMax:8,
			loadingFlag: true,
			title: '批量下载'
		};
	},
	created() {},
	async mounted() {
		this.isLoaded = true;
		await http
			.getSpecialInfo(this.$route.query.id)
			.then(res => {
				//转换播放时间
				this.musicList = res.data.content.musicList;
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = false;
		this.audio = new Audio();
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
			console.log(index)
			self.$refs.checkboxes[index].toggle();
			if(self.result.length == 8){
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
			console.log("self.result=====",self.result);
			if(self.result.length == 0){
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
				let path = item.path.indexOf('https:') > -1 ? item.path.replace('https', 'http') : item.path;
				let json = {
					id: item.id.toString(),
					name: item.name,
					fmt: 'mp3',
					url: item.path
				};
				songsData.push(json);
			});
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 409,
				songlistname: '最新下载',
				songlistid: self.info.id,
				songs: songsData
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
.downMsg{
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #c81624;
}
</style>
