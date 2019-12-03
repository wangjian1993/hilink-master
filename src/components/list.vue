<template>
	<div class="app">
		<!-- width=165px -->
		<div v-if="size == '165'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore" class="more_box">
					更多
					<img src="../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="content">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="goAudio(item.id)" :key="index">
					<div class="list-img">
						<img v-lazy="item.pic != undefined ? item.pic : item.coverpath" alt class="list-pic" />
						<p>
							<span>
								<img src="../assets/images/home_icon_yinyue.png" alt />
								{{ item.musicCount }}首
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.description }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
		<!-- width=105px -->
		<div v-if="size == '105'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore">
					更多
					<img src="../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="content1">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="goAudio(item.id)" :key="index">
					<div class="list-img">
						<img v-lazy="item.pic != undefined ? item.pic : item.coverpath" alt class="list-pic" />
						<p>
							<span>
								<img src="../assets/images/home_icon_yinyue.png" alt />
								{{ item.musicCount }}首
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.description }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
		<!-- width= 163;height:94px -->
		<div v-if="size == '163'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore">
					更多
					<img src="../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="content2">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="goAudio(item.id)">
					<div class="list-img">
						<img v-lazy="item.pic != undefined ? item.pic : item.coverpath" alt class="list-pic" />
						<p>
							<span>
								<img src="../assets/images/home_icon_yinyue.png" alt />
								{{ item.musicCount }}首
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.description }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
		<!-- width=348px -->
		<div v-if="size == '348'">
			<div class="title">
				<p class="main-name">{{ name }}</p>
				<div @click="goMore" v-show="isShowMore">
					更多
					<img src="../assets/images/more.png" class="more" alt />
				</div>
			</div>
			<div class="picture_content" @click="goAudio(2769)">
				<div class="picture_list">
					<img src="../assets/images/babySafe.png" alt class="list_bigPic" />
					<div class="special">精品</div>
					<div class="number">
						<img src="../assets/images/icon_huiben.png" alt />
						17
					</div>
				</div>
				<p>【专辑】{{ item.length ? item[0].name : '' }}</p>
				<div>
					<span>{{ item[0].title[0] }}</span>
					<span>{{ item[0].title[1] }}</span>
					<span>{{ item[0].title[2] }}</span>
				</div>
			</div>
			<div class="content1">
				<div class="content-list" v-for="(item, index) in item" v-if="index < num" @click="goAudio(item.id)" :key="index">
					<div class="list-img">
						<img v-lazy="item.pic != undefined ? item.pic : item.coverpath" alt class="list-pic" />
						<p>
							<span>
								<img src="../assets/images/home_icon_yinyue.png" alt />
								{{ item.musicCount }}首
							</span>
						</p>
					</div>
					<span class="list-name">{{ item.name }}</span>
					<p>{{ item.description }}</p>
				</div>
				<div class="more-box" v-if="isMore">
					<p>{{ moreText }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			titles: [], //安全模块 标签
			safeData: [] //安全模块数据
		};
	},
	props: {
		name: '',
		num: '',
		item: {
			type: Array
		},
		title: '',
		isMore: false,
		moreText: '正在加载中...',
		size: '',
		isShowMore: false
	},
	mounted() {},

	methods: {
		goAudio(id) {
			this.$router.push({
				name: 'albumDetail',
				query: {
					id: id
				}
			});
		},
		goMore() {
			this.$router.push({
				name: 'albumList',
				query: {
					name: this.name
				}
			});
		}
	},
	components: {}
};
</script>
<style lang="less" scoped>
.app {
	margin: 0.813rem 0;
	.title {
		width: 92%;
		margin: 0 auto;
		display: flex;
		font-size: 13px;
		color: #999999;
		align-items: center;

		justify-content: space-between;

		.main-name {
			font-size: 20px;
			color: #222222;
			font-weight: 700;
		}
		.sub-name {
			font-size: 0.32rem;
			color: #666666;
		}
		.more_box {
		}
	}
	.content {
		width: 92%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.content-list {
			width: 160px;
			margin-top: 20px;
			.list-img {
				width: 160px;
				height: 150px;
				text-align: center;
				position: relative;
				margin: 0 auto;
				overflow: hidden;
				border-radius: 0.2rem;
				.list-pic {
					width: 100%;
					height: 100%;
					display: block;
					z-index: 200;
					border-radius: 0.2rem;
				}
				p {
					width: 100%;
					height: 0.8rem;
					position: absolute;
					bottom: -5px;
					background: url('../assets/images/home_mokuai_bg.png') no-repeat;
					background-size: 100%;
					z-index: 300;
					span {
						height: 0.8rem;
						line-height: 0.8rem;
						display: flex;
						color: #fff;
						img {
							margin-top: 0.2rem;
							margin-left: 0.4rem;
							margin-right: 0.3rem;
							width: 0.4rem;
							height: 0.4rem;
						}
					}
				}
			}
			.list-name {
				display: block;
				width: 165px;
				margin: 0.15rem auto;
				font-size: 14px;
				color: #000;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				width: 165px;
				margin: 0rem auto;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				font-size: 12px;
				color: #aaaaaa;
			}
		}
		.more-box {
			width: 92%;
			margin: 0 auto;
			text-align: center;
			p {
				padding: 0.5rem 0;
			}
		}
	}
	.content1 {
		width: 92%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.content-list {
			width: 105px;
			margin-top: 20px;
			.list-img {
				width: 105px;
				height: 106px;
				text-align: center;
				position: relative;
				overflow: hidden;
				border-radius: 0.2rem;
				.list-pic {
					width: 100%;
					height: 100%;
					display: block;
					z-index: 200;
					border-radius: 0.2rem;
				}
				p {
					width: 100%;
					height: 0.8rem;
					position: absolute;
					bottom: -5px;
					background: url('../assets/images/home_mokuai_bg.png') no-repeat;
					background-size: 100%;
					z-index: 300;
					span {
						height: 0.8rem;
						line-height: 0.8rem;
						display: flex;
						color: #fff;
						img {
							margin-top: 0.2rem;
							margin-left: 0.4rem;
							margin-right: 0.3rem;
							width: 0.4rem;
							height: 0.4rem;
						}
					}
				}
			}
			.list-name {
				display: block;
				width: 105px;
				margin: 0.15rem auto;
				font-size: 14px;
				color: #000;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				width: 105px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12px;

				color: #aaaaaa;
			}
		}
		.more-box {
			width: 92%;
			margin: 0 auto;
			text-align: center;
			p {
				padding: 0.5rem 0;
			}
		}
	}
	.content2 {
		width: 92%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.content-list {
			flex: 2;
			margin-top: 20px;
			.list-img {
				width: 160px;
				height: 94px;
				text-align: center;
				position: relative;
				overflow: hidden;
				margin: 0 auto;
				border-radius: 0.2rem;
				.list-pic {
					width: 100%;
					height: 100%;
					display: block;
					z-index: 200;
					margin: 0 auto;
					border-radius: 0.2rem;
				}
				p {
					width: 100%;
					height: 0.8rem;
					position: absolute;
					bottom: -5px;

					background: url('../assets/images/home_mokuai_bg.png') no-repeat;
					background-size: 100%;
					z-index: 300;
					span {
						height: 0.8rem;
						line-height: 0.8rem;
						display: flex;
						color: #fff;
						img {
							margin-top: 0.2rem;
							margin-left: 0.4rem;
							margin-right: 0.3rem;
							width: 0.4rem;
							height: 0.4rem;
						}
					}
				}
			}
			.list-name {
				display: block;
				width: 163px;
				margin: 0.15rem auto;
				font-size: 14px;
				color: #000;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				width: 163px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12px;
				color: #aaaaaa;
			}
		}
		.more-box {
			width: 92%;
			margin: 0 auto;
			text-align: center;
			p {
				padding: 0.5rem 0;
			}
		}
	}
	.more {
		width: 20px;
		height: 20px;
		margin-left: -5px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
}
.picture_content {
	width: 92%;
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	margin-top: 10px;
	font-size: 16px;
	color: #333333;
	.picture_list {
		width: 100%;
		height: 151px;
		border-radius: 5px;
		position: relative;
	}
	p {
		color: #333333;
		font-size: 16px;
		margin-top: 10px;
		line-height: 16px;
	}
	span {
		color: #aaaaaa;
		font-size: 11px;
		margin-top: 12px;
		height: 21px;
		margin: 10px 0;
		// background-color: #f2f2f2;
		border-radius: 10px;
		padding: 5px 9px;
	}
}
.list_bigPic {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border-radius: 5px;
}
.special {
	position: absolute;
	right: 0;
	top: 0;
	width: 46px;
	height: 23px;
	background-color: #ff6666;
	border-radius: 0px 5px 0px 5px;
	color: #ffffff;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.number {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 46px;
	height: 21px;
	background-color: #000000;
	opacity: 0.5;
	border-radius: 0px 5px 0px 5px;
	font-size: 11px;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 9px;
		height: 8px;
		margin-right: 5px;
	}
}
</style>
