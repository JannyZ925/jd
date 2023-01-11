<template>
  <view>
    <goods-item v-for="(goods, index) in storedGoods" :key="goods.goodsId" :goods="goods"></goods-item>
  </view>
</template>

<script>
import './index.less'

export default {
  data () {
    return {
      storedGoods: []
    }
  },

  onLoad(options) {
    this.storedGoods = JSON.parse(options.storedGoods)
  }
}
</script>
