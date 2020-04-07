<template>
  <div class="content">
    <div class="tab_item" v-for="(item,index) in dataList" :key="index" >
      <img :src="item.coverpath" alt />
      <div class="tab_item_right">
        <p>{{item.name}}</p>
        <p class="description">{{item.specialname}}</p>
        <img src="../assets/images/icon_shouting.png" alt />
        <span>{{item.browse}}次</span>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array
    }
  },
  methods:{
    goDetail(id){
      this.$router.push({
        path: "/albumDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.tab_item {
  width: 100%;
  height: 85px;

  display: flex;
  margin-top: 20px;
  padding-left: 20px;
  font-size: 16px;
  > img {
    width: 75px;
    height: 75px;
  }
}
.tab_item_right {
  margin-left: 18px;
  p:nth-child(1) {
    color: #333333;
    font-size: 16px;
    line-height: 16px;
    width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p:nth-child(2) {
    color: #999999;
    font-size: 14px;
    line-height: 14px;
    margin-top: 13px;
    margin-bottom: 10px;
  }
  span {
    color: #999999;
    font-size: 11px;
    line-height: 11px;
  }
  img {
    width: 10px;
    height: 10px;
  }
}
.description {
  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>