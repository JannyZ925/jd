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
        }
    },

    mutations: {
        // 更新用户信息
        UPDATEUSER(state, value) {
            state.user = value;
            Taro.setStorageSync('user', state.user);
        }
    }
}