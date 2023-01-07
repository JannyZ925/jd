import Taro from "@tarojs/taro";

// 控制是否显示加载中的提示
export const showLoading = (title = "玩命加载中...") => {
    Taro.showLoading({
        title,
        mask: true,
    });
}

export const hideLoading = () => {
    Taro.hideLoading();
}