<template>
  <div class="content">
    <div class="head_bg">
      <img src="../../assets/images/rank_bg.png" alt />
      <!-- <p>{{startTime}}/{{endTime}}</p> -->
    </div>
    <p class="music_title">歌曲列表</p>
    <music-list :items="musicData" :routeLeave="routeLeave"></music-list>
  </div>
</template>
<script>
import musicList from "../../components/musicList.vue";
export default {
  data() {
    return {
      musicData: [],
      startTime: "",
      endTime: "",
      routeLeave: false
    };
  },
  created() {
    document.title = '排行榜';
    this.getCoursuList();
  },
  methods: {
    async getCoursuList() {
      let that = this;
      this.$axios.rank().then(res => {
        this.startTime = res.data.content.rankingList[0].startTime.split(
          " "
        )[0];
        this.endTime = res.data.content.rankingList[0].endTime.split(" ")[0];
        this.musicData = res.data.content.rankingList[0].rms;
        this.musicData.forEach((v, i) => {
          v.browse = v.playCount;
          v.path = v.filePath;
          let s = (parseInt(v.timelength % 60) + "").padStart(2, "0");
          let m = (parseInt(v.timelength / 60) + "").padStart(2, "0");
          v.timelengths = m + ":" + s;
        });
      });
    }
  },
  components: {
    musicList
  },
  mounted() {},

  beforeRouteLeave(to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
    this.$destroy(true);
    next();
  }
};
</script>
<style lang="less" scoped>
.content{
  padding-bottom: 30px;
}
.head_bg {
  width: 100%;
  height: 225px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: contain;
  font-size: 12px;
  color: #555555;
  position: relative;
  p {
    padding-top: 20px;
    z-index:999;
  }
  img {
    width: 100%;
    height: 225px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.music_title {
  font-size: 15px;
  margin-left: 15px;
  margin-top: 10px;
}
</style>