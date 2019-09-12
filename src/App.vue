<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  created() {
	  /**隐藏顶部导航 */
	 window.hilink.setTitleVisible(false,"titleVisibleCallback");
  },
  mounted() {
    window["titleVisibleCallback"] = resultStr => {
      console.log("导航回调函数====", resultStr);
    };
  }
};
</script>
<style>
	@font-face {
		font-family: 'hwtext-zh';
		src: url('assets/font/zh/HuaweiFont-Regular.ttf');
	}
	@font-face {
		font-family: 'hwtext-en';
		src: url('assets/font/en/HuaweiSans-Regular.ttf');
	}
	body{
		background: #F7F7F7;
	}
	html {
		font-family: "hwtext-zh","hwtext-en",Helvetica, STHeiTi, Arial, sans-serif;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		font-size: 62.5%;
		background:#F7F7F7;
	}
</style>
