<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="help-content">
			<p>当出现“设备离线”提示时，可能因为当前网络环境较差或设备断电导致。</p>
			<p>请尝试以下操作：<br></p>
			<p>1.设备是否已接通电源，并开机启动；</p>
			<p>2.Wi-Fi网络连接是否正常</p>
			<p>3.尝试断电重启设备；</p>
			<p>4.检查完毕但还是无法恢复，请尝试<span>重置设备</span></p>
		</div>
		<div class="reset-btn">
			<p>刷新并返回</p>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header.vue';
export default {
	data() {
		return {
			title:"离线帮助"
		};
	},
	methods: {
		
	},
	components: {
		"v-header":Header
	}
};
</script>

<style lang="less" scoped>
.app{
	height: 100%;
	position: relative;
}
.help-content{
	width: 312px;
	margin: 28px auto;
	font-size: 16px;
	color:#1A1A1A;
	p{
		&:nth-of-type(2){
			margin-top: 24px;	
		}
		span{
			color: #007DFF;
		}
	}
}
.reset-btn{
	width: 100%;
	text-align:center;
	position:fixed;
	bottom:24px;
	p{
		width: 180px;
		font-size: 16px;
		height: 36px;
		line-height: 36px;
		margin: 0 auto;
		color: #007DFF;
		font-weight: 600;
		background: rgba(0,0,0,0.05);
		border-radius: 18px;
	}
}
</style>
