<template>
  <view class="goods-item">
    <view class="goods-img" @tap="handleClickImage(goods.goodsId)">
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
import Taro from '@tarojs/taro'
import * as paths from "@/consts/path";
import { addLookedGoods } from "@/apis/user";
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
    }
  },
  methods: {
    ...mapMutations('user', {updateUser: 'UPDATE_USER'}),

    async handleClickImage(goodsId) {
      Taro.navigateTo({
        url: `${paths.GOODS_DETAIL}?goodsId=${goodsId}`
      })
      if(this.user) {
        const user = await addLookedGoods(this.user, this.goods.goodsId);
        this.updateUser(user)
      }
    }
  }
};
</script>
