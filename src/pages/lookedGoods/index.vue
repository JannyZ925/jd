<template>
  <view>
    <goods-item v-for="(goods, index) in lookedGoods" :key="goods.goodsId" :goods="goods"></goods-item>
  </view>
</template>

<script>
import './index.less'

export default {
  data () {
    return {
      lookedGoods: []
    }
  },

  onLoad(options) {
    this.lookedGoods = JSON.parse(options.lookedGoods)
  }
}
</script>
