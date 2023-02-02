<template>
  <view class="commitOrder">
    <!-- 收货地址区域 -->
    <shipping-address/>

    <!-- 商品列表 -->
    <goods-item v-for="(goods, index) in order" :key="goods.goodsId" :goods="goods" page="commitOrder"/>

    <!-- 结算区域 -->
    <settle page="commitOrder"/>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import './index.less'

export default {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters("user", ["order"])
  }
}
</script>
