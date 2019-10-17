<template>
	<div class="container">
		<v-header :title="title"></v-header>
		<div class="music-list">
			<!-- 	<div class="all-down-btn">
				<p @click="checkAll">全选</p>
				<p @click="toggleAll">取消</p>
			</div> -->
			<!-- 	<van-checkbox-group v-model="result" ref="checkboxGroup">
			  <van-checkbox name="a">复选框 a</van-checkbox>
			  <van-checkbox name="b">复选框 b</van-checkbox>
			  <van-checkbox name="c">复选框 c</van-checkbox>
			</van-checkbox-group> -->
			<van-checkbox-group v-model="result" checked-color="#07c160" ref="checkboxGroup" max="8">
				<van-cell-group>
					<van-cell v-for="(item, index) in musicList" clickable :key="item.id" :title="item.name" @click="toggle(index)">
						<van-checkbox :name="index" :id="item.id" :url="item.path" slot="right-icon" />
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
			loadingFlag:true,
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
				res.data.content.musicList.forEach((v, i) => {
					if (v.timelength / 60 < 10) {
						if (v.timelength % 60 < 10) {
							v.timelength = '0' + parseInt(v.timelength / 60) + ':0' + (v.timelength % 60);
						} else {
							v.timelength = '0' + parseInt(v.timelength / 60) + ':' + (v.timelength % 60);
						}
					} else {
						if (v.timelength % 60 < 10) {
							v.timelength = parseInt(v.timelength / 60) + ':0' + (v.timelength % 60);
						} else {
							v.timelength = parseInt(v.timelength / 60) + ':' + (v.timelength % 60);
						}
					}
				});

				this.musicList = res.data.content.musicList;
			})
			.catch(err => {
				console.log(err);
			});
		this.isLoaded = false;
		this.audio = new Audio();
		window['songAllDown']=resultStr =>{
			// let data = self.praseResponseData(resultStr);
			console.log("删除====",resultStr)
			if(resultStr.errcode == 1){
				self.loadingFlag =true;
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);
		this.audio.pause();
		next();
	},
	methods: {
		//播放音乐
		play(src, index) {
			if (src == this.src) {
				if (this.audio.paused) {
					this.active = index;
					this.audio.play();
				} else {
					this.audio.pause();
					this.active = -1;
				}
			} else {
				this.active = index;
				this.audio.pause();
				this.src = this.audio.src = src;
				this.audio.play();
				this.audio.onended = () => {
					this.active = -1;
				};
			}
		},
		//显示点播收藏
		show(index) {
			if (this.showIndex == index) {
				this.showTab = !this.showTab;
				return;
			}
			this.showTab = true;
			this.showIndex = index;
		},
		checkAll() {
			let self = this;
			this.$refs.checkboxGroup.toggleAll(true);
		},
		toggleAll() {
			let self = this;
			this.$refs.checkboxGroup.toggleAll();
		},
		toggle(index) {
			this.$refs.checkboxes[index].toggle();
		},
		downAllList() {
			let self = this;
			var dataArray = [];
			if(!self.loadingFlag){
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
				songsData.push(json)
			});
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 409,
				songlistname: '最新下载',
				songlistid: self.info.id,
				songs:songsData
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			console.log('data=========', data);
			self.setDeviceSongsInfo(data, 'songAllDown');		
		},
		/**
		 * 推送歌曲到设备
		 * 1.点播
		 * 2.收藏
		 * 3.下载
		 * */
		devicesMusic: _debounce(function(type, item) {
			let self = this;
			var body;
			var path = item.path.indexOf('https:') > -1 ? item.path.replace('https', 'http') : item.path;
			switch (type) {
				case 1:
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 203,
						songs: [
							{
								id: item.music_id || item.radioid,
								singer: '',
								posters: '',
								language: '国语',
								name: item.name,
								albumname: item.specialname,
								albumid: item.special_id,
								type: 5,
								res: [
									{
										filesize: '',
										lrc: '',
										fmt: 'mp3',
										duration: item.lengthOfTime,
										url: path
									}
								]
							}
						]
					};
					self.$toast({
						message: '歌曲点播成功',
						position: 'bottom',
						duration: '3000',
						className: 'toastActive'
					});
					break;
				case 2:
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 416,
						songs: [
							{
								id: item.music_id || item.radioid,
								name: item.name,
								url: path
							}
						]
					};
					break;
				case 3:
					var id = item.music_id.toString();
					body = {
						from: 'DID:0',
						to: 'UID:-1',
						action: 409,
						songlistname: '最新下载',
						songlistid: self.info.id,
						songs: [
							{
								id: id,
								name: item.name,
								fmt: 'mp3',
								url: path
							}
						]
					};
					self.$toast({
						message: '歌曲下载添加成功',
						position: 'bottom',
						duration: '3000',
						className: 'toastActive'
					});
					break;
				default:
					break;
			}
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			console.log('data=========', data);
			self.setDeviceInfo(data);
		}, 300)
	},

	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/listenDetail.less');
</style>
