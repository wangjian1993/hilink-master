<template>
 <div class="container">
    <van-tabs v-model="active" color="#81b4ff" @click="refresh">
        <van-tab title="0">
            <div slot="title" class='tab'>
                最新上架<van-icon name="arrow-down" style="vertical-align: middle;margin-left:5px;"/>
            </div>
            <div>
                <div class="cell" v-for="(item,index) in dataList" :key="index" @click="goDetail(item.id)">
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
        <van-tab title="1">
            <div slot="title" class='tab'>
                热门排行<van-icon name="arrow-down" style="vertical-align: middle;margin-left:5px;"/>
            </div>
            <div>
                <div class="cell" v-for="(item,index) in dataList" :key="index" @click="goDetail(item.id)">
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
    </van-tabs>
    <p class="PageBottom">暂无更多</p>
    <div class="loadingding center" v-show="isLoaded">
         <van-loading size="50px" style="color:#81b4ff" color="#81b4ff">加载中...</van-loading>
    </div>
 </div>
</template>

<script>
import http from '../../api/index.js'
 export default {
   data () {
     return {
        active: 0,
        type:1,
        dataList:[],
        tabTitle:0,
        isLoaded:false
     }
   },
   async mounted(){
       //获取页面数据
        this.isLoaded = true
        await http.getAlbumsData(1).then(res=>{
            this.dataList = res.data.content.list
        }).catch(err=>{
            console.log(err)
        })
        this.isLoaded = false
   },
   methods: {
       //刷新数据
     async refresh(name,title){
         if(name == this.tabTitle){
             return
         }
         this.tabTitle = name
         this.isLoaded = true
         var type = name == 0?1:2
         await http.getAlbumsData(type).then(res=>{
            this.dataList = res.data.content.list
        }).catch(err=>{
            console.log(err)
        })
         this.isLoaded = false
     },
     goDetail(item){
         this.$router.push({name:'cloudListenDetail',params:{id:item}})
     }
    },
 }
</script>

<style lang='less' scoped>
@import url('../../assets/css/cloud/common.less');
.container{
    position: absolute;
    width:100%;
    background: #ffffff;
    height: 100%;
}
.cell{
    width:340px;
    height:90px;
    display: flex;
    flex-direction: row;
    margin:10px 10px;
    border-bottom: 1px solid #F4F4F4;
}
 
</style>
