import Taro from "@tarojs/taro";

export default {
    namespaced: true,

    state: {
        user: Taro.getStorageSync('user') || {}
    },

    getters: {
        storedGoods(state) {
            return state.user.storedGoods || []
        },
        lookedGoods(state) {
            return state.user.lookedGoods || []
        },
        cart(state) {
            return state.user.cart || []
        },
        totalCount(state) {
            return state.user.cart.length
        },
        checkedCount(state) {
            return state.user.cart.reduce((checkedCount, item) => {
                if (item.goodsState) checkedCount += 1
                return checkedCount
            }, 0)
        },
        shippingAddress(state) {
            return state.user.shippingAddress
        },
        surplus(state) {
            return state.user.surplus;
        },
        allOrders(state) {
            return state.user.orders;
        },
        ordersWaitingForPay(state) {
            return state.user.orders.filter(orderItem => {
                return orderItem.orderStatus === 0
            })
        },
        ordersWaitingForArrive(state) {
            return state.user.orders.filter(orderItem => {
                return orderItem.orderStatus === 1
            })
        }
    },

    mutations: {
        // 更新用户信息
        UPDATE_USER(state, value) {
            state.user = value;
            Taro.setStorageSync('user', state.user);
        }
    }
}