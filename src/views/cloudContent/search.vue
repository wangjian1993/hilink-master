<template>
 <div class="container">
      <!--顶部-->
   <div class="top center">
       
        <div class="search">
            <div class="searchIcon center">
                <img src="../../assets/images/home_icon_search.png"/>
            </div>
            <div class="searchInput">
                <van-cell-group >
                <van-field style="height:35px;padding:10px 10px 0px;background-color: #f4f4f4;" v-model="serchValue" placeholder="搜索专辑、单曲" @change="SearchResult" />
                </van-cell-group>
            </div>
        </div>
        <div class="cancel" @click="goBack">{{cancelOrDelete}}</div>
   </div>
   <!--热门搜索-->
   
    <div class="hotSearch" v-show="!isShowResult">
        <div style="color:#989898;font-size:15px">热门搜索</div>
        <div class="hotSearchList">
            <div class="hotSearchCell" @click="hotSearch('爸爸')">爸爸</div>
            <div class="hotSearchCell" @click="hotSearch('妈妈')">妈妈</div>
            <div class="hotSearchCell" @click="hotSearch('火火兔')">火火兔</div>
            <div class="hotSearchCell" @click="hotSearch('西游记')">西游记</div>
            <div class="hotSearchCell" @click="hotSearch('三国演义')">三国演义</div> 
        </div>
    </div>
    <!--搜索结果-->
     <van-tabs v-model="active" color="#81b4ff" sticky  style="width:100%;margin-top:20px;" v-show="isShowResult">
        <van-tab title="专辑" style="">
            <div slot="title" class='tab'>
                专辑<van-icon name="arrow-down" style="vertical-align: middle;margin-left:5px;"/>
            </div>
            <div>
                <div class="cell" v-for="(item,index) in albumList" :key="index" @click="goDetail(item.id)">
                    <div style="width:100px;height:100px;">
                        <img :src="item.coverpath" style="width:80px;height:80px;"/>
                    </div>
                    <div>
                        <div style="font-size:15px;height:50px;padding-top:10px;">
                            {{item.name}}
                        </div>
                        <div style="font-size:15px;color:#7d7e80">
                            共{{item.musicCount}}首
                        </div>
                    </div>
                </div>
            </div>
        </van-tab>
        <van-tab title="单曲">
            <div slot="title" class='tab'>
                单曲<van-icon name="arrow-down" style="vertical-align: middle;margin-left:5px;"/>
            </div>
            <div>
                <div class="musicList" v-for="(item,index) in singleList" :key="index">
                    <div class="left">
                        <p style="padding:10px 0 5px 0">{{item.name}}</p>
                        <p style="padding:10px 0 5px 0">{{item.timelength}}</p>
                    </div>
                    <div class="right" @click="play(item.path)">
                        <img src="../../assets/images/icon_listen_pause.png" style="width:40px;height:30px;"/>
                        <div style="padding-top:5px;text-align:center">试听</div>
                    </div>
                </div>
            </div>
        </van-tab>
    </van-tabs>
    <p class="PageBottom" v-show="isShowResult">暂无更多</p>
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
        serchValue:'',
        albumList:[],
        singleList:[],
        isShowResult:false,
        src:'',
        isLoaded:false
     }
   },
   mounted(){
      this.audio = new Audio()
   },
   methods: {
      //返回或者清除
      goBack(){
        if(this.cancelOrDelete == '取消'){
            this.$router.go(-1)
          }else{
              this.serchValue = ''
          }
      },
      //搜索结果
      async SearchResult(){
          this.albumList = this.singleList = []
          this.isShowResult = true
          this.isLoaded = true
          await  http.getSearch(1,this.serchValue).then(res=>{
              this.albumList = res.data.content.list
          }).catch(err=>{
              console.log(err)
          })
          await  http.getSearch(2,this.serchValue).then(res=>{
              console.log(res)
              res.data.content.list.forEach((v,i) => {
               if(v.timelength/60<10){
                   if(v.timelength%60<10){
                       v.timelength = '0'+parseInt(v.timelength/60)+':0'+v.timelength%60
                   }else{
                       v.timelength = '0'+parseInt(v.timelength/60)+':'+v.timelength%60
                   }
               }else{
                   if(v.timelength%60<10){
                       v.timelength = parseInt(v.timelength/60)+':0'+v.timelength%60
                   }else{
                       v.timelength = parseInt(v.timelength/60)+':'+v.timelength%60
                   }
               }
           });
              this.singleList = res.data.content.list
              console.log(this.singleList)
          }).catch(err=>{
              console.log(err)
          })

          this.isLoaded = false
      },
      //播放音乐
       play(src){
         if(src == this.src){
            if(this.audio.paused){
               this.audio.play()
           }else{
               this.audio.pause()
           }
         }else{
            this.audio.pause()
            this.src = this.audio.src = src
            this.audio.play()
           }    
       },
       //进入详情页
       goDetail(item){
         this.$router.push({name:'cloudListenDetail',params:{id:item}})
        },
     //播放音乐
       play(src){
         if(src == this.src){
            if(this.audio.paused){
               this.audio.play()
           }else{
               this.audio.pause()
           }
         }else{
            this.audio.pause()
            this.src = this.audio.src = src
            this.audio.play()
           }    
       },
       //热门搜索
       hotSearch(val){
           this.serchValue = val
           this.SearchResult()
       }
   },
   beforeRouteLeave (to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
    // this.$destroy(true)
    this.audio.pause()
    next()
    },
   computed: {
       cancelOrDelete:function(){
           if(this.serchValue){
               return this.cancelOrDelete = '清除'
           }else{
               this.isShowResult = false
               return this.cancelOrDelete = '取消'
           }
       }
        
   }
 }
</script>

<style lang='less' scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/search.less');

</style>
