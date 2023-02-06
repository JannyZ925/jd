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

// 加入购物车
export const addToCart = (user, goods) => {
    return put("/user/addToCart", {user, goods})
}

// 修改购物车中商品数量
export const updateGoodsCountInCart = (user, goods) => {
    return put("/user/updateGoodsCount", {user, goods})
}

// 修改购物车中商品选中状态
export const updateGoodsStateInCart = (user, goods) => {
    return put("/user/updateGoodsState", {user, goods})
}

// 修改购物车商品的全选状态
export const updateAllGoodsStateInCart = (user, isAllChecked) => {
    return put("/user/updateAllGoodsState", {user, isAllChecked })
}

// 修改用户的收货地址
export const updateShippingAddress = (user, address) => {
    return put("/user/updateShippingAddress", {user, address})
}

// 修改用户的账户余额
export const updateSurplus = (user, money) => {
    return put("/user/updateSurplus", {user, money})
}