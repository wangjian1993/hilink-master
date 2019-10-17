<template>
	<div class="date-time-input-wrap">
		<div class="date-time-div">
			<van-popup v-model="timePopup" position="bottom" :overlay="true" class="datetimeBox" :close-on-click-overlay="true">
				<p>定时关机</p>
				<van-picker show-toolbar :columns="columns" :show-toolbar="false" @change="onChange" />
				<div class="datetime-btn">
					<p @click="timeCancel()">取消</p>
					<p @click="timeConfirm()">确定</p>
				</div>
			</van-popup>
		</div>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
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
			endTime: 0,
			columns: ['关', '15分钟', '30分钟', '60分钟', '90分钟', '120分钟']
		};
	},
	mounted() {
		let self = this;
		if (window.hilink != undefined) {
			window['deviceTimeCallBack'] = resultStr => {
				let data =self.praseResponseData(resultStr)
				if (data.errcode == 0) {
					self.getDevicesTime();
				}
			};
		}
	},
	computed: {},
	created() {},
	methods: {
		/* 取消按钮 */
		timeCancel() {
			this.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
		},
		timeCalculate(nub) {
			var date = new Date();
			//2. 获取当前分钟
			let min = date.getMinutes();
			console.log('min=======', min);
			//3. 设置当前时间+5分钟：把当前分钟数+5后的值重新设置为date对象的分钟数
			let d = date.setMinutes(min + parseInt(nub));
			console.log('timeDate20000=====', this.timestampToTime(d));
			let timeDate = parseInt(d.toString().slice(0, 10));
			console.log('timeDate=====', this.timestampToTime(timeDate));
			return timeDate;
		},
		timeConfirm() {
			let self = this;
			if (self.endTime == 0) {
				self.delDevicesTime();
				self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
				return false;
			}
			self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
			let time = self.timeCalculate(self.endTime);
			console.log('timeDate2222=====', this.timestampToTime(time));
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
			console.log('data======', data);
			self.setDeviceSongsInfo(data, 'deviceTimeCallBack');
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
		},
		delDevicesTime() {
			let self = this;
			var body = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 631,
				type: 4,
				doaction: 'clear'
			};
			var json = JSON.stringify(body);
			var data = { custom: { function: json, name: 'function' } };
			self.$store.dispatch('setDevInfo', data);
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
<style lang="less">
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
			}
		}
	}
}
.van-picker-column__item--selected {
	color: #007dff;
}
</style>
