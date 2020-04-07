<template>
	<van-swipe :autoplay="0" class="age_recommend" :width="swipeWidth" :show-indicators="indicators">
		<van-swipe-item v-for="(item, index) in dataList" :key="index">
			<div class="age_recommend_item">
				<div class="age_recommend_item_head">
					<div class="age_recommend_item_head_left">
						<div>
							<img src="../../assets/images/label.png" alt="" />
							<span>{{ index }}-{{ index + 1 }}岁成长推荐</span>
						</div>
						<p>{{ ageTitle(index) }}</p>
					</div>
					<div class="age_recommend_item_head_right">
						<div></div>
						<div></div>
						<img :src="item[0].coverImage" alt="" />
					</div>
				</div>
				<div
					class="age_recommend_item_list_item"
					v-for="(childItem, childIndex) in item"
					:key="childIndex"
					v-if="childIndex < 5"
					@click="deviceOrMobile(childItem.url, index, childItem.id, childItem, childItem.length)"
				>
					<div class="age_recommend_item_list_item_left">
						<p>{{ childItem.name }}</p>
					</div>
					<div class="age_recommend_item_list_item_right">{{ childItem.childResCount }}首</div>
				</div>
			</div>
		</van-swipe-item>
	</van-swipe>
</template>
<script>
// import Bus from "../assets/js/bus.js";
import { mapState } from 'vuex';
export default {
	props: {
		dataList: {
			type: Array,
			default: {}
		}
	},
	data() {
		return {
			indicators: false,
			swipeWidth: ''
		};
	},
	created() {
		this.swipeWidth = (document.documentElement.clientWidth / 10) * 8.2;
	},
	methods: {
		ageTitle(index) {
			switch (index) {
				case 0:
					return '早安时间';
					break;
				case 1:
					return '磨耳朵';
					break;
				case 2:
					return '晚安时间';
					break;
				case 3:
					return '磨耳朵';
					break;
				default:
					break;
			}
		},
		//播放或试听
		deviceOrMobile(src, index, id, data, length) {
			this.$router.push({
				name: 'albumDetail',
				query: {
					id: id
				}
			});
		},
		//手机播放音乐
		play(src, index, id, data) {
			this.$store.commit('SET_SRC', { src: src });
			if (localStorage.getItem('isLogin') == '1') {
				if (src == this.src) {
					if (this.$audio.paused) {
						this.active = index;
						this.$audio.play();
					} else {
						this.$audio.pause();
						this.active = -1;
					}
				} else {
					//统计
					if (window._czc) {
						window._czc.push(['_trackEvent', localStorage.getItem('deviceType') + '-' + '试听', '点击', '总计']);
					}
					this.active = index;
					this.$audio.pause();
					this.src = this.$audio.src = src;
					this.$audio.play();
					this.$audio.onended = () => {
						this.active = -1;
						// console.log('************************')
						this.play(this.items[index + 1].path, index + 1, this.items[index + 1].id, this.items[index + 1]);
					};
					this.addHistory(id);
				}
			}
		},
		//设备播放音乐
		devicePlay(data, id) {
			console.log();
			if (this.deviceOnline) {
				this.addHistory(id);
			} else {
				this.$toast('故事机离线');
			}
		},
		//添加历史记录
		addHistory(id) {
			this.$axios
				.addHistoryData({
					userId: localStorage.getItem('userId'),
					sourceId: id,
					sourceType: 10,
					channelId: 21
				})
				.then(res => {});
		}
	},
	computed: {
		...mapState({
			deviceOnline: state => state.deviceOnline,
			audioSrc: state => state.audioSrc
		})
	}
};
</script>

<style lang="less" scoped>
.age_recommend {
	width: 95%;
	margin-left: 5%;
	border-radius: 5px;
	height: 315px;
	margin-top: 15px;
	background: #ffffff;
	.age_recommend_item {
		width: 290px;
		height: 315px;
		background: #f6f6f6;
		border-radius: 6px;
		.age_recommend_item_head {
			padding-top: 12px;
			width: 94%;
			margin-left: 12px;
			height: 80px;
			display: flex;
			justify-content: space-between;
			.age_recommend_item_head_left {
				width: 140px;
				height: 66px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				img {
					width: 11px;
					height: 15px;
				}
				span {
					font-size: 16px;
					color: #333333;
					margin-left: 5px;
				}
				p {
					font-size: 13px;
					color: #bfbfbf;
					line-height: 28px;
				}
			}
			.age_recommend_item_head_right {
				width: 80px;
				height: 66px;
				position: relative;
				div:nth-child(1) {
					width: 48px;
					height: 48px;
					position: absolute;
					left: 31px;
					top: 11px;
					background-color: #cacdd1;
					border-radius: 4px;
					opacity: 0.2;
					z-index: 10;
				}
				div:nth-child(2) {
					width: 56px;
					height: 56px;
					background-color: #cacdd1;
					border-radius: 4px;
					opacity: 0.43;
					position: absolute;
					left: 17px;
					top: 6px;
					z-index: 20;
				}
				img {
					position: absolute;
					width: 66px;
					height: 66px;
					z-index: 30;
					border-radius: 4px;
				}
			}
		}
		.age_recommend_item_list_item {
			margin-top: 12px;
			width: 89%;
			margin-left: 12px;
			height: 30px;
			display: flex;
			justify-content: space-between;
			.age_recommend_item_list_item_left {
				width: 200px;
				font-size: 15px;
				color: #333333;
				display: flex;
				align-items: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				img {
					width: 12px;
					height: 12px;
				}
				p {
					margin-left: 8px;
					width: 200px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.selectInx {
					color: #4da6ff;
				}
			}
			.age_recommend_item_list_item_right {
				color: #999999;
				font-size: 12px;
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>
