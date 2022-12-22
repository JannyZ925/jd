<template>
  <view>
    <!-- search组件 -->
    <search></search>

    <!-- 轮播图区域 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :circular="true"
      :interval="3000"
    >
      <swiper-item v-for="(item, index) in bannerList" :key="item.goodsId">
        <image :src="item.imageUrl" />
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="menu-list">
      <view
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="item.id"
        @tap="clickMenuItemHandler(item)"
      >
        <image :src="item.imageUrl"></image>
      </view>
    </view>

    <!-- 瀑布流区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(floor, index) in floorList" :key="index">
        <!-- 楼层名 -->
        <image class="floor-title" :src="floor.floorTitle.imageUrl"></image>
        <!-- 商品列表 -->
        <view class="floor-img-box">
          <!-- 左边大盒子 -->
          <navigator class="left-img-box" :url="floor.productList[0].link">
            <image
              :src="floor.productList[0].imageUrl"
              :style="{ width: floor.productList[0].imageWidth / 2 + 'px' }"
              mode="widthFix"
            />
          </navigator>
          <!-- 右边四个小盒子 -->
          <view class="right-img-box">
            <navigator
              v-for="(product, index) in floor.productList"
              :key="index"
              v-show="index !== 0"
              :url="product.link"
            >
              <image
                :src="product.imageUrl"
                :style="{ width: product.imageWidth / 2 + 'px' }"
                mode="widthFix"
              />
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { request, loading } from "../../utils/request";
import "./index.less";

export default {
  data() {
    return {
      // 轮播图
      bannerList: [],
      // 分类导航
      menuList: [],
      // 瀑布流
      floorList: [],
    };
  },
  methods: {
    // 获取轮播图数据
    getBannerList() {
      // 发起请求，获取轮播图数据
      return request("/home/bannerList");
    },

    // 获取分类导航数据
    getMenuList() {
      // 发起请求，获取分类导航数据
      return request("/home/menuList");
    },

    // 获取瀑布流数据
    getFloorList() {
      // 发起请求，获取瀑布流数据
      return request("/home/floorList");
    },

    // 点击分类导航项的事件
    clickMenuItemHandler(item) {
      // 如果点击的是“分类”导航，则跳转到分类页面
      if (item.title === "分类") {
        Taro.navigateTo({ url: "/pages/subpkg/category/index" });
      }
    },
  },

  mounted() {
    // 提示加载中
    loading(true);

    // 发请求，给对应数据赋值
    Promise.all([
      this.getBannerList(),
      this.getMenuList(),
      this.getFloorList(),
    ]).then(([bannerList, menuList, floorList]) => {
      this.bannerList = bannerList;
      this.menuList = menuList;
      this.floorList = floorList;
      // 请求完毕后关闭加载中提示
      loading(false);
    });
  },
};
</script>