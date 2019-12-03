<template>
  <div class="content">
    <a
      href="javascript:;"
      class="toTop"
      @click="backTop()"
      v-show="backToTop"
    >
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    backToTop: false
  },
  methods: {
    //回到顶部
    backTop() {
      console.log("点击")
      let back = setInterval(() => {
        if (document.body.scrollTop || document.documentElement.scrollTop) {
          document.body.scrollTop -= 100;
          document.documentElement.scrollTop -= 100;
        } else {
          clearInterval(back);
        }
      });
    }
  },
  components: {}
};
</script>

<style lang='less' scoped>
.toTop {
  position: fixed;
  bottom: 150px;
  right: 30px;
  z-index: 100;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #999; /*no*/
  text-align: center;
  background: url("../assets/images/top.png") no-repeat;
  background-size: 100%;
}
</style>
