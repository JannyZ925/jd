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
    ...mapGetters("user", ["cart", "totalCount", "checkedCount", "totalPrice"]),

    isAllChecked() {
      return this.totalCount === this.checkedCount;
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
    async handleClickPayButton() {
      Taro.navigateTo({
        url: `${paths.COMMIT_ORDER}`,
      });
    },
    handleClickCommitButton() {
      this.$bus.$emit("openActionSheet")
    }
  },
};
</script>
