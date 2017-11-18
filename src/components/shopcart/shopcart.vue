<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">
            ￥{{totalPrice}}
        </div>
        <div class="desc">
              另需配送费￥{{ deliveryPrice }}元
        </div>
      </div>
      <div class="content-right" :class="payClass">
        <div class="pay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" 
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      tag="ul"
      >
        <li v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
        <!-- <li v-for="(ball,index) in balls" :key="index" class="ball"> -->
          <div class="inner inner-hook"></div>
        </li>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
      
      <!-- <div class="shopcart-list"> -->
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>      
        <div class="list-content" ref="list-content">
          <ul>
            <li v-for="(food,index) in selectFoods" :key="index" class="food">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price*food.count }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>      
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from "components/cartcontrol/cartcontrol"
export default {
  name: 'shopcart',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      balls:[
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        }
      ],
      dropBalls:[],
      fold:true
    }
  },
  props:{
    deliveryPrice:{
      type:Number,
      defalut:0
    },
    minPrice:{
      type:Number,
      defalut:0      
    },
    selectFoods:{
      type:Array,
      default: function () {
        return [
          {
            price:10,
            couont:3
          }
        ]
      }
    },
  },
  computed:{
    
    totalPrice(){
      let total = 0;
      // console.log(this.selectFoods)
      this.selectFoods.forEach(function(food) {
        total += food.price*food.count
      });
      return total;
    },
    totalCount(){
      return this.selectFoods.length;
    },
    payDesc(){
      if(this.totalPrice === 0){
        return `￥${this.minPrice}元起送`;
      }else if(this.totalPrice<this.minPrice){
        return `还差￥${this.minPrice-this.totalPrice}元起送`;
      }else{
        return '去结算';
      }
    },
    payClass(){
      if(this.totalPrice<this.minPrice){
        return 'not-enough';
      }else{
        return 'enough';
      }
    },
    listShow(){
      let _this = this;
      if(!_this.totalCount){
        _this.fold=true;
        return false;
      }
      let show = !_this.fold;
      if(show){
        _this.$nextTick(()=>{
          if(!_this.scroll){
            _this.scroll = new BScroll(_this.$refs['list-content'])
          }else{
            _this.scroll.refresh();
          }
        })
      }
      return show;
    }
  },
  methods:{
    toggleList(){
      if(!this.totalCount){
        return;
      }
      this.fold=!this.fold;
    },
    drop(el){
       //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball); 
            return;
          }
        }
    },
    beforeEnter(el){
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
          el.style.display = ''; //清空display
          el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
          el.style.transform = `translate3d(0,${y}px,0)`;
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el, done){
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; //触发重绘html
      this.$nextTick(() => { //让动画效果异步执行,提高性能
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        //处理内层动画
        let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
      });
      // setTimeout(function(){
      //   _this.afterEnter(el)
      // },300)
    },
    afterEnter(el){
      let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
      if (ball) {
        ball.show = false;
        el.style.display = 'none'; //隐藏小球
      }
    },
    enterCancelled(el){

    }
  },
  components:{
    cartcontrol
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';
  // @import '../../common/stylus/icon';
  .shopcart
    position fixed
    bottom 0
    left 0
    height 46px
    width 100%
    z-index 10
    background #000
    .content
      display flex
      background #141d27
      height 46px
       background #2b343c
      .content-left
        flex 1
        font-size 0
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 44px
          height 44px 
          // box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0,160,220)

            .icon-shopping_cart
              font-size 24px
              color #80848a
              line-height 44px
              &.highlight
                color #fff  
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,.4)

        .price
          display inline-block
          line-height 46px
          font-weight 700
          vertical-align top
          color rgba(255,255,255,.4)
          font-size 16px
          box-sizing border-box
          padding-right 12px
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 46px
          margin-left 12px 0 0 12px      
          font-size 10px   
          color rgba(255,255,255,.4)
          font-weight 400               
      .content-right
        flex 0 0 105px
        width 105px
        text-align center
        &.not-enough
          background #2b333b
          color rgba(255,255,255,.4)
        &.enough
          background #00b43c
          color #fff
        .pay
          line-height 46px
          font-size 12px
          font-weight 700
         
          
        
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 99
        &.drop-enter-active
          transition all .4s cubic-bezier(0.29,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0,160,220)
          transition all .4s 
    .shopcart-list
      position absolute
      bottom 46px
      left 0
      z-index -1
      width 100%
      &.fold-enter
        transform translate3d(0,100%,0)
      &.fold-enter-to
        transform translate3d(0,0,0)
      &.fold-leave
        transform translate3d(0,0,0)
      &.fold-leave-to
        transform translate3d(0,100%,0)
      &.fold-enter-active, &.fold-leave-active
        transition all .5s
      .list-header
        line-height 40px
        padding 0 18px
        background #f3f5f7
        overflow hidden
        border-bottom 1px solid rgba(7,17,27,.1)
        .title
          float left
          font-size 14px
          color  rgba(7,17,27,.7)
        .empty
          float right
          font-size 12px
          color #00a0dc
      .list-content
        padding 6px 10px
        max-height 127px
        background #fff
        overflow hidden
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-bottom 1px solid rgba(7,17,27,.1)
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position absolute
            right 90px
            bottom 10px
            line-height 24px
            font-size 14px
            color rgb(240,20,20)
            font-weight 700        
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px


        // &.drop-enter
        
        // &.drop-active
        
        // &.drop-enter-to
      

</style>
