<template>
  <view class="orders">
    <view v-if="type==='waitingForPay'">
      <view v-for="(order, index) in ordersWaitingForPay" :key="order.orderId">
        <goods-item v-for="(goods, index) in order.goodsList" :key="goods.goodsId" :goods="goods" page="order"/>
      </view>
    </view>

    <view v-if="type==='waitingForArrive'">
      <view v-for="(order, index) in ordersWaitingForArrive" :key="order.orderId">
        <goods-item v-for="(goods, index) in order.goodsList" :key="goods.goodsId" :goods="goods" page="order"/>
      </view>
    </view>

    <view v-if="type==='all'">
      <view v-for="(order, index) in allOrders" :key="order.orderId">
        <goods-item v-for="(goods, index) in order.goodsList" :key="goods.goodsId" :goods="goods" page="order"/>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import './index.less'

export default {
  data () {
    return {
      type: ""
    }
  },
  computed: {
    ...mapGetters("user", ['ordersWaitingForPay','ordersWaitingForArrive','allOrders'])
  },
  onLoad(options) {
    this.type = options.type
  }
}
</script>
