<template>
 <div class="container">
   <div class="album" :style="{ backgroundImage:'url('+dataList.zb.coverpath+')',backgroundSize:'100% 100%'}">
      <div style="position:absolute;left:20px;bottom:10px;">
        <span>{{dataList.zb.name}}</span>
        <span style="font-size:16px;">&nbsp;&nbsp;&nbsp;{{dataList.zb.tag}}</span>
      </div>
   </div>
   <div class="intro">
     <p style="font-size:16px;font-weight:bold">个人简介</p>
     <p style="font-size:14px;margin-top:10px;color:#666666">{{dataList.zb.introduction}}</p>
   </div>
   <div class="albumListTitle">
     专辑({{dataList.zb.specialcount}})
   </div>
   <div class="albumList">
     <div class="cell" v-for="(item,index) in dataList.specialList" :key="index" @click="goDetail(item.id)">
       <div class="cellLeft center">
         <img :src="item.coverpath" style="width:50px;height:50px;"/>
       </div>
       <div class="cellRight">
         <div>
           <p style="padding-bottom:5px;">{{item.name}}</p>
           <p style="color:#666666">共{{item.musicCount}}首</p>
         </div>
         <div style="width:22px;height:22px;">
           <img style="width:22px;height:22px;" src="../../assets/images/zhubo_icon_tianjia.png"/>
         </div>
       </div>
     </div>
   </div>
   <p class="PageBottom">暂无更多</p>
   <div class="loadingding center" v-show="isLoaded">
         <van-loading size="50px">加载中...</van-loading>
    </div>
 </div>
</template>

<script>
import http from '../../api/index.js'
 export default {
   data () {
     return {
       dataList:[],
       isLoaded:false
     }
   },
   async mounted(){
     this.isLoaded = true
    await http.getHostDetail(this.$route.params.id).then(res=>{
      this.dataList = res.data.content
    }).catch(err=>{
      console.log(err)
    })
    this.isLoaded = false
   },
   methods: {
     goDetail(id){
        this.$router.push({name:'cloudListenDetail',params:{id:item}})
     }
   },
  beforeRouteLeave (to, from, next) {
  // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
  this.$destroy(true)
  next()
  },
   components: {
    
   }
 }
</script>

<style lang='less' scoped>
@import url('../../assets/css/cloud/common.less');
.album{
  width:100%;
  height:180px;
  position: relative;
  color:#ffffff;
}
.intro{
  width:100%;
  padding: 20px 20px;
  border-bottom:1px solid #f4f4f4;
}
.albumListTitle{
   width:100%;
   padding: 20px 20px;
   border-bottom:1px solid  #f4f4f4;
   font-size:16px;
   font-weight:bold;
}
.albumList{
   width:100%;
   padding: 0px 0px;
}
.cell{
  display: flex;
  flex-direction: row;
  height:80px;
}
.cellLeft{
  width:80px;
  height:80px;
    
}
.cellRight{
  width:265px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:80px;
  font-size:15px;
  border-bottom: 1px solid #f4f4f4
}
</style>
