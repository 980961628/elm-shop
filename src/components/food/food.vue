<template>
  <transition name="fade">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="pic">
          <div class="back">
            <i class="icon-arrow_lift"  @click="hide"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper"  v-show="food.count">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fd">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop="addFirst($event)" >加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text" v-show="food.info">{{food.info}}</p>
        </div>
      </div>
    </div>
  </transition>
  
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'Vue'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'

export default {
  name: 'food',
  data () {
    return {
      msg: 'detail',
      showFlag:false
    }
  },
  props:{
    food:{
      type:Object
    }
  },
  computed:{
    
  },
  methods:{
    show(){
      let _this = this;
      _this.showFlag=true;
      _this.$nextTick(()=>{
        if(!_this.scroll){
          _this.scroll = new BScroll(_this.$refs.food,{
            click:true
          })
        }else{
          _this.scroll.refresh();
        }
      })
    },
    hide(){
      this.showFlag=false;
    },
    addFirst(event){
      if(!event._constructed){
        return;
      }
      Vue.set(this.food,'count',1)
      this.$emit("cartAdd",event.target)
    }
  },
  components:{
   BScroll,
   cartcontrol,
   split
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';
  .food
    position fixed
    left 0
    top 0
    bottom 46px
    z-index 9
    width 100%
    background #fff

    &.fade-enter, &.fade-leave-to
      transform translate3d(100%,0,0)
    &.fade-enter-to, &.fade-leave
      transform translate3d(0,0,0)
    
    &.fade-enter-active,&.fade-leave-active
      transition all .2s linear
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      background red
      img 
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        i 
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      position relative
      .title
        font-size 14px
        line-height 14px
        margin-bottom 8px
        font-weight 700
        color rgb(7,17,27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        height 10px
        .sell-count,.rating
          font-size 10px
          color rgb(147,153,159)
        .sell-count
          margin-right 10px
      .price
        font-weight 700
        line-height 24px
        .now
          color rgb(240,20,20)
          margin-right 8px
          font-size 14px
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147,153,159)


      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        background rgb(0,160,220)
        color #ffffff
        box-sizing border-box
        font-size 10px
        border-radius 12px
        &.fd-enter,&.fd-leave-to
          opacity 0
        &.fd-enter-to,&.fd-leave
          opacity 1
        &.fd-enter-active, &.fd-leave-active
          transition all .5s
    
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7,17,27)
      .text 
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77,85,93)
      
</style>
