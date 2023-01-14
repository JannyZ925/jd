<template>
  <view>
    <!-- 购物车 -->
    <view class="cart-container" v-if="cart.length !== 0">
      <!-- 标题 -->
      <view class="title">
        <view class="at-icon at-icon-shopping-bag"></view>
        <text class="title-text">购物车</text>
      </view>

      <!-- 商品列表 -->
      <view class="goods-list" v-for="(goods, index) in cart" :key="index">
        <!-- 商品项 -->
        <goods-item :goods="goods" :isCart="true"></goods-item>
      </view>

      <!-- 结算区域 -->
      <view class="settle-container">
        <!-- 全选按钮 -->
        <label class="radio" @tap="handleClickSelectAll">
          <radio color="#6495ED" :checked="isAllChecked"/><text>全选</text>
        </label>
        
        <!-- 总价格 -->
        <text class="total-price">
          合计：<text>￥{{ totalPrice }}</text>
          </text>
        
        <!-- 结算 -->
        <view class="pay-button">
          <text>结算({{ checkedCount }})</text>
        </view>
      </view>
    </view>

    <!-- 购物车为空时显示的区域 -->
    <view class="empty-cart" v-else>
      <image src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/empty-cart.webp" class="empty-img"></image>
      <text>购物车空空如也~</text>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import "./index.less";
import { updateGoodsStateInCart, updateAllGoodsStateInCart } from "@/apis/user";

export default {
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["cart", "totalCount", "checkedCount", "totalPrice"]),

    isAllChecked() {
      return this.totalCount === this.checkedCount;
    }
  },

  methods: {
    ...mapMutations("user", {updateUser: "UPDATE_USER"}),

    async handleClickSelectAll() {
      const user = await updateAllGoodsStateInCart(this.user)
      this.updateUser(user)
    }
  }
};
</script>
