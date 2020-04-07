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
          <img
            v-lazy="item.picurl == undefined ? item.pic : item.picurl"
            alt
            class="list-pic"
          />
          <p>
            <span>
              <img src="../../assets/images/home_icon_yinyue.png" alt />
              {{ item.count }}集
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
    title: ""
  },
  methods: {
    goMore() {
      this.$router.push({
        path: "/videoList"
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
    width: 90%;
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
      font-weight: 700;
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
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .content-list {
      width: 50%;
      .list-img {
        width: 4.267rem;
        height: 3.2rem;
        text-align: center;
        position: relative;
        margin: 0 auto;
        .list-pic {
          width: 100%;
          height: 100%;
          display: block;
          z-index: 200;
          margin: 0.32rem auto;
          border-radius: 0.133rem;
        }
        p {
          width: 100%;
          height: 0.8rem;
          position: absolute;
          bottom: 0;
          background: url("../../assets/images/home_mokuai_bg.png") no-repeat;
          background-size: 100%;
          z-index: 300;
          span {
            height: 0.8rem;
            line-height: 0.8rem;
            display: flex;
            color: #fff;
            img {
              margin-top: 0.2rem;
              margin-left: 0.4rem;
              margin-right: 0.3rem;
              width: 0.4rem;
              height: 0.4rem;
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
