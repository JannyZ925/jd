<template>
  <!-- 收货地址区域 -->
  <view>
    <!-- 选择收货地址按钮，address为空时显示 -->
    <view class="choose-address" v-if="!shippingAddress">
      <button size="default" @tap="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 展示收货地址，address不为空时显示 -->
    <view class="shipping-address" v-else>
      <!-- 地址信息 -->
      <view class="address-info" @tap="chooseAddress">
        <text class="user-name">收货人：{{ shippingAddress.userName }}</text>
        <text class="user-phone">电话：{{ shippingAddress.telNumber }}</text>
        <text class="user-address"
          >收货地址：{{ shippingAddress.addressStr }}</text
        >
      </view>
      <!-- 展开图标 -->
      <view class="at-icon at-icon-chevron-right"></view>
    </view>

    <!-- 边框线 -->
    <image class="cart-border" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { mapGetters, mapMutations, mapState } from "vuex";
import "./index.less";
import { updateShippingAddress } from "@/apis/user";

export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["shippingAddress"]),
  },
  methods: {
    ...mapMutations("user", {updateUser: "UPDATE_USER"}),

    async chooseAddress() {
      const { errMsg, userName, telNumber, provinceName, cityName, countyName, detailInfo } = await Taro.chooseAddress()
      if(errMsg === "chooseAddress:ok") {
        const address = { userName, telNumber, addressStr: provinceName + cityName + countyName + detailInfo }
        const user = await updateShippingAddress(this.user, address)
        this.updateUser(user)
      }
    }
  }
};
</script>
