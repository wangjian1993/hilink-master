<template>
	<div class="container">
        <div class="content">
             <router-link :to="{name:'cloudVideo',params:{id:item.id}}" class="cell" v-for="(item,index) in videoList" :key="index" @click="goVideoDetail(item.id)">
                <img :src="item.picurl"/>
                <div class="text">{{item.name}}</div>
                <div class="text1">{{item.count}}集</div>
                <!--absolute-->
                <!-- <div class="pay center">付费</div> -->
                <!-- <div class="number">
                <img src="../../assets/images/home_icon_yinyue.png"/>
                    {{item.musicCount}}首
                </div> -->
            </router-link >
        </div>
         <p class="PageBottom">暂无更多</p>
        <div class="loadingding center" v-show="isLoaded">
            <van-loading size="50px" color="#81b4ff">加载中...</van-loading>
        </div>
	</div>
</template>

<script>
import http from '../../api/index.js'
export default {
	data() {
		return {
        videoList:[],
        isLoaded:false
		};
    },
    mounted(){
        this.isLoaded = true
        http.getVideoAlbumList(50).then(res=>{
            this.isLoaded = false
            this.videoList = res.data.content.list
        }).catch(err=>{
                console.log(err)
            })  
    },
	methods: {},
	components: {
		
	}
};
</script>

<style lang="less" scoped>
  @import '../../assets/css/cloud/common.less';
.content{
    width:96%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  
}
.cell{
    width: 160px;
    height: 205px;
    border-radius: 5px;
    margin-top: 20px;
    position: relative;
  }
  .cell>img{
    width:160px;
    height:160px;
  }
  .cell .text,.cell .text1{
    width:160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .cell .text{
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    margin-top: 5px;
  }
  .cell .text1{
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #aaaaaa;
  }
</style>
