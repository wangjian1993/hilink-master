<template>
 <div>

 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   created(){
     this.getRecommendData()
   },
   methods: {
      getRecommendData() {
      var that = this;
      //热门推荐
      that.$axios.recommendSpecial().then(function(res) {
        
      });
     }
   },
   components: {
    
   }
 }
</script>

<style lang='less' scoped>

 
</style>
