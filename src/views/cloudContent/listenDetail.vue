<template>
 <div class="container">
    <div class="musicTitle">
        <div class="musicImgBox">
            <img :src="info.coverpath" class="musicImg"/>
        </div>
        <div>
            <div class="musicName">
                {{info.name}}
            </div>
            <div class="musicMusic">
                共{{info.musicCount}}首
            </div>
        </div>
    </div>
    <div class="musicIntro">
        专辑介绍
        <div class="">
            {{info.description}}
        </div>
    </div>
    <div v-bind:class="[active == index?'active':'','musicList']" v-for="(item,index) in musicList" :key="index">
        <div class="left">
            <p class="inroName">{{item.name}}</p>
            <p class="inroName">{{item.timelength}}</p>
        </div>
        <div class="right" @click="play(item.path,index)">
            <img src="../../assets/images/icon_listen_pause.png" class="rightImg" v-show="active != index"/>
            <img src="../../assets/images/icon_listen_playing.png" class="rightImg" v-show="active == index"/>
            <div class="rightTry">试听</div>
        </div>
    </div>
   <div class="loadingding center" v-show="isLoaded">
         <van-loading size="50px"  color="#81b4ff">加载中...</van-loading>
    </div>
    <p class="PageBottom">暂无更多</p>
</div>
</template>

<script>
import http from '../../api/index.js'
 export default {
   data () {
     return {
         musicList:[],
         info:[],
         audio:null,
         src:'',
         active:-1,
         isLoaded:false
     }
   },
   created(){
     
   },
   async mounted(){
       this.isLoaded = true
       await http.getSpecialInfo(this.$route.params.id).then(res=>{
            //转换播放时间
           res.data.content.musicList.forEach((v,i) => {
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
           
           this.musicList = res.data.content.musicList
           this.info = res.data.content.info
          
       }).catch(err=>{
           console.log(err)
       })
        this.isLoaded = false
        this.audio = new Audio()
        
   },
   beforeRouteLeave (to, from, next) {
    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
    this.$destroy(true)
    this.audio.pause()
    next()
    },
   methods: {
       //播放音乐
       play(src,index){
         if(src == this.src){
            if(this.audio.paused){
               this.active = index
               this.audio.play()
           }else{
               this.audio.pause()
               this.active = -1
           }
         }else{
            this.active = index
            this.audio.pause()
            this.src = this.audio.src = src
            this.audio.play()
            this.audio.onended=()=>{
               this.active = -1
            }
           }    
       }
   },
   components: {
    
   }
 }
</script>

<style lang='less' scoped>
@import url('../../assets/css/cloud/common.less');
@import url('../../assets/css/cloud/listenDetail.less');
</style>
