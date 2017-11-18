<template>
  <div class="goods">
    <!-- 左侧菜单 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" ref="menuItem"
         :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)"> 
          <span class="text">  
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧商品 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
         <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
           <h1 class="title">{{ item.name }}</h1>
           <ul>
             <li v-for="(food,index2) in item.foods" :key="index2" class="food-item" @click="selectFood(food,$event)">
               <div class="icon">
                 <img :src="food.icon" alt="" width="57" height="57">
               </div>
               <div class="content">
                 <h2 class="name">{{ food.name }}</h2>
                 <p class="desc">{{ food.description }}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}</span>
                   <span>好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="now">￥{{ food.price }}</span>
                   <span v-show="food.oldPrice" class="old">{{ food.oldPrice }}</span>
                 </div>
                 <div class="cartcontrol-wrapper">
                   <cartcontrol :food="food"  v-on:cartAdd="drop"></cartcontrol>
                 </div>
               </div>
             </li>
           </ul>
         </li>
      </ul>
    </div>
    <shopcart ref="shopCart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import food from 'components/food/food'
  import cartcontrol from 'components/cartcontrol/cartcontrol'

  export default {
    name: 'name',
    data () {
      return {
        msg: '商品组件',
        goods:[],
        listHeight:[],
        scrollY:0,
        selectedFood:{}
      }
    },
    mounted(){
      let _this = this;
      _this.classMap = ['decrease','discount','special','invoice','guarantee'];
      axios.get('/api/goods').then(function(res){
        if(res.data.errno == 0){
          _this.goods = res.data.data
          console.log(_this.goods)
          _this.$nextTick(()=>{
            _this._initScroll();
            _this._calculateHeight();
          })
          
        }
      })
    },
    methods:{
      _initScroll(){
        let _this=this;
        _this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          probeType:3,
          click:true
        });
        _this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
          probeType:3,
           click:true
        });

         _this.foodScroll.on('scroll',function(pos){
           _this.scrollY = Math.abs(Math.round(pos.y))
         })
        
      },
      _calculateHeight(){
        let _this = this;
        let foodList = document.querySelectorAll(".food-list-hook");
        let height = 0;
        // _this.listHeight.push(height)
        for(let i=0;i<foodList.length;i++){
          _this.listHeight.push(foodList[i].offsetTop)
        }
        console.log(_this.listHeight)
      },
      selectMenu(index,event){
        if(!event._constructed){
          return ;
        }
        let _this = this;
        let foodList = document.querySelectorAll(".food-list-hook");
        let el = foodList[index];
        _this.foodScroll.scrollToElement(el,300)
      },
      drop(target){
        // console.log(el)
        console.log(1)
        this.$refs.shopCart.drop(target)
      },
      selectFood(food,event){
        this.selectedFood=food;
        this.$refs.food.show();
      }
    },
    computed:{
      currentIndex(){
        let _this = this;
        for(let i=0;i<_this.listHeight.length;i++){
          let  height = this.listHeight[i];
          let  height2 = this.listHeight[i+1];
          if( (!height2) || _this.scrollY>=height && _this.scrollY<height2){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods = [];
        this.goods.forEach(function(goods){
          goods.foods.forEach(function(food){
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods;
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';

  .goods
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    display flex
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7

      .menu-item
        display table
        height 54px
        line-height 14px
        width 56px
        padding 0 12px
        text-align center
        &.current
          background #ffffff
          font-weight 700
          span
            font-size 14px
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size:12px 12px
          background-repeat no-repeat
          vertical-align top 
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')        
        .text
          display table-cell
          vertical-align middle
          width 56px
          font-size 12px
          border-bottom 1px solid rgba(7,17,27,.1)
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        border-bottom 1px solid rgba(7,17,27,.1)
        margin 18px
        padding-bottom 18px
        position relative
        &:last-child
          border-bottom none
          margin-bottom 0
        .icon
          flex 0 0 57px
          width 57px
          height 57px
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            color rgb(7,17,27)
          .desc,.extra
            color rgb(147,153,159)
            font-size 10px
            line-height 10px
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            line-height 10px
            .count
              margin-right 12px
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
            right 0
            bottom 12px

</style>
