<template>
  <view class="goods-item-container">
    <radio v-if="isCart" color="#6495ED" :checked="goods.goodsState" @tap="changeGoodsState"/>
    <view class="goods-item">
      <view class="goods-img" @tap="handleClickImage(goods.goodsId)">
        <image class="goods-img" :src="goods.goodsSmallLogo || defaultImage"></image>
      </view>
      <view class="goods-info">
        <text class="goods-name">{{ goods.goodsName }}</text>
        <view>
          <text class="goods-price">￥{{ goods.goodsPrice }}</text>
          <AtInputNumber v-if="isCart" :min="1" :value="goods.goodsCount" :onChange="changeGoodsCount.bind(this)"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import "./index.less";
import Taro from '@tarojs/taro'
import * as paths from "@/consts/path";
import { updateGoodsCountInCart, updateGoodsStateInCart } from "@/apis/user";
import { mapMutations, mapState } from 'vuex';

export default {
  name: "goods-item",
  data() {
    return {
      // 默认图片
      defaultImage: "https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/goods/defaultImage.gif"
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  props: {
    // 商品
    goods: {
      type: Object,
      default: {}
    },
    // 是否为购物车页面,用于判断是否展示radio和数字输入框
    isCart: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations('user', {updateUser: 'UPDATE_USER'}),

    async handleClickImage(goodsId) {
      Taro.navigateTo({
        url: `${paths.GOODS_DETAIL}?goodsId=${goodsId}`
      })
    },

    async changeGoodsCount(value) {
      this.goods.goodsCount = value;
      const user = await updateGoodsCountInCart(this.user, this.goods)
      this.updateUser(user)
    },

    async changeGoodsState() {
      this.goods.goodsState = !this.goods.goodsState;
      const user = await updateGoodsStateInCart(this.user, this.goods)
      this.updateUser(user)
    },
  }
};
</script>
