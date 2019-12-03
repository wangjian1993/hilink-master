<template>
  <album-list :type="dataType"></album-list>
</template>

<script>
import albumList from "../../components/AlbumList.vue";
export default {
  data() {
    return {
      dataType:-1
    };
  },
  components: {
    albumList
  },
  created() {
	this.dataType =this.$route.query.type;
    switch (this.$route.query.type) {
      // case 1:
      //   document.title = "听儿歌";
      //   break;
      // case 2:
      //   document.title = "讲故事";
      //   break;
      // case 3:
      //   document.title = "学英语";
      //   break;
      // case 4:
      //   document.title = "赏国学";
      //   break;
    }
    // this.$axios
    //   .getAlbumsData(0,this.$route.query.type)
    //   .then(res => {
    //     this.dataList = res.data.content.list;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  beforeRouteLeave(to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
    this.$destroy(true);
    next();
  }
};
</script>
<style lang="less" scoped>
</style>