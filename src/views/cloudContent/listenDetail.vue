<template>
 <div class="container">
    <div class="musicTitle">
        <div style="width:100px;height:100px;">
            <img :src="dataList.info.coverpath" style="width:80px;height:80px;border-radius: 5px;"/>
        </div>
        <div>
            <div style="font-size:15px;height:50px;padding-top:10px;">
                {{dataList.info.name}}
            </div>
            <div style="font-size:15px;color:#7d7e80">
                共{{dataList.info.musicCount}}首
            </div>
        </div>
    </div>
    <div class="musicIntro">
        专辑介绍
        <div class="">
            {{dataList.info.description}}
        </div>
    </div>
    <div v-bind:class="[active == index?'active':'','musicList']" v-for="(item,index) in dataList.musicList" :key="index">
        <div class="left">
            <p style="padding:10px 0 5px 0">{{item.name}}</p>
            <p style="padding:10px 0 5px 0">{{item.timelength}}</p>
        </div>
        <div class="right" @click="play(item.path,index)">
            <img src="../../assets/images/icon_listen_pause.png" style="width:40px;height:30px;" v-show="active != index"/>
            <img src="../../assets/images/icon_listen_playing.png" style="width:40px;height:30px;" v-show="active == index"/>
            <div style="padding-top:5px;text-align:center">试听</div>
        </div>
    </div>
   <div class="loadingding center" v-show="isLoaded">
         <van-loading size="50px" style="color:#81b4ff" color="#81b4ff">加载中...</van-loading>
    </div>
    <p class="PageBottom">暂无更多</p>
</div>
</template>

<script>
import http from '../../api/index.js'
 export default {
   data () {
     return {
         dataList:[],
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
           this.dataList = res.data.content
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
.container{
    position: absolute;
    width:100%;
    background: #ffffff;
    
}
 .musicTitle{
    width:375px;
    height:90px;
    display: flex;
    flex-direction: row;
    margin:10px 10px;
    border-bottom: 1px solid #F4F4F4;
    padding:0 17.5px
}
.musicIntro{
    width:375px;
    border-bottom: 1px solid #F4F4F4;
    font-size: 14px;
    padding:0 17.5px
}
.musicIntro>div{
    padding-bottom: 10px;
}
.musicList{
   width:375px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 0 35px;
    border-bottom: 1px solid #F4F4F4;
    font-size:16px;
    color:#818181;
}
.active{
    color: #81b4ff
}
</style>
