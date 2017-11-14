<template>
  <div class="shopcart">
    <div class="content">
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
      <transition-group name="drop">
        <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
          <div class="inner inner-hook" ></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      dropBalls:[]
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
    }
  },
  methods:{
    drop(el){
      console.log(el)
      for(let i=0;i<this.balls.length;i++){
        let ball = this.balls[i];
        if(!ball.show){
          ball.show=true;
          ball.el=el;
          this.dropBalls.push(ball)
          return;
        }
      }
    }
  },
  transiton:{
    drop:{
      beforeEnter(el){
        let count=this.balls.length;
        while(count--){
          let ball = this.balls[i];
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left;
            let y = -(Window.innerHeight - rect.top-22);
            el.style.display="";
            el.style.webKitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webKitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el){
        /*  */
        let rf=el.offsetHeight;
        this.$nextTick(()=>{
          el.style.webKitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webKitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        })
      },
      afterEnter(el){
        let ball=this.dropBalls.shift();
        if(ball){
          ball.show=false;
          el.style.display='none'
        }
      }
    }
  }
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
          margin:0 12px
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
        &.drop-transition
          transition all .4s
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0,160,220)
            transition all .4s
            
        // &.drop-enter
        
        // &.drop-active
        
        // &.drop-enter-to
      

</style>
