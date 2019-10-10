<template>
	<div class="app">
		<div class="english-content">
			<div class="content-box">
				<p class="content-title-zh">英文儿歌</p>
				<p class="content-title-en">Children's song</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[104]">
							<div class="path-div">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="img/j7/xz.png" alt="" class="path-xz" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item1" @change="changeResult(item.id, 0)" :value="item.id" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content-box">
				<p class="content-title-zh">英文绘本</p>
				<p class="content-title-en">Picture Book</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[105]">
							<div class="path-div">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="img/j7/xz.png" alt="" class="path-xz" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item2" @change="changeResult(item.id, 1)" :value="item.id" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content-box">
				<p class="content-title-zh">原声动画</p>
				<p class="content-title-en">Cartoon</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[106]">
							<div class="path-div">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="img/j7/xz.png" alt="" class="path-xz" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item3" @change="changeResult(item.id, 2)" :value="item.id" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content-box">
				<p class="content-title-zh">自然拼读</p>
				<p class="content-title-en">Phonics</p>
				<div class="song-list">
					<ul class="song">
						<li v-for="(item, index) in englishData[107]">
							<div class="path-div">
								<img :src="item.coverpath" alt="" class="path-img" />
								<img src="img/j7/xz.png" alt="" class="path-xz" />
							</div>
							<p>{{ item.name }}</p>
							<div class="song-check" v-show="setCheck">
								<input type="radio" :id="item.id" name="item4" @change="changeResult(item.id, 3)" :value="item.id" />
								<label :for="item.id"></label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="english-btn">
				<div @click="setEnglish()" :class="setCheck ? 'englishActive' : ''">{{ setCheck ? '保存' : '设置' }}</div>
				<p>设置英语点播内容，点击机器人上英语键(图标)播放</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '英语启蒙',
			englishData: [],
			musicList: {
				'0': {
					album: 104,
					id: ''
				},
				'1': {
					album: 105,
					id: ''
				},
				'2': {
					album: 106,
					id: ''
				},
				'3': {
					album: 107,
					id: ''
				}
			},
			setCheck: false
		};
	},
	created() {
		this.getEnglishData();
	},
	methods: {
		//获取歌曲资源
		getEnglishData() {
			let self = this;
			self.$axios.getEnglishData().then(function(res) {
				self.englishData = res.data.content;
			});
		},
		changeResult(id,index){
			let self =this;
			self.musicList[index].id=id;
		},
		//设置默认歌曲
		setEnglish() {
			let self = this;
			self.setCheck = !self.setCheck;
			if (!self.setCheck) {
				console.log(self.musicList)
			}
		}
	},
	components: {}
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
			display: flex;
			overflow-x: auto;
			li {
				width: 100px;
				margin-right: 10px;
				position: relative;
				.path-div {
					width: 100px;
					height: 100px;
					.path-img {
						width: 100%;
						height: 100%;
					}
				}
				p {
					color: #333333;
					padding-top: 8px;
					font-size: 12px;
					text-align: center;
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
					top: 3px;
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
