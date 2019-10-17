<template>
	<div class="app">
		<div class="setting-list">
			<van-cell class="setting-cell" size="60px" title="设备名称" is-link :value="deviceName" @click="settingClick(0)" />
			<van-cell class="setting-cell" title="摆放位置" is-link :value="deviceRoomName" @click="settingClick(1)" />
			<van-cell title="设备信息" is-link value="" @click="settingClick(2)" />
			<van-cell title="设备网络信息" is-link value="" @click="settingClick(3)" />
			<van-cell title="删除设备" is-link value="" @click="settingClick(4)" />
			<van-cell title="快捷方式" is-link value="" @click="settingClick(5)" />
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
			<van-popup class="devNameBox" v-model="show" round position="bottom" :style="{ width: '98%' }">
				<div class="dev-name-box">
					<div class="dev-name"><p>设备名称</p></div>
					<div class="dev-input">
						<van-radio-group v-model="radio">
						  <van-cell-group>
						    <van-cell title="单选框 1" clickable @click="radio = '1'">
						      <van-radio slot="right-icon" name="1" />
						    </van-cell>
						    <van-cell title="单选框 2" clickable @click="radio = '2'">
						      <van-radio slot="right-icon" name="2" />
						    </van-cell>
						  </van-cell-group>
						</van-radio-group>
					</div>
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
			deviceName: null,
			name: null,
			message: '',
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
			window['infoResultCallback'] = resultStr => {
				console.log('设备信息====', resultStr);
			};
		}
	},
	created() {
		this.deviceName = this.devName.devName;
		this.deviceRoomName = this.devName.roomName;
	},
	methods: {
		settingClick(type) {
			switch (type) {
				case 0:
					this.show = true;
					this.$nextTick(() => {
						this.$refs.deviceInput.focus();
					});
					// window.hilink.modifyDeviceName(
					// 	'我是火火兔', // deviceName,String,修改的设备名称字段
					// 	'NameResultCallback' //resultCallback，成功或失败时，将调用传入resultStr返回结果
					// );
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
	.setting-cell {
	}
}
.devNameBox {
	margin: 0 auto;
	position: fixed;
	left: 0;
	right: 0;
	padding-bottom: 30px;
	.dev-name-box {
		width: 80%;
		margin: 0 auto;
		.dev-name {
			font-size: 18px;
			padding: 20px 0 10px 0;
		}
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
