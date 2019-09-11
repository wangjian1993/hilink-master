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
<style></style>
