import { request } from "@/utils/request";

// 获取轮播图数据
export const getBannerList = () => {
    // 发起请求，获取轮播图数据
    return request("/home/bannerList");
}

// 获取分类导航数据
export const getMenuList = () => {
    // 发起请求，获取分类导航数据
    return request("/home/menuList");
}

// 获取瀑布流数据
export const getFloorList = () => {
    // 发起请求，获取瀑布流数据
    return request("/home/floorList");
}