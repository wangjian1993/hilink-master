<template>
  <div class="app">
    <van-tabs v-model="active" color="#4da6ff" @change="getAgeData" sticky>
      <van-tab title="0-1岁">
        <music-list :items="ageData" name="2760"></music-list>
      </van-tab>
      <van-tab title="1-2岁">
        <music-list :items="ageData" name="2761"></music-list>
      </van-tab>
      <van-tab title="2-3岁">
        <music-list :items="ageData" name="2762"></music-list>
      </van-tab>
      <van-tab title="3-4岁">
        <music-list :items="ageData" name="2763"></music-list>
      </van-tab>
      <van-tab title="4-5岁">
        <music-list :items="ageData" name="2764"></music-list>
      </van-tab>
      <van-tab title="5-6岁">
        <music-list :items="ageData" name="2765"></music-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import musicList from "../../components/musicList.vue";
export default {
  data() {
    return {
      active:0,
      ageData:[]
    };
  },
  created(){
    document.title = "分龄推荐"
    this.getAgeData(0)
     if (window._czc) {
        console.log("分龄推荐模块模块模块模块模块模块模块");
        window._czc.push(["_trackEvent", localStorage.getItem("deviceType")+"-"+"分龄推荐模块", "点击", "总计"]);
      }
  },
  methods: {
    //获取分龄儿童数据
    getAgeData(name, title) {
      this.$axios.getSpecialInfo(name + 2760).then(res => {
        res.data.content.musicList.forEach((v, i) => {
          let s = (parseInt(v.timelength % 60) + "").padStart(2, "0");
          let m = (parseInt(v.timelength / 60) + "").padStart(2, "0");
          v.timelengths = m + ":" + s;
        });
        this.ageData = res.data.content.musicList;
      });
    }
  },
  components: {
    musicList
  },
   beforeRouteLeave(to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
   
    // this.audio.pause();
     this.$destroy(true)
    next();
  },
};
</script>
<style lang="less" scoped>
.app{
	padding-top: 80px;
	margin-bottom: 80px;
	background: #fff;
}
</style>