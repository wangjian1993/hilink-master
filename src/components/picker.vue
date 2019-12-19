<template>
	<div class="date-time-input-wrap">
		<div class="date-time-div">
			<van-popup v-model="timePopup" position="bottom" :overlay="false" class="datetimeBox">
				<p>{{ $t('m.timer') }}</p>
				<van-picker :columns="columns" :show-toolbar="false" @change="onChange" :item-height="36"/>
				<div class="datetime-btn">
					<p @click="timeCancel()" :class="deviceTime != 0 ? 'cancelText' : ''">{{ deviceTime == 0 ? $t('m.CANCEL') : $t('m.Disable') }}</p>
					<p @click="timeConfirm()">{{ $t('m.OK') }}</p>
				</div>
			</van-popup>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { _debounce } from '@/hilink/public';
export default {
	props: {
		timePopup: {
			type: Boolean
		}
	},
	data() {
		return {
			// timePopup:false,
			currentTime: '0:00',
			endTime: 15,
			setTime: false,
			columns: [this.$t('m.min1'), this.$t('m.min2'), this.$t('m.min3'), this.$t('m.min4'), this.$t('m.min5')]
		};
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['deviceTimeCallBack'] = resultStr => {
				let data = self.praseResponseData(resultStr);
				if (data.errcode == 0) {
					console.log('设定');
					self.getDevicesTime();
				}
			};
		}
	},
	computed: {
		...mapState(['loadingFlag', 'deviceTime'])
	},
	created() {},
	methods: {
		/* 取消按钮 */
		timeCancel() {
			let self = this;
			if (self.deviceTime == 0) {
				self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
			} else {
				self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
				self.delDevicesTime(); 
				return false;
			}
		},
		timeCalculate(nub) {
			var date = new Date();
			//2. 获取当前分钟
			let min = date.getMinutes();
			let d = date.setMinutes(min + parseInt(nub));
			// let d = date.setMinutes(min + parseInt(1));
			let timeDate = parseInt(d.toString().slice(0, 10));
			return timeDate;
		},
		timeConfirm: _debounce(function() {
			let self = this;
			if (!self.loadingFlag) {
				return;
			}
			console.log('self.endTime', self.endTime);
			if (self.endTime == 0) {
				self.delDevicesTime();
				self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
				return false;
			}
			self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
			let time = self.timeCalculate(self.endTime);
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 631,
				timestamp: time,
				timerid: time.toString(),
				type: 4,
				doaction: '{"action":624}'
			};
			var json = JSON.stringify(body);
			var data = { custom: { function: json, name: 'function' } };
			self.setDeviceSongsInfo(data, 'deviceTimeCallBack');
			self.setTime = true;
			self.$store.dispatch('setLoadingFlag', false);
			this.$store.dispatch('isTimePopu', true);
		}, 400),
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
		},
		delDevicesTime() {
			let self = this;
			console.log('关闭定时关机==========');
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 631,
				type: 4,
				doaction: 'clear'
			};
			var json = JSON.stringify(body);
			var data = { custom: { function: json, name: 'function' } };
			self.setDeviceSongsInfo(data, 'deviceTimeCallBack');
			self.$store.dispatch('isTimePopu', false);
		},
		getDevicesTime() {
			let self = this;
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 631,
				type: 4,
				doaction: 'query'
			};
			var json = JSON.stringify(body);
			var data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
		},
		timestampToTime(timestamp) {
			var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		},
		onChange(picker, values) {
			console.log('values', values);
			let time = values.split('分钟');
			this.endTime = time[0];
		}
	}
};
</script>
<style lang="less" scoped>
.date-time-input-wrap {
	width: 100%;
	text-align: center;
	.date-time-div {
		width: 328px;
		margin: 16px auto;
		text-align: left;
		.datetimeBox {
			width: 328px;
			border-radius: 16px;
			margin: 16px auto;
			left: 0;
			right: 0;
			p {
				width: 280px;
				margin: 14px auto;
				font-size: 20px;
				color: #000000;
			}
		}
		.datetime-btn {
			width: 100%;
			display: flex;
			p {
				flex: 2;
				text-align: center;
				font-size: 16px;
				color: #007dff;
				&:nth-of-type(1){
					border-right: .5px solid;
					border-color: rgba(0, 0, 0,.2)
				}
			}
			.cancelText {
				color: #fa2a2d;
			}
		}
	}
}
</style>
