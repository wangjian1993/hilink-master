<template>
  <div class="app">
    <div class="title">
      <p class="main-name">{{ name }}</p>
      <div @click="goMore" class="more_box">
        更多
        <img src="../../assets/images/more.png" class="more" alt />
      </div>
    </div>
    <div class="content">
      <div
        class="content-list"
        v-for="(item, index) in item"
        v-if="index < num"
        @click="goPalyUrl(item.link)"
      >
        <div class="list-img">
          <span class="pay-text">付费</span>
          <img v-lazy="item.path" alt class="list-pic" />
        </div>
        <span class="list-name">{{ item.name }}</span>
        <p calss="payPrice">¥{{ item.fee }}</p>
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
    goPalyUrl(url) {
      //统计
      if (window._czc) {
        window._czc.push([
          "_trackEvent",
          localStorage.getItem("deviceType") + "-" + "付费模块",
          "点击",
          "总计"
        ]);
      }
      window.open(url);
    },
    goMore() {
      if (window._czc) {
        window._czc.push([
          "_trackEvent",
          localStorage.getItem("deviceType") + "-" + "付费模块",
          "点击",
          "总计"
        ]);
      }
      this.$router.push({
        path: "./payList"
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
    width: 91%;
    margin: 0 auto;
    display: flex;
    font-size: 13px;
    color: #999999;
    align-items: center;

    justify-content: space-between;

    .main-name {
      font-size: 20px;
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
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .content-list {
      width: 163px;
      .list-img {
        width: 4.267rem;
        height: 3.2rem;
        text-align: center;
        position: relative;
        margin: 0 auto;
        .pay-text {
          position: absolute;
          right: 0;
          display: block;
          font-size: 12px;
          color: #fff;
          width: 46px;
          height: 23px;
          background-color: #dfba4d;
          border-radius: 0px 5px 0px 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .list-pic {
          width: 100%;
          height: 100%;
          display: block;
          z-index: 200;
          margin: 15px auto;
          border-radius: 0.133rem;
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
        color: #fa4f4b;
        font-weight: 700;
      }
    }
  }
}
</style>
