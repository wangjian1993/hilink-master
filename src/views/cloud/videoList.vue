<template>
  <div class="content">
    <div
      class="video_cell"
      v-for="(item,index) in videoList"
      :key="index"
      @click="goVideo(item.picurl,item.videopath)"
    >
      <div class="video_bg_box">
        <img :src="item.picurl" alt />
        <p>{{item.count}}集</p>
      </div>
      <p class="albumname">{{item.albumname}}</p>
      <p class="name">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoList: [],
      id: ""
    };
  },
  created() {
    document.title = "视频列表";
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .getVideoData()
        .then(res => {
          //转换播放时间
          res.data.content.list.forEach((v, i) => {
            if (v.timelong / 60 < 10) {
              if (v.timelong % 60 < 10) {
                v.timelong =
                  "0" + parseInt(v.timelong / 60) + ":0" + (v.timelong % 60);
              } else {
                v.timelong =
                  "0" + parseInt(v.timelong / 60) + ":" + (v.timelong % 60);
              }
            } else {
              if (v.timelong % 60 < 10) {
                v.timelong =
                  parseInt(v.timelong / 60) + ":0" + (v.timelong % 60);
              } else {
                v.timelong =
                  parseInt(v.timelong / 60) + ":" + (v.timelong % 60);
              }
            }
          });
          this.videoList = res.data.content.list;
          console.log(this.videoList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goVideo(picurl, videopath) {
      //统计
      this.$router.push({
        path: "/video",
        query: {
          id: this.id,
          src: picurl,
          videopath: videopath
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
    this.$destroy(true);
    next();
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .video_cell {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .albumname {
      width: 157px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      line-height: 16px;
      color: #252729;
      margin-top: 13px;
    }
    .name {
      width: 157px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      line-height: 14px;
      color: #a7a9ab;
      margin-top: 8px;
    }
  }
  .video_bg_box {
    width: 163px;
    height: 94px;
    border-radius: 5px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 163px;
      height: 94px;
      position: absolute;
    }
    p {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #ffffff;
      font-size: 11px;
      line-height: 11px;
      padding: 6px 10px;
      border-radius: 5px 0px 5px 0px;
      background: #000000;
      opacity: 0.5;
    }
  }
}
</style>