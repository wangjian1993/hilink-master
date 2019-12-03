<template>
  <div class="hello"></div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    //   console.log(location.href.replace(" http", "https"))
    //    console.log(this.$route.fullPath+'index')
    //    console.log(location.href+'index')
    var redirectUri = encodeURIComponent(location.href + "home");
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc939038db77a0e73" +
      "&redirect_uri=" +
      redirectUri +
      "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
      // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect"
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
