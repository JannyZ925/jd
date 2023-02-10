<template>
  <view class="goods-item-container">
    <radio v-if="page==='cart'" color="#6495ED" :checked="goods.goodsState" @tap="changeGoodsState"/>
    <view class="goods-item">
      <view class="goods-img" @tap="handleClickImage(goods.goodsId)">
        <image class="goods-img" :src="goods.goodsSmallLogo || defaultImage"></image>
      </view>
      <view class="goods-info">
        <text class="goods-name">{{ goods.goodsName }}</text>
        <view>
          <text class="goods-price">￥{{ goods.goodsPrice }}</text>
          <AtInputNumber v-if="page==='cart' || page==='commitOrder'" :min="1" :value="goods.goodsCount" :onChange="changeGoodsCount.bind(this)"/>
          <text v-if="page==='order'">×{{ goods.goodsCount }}</text>
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
    // 传入一个页面名称的字符串,用于判断是否展示radio和数字输入框
    page: {
      type: String,
      default: "normal"
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
