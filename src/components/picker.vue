<template>
	<div class="date-time-input-wrap">
		<div class="date-time-div">
			<van-popup v-model="timePopup" position="bottom" :overlay="true" class="datetimeBox" :close-on-click-overlay="false">
				<p>定时关机</p>
				<van-datetime-picker v-model="currentTime" type="time" :min-hour="0" :max-hour="23" :show-toolbar="false" :formatter="formatter" @change="Change"/>
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
			currentTime: '0:00'
		};
	},
	computed: {
		
	},
	created() {
		
	},
	methods: {
		/* 取消按钮 */
		timeCancel() {
			this.$emit('update:timePopup', false)  //弹框隐藏，意为timePopup为false
		},
		timeConfirm() {
			console.log(this.currentTime);
			this.$emit('update:timePopup', false)  //弹框隐藏，意为timePopup为false
		},
		Change(){
			// let self =this;
			// let time =self.currentTime.split(":");
			// let m =time[0].replace(/\b(0+)/gi,"");
			// self.currentTime = "2小时:00"
		},
		formatter(type, value) {
			if (type === 'hour') {
				if(value == '00'){
					let m =0;
					return `${m}`;
				}
				let m =value.replace(/\b(0+)/gi,"");
				return `${m}`;
			} else if (type === 'minute') {
				if(value == '00'){
					let m =0;
					return `${m}`;
				}
				let m =value.replace(/\b(0+)/gi,"");
				return `${m}`;
			}
			return value;
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
