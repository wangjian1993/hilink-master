<template>
  <div class="app">
    <div class="title">
      <p class="main-name">{{ name }}</p>
      <!-- <p class="sub-name">{{title}}</p> -->
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
        @click="goAudio(item.id)"
      >
        <div class="list-img">
          <img
            v-lazy="item.pic != undefined ? item.pic : item.coverpath"
            alt
            class="list-pic"
          />
          <p>
            <span>
              <img src="../../assets/images/home_icon_yinyue.png" alt />
              {{ item.musicCount }}首
            </span>
          </p>
        </div>
        <span class="list-name">{{ item.name }}</span>
        <!-- <p>{{item.description}}</p> -->
      </div>
      <div class="more-box" v-if="isMore">
        <p>{{ moreText }}</p>
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
    isMore: false,
    moreText: "正在加载中..."
  },
  methods: {
    goAudio(id) {
      if (window._czc) {
        console.log(this.name, "模块模块模块模块模块模块模块");
        window._czc.push(["_trackEvent", localStorage.getItem("deviceType")+"-"+this.name + "模块", "点击", "总计"]);
      }
      this.$router.push({
        path: "/albumDetail",
        query: {
          id: id
        }
      });
    },
    goMore() {
      if (window._czc) {
        console.log(this.name, "模块模块模块模块模块模块模块");
        window._czc.push(["_trackEvent", localStorage.getItem("deviceType")+"-"+this.name + "模块", "点击", "总计"]);
      }
      this.$router.push({
        path: "/albumList",
        query: {
          name: this.name
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
    .main-name {
      font-size: 20px;
      color: #222222;
      font-weight: 700;
    }
    .sub-name {
      font-size: 0.32rem;
      color: #666666;
    }
  }
  .content {
    width: 90%;
    margin: 0 auto;
    display: flex;
    // flex-wrap: wrap;
    overflow-x: scroll;
    overflow-y: hidden;
    .content-list {
      width: 107px;
      height: 150px;
      margin-right: 10px;
      .list-img {
        width: 105px;
        height: 120px;
        text-align: center;
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 0.2rem;
        .list-pic {
          width: 100%;
          height: 100%;
          display: block;
          z-index: 200;
          margin: 0.32rem auto;
          border-radius: 0.2rem;
        }
        p {
          width: 100%;
          height: 0.8rem;
          position: absolute;
          bottom: -5px;
          background: url("../assets/images/home_mokuai_bg.png") no-repeat;
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
        width: 105px;
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
    .more-box {
      width: 92%;
      margin: 0 auto;
      text-align: center;
      p {
        padding: 0.5rem 0;
      }
    }
  }
}
.more {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-bottom: 2px;
  margin-left: -5px;
}
</style>
