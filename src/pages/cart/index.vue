<template>
  <view>
    <!-- 购物车不为空时显示 -->
    <view v-if="cart.length !== 0">

      <!-- 收货地址区域 -->
      <shipping-address/>

      <!-- 购物车区域 -->
      <view class="cart-container">
        <!-- 标题 -->
        <view class="title">
          <view class="at-icon at-icon-shopping-bag"></view>
          <text class="title-text">购物车</text>
        </view>

        <!-- 商品列表 -->
        <view class="goods-list" v-for="(goods, index) in cart" :key="index">
          <!-- 商品项 -->
          <goods-item :goods="goods" page="cart"></goods-item>
        </view>

        <!-- 结算区域 -->
        <settle :totalPrice="totalPrice"/>
      </view>
    </view>

    <!-- 购物车为空时显示 -->
    <view class="empty-cart" v-else>
      <image src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/empty-cart.webp" class="empty-img"></image>
      <text>购物车空空如也~</text>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import './index.less';

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters("user", ["cart"]),
    totalPrice() {
      return this.cart.reduce((totalPrice, item) => {
          if (item.goodsState) totalPrice += (item.goodsPrice * item.goodsCount)
          return totalPrice
      }, 0)
    }
  }
};
</script>
