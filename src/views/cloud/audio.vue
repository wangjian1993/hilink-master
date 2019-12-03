<template>
  <div class="app">
    <div class="audio-top">
      <div class="audio-top-img">
        <img
          v-lazy="audioInfoData.coverpath"
          alt=""
        >
      </div>
      <div class="audio-top-info">
        <p>{{audioInfoData.name}}</p>
        <p>共{{audioInfoData.musicCount}}首</p>
      </div>
      <div class="audio-top-btn">
        <span><img src="../../assets/images/xz.png"></span>
        <span><img src="../../assets/images/sc.png"></span>
      </div>
    </div>
    <div class="audio-info-description">
      <span>专辑介绍</span>
      <p>{{audioInfoData.description}}</p>
    </div>
    <div class="audio-list">
      <ul>
        <li
          v-for="(item,index) in audioData"
          class="audio-list-li"
        >
          <p class="audio-list-name">
            <span>{{item.name}}</span>
            <span>{{adjustTimer(item.timelength)}}</span>
          </p>
          <div class="audio-list-btn">
            <p><img src="../../assets/images/sc.png"><span>收藏</span></p>
            <p><img src="../../assets/images/icon_download_1.png"><span>下载</span></p>
            <p><img src="../../assets/images/icon_listen_pause.png"><span>试听</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Bus from "../../assets/js/bus.js";
export default {
  data() {
    return {
      audioData: [],
      audioInfoData: [],
      audioId: ""
    };
  },
  created() {
    var id = this.$route.query.id;
    this.audioId = id;
    this.getAudioData(id);
  },
  methods: {
    getAudioData(id) {
      var that = this;
      that.$axios.getSpecialInfo(id).then(function(res) {
        that.audioData = res.data.content.musicList;
        that.audioInfoData = res.data.content.info;
      });
    },
    demandAudio(data) {
      console.log("点击");
      Bus.$emit("audioClic", data);
    },
    // 时间转换
    adjustTimer(val) {
      var h = Math.floor(val / 3600);
      var m =
        Math.floor((val / 60) % 60) >= 10
          ? Math.floor((val / 60) % 60)
          : "0" + Math.floor((val / 60) % 60);
      var s =
        Math.floor(val % 60) >= 10
          ? Math.floor(val % 60)
          : "0" + Math.floor(val % 60);
      var format =
        Math.floor(val / 3600) != 0 ? h + ":" + m + ":" + s : m + ":" + s;
      return format;
    }
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function(to, from) {
      // 拿到目标参数 to.query.id 去再次请求数据接口
      this.getAudioData(to.query.id);
    }
  },
  components: {}
};
</script>

<style lang='less' scoped>
@import url("../../assets/css/audio.less");
</style>
