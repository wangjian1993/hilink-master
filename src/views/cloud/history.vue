<template>
  <div>
    <music-list :items="musicData"></music-list>
    <div class="bottom"></div>
  </div>
</template>
<script>
import musicList from "../../components/musicList.vue";
export default {
  data() {
    return {
      musicData: []
    };
  },
  created() {
    document.title = "历史记录";
    if (!localStorage.getItem("loginToken")) {
      this.$router.replace("/bundlePhone");
      return;
    }
    if (window._czc) {
      console.log("历史记录模块模块模块模块模块模块模块");
      window._czc.push(["_trackEvent", localStorage.getItem("deviceType")+"-"+"历史记录模块", "点击", "总计"]);
    }
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .playHistoryList({
          page: 0,
          pageSize: 50,
          uid: localStorage.getItem("userId"),
          type: 1
        })
        .then(res => {
          res.data.content.audioList.forEach((v, i) => {
            let s = (parseInt(v.timelength % 60) + "").padStart(2, "0");
            let m = (parseInt(v.timelength / 60) + "").padStart(2, "0");
            v.timelengths = m + ":" + s;
          });
          this.musicData = res.data.content.audioList;
        });
    }
  },
  components: {
    musicList
  },
  beforeRouteLeave(to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
    this.$destroy(true);
    next();
  }
};
</script>
<style lang="less" scoped>
.bottom{
  width:100%;
  height:60px;
}

</style>
