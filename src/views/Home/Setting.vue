<template>
	<div class="app">
		<div class="setting-list">
			<van-cell class="setting-cell" size="60px" title="设备名称" is-link :value="deviceName" @click="settingClick(0)" />
			<van-cell class="setting-cell" title="摆放位置" is-link :value="deviceRoomName" @click="settingClick(1)" />
			<van-cell title="设备信息" is-link value="" @click="settingClick(2)" />
			<van-cell title="设备网络信息" is-link value="" @click="settingClick(3)" />
			<van-cell title="删除设备" is-link value="" @click="settingClick(4)" />
			<!-- <van-cell title="快捷方式" is-link value="" @click="settingClick(5)" /> -->
		</div>
		<div class="input-model">
			<van-popup class="devNameBox" v-model="show" round position="bottom" :style="{ width: '98%' }">
				<div class="dev-name-box">
					<div class="dev-name"><p>设备名称</p></div>
					<div class="dev-input"><input type="text" :value="deviceName" ref="deviceInput" @input="inputFun" /></div>
					<div class="dev-btn">
						<p @click="devNameCancel()">取消</p>
						<p @click="devNameAffirm()">确定</p>
					</div>
				</div>
			</van-popup>
			<van-popup class="devNameBox" v-model="delShow" round position="bottom" :style="{ width: '98%' }">
				<div class="dev-del-box">
					<div class="dev-name"><p>删除设备</p></div>
					<div class="dev-content"><p>此操作会清除手机和智能家居云中有关该设备的所有数据。设备删除后，若再次使用，请重新添加</p></div>
					<div class="dev-btn">
						<p @click="delCancel()">取消</p>
						<p @click="delAffirm()">确定</p>
					</div>
				</div>
			</van-popup>
			<van-popup class="devNameBox" v-model="roomShow" round position="bottom" :style="{ width: '98%', height: '50%' }">
				<div class="dev-room-box">
					<div class="dev-name"><p>摆放位置</p></div>
					<div class="dev-radio">
						<van-radio-group v-model="radioActive">
							<van-cell-group>
								<van-cell v-for="(item, index) in radioArray" :title="item" clickable>
									<van-radio label-disabled slot="right-icon" :name="index" @click="roomClick(index)" />
								</van-cell>
							</van-cell-group>
						</van-radio-group>
					</div>
					<div class="room-btn" @click="roomCancel()"><p>取消</p></div>
				</div>
			</van-popup>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			title: '',
			show: false,
			roomShow: false,
			delShow:false,
			deviceName: null,
			name: null,
			message: '',
			radioActive: 0,
			radioArray: ['客厅', '主卧', '卧室', '次卧', '书房', '客房', '餐厅', '厨房', '浴室', '卫生间', '玄关', '走廊', '天台', '阳台', '默认房间'],
			deviceRoomName: null,
			docmHeight: '0', //默认屏幕高度
			showHeight: '0', //实时屏幕高度
			hidshow: true, //显示或者隐藏footer,
			isResize: false //默认屏幕高度是否已获取
		};
	},
	computed: {
		...mapState(['devName'])
	},
	mounted() {
		var self = this;
		if (window.hilink != undefined) {
			window['wifiResultCallback'] = resultStr => {
				console.log('设备网络信息====', resultStr);
			};
			window['settingResultCallback'] = resultStr => {
				console.log('设备网络信息====', resultStr);
			};
			window['NameResultCallback'] = resultStr => {
				console.log('设备名称信息====', resultStr);
				let json = JSON.parse(resultStr);
				if (json.errcode === 0) {
					this.deviceName = this.dName;
					this.dName = '';
				}
			};
			window['roomResultCallback'] = resultStr => {
				let json = JSON.parse(resultStr);
				console.log('设置摆放位置');
				if (json.errcode === 0) {
					// this.deviceRoomName = this.radioActive;
				}
			};
			window['delResultCallback'] = resultStr => {
				let json = JSON.parse(resultStr);
				console.log('设置删除');
				if (json.errcode === 0) {
					// this.deviceRoomName = this.radioActive;
				}
			};
			window['infoResultCallback'] = resultStr => {
				console.log('设备信息====', resultStr);
			};
		}
	},
	created() {
		let self = this;
		this.deviceName = this.devName.devName;
		this.deviceRoomName = this.devName.roomName;
		this.radioArray.forEach(function(item, index) {
			if (item == self.devName.roomName) {
				self.radioActive = index;
			}
		});
	},
	methods: {
		settingClick(type) {
			switch (type) {
				case 0:
					this.show = true;
					this.$nextTick(() => {
						this.$refs.deviceInput.focus();
					});
					break;
				case 1:
					this.roomShow = true;
					break;
				case 2:
					window.hilink.jumpTo(
						'com.huawei.smarthome.deviceinfoactivity', // uri,String, 跳转到设备信息页面的uri
						'settingResultCallback' //resultCallback，成功或失败时，将调用传入resultStr返回结果
					);
					break;
				case 3:
					window.hilink.jumpTo(
						'com.huawei.smarthome.deviceNetinfoActivity', // uri,String, 跳转到设备信息页面的uri
						'wifiResultCallback' //resultCallback，成功或失败时，将调用传入resultStr返回结果
					);
					break;
				case 4:
					this.delShow=true;
					break;
				default:
					break;
			}
		},
		inputFun(e) {
			this.dName = e.target.value;
		},
		devNameCancel() {
			this.show = false;
		},
		roomCancel() {
			this.roomShow = false;
		},
		delCancel(){
			this.delShow = false;
		},
		delAffirm(){
			this.delShow = false;
			window.hilink.deleteDevice (
			true,	// isAssociate,boolean, 是否删除设备下挂关联设备，目前只有桥设备用到
			    "delResultCallback"  //resultCallback，成功或失败时，将调用传入resultStr返回结果
			);
		},
		roomClick(index) {
			let self = this;
			self.roomShow = false;
			let room = self.radioArray[index];
			console.log('room', room);
			self.deviceRoomName = self.radioArray[index];
			window.hilink.modifyDeviceRoomName(
				room, // chooseRoomString,String, 修改的设备摆放位置信息的字段
				'roomResultCallback' //resultCallback，成功或失败时，将调用传入resultStr返回结果
			);
		},
		devNameAffirm() {
			this.show = false;
			if (this.dName == this.deviceName) {
				return;
			} else {
				let name = this.dName;
				window.hilink.modifyDeviceName(
					name, // deviceName,String,修改的设备名称字段
					'NameResultCallback' //resultCallback，成功或失败时，将调用传入resultStr返回结果
				);
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.app {
	margin-top: 70px;
}
.devNameBox {
	margin: 0 auto;
	position: fixed;
	left: 0;
	right: 0;
	padding-bottom: 50px;
	padding-top: 50px;
	.dev-del-box{
		width: 80%;
		margin: 0 auto;
		.dev-name{
			width: 98%;
			p{
				font-size: 16px;
			}
		}
		.dev-content{
			width: 98%;
			p{
				font-size: 16px;
			}
		}
		.dev-btn {
			width: 100%;
			display: flex;
			margin-top: 20px;
			p {
				flex: 2;
				text-align: center;
				font-size: 16px;
			}
		}
	}
	.dev-room-box {
		width: 100%;
		margin: 0 auto;
		.dev-name {
			width: 98%;
			position: fixed;
			top: 50%;
			background: #fff;
			z-index: 3000;
			border-radius: 19px;
			p {
				height: 50px;
				line-height: 50px;
				font-size: 16px;
				text-align: left;
				margin: 0 auto;
				padding: 0 16px;
			}
		}
		.room-btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			background: #fff;
			p {
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 16px;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
	.dev-name-box {
		width: 80%;
		margin: 0 auto;
		.dev-input {
			width: 100%;
			margin: 0 auto;
			input {
				width: 100%;
				border: none;
				border-bottom: 1px #000000 solid;
				font-size: 16px;
				padding: 5px 0;
			}
		}
		.dev-radio {
			width: 100%;
		}
		.dev-btn {
			width: 100%;
			display: flex;
			margin-top: 20px;
			p {
				flex: 2;
				text-align: center;
				font-size: 16px;
			}
		}
	}
}
</style>
