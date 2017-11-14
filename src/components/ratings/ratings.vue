<template>
  <div class="ratings">
    {{ msg }}
    <button @click="show=!show">显示</button>
    <transition name="fall">
      <div class="ball" v-show="show"></div>

    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'name',
  data () {
    return {
      msg: 'ratings',
      show:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .ratings
    .ball
      position fixed
      width 50px
      height 50px
      background blue
      border-radius 50%
      left 10px
      bottom 10px
      z-index 999
      transform translate3d(0,0,0)
      // transition all 0.5s
      &.fall-enter
        transform translate3d(200px,-200px,0)
      &.fall-enter-to
         transform translate3d(0,0,0)
      &.fall-enter-active
        transition all 0.5s cubic-bezier(0.49,-0.8,0.75,0.41)


</style>
