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
              if(item.goodsState) checkedCount += 1
              return checkedCount
            }, 0)
          },
        totalPrice(state) {
            return state.user.cart.reduce((totalPrice, item) => {
                if(item.goodsState) totalPrice += (item.goodsPrice * item.goodsCount)
                return totalPrice
            }, 0)
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