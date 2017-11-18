<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count>0" @click.stop="decreaseCart">
        <transition name="rotate">
          <div class="inner icon-remove_circle_outline"></div>
        </transition>
      </div>
    </transition>
    <div class="cart-count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'

export default {
  name: 'cartcontrol',
  data () {
    return {
      msg: 'cartcontrol'
    }
  },
  props:{
    food:{
      type:Object
    }
  },
  created(){
    // console.log(this.food)
  },
  methods:{
    addCart(event){
      if(!event._constructed){
        return;
      }
      if(!this.food.count){
        // this.food.count=1;
        this.$set(this.food,'count',1)
      }else{
        this.food.count++;
      }
      this.$emit("cartAdd",event.target)
    },
    decreaseCart(){
      if(this.food.count>=1){
        this.food.count--;
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // @import '../../common/stylus/mixin';
  .cartcontrol
    .cart-decrease
      display inline-block
      
      &.move-enter-active,&.move-leave-active
        transition all .4s linear

      &.move-enter
        opacity 0
        transform translate3d(24px,0,0)
      &.move-enter-to
        opacity 1
        transform translate3d(0,0,0)
      
      &.move-leave
        opacity 1
        transform translate3d(0,0,0)
      &.move-leave-to
        opacity 0
        transform translate3d(24px,0,0)
      

      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
        transition all .4s linear
        transform rotate(0)
        // &.rotate-transition
        //   transform rotate(0)
        // &.move-enter,&.move-leave
        //   transform rotate(360deg)

    .cart-add
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
    .cart-count
      display inline-block
      vertical-align top 
      min-width 12px
      // padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147,153,159)
    

</style>
