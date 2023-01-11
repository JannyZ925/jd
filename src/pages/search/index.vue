<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-container">
      <AtSearchBar
        :value="keyword"
        :onChange="onChange.bind(this, 'keyword')"
        :onActionClick="()=>clickSearchButton(this.keyword)"
      />
    </view>

    <!-- 搜索历史 -->
    <view class="search-history-container" v-if="searchHistory.length !== 0 && keyword === ''">
      <view class="search-history-title">
        <text>搜索历史</text>
        <view class='at-icon at-icon-trash' @tap="clickCleanIconHandler"></view>
      </view>
      <view class="search-history-list">
        <AtTag
          class="search-history-item"
          v-for="(history, index) in histories"
          :key="index"
          circle
          type="primary"
          size="normal"
          :onClick="()=>goToGoodsList(history)"
          >{{ history }}
        </AtTag>
      </view>
    </view>

    <!-- 搜索结果 -->
    <scroll-view class="search-results-container">
      <view
        class="search-results-item"
        v-for="(result, index) in searchResults"
        :key="index"
        @tap="handleClickSearchResultItem(result.goodsId)"
      >
        <view class="goods-name">
          {{ result.goodsName }}
        </view>
        <view class='at-icon at-icon-chevron-right'></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import "./index.less";
import Taro from "@tarojs/taro";
import { searchGoods } from "@/apis/goods";
import { showLoading, hideLoading } from "@/utils/loading";
import * as paths from "@/consts/path";
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      // 搜索关键词
      keyword: "",
      // 搜索结果
      searchResults: [],
      // 搜索历史
      searchHistory: [],
    };
  },

  computed: {
    ...mapState('user', ['user']),

    // this.searchHistory.reverse() 反转搜索历史数组,最后搜索的排在最前面
    /**
     * 使用Set进行去重
     * new Set(this.searchHistory.reverse())将Array转换为Set，进行去重
     * ...将Set转换为Array
     */
    histories() {
      return [...new Set([...this.searchHistory].reverse())];
    },
  },

  watch: {
    searchHistory() {
      // 将搜索历史保存到本地
      Taro.setStorageSync("searchHistory", this.searchHistory);
    }
  },

  methods: {
    ...mapMutations('user', {updateUser: 'UPDATE_USER'}),

    // 获取搜索结果
    async getSearchResults() {
      showLoading();
      this.searchResults = await searchGoods(this.keyword);
      hideLoading();
    },

    // 搜索框输入值改变事件
    onChange(stateName, value) {
      // 将搜索框输入的值赋给keyword
      this[stateName] = value.trim();
      if(value.trim() === '') {
        this.searchResults = [] 
        return;
      }
      // 设置延时器，每0.5秒发一次请求，发请求之前要清除上一次的延时器
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getSearchResults();
      }, 500);
    },

    // 点击搜索按钮事件
    clickSearchButton(keyword) {
      // 将搜索关键词加入到搜索历史记录中
      this.searchHistory.push(this.keyword);
      this.goToGoodsList(keyword)
    },

    // 跳转到商品列表页面
    goToGoodsList(keyword) {
      Taro.navigateTo({
        url: `${paths.GOODS_LIST}?keyword=${keyword}`,
      });
    },

    async handleClickSearchResultItem(goodsId) {
      Taro.navigateTo({
        url: `${paths.GOODS_DETAIL}?goodsId=${goodsId}`
      })
      this.searchHistory.push(this.keyword);
      if(this.user) {
        const user = await addLookedGoods(this.user, goodsId);
        this.updateUser(user)
      }
    },

    // 点清空按钮事件
    clickCleanIconHandler() {
      Taro.showModal({
        content: "确认删除全部搜索历史？",
        success: (res) => {
          if (res.confirm) {
            // 将data中的搜索记录清空
            this.searchHistory = [];
          }
        },
      });
    },
  },

  mounted() {
    // 从本地获取搜索历史
    this.searchHistory = Taro.getStorageSync("searchHistory") || "[]";
  },
};
</script>
