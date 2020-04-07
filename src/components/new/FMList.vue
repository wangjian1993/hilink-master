<template>
  <div class="app">
    <div class="title">
      <p class="main-name">{{name}}</p>
      <p class="sub-name">{{title}}</p>
      <img
        src="../../assets/images/home_icon_more.png"
        alt=""
      >
    </div>
    <div class="content">
      <div
        class="content-list"
        v-for="(item,index) in item"
        v-if='index < num'
        @click="goAudio(item.id)"
      >
        <div class="list-img">
          <img
            v-lazy="item.picurl == undefined? item.pic:item.picurl "
            alt=""
            class="list-pic"
          >
        </div>
        <div class="list-text">
          <span class="list-name">{{item.name}}</span>
          <p>{{item.introduction}}</p>
        </div>
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
    goAudio(id) {
      this.$router.push({
        path: "/audio",
        query: {
          id: id
        }
      });
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
.app {
  margin: 0.813rem 0;
  .title {
    width: 90%;
    margin: 0 auto;
    position: relative;
    img {
      position: absolute;
      right: 0;
      top: 0.3rem;
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
  }
  .content {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .content-list {
      width: 100%;
      display: flex;
      padding: 0.25rem 0;
      .list-img {
        width: 2.387rem;
        height: 2.987rem;
        background: url("../../assets/images/home_mokuai_touxiang_bg.png")
          no-repeat;
        background-size: 100%;
        .list-pic {
          width: 100%;
          height: 100%;
          display: block;
          z-index: 200;
          margin: 0rem auto;
          border-radius: 0.133rem;
        }
      }
      .list-text {
        width: 70%;
        margin-left: 0.5rem;
        span {
          width: 100%;
          display: block;
          font-size: 0.4rem;
          color: #222;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          color: #aaaaaa;
          font-size: 0.347rem;
          padding-top: 0.267rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
