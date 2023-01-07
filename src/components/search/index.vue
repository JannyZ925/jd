<template>
  <view class="search-container">
    <view class="search-input" @tap="clickSearchInputHandler">
      <icon class="search-icon" type="search" size="20"/>
      <text class="search-placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
import "./index.less";
import Taro from '@tarojs/taro'
import * as paths from "@/consts/path";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    clickSearchInputHandler() {
      Taro.navigateTo({
        url: paths.SEARCH
      })
    }
  }
};
</script>
