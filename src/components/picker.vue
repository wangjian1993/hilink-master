<template>
	<div class="date-time-input-wrap">
		<div class="date-time-div">
			<van-popup v-model="timePopup" position="bottom" :overlay="true" class="datetimeBox" :close-on-click-overlay="false">
				<p>定时关机</p>
				<!-- <van-datetime-picker v-model="currentTime" type="time" :min-hour="0" :max-hour="23" :show-toolbar="false" :formatter="formatter" @change="Change"/> -->
				<van-picker show-toolbar :columns="columns" :show-toolbar="false" @change="onChange"/>
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
			// timePopup: false,
			currentTime: '0:00',
			endTime: null,
			columns: ['15分钟', '30分钟', '60分钟', '90分钟', '120分钟']
		};
	},
	computed: {},
	created() {},
	methods: {
		/* 取消按钮 */
		timeCancel() {
			this.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
		},
		timeConfirm() {
			let self = this;
			if (self.endTime == 0) {
				return false;
			}
			console.log('this.endTime========', self.endTime);
			self.$emit('update:timePopup', false); //弹框隐藏，意为timePopup为false
			let data = { timedTask: { time: self.endTime, enable: 1, name: 'timedTask' } };
			console.log('data======', data);
			self.setDeviceInfo(data);
		},
		onChange(picker, values) {
			console.log("values",values)
			let time =values.split("分钟");
			this.endTime =time[0]
		}
		// formatter(type, value) {
		// 	if (type === 'hour') {
		// 		if(value == '00'){
		// 			let m =0;
		// 			return `${m}`;
		// 		}
		// 		let m =value.replace(/\b(0+)/gi,"");
		// 		return `${m}` + '小时';
		// 	} else if (type === 'minute') {
		// 		if(value == '00'){
		// 			let m =0;
		// 			return `${m}`;
		// 		}
		// 		let m =value.replace(/\b(0+)/gi,"");
		// 		return `${m}` + '分钟';
		// 	}
		// 	return value;
		// }
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
