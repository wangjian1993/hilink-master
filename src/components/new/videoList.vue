<template>
  <div class="app">
    <div class="title">
      <p class="main-name">{{ name }}</p>
      <div @click="goMore">
        更多
        <img src="../../assets/images/more.png" alt class="more" />
      </div>
    </div>
    <div class="content">
      <div
        class="content-list"
        v-for="(item, index) in item"
        v-if="index < num"
        @click="goVideo(item.id, item.picurl)"
        :key="index"
      >
        <div class="list-img">
          <img v-lazy="item.coverImage" alt class="list-pic" />
          <p>
            <span>
              <img src="../../assets/images/video_white.png" alt />
              {{item.childResCount}}集
            </span>
          </p>
        </div>
        <span class="list-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: "",
    num: "",
    item: "",
    title: "",
    id: ""
  },
  methods: {
    goMore() {
      this.$router.push({
        name: "cloudVideoList",
        query: { id: this.id }
      });
    },
    goVideo(id, picurl) {
      this.$router.push({
        name: "video",
        query: {
          id: id
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.app {
  margin: 0.813rem 0;
  .title {
    width: 92%;
    margin: 0 auto;
    display: flex;
    font-size: 13px;
    color: #999999;
    align-items: center;
    justify-content: space-between;
    img {
      margin-left: 5px;
    }
    .main-name {
      font-size: 0.507rem;
      color: #222222;
    }
    .sub-name {
      font-size: 0.32rem;
      color: #666666;
    }
    .more {
      width: 20px;
      height: 20px;
      margin-left: -5px;
      vertical-align: middle;
      margin-bottom: 2px;
    }
  }
  .content {
    width: 92%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .content-list {
      width: 160px;
      .list-img {
        width: 160px;
        height: 163px;
        text-align: center;
        position: relative;
        margin: 0 auto;
        border-radius: 5px;
        overflow: hidden;
        .list-pic {
          width: 100%;
          height: 100%;
          display: block;
          z-index: 200;
          margin: 15px auto;
          border-radius: 5px;
        }
        p {
          width: 60px;
          height: 20px;
          position: absolute;
          bottom: 0px;
          background: url("../../assets/images/home_mokuai_bg.png") no-repeat;
          background-size: 100%;
          z-index: 300;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            font-size: 11px;
            display: flex;
            color: #fff;
            img {
              width: 16px;
              height: 16px;
              margin-left:5px;
            }
          }
        }
      }
      .list-name {
        display: block;
        width: 4.267rem;
        margin: 0.15rem auto;
        font-size: 0.4rem;
        color: #222222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        width: 4.267rem;
        margin: 0rem auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.347rem;
        color: #aaaaaa;
      }
    }
  }
}
</style>
