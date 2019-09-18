<template>
	<div class="playBox">
		<div class="play-img"><img src="../assets/images/J6J6.png" alt="" /></div>
		<div class="play-text">
			<marquee class="songstitle" direction="left" behavior="scroll" scrollamount="2" scrolldelay="0" loop="-1" width="100%" height="100%">
				故事机离线
			</marquee>
		</div>
		<div class="play-btn">
			<p @click="deviceClick(5)"><img src="../assets/images/icon_device_pre.png" alt="" /></p>

			<p @click="devicePlay(songsList.status)">
				<img src="../assets/images/icon_device_play.png" alt="" />
				<!-- <img v-else-if="songsList.status == 'pause'" src="../assets/images/icon_device_pause.png" alt="" />
				<img v-else="songsList.status == ''" src="../assets/images/icon_device_pause.png" alt="" /> -->
			</p>
			<p @click="deviceClick(4)"><img src="../assets/images/icon_device_next.png" alt="" /></p>

			<p @click="deviceLoop(songsList.playmode)">
				<img src="../assets/images/icon_device_one.png" alt="" />
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang='less' scoped>
.playBox {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 9000;
  display: flex;
  .play-img {
    width:18%;
	display:flex;
	align-items: center;
	justify-content: center;
    img {
      width: 42px;
      height: 42px;
      display: block;
    }
  }
  .play-text {
    width:32%;
	line-height: 60px;
	font-size: 14px;
	margin-right: 10px;
  }
  .play-btn {
	width:50%;
    display: flex;
	p{
		flex: 4;
		display: flex;
		align-items:center;
		justify-content: center;
		img{
			/* margin: 0 auto; */
			width: 24px;
			height: 24px;
		}
	}
  }
}
</style>
