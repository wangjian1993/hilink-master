<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="loading-box" v-if="!loadingFlag"><van-loading size="30px" color="#007DFF" vertical>加载中</van-loading></div>
		<div class="english-content" v-if="loadingFlag">
			<div class="content-box">
				<p class="content-title-zh">{{ $t('m.Englishs') }}</p>
				<p class="content-title-en">Children's song</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[104]">
							<div class="path-div" @click="cloudAlbum(item.id)">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="../../assets/images/xz.png" alt="" class="path-xz" v-if="item.id == albumid[0].album && !setCheck" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item1" @change="changeResult(item.id, 0)" :checked="index == 0" :value="item.id" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content-box">
				<p class="content-title-zh">{{ $t('m.picture') }}</p>
				<p class="content-title-en">Picture Book</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[105]">
							<div class="path-div" @click="cloudAlbum(item.id)">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="../../assets/images/xz.png" alt="" class="path-xz" v-if="item.id == albumid[1].album && !setCheck" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" name="item2" @change="changeResult(item.id, 1)" :checked="index == 0" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content-box">
				<p class="content-title-zh">{{ $t('m.Cartoons') }}</p>
				<p class="content-title-en">Cartoon</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[106]">
							<div class="path-div" @click="cloudAlbum(item.id)">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="../../assets/images/xz.png" alt="" class="path-xz" v-if="item.id == albumid[2].album && !setCheck" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item3" @change="changeResult(item.id, 2)" :value="item.id" :checked="index == 0" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content-box">
				<p class="content-title-zh">{{ $t('m.Phonetics') }}</p>
				<p class="content-title-en">Phonics</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[107]">
							<div class="path-div" @click="cloudAlbum(item.id)">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="../../assets/images/xz.png" alt="" class="path-xz" v-if="item.id == albumid[3].album && !setCheck" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item4" @change="changeResult(item.id, 3)" :value="item.id" :checked="index == 0" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="english-btn">
				<div @click="setEnglish()" :class="setCheck ? 'englishActive' : ''">{{ setCheck ? $t('m.Save') : $t('m.Settings') }}</div>
				<p>{{ $t('m.Select') }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			englishData: [],
			loadingFlag: false,
			musicList: [
				{
					id: 104,
					album: 1171
				},
				{
					id: 105,
					album: 1177
				},
				{
					id: 106,
					album: 1043
				},
				{
					id: 107,
					album: 1179
				}
			],
			setCheck: false,
			raidoCheack: 0,
			title: this.$t('m.Learning')
		};
	},
	computed: {
		...mapState(['albumid'])
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['englishBack'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					self.$toast({
						message: '启蒙英语设置成功',
						position: 'bottom',
						duration: '3000',
						className: 'toastActive'
					});
				}
			};
		}
	},
	created() {
		this.getEnglishData();
		this.devicesAction();
	},
	methods: {
		//获取歌曲资源
		getEnglishData() {
			let self = this;
			self.$axios.getEnglishData().then(function(res) {
				self.englishData = res.data.content;
				self.loadingFlag = true;
			});
		},
		//故事机播放模式
		devicesAction() {
			let self = this;
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 641
			};
			let json = JSON.stringify(body);
			let data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
		},
		changeResult(id, index) {
			let self = this;
			console.log('id===', id);
			self.musicList[index].album = id;
		},
		//设置默认歌曲
		setEnglish() {
			let self = this;
			self.setCheck = !self.setCheck;
			// self.englishAcitve =[];
			if (!self.setCheck) {
				var body = {
					from: 'DID:0',
					to: 'UID:-1',
					action: 637,
					list: self.musicList
				};
				let json = JSON.stringify(body);
				let data = { custom: { function: json, name: 'function' } };
				self.setDeviceSongsInfo(data, 'englishBack');
				self.$store.dispatch('setEnglishData', self.musicList);
				self.musicList = [];
			}
		},
		cloudAlbum(id) {
			if (!parseInt(id)) {
				return;
			}
			if (this.setCheck) {
				return;
			}
			this.$router.push({ name: 'cloudListenDetail', query: { id: id } });
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
.app {
	margin-top: 80px;
}
.english-content {
	margin-top: 16px;
}
.content-box {
	width: 92%;
	height: 100%;
	margin: 30px auto 0;
	.content-title-zh {
		font-size: 18px;
		color: #333333;
	}
	.content-title-en {
		font-size: 10px;
		color: #999;
	}
	.song-list {
		margin-top: 11px;
		ul {
			width: 100%;
			overflow-x: auto;
			white-space: nowrap;
			li {
				display: inline-block;
				width: 100px;
				margin-right: 10px;
				position: relative;
				.path-div {
					width: 100px;
					height: 100px;
					position: relative;
					.path-img {
						width: 100%;
						height: 100%;
					}
					.path-xz {
						width: 20px;
						height: 20px;
						position: absolute;
						bottom: 0px;
						right: 0px;
					}
				}
				p {
					color: #333333;
					padding-top: 8px;
					font-size: 12px;
					text-align: center;
					white-space: nowrap;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.song-check {
					position: absolute;
					bottom: 18px;
					right: 10px;
					// display: none;
				}

				input[type='radio'] {
					width: 20px;
					height: 20px;
					opacity: 0;
				}

				label {
					position: absolute;
					left: 5px;
					bottom: 10px;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					border: 1px solid #fff;
					background: #d2d2d2;
				}
				/*设置选中的input的样式*/
				/* + 是兄弟选择器,获取选中后的label元素*/
				input:checked + label {
					background-color: #f45a5a;
					border: 1px solid #fff;
				}

				input:checked + label::after {
					position: absolute;
					content: '';
					width: 5px;
					height: 10px;
					top: 3px;
					left: 6px;
					border: 2px solid #fff;
					border-top: none;
					border-left: none;
					transform: rotate(45deg);
				}
			}
		}
	}
}
.english-btn {
	width: 100%;
	text-align: center;
	margin-top: 40px;
	margin-bottom: 40px;
	div {
		width: 160px;
		height: 36px;
		line-height: 36px;
		margin: 0 auto;
		border-radius: 30px;
		border: solid 1px #f45a5a;
		font-size: 16px;
		color: #333;
	}
	p {
		font-size: 14px;
		color: #333333;
		padding-top: 10px;
	}
}
.english-btn div.englishActive {
	background: #f45a5a;
	color: #fff;
}
</style>
