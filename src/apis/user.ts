import { post, put, del } from "@/utils/request"

export const login = (user) => {
    return post('/user/login', user)
}

// 收藏商品
export const storeUpGoods = (user, goodsId) => {
    return put("/user/store", {user, goodsId})
}

// 取消收藏
export const cancelStoreUpGoods = (user, goodsId) => {
    return del("/user/cancelStore", {user, goodsId})
}

// 添加浏览记录
export const addLookedGoods = (user, goodsId) => {
    return put("/user/addLooked", {user, goodsId})
}