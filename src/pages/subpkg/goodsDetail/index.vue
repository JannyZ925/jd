<template>
  <view>
    <view style="background-color: white" v-if="goodsDetail">
      <!-- 轮播图区域 -->
      <swiper
        :indicatorDots="true"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
        :circular="true"
      >
        <swiper-item v-for="(item, index) in goodsDetail.pics" :key="index">
          <image :src="item.picsBig" @tap="previewImage(index)"></image>
        </swiper-item>
      </swiper>
  
      <!-- 商品信息区域 -->
      <view class="goods-info">
        <text class="goods-price">￥{{ goodsDetail.goodsPrice }}</text>
        <text class="goods-name">{{ goodsDetail.goodsName }}</text>
        <text class="goods-carriage">
          快递：
          {{
            goodsDetail.goodsCarriage === 0
              ? "免运费"
              : goodsDetail.goodsCarriage
          }}
        </text>
      </view>
  
      <!-- 商品详情信息 -->
      <view class="goods-detail">
        <rich-text :nodes="goodsDetail.goodsIntroduce"></rich-text>
      </view>
  
      <!-- 底部导航区域 -->
      <view class="goods-nav">
        <view class="nav-item">
          <view class='at-icon at-icon-shopping-cart'></view>
          <text>购物车</text>
        </view>
        <view class="nav-item">
          <view class="at-icon at-icon-star"></view>
          <text>收藏</text>
        </view>
        <view class="buttons">
          <button class="add-to-cart">加入购物车</button>
          <button class="buy-right-now">立即购买</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import "./index.less";
import Taro from '@tarojs/taro'
import { request, loading } from "../../../utils/request";

export default {
  data() {
    return {
      // 商品详情
      goodsDetail: {},
    };
  },

  methods: {
    async getGoodsDetail(goodsId) {
      loading(true);
      // 请求商品详情数据
      const [res] = await request(`/goods/detail?goodsId=${goodsId}`);
      // 解决图片底部有空隙的问题
      if(res) {
        res.goodsIntroduce = res.goodsIntroduce.replace(/<img /g, '<img style="vertical-align: bottom;" ')
      }
      this.goodsDetail = res
      loading(false);
    },

    // 预览图片
    previewImage(index) {
      Taro.previewImage({
        current: index,
        urls: this.goodsDetail.pics.map(x => x.picsBig)
      })
    }
  },

  onLoad(options) {
    // console.log(options.goodsId)
    this.getGoodsDetail(options.goodsId)
  },
};
</script>
