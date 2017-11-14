<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="descrip">
          {{ seller.description }}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class=" classMap[seller.supports[0].type] "></span>
          <span class="text">{{seller.supports[0].description }}</span>
        </div>
      </div>
      <div  v-if="seller.supports" class="supports-count">
        <span class="count" @click="showDatail">{{ seller.supports.length }}个</span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDatail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <span class="right"></span>
    </div>
    <div class="backgound">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name"> {{ seller.name }} </h1>
          <div class="star-wrapper">
            <star :size=48 :score="seller.score"></star>          
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(item,index) in seller.supports" :key="index" class="supports-item" >
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text"> {{ item.description }}</span>
            </li>
          </ul> 
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content"> {{ seller.bulletin }} </p>          
          </div>
        </div>
      </div>
      <div class="detail-close" @click="detailHide">
        <span> × </span>   
      </div>
    </div>
  </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star  from 'components/star/star'

export default {
  name: 'name',
  data () {
    return {
      msg: '我是header',
      sellerData:this.seller,
      detailShow:false
    }
  },
  methods:{
    showDatail(){
      this.detailShow = true;
    },
    detailHide(){
      this.detailShow = false;
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  mounted:function(){
   
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  components:{
    star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin';
      
    .header
      color:#fff
      position relative
      background rgba(7,17,27,.5)
      overflow hidden
      .content-wrapper
        padding:24px 12px 18px 24px
        font-size:0
        position relative
        .avatar
          display:inline-block
          vertical-align:top
          img 
            border-radius 4px
        .content
          display:inline-block
          font-size:14px
          margin-left:16px
          .title
            margin:2px 0 8px 0
            font-size 16px
            
            .brand
              display:inline-block
              width:30px
              height:18px
              vertical-align:top
              
              bg-image('brand')
            .name
              margin-left 6px
              line-height 18px
              font-weight blod
          .descrip
            margin-bottom 10px
            line-height 12px
            font-size 12px
          .support
            .icon
              display inline-block
              width 12px
              height 12px
              margin-right 4px
              background-size:12px 12px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_1')
              &.discount
                bg-image('discount_1')
              &.guarantee
                bg-image('guarantee_1')
              &.invoice
                bg-image('invoice_1')
              &.special
                bg-image('special_1')
            .text
              line-height 12px
              font-size 12px
              vertical-align top
        .supports-count
          position absolute
          right 12px
          bottom 18px
          line-height 24px
          height 24px
          padding 0 8px
          border-radius 14px
          background rgba(0,0,0,.2)
          text-align center
          .count
            font-size 10px

      .bulletin-wrapper
        height 28px
        line-height 28px
        padding 0 22px 0 12px
        background rgba(7,17,27,.4)
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        .bulletin-title
           display inline-block
           width 22px 
           height 12px
           vertical-align initial;
           margin-right 10px
           bg-image('bulletin')
      .bulletin-text
        font-size 10px
        vertical-align top 
      .backgound
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
        filter blur(10px)
      .detail
        position fixed
        top 0
        left 0
        z-index 100
        width 100%
        height 100%
        overflow auto
        background rgba(7,17,27,.8)
        &.fade-enter-active, &.fade-leave-active 
          transition: opacity .3s
        &.fade-enter, &.fade-leave-active 
          opacity: 0
        .detail-wrapper
          min-height 100%
          width 100%
          .detail-main
            margin-top 64px
            padding-bottom 64px
            .name
              line-height 16px
              text-align center
              font-size 16px
              font-weight 700
            .star-wrapper
              margin-top 18px
              padding 2px 0
              text-align center
            .title
              display flex
              width:80%
              margin 30px auto
              .line
                flex 1
                position relative
                top -6px
                border-bottom 1px solid rgba(255,255,255,.2)
              .text 
                padding 0 12px
                font-size 14px
                font-weight 700
            .supports
              width 80%
              margin 0 auto
              .supports-item
                padding 0 12px
                margin-bottom 12px
                font-size 0
                &:last-child
                  margin-bottom 0
                
                .icon
                  display inline-block
                  width 16px
                  height 16px
                  vertical-align top
                  margin-right 16px
                  background-size 16px 16px
                  background-repeat no-repeat
                  &.decrease
                    bg-image('decrease_2')
                  &.discount
                    bg-image('discount_2')
                  &.guarantee
                    bg-image('guarantee_2')
                  &.invoice
                    bg-image('invoice_2')
                  &.special
                    bg-image('special_2')
                .text
                  font-size 12px
                  line-height 16px
            .bulletin
              width 80%
              margin 0 auto
              .content
                padding 0 12px
                line-height 24px
                font-size 12px
        .detail-close
          position relative
          width 32px
          height 32px
          margin -64px auto 0 auto
          clear both
          font-size 32px
          text-align center
          

</style>
