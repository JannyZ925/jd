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
          <view class="at-icon at-icon-shopping-cart"></view>
          <text>购物车</text>
        </view>
        <view class="nav-item">
          <view class="at-icon at-icon-star" v-if="!isStored" @tap="storeUpGoods"></view>
          <view class="at-icon at-icon-star-2" v-if="isStored" @tap="cancelStoreUpGoods"></view>
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
import Taro from "@tarojs/taro";
import { getGoodsDetail } from "@/apis/goods";
import { storeUpGoods, cancelStoreUpGoods } from "@/apis/user";
import { showLoading, hideLoading } from "@/utils/loading";
import { toast } from "@/utils/toast";
import * as paths from "@/consts/path";


export default {
  data() {
    return {
      // 商品详情
      goodsDetail: {},

      user: Taro.getStorageSync("user")
    };
  },

  watch: {
    user(value) {
      Taro.setStorageSync('user', value)
    }
  },

  computed: {
    isStored() {
      let flag = false;
      if(!this.goodsDetail.goodsId) return flag;
      if (this.user.hasOwnProperty("storedGoods")) {
        this.user.storedGoods.forEach((g) => {
          if (g.goodsId === Number(this.goodsDetail.goodsId)) {
            flag = true;
          }
        });
      }
      return flag;
    }
  },

  methods: {
    async getGoodsDetail(goodsId) {
      showLoading();
      // 请求商品详情数据
      const [res] = await getGoodsDetail(goodsId);
      // 解决图片底部有空隙的问题
      if (res) {
        res.goodsIntroduce = res.goodsIntroduce.replace(/<img /g,'<img style="vertical-align: bottom;" ');
      }
      this.goodsDetail = res;
      hideLoading();
    },

    // 预览图片
    previewImage(index) {
      Taro.previewImage({
        current: index,
        urls: this.goodsDetail.pics.map((x) => x.picsBig),
      });
    },

    // 收藏商品
    async storeUpGoods() {
      if(!this.user) {
        toast('请先登录！', { icon: 'error'});
        setTimeout(() => {
          Taro.switchTab({url: paths.MY})
        }, 1000)
        return;
      }
      this.user = await storeUpGoods(this.user, this.goodsDetail.goodsId);
      toast('已收藏！')
    },

    // 取消收藏
    async cancelStoreUpGoods() {
      this.user = await cancelStoreUpGoods(this.user, this.goodsDetail.goodsId);
      toast('已取消！')
    },
  },

  onLoad(options) {
    this.getGoodsDetail(options.goodsId);
  },
};
</script>
