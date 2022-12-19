<template>
  <view>
    <view style="min-height: 100vh">
      <goods-item v-for="(goods, index) in goodsList" :key="goods.goodsId" :goods="goods"></goods-item>
    </view>
    <view class="tips" v-if="showTips">我是有底线的~</view>
  </view>
</template>

<script>
import "./index.less";
import mixin from '../../../mixin/index'

export default {
  
  mixins: [mixin],

  async onLoad(options) {
    // 获取页面的参数
    this.queryObj.cid = options.cid || "";
    this.queryObj.keyword = options.keyword || "";
    this.queryObj.isNew = options.isNew || false;
    // 发起请求
    await this.getGoodsList();
  },
};
</script>
