<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    
    <div class="tab ">
        <div class="tab-item"><router-link :to="{path:'/goods'}">商品</router-link></div>
        <div class="tab-item"><router-link :to="{path:'/ratings'}">评论</router-link></div>
        <div class="tab-item"><router-link :to="{path:'/seller'}">商家</router-link></div>
    </div>

    <div class="content">
      <transition name="fade" mode="out-in">
        <keep-alive>
         <router-view :seller="seller"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import header from './components/header/header'
import axios from 'axios'

export default {
  name: 'app',
  data(){
    return {
      name:"zhugege",
      seller:{}
    }
  },
  components:{
    'v-header':header
  },
  mounted:function(){
    let _this = this;
    axios.get('/api/seller').then(function(res){
      if(res.data.errno==0){
        _this.seller = res.data.data
      }
      console.log(_this.seller)
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';

  .fade-enter-active, .fade-leave-active 
    transition: opacity .3s
  .fade-enter, .fade-leave-active 
    opacity: 0

  #app  
    .tab 
      display:flex
      text-align:center
      height: 40px
      line-height: 40px
      border-1px(#ddd)
      .tab-item
        flex :1
        a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
             color: rgb(240, 20, 20)

</style>
