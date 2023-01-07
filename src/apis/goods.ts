import { get } from "@/utils/request";

type QueryOptions = {
    // 分类id
    cid: string,
    // 关键字
    keyword: string,
    // 是否为新品
    isNew: boolean,
    // 当前页码
    pageNum: number,
    // 每页显示的数据条数
    pageSize: number,
}

const defaultQueryOptions: QueryOptions = {
    cid: "",
    keyword: "",
    isNew: false,
    pageNum: 1,
    pageSize: 15,
}

type GetGoodsListRes = Goods[]

type Goods = {
    goodsId: number,
    catId: number,
    goodsName: string,
    goodsPrice: number,
    goodsNumber: number,
    goodsSmallLogo: string,
    isNew: boolean
}

// 获取商品列表
export const getGoodsList = (queryObj: QueryOptions = defaultQueryOptions): Promise<GetGoodsListRes> => {
    return get("/goods", queryObj);
}

// 获取商品详情
export const getGoodsDetail = (goodsId) => {
    return get("/goods/detail", {goodsId});
}

// 搜索商品
export const searchGoods = (keyword) => {
    return get('/goods/search', {keyword})
}