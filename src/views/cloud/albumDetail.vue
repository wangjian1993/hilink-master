<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="content album-content" v-show="isLoaded">
			<div class="head">
				<img :src="audioInfoData.coverpath" class="head_coverpath" />
				<div class="head_content">
					<img :src="audioInfoData.coverpath" />
					<div class="head_content_right">
						<p>{{ audioInfoData.name }}</p>
						<div class="head_content_data">
							<img src="../../assets/images/icon_gequ.png" alt />
							<span>{{ total }}首</span>
							<img class="secondImg" src="../../assets/images/icon_video.png" alt />
							<span>{{ audioInfoData.browse > 10000 ? (audioInfoData.browse - (audioInfoData.browse % 1000)) / 10000 + 'w' : audioInfoData.browse }}</span>
						</div>
						<div class="head_content_tag">
							<span v-for="(item, index) in audioInfoData.tag" :key="index" v-show="audioInfoData.tag.length > 1">{{ item }}</span>
						</div>
					</div>
				</div>
				<div class="album-icon" v-if="isLine == 1"><img src="../../assets/images/download.png" class="head_download" @click="goDownload(1)" /></div>
				<!-- <div class="album-icon1" v-if="isLine == 1"><img src="../../assets/images/favorites.png" class="head_download" @click="goDownload(2)" /></div> -->
			</div>
			<van-tabs v-model="active" color="#4da6ff">
				<van-tab title="列表"><music-list :items="musicList" :total="total" :audioInfoData="audioInfoData.id" :routeLeave="routeLeave"></music-list></van-tab>
				<van-tab title="简介">
					<div class="introduct" v-if="audioInfoData.brief">
						<div class="title">编辑推荐</div>
						<div :class="{ allText: allText }" class="text">{{ audioInfoData.brief }}</div>
						<div class="all" @click="getAll" v-show="brief">
							{{ text1 }}
							<img :src="allText ? require('../../assets/images/huiben_shou.png') : require('../../assets/images/huiben_shou.png')" />
						</div>
					</div>
					<div class="introduct" style="margin-bottom:126px;" v-if="audioInfoData.description">
						<div class="title">专辑介绍</div>
						<div :class="{ allText: allTexts }" class="text">{{ audioInfoData.description }}</div>
						<div class="all" @click="getAlls" v-show="description">
							{{ text2 }}
							<img :src="allTexts ? require('../../assets/images/huiben_shou.png') : require('../../assets/images/huiben_xiala.png')" />
						</div>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div class="loadingding center" v-show="!isLoaded"><van-loading size="30px" color="#007DFF" vertical>加载中</van-loading></div>
	</div>
</template>
<script>
import musicList from '../../components/musicList.vue';
import Header from '@/components/header.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			allText: false,
			text1: '查看全部',
			allTexts: false,
			text2: '查看全部',
			audioData: [],
			audioInfoData: [],
			audioId: '',
			total: 0,
			musicList: [],
			brief: false,
			description: false,
			active: 0,
			routeLeave: false,
			isLoaded:false,
			title:null
		};
	},
	created() {
		var id = this.$route.query.id;
		this.audioId = id;
		this.getAudioData(id);
	},
	computed: {
		...mapState(["isLine"])
	},
	mounted() {
		
	},
	methods: {
		getAll() {
			if (this.allText) {
				this.allText = false;
				this.text1 = '查看全部';
			} else {
				this.allText = true;
				this.text1 = '收起';
			}
		},
		getAlls() {
			if (this.allTexts) {
				this.allTexts = false;
				this.text2 = '查看全部';
			} else {
				this.allTexts = true;
				this.text2 = '收起';
			}
		},
		//专辑信息
		getAudioData(id) {
			var that = this;
			that.$axios.getSpecialInfo(id).then(res => {
				that.musicList = res.data.content.musicList;
				that.audioInfoData = res.data.content.info;
				that.title =res.data.content.info.name;
				that.audioInfoData.tag = that.audioInfoData.tag.split(',');
				//  console.log(that.audioInfoData.tag.length)
				that.total = res.data.content.total;
				if (res.data.content.info.brief.length > 70) {
					this.brief = true;
				}

				if (res.data.content.info.description.length > 70) {
					this.description = true;
				}
				//转换格式
				res.data.content.musicList.forEach((v, i) => {
					let s = (parseInt(v.timelength % 60) + '').padStart(2, '0');
					let m = (parseInt(v.timelength / 60) + '').padStart(2, '0');
					v.timelengths = m + ':' + s;
				});
				setTimeout(function(){
					that.isLoaded=true;
				},1000)
			});
		},
		//批量下载
		goDownload(type) {
			if(type == 1) {
				this.$router.push({ name: 'cloudAllDown', query: { id: this.audioId } });
			}else if(type == 2){
				this.$router.push({ name: 'cloudAllEnshrine', query: { id: this.audioId } });
			}
			
		},
		goEnshrine() {}
	},
	components: {
		musicList,
		'v-header': Header
	},
	beforeRouteLeave(to, from, next) {
		this.routeLeave = true;
		// 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true);

		next();
	}
};
</script>
<style lang="less" scoped>
.album-content {
	margin-top: 80px;
	background: #fff;
}
.content {
	overflow: hidden;
	padding-bottom: 40px;
}
.head {
	width: 100%;
	height: 180px;
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	background: transparent;
	.album-icon {
		width: 100%;
		position: absolute;
		bottom: 5px;
		right: 20px;
		text-align: right;
		z-index: 2000;
		img {
			width: 32px;
			height: 32px;
		}
		// right: 20px;
		// width: 28px;
		// height: 28px;
	}
	.album-icon1{
		width: 100%;
		position: absolute;
		bottom: 5px;
		right: 60px;
		text-align: right;
		// display: flex;
		img {
			width: 32px;
			height: 32px;
		}
	}
}
.head_coverpath {
	width: 100%;
	height: 180px;
	background-size: 100% 100%;
	filter: blur(25px);
}
.head_content {
	position: absolute;
	top: 8%;
	left: 0;
	bottom: 0;
	right: 0;
	width: 96%;
	padding-left: 30px;
	color: #ffffff;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
	z-index: 1000;
	.head_content_right {
		font-size: 16px;
		line-height: 16px;
		margin-left: 14px;
	}
	.head_content_data {
		font-size: 11px;
		line-height: 11px;
		margin-top: 12px;
		img {
			width: 12px;
			height: 12px;
			vertical-align: middle;
		}
		span {
			padding-left: 5px;
		}
		.secondImg {
			width: 16px;
			margin-left: 16px;
		}
	}
	.head_content_tag {
		margin-top: 15px;
		span {
			font-size: 11px;
			padding: 5px 9px;
			margin-right: 8px;
			background: black;
			opacity: 0.4;
			border-radius: 10px;
		}
	}
}

.head_content > img {
	width: 105px;
	height: 105px;
	border-radius: 5px;
	vertical-align: middle;
}
.introduct {
	width: 100%;
}
.title {
	width: 92%;
	margin: 0 auto;
	height: 36px;
	color: #323232;
	font-size: 18px;
	display: flex;
	align-items: center;
}
.all {
	height: 40px;
	color: #a7a9ab;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 15px;
		height: 7px;
		margin-left: 10px;
	}
}

.text {
	width: 90%;
	font-family: SourceHanSansCN-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 21px;
	letter-spacing: 0px;
	color: #000;
	margin-left: 16px;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
.allText {
	text-overflow: initial;
	overflow: initial;
	text-overflow: initial;
	display: block;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
</style>
