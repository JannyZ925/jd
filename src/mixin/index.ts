import Taro from "@tarojs/taro";
import { request, loading } from "../utils/request";

export default {
    data() {
        return {
            // 商品列表
            goodsList: [],
            // // 默认图片
            // defaultImage: "https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/goods/defaultImage.gif",
            // 参数对象
            queryObj: {
                // 分类id
                cid: "",
                // 关键字
                keyword: "",
                // 是否为新品
                isNew: false,
                // 当前页码
                pageNum: 1,
                // 每页显示的数据条数
                pageSize: 15,
            },
            // 是否显示提示文字
            showTips: false,
        };
    },

    methods: {
        // 获取商品列表
        async getGoodsList() {
            loading(true);
            // 发请求，获取新数据
            const result = await request("/goods", "GET", this.queryObj);
            // 如果没有新的数据，则显示提示文字
            if (this.goodsList.length !== 0 && result.length === 0) this.showTips = true;
            // 整合新旧数据
            this.goodsList = [...this.goodsList, ...result];
            // 停止下拉刷新
            Taro.stopPullDownRefresh();
            // 关闭加载提示
            loading(false);
        }
    },

    // async onLoad(options) {
    //     // 获取页面的参数
    //     this.queryObj.cid = options.cid || "";
    //     this.queryObj.keyword = options.keyword || "";
    //     this.queryObj.isNew = options.isNew || false;
    //     // 发起请求
    //     await this.getGoodsList();
    // },

    // 触底事件
    onReachBottom() {
        // 页数加1，再次发起请求
        this.queryObj.pageNum += 1;
        this.getGoodsList();
    },

    // 下拉刷新事件
    onPullDownRefresh() {
        this.queryObj.pageNum = 1;
        // 清空商品列表
        this.goodsList = [];
        // 发起请求
        this.getGoodsList();
    }
}