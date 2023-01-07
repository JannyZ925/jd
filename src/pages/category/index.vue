<template>
  <view class="category">
    <!-- search组件 -->
    <search></search>

    <view class="scroll-view-container">
      <!-- 左侧滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true">
        <!-- 一级分类 -->
        <view :class="['category-level1', active === index1 ? 'active' : '']" v-for="(c1, index1) in categoryList" :key="c1.catId" @tap="changeCategory(index1)">
          {{c1.catName}}
        </view>
      </scroll-view>
  
      <!-- 右侧滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y="true">
        <!-- 二级分类，如果该二级分类有children属性才显示 -->
        <view class="category-level2" v-for="(c2, index2) in categoryLevel2" :key="c2.catId" v-show="'children' in c2">
          <view class="category-level2-name">
            / {{ c2.catName}} /
          </view>
          <!-- 三级分类 -->
          <view class="category-level3-list">
            <view class="category-level3" v-for="(c3, index3) in c2.children" :key="c3.catId" @tap="clickCategoryHandler(c3.catId)">
              <image class="category-level3-img" :src="c3.catImage" />
              <text class="category-level3-name">{{ c3.catName }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import "./index.less";
import Taro from "@tarojs/taro";
import { getCategoryList } from "@/apis/category";
import { showLoading, hideLoading } from "@/utils/loading";

export default {
  data() {
    return {
      // 分类数据
      categoryList: [],
      // 二级分类数据
      categoryLevel2: [],
      // 记录选择的一级分类索引
      active: 0
    };
  },
  methods: {
    // 修改一级分类
    changeCategory(index) {
      this.active = index;
      // 修改二级分类数据
      this.categoryLevel2 = this.categoryList[index].children
    },
    // 点击三级分类事件
    clickCategoryHandler(cid) {
      Taro.navigateTo({
        url: `../goodsList/index?cid=${cid}`
      })
    }
  },
  mounted() {
    // 显示加载提示框
    showLoading();

    // 发请求，给相应数据赋值
    Promise.all([getCategoryList()]).then(([categoryList]) => {
      this.categoryList = categoryList;
      // 默认二级分类为第一个一级分类下的children
      this.categoryLevel2 = categoryList[0].children
      // 请求完毕后关闭加载提示
      hideLoading();
    });
  },
};
</script>
