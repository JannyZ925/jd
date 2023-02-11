<template>
  <view class="commitOrder">
    <!-- 收货地址区域 -->
    <shipping-address/>

    <!-- 商品列表 -->
    <goods-item v-for="(goods, index) in goodsList" :key="goods.goodsId" :goods="goods" page="commitOrder"/>

    <!-- 结算区域 -->
    <settle page="commitOrder" :totalPrice="order.totalPrice"/>

    <!-- 支付面板 -->
    <AtActionSheet
      :isOpened="isOpend"
      cancelText="取消"
      title="支付方式"
      :onCancel="handleClose"
      :onClose="handleClose"
    >
      <AtActionSheetItem :onClick="pay">
        余额({{ surplus || 0 }}元)
      </AtActionSheetItem>
    </AtActionSheet>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import "./index.less";
import { addOrder } from "@/apis/user";
import { toast } from '@/utils/toast';
import { showLoading } from '@/utils/loading';

export default {
  data() {
    return {
      // 是否显示支付的动作面板
      isOpend: false,
      // 当前订单
      order: {},
      // 订单中的商品
      goodsList: []
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["surplus"])
  },
  watch: {
    // 监视商品数量的变化，计算总金额
    goodsList: {
      deep: true,
      handler(value) {
        this.order.totalPrice = value.reduce((totalPrice, item) => {
          totalPrice += (item.goodsPrice * item.goodsCount)
          return totalPrice
      }, 0)
      }
    }
  },
  mounted() {
    this.$bus.$on("openActionSheet", () => {
      this.isOpend = true;
    });
  },
  methods: {
    ...mapMutations("user", { updateUser: "UPDATE_USER" }),
    handleClose() {
      this.isOpend = false;
    },
    async pay() {
      toast("正在支付...", {icon: "loading"});
      let message = ""
      if (this.surplus >= this.order.totalPrice) {
        // 订单状态为0表示未支付，0表示支付成功
        this.order.orderStatus = 1;
        message = "支付成功！"
        this.isOpend = false;
      } else message = "余额不足！"
      const user = await addOrder(this.user, this.order);
      this.updateUser(user);
      toast(message, {icon: message === "支付成功！" ? "success" : "error"});
    },
  },
  onLoad(options) {
    this.goodsList = JSON.parse(options.goodsList);
    // 封装订单对象
    this.order = {
      // 订单状态为0表示未支付，0表示支付成功
      orderStatus: 0,
      // 订单中的商品
      goodsList: this.goodsList,
      totalPrice: 0
    };
  }
};
</script>
