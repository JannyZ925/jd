<template>
  <view class="settle-container">
    <!-- 全选按钮 -->
    <label v-if="page === 'cart'" class="radio" @tap="handleClickSelectAll">
      <radio color="#6495ED" :checked="isAllChecked" /><text>全选</text>
    </label>

    <!-- 总价格 -->
    <text class="total-price">
      合计：<text>￥{{ totalPrice }}</text>
    </text>

    <!-- 按钮 -->
    <view class="button">
      <text v-if="page==='cart'" @tap="handleClickPayButton">结算({{ checkedCount }})</text>
      <text v-if="page==='commitOrder'" @tap="handleClickCommitButton">提交订单</text>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { mapGetters, mapMutations, mapState } from "vuex";
import { updateAllGoodsStateInCart } from "@/apis/user";
import "./index.less";
import * as paths from "@/consts/path";
import { toast } from '@/utils/toast';

export default {
  data() {
    return {};
  },
  props: {
    page: {
      type: String,
      default: "cart",
    },
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["cart", "totalCount", "checkedCount", "totalPrice", "shippingAddress"]),

    isAllChecked() {
      return this.totalCount === this.checkedCount;
    },
    goodsInOrder() {
      return this.user.cart.filter(cartItem => {
        return cartItem.goodsState === true;
      });
    },
  },
  methods: {
    ...mapMutations("user", { updateUser: "UPDATE_USER" }),

    async handleClickSelectAll() {
      const user = await updateAllGoodsStateInCart(
        this.user,
        this.isAllChecked
      );
      this.updateUser(user);
    },
    handleClickPayButton() {
      if(this.shippingAddress && this.goodsInOrder.length !== 0) {
        Taro.navigateTo({
          url: `${paths.COMMIT_ORDER}?goodsList=${JSON.stringify(this.goodsInOrder)}`,
        });
      }
      if(!this.shippingAddress) toast("请选择收货地址！", { icon: "error" })
      if(this.goodsInOrder.length === 0) toast("请选择商品！", { icon: "error" })
    },
    handleClickCommitButton() {
      this.$bus.$emit("openActionSheet")
    }
  },
};
</script>
