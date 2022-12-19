<template>
  <view class="goods-item">
    <view class="goods-img">
      <image :src="goods.goodsSmallLogo || defaultImage" />
    </view>
    <view class="goods-info">
      <text class="goods-name">{{ goods.goodsName }}</text>
      <text class="goods-price">￥{{ goods.goodsPrice }}</text>
    </view>
  </view>
</template>

<script>
import "./index.less";

export default {
  name: "goods-item",
  data() {
    return {
      // 默认图片
      defaultImage: "https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/goods/defaultImage.gif",
    }
  },
  props: {
    // 商品
    goods: {
      type: Object,
      default: {}
    }
  }
};
</script>
