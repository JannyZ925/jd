import Taro from '@tarojs/taro'

export const request = (url, method) => {
    const defaultMethod = "GET"
    return new Promise((resolve, reject) =>
        Taro.request({
            url,
            method: method || defaultMethod,
            success: (res) => {
                resolve(res.data.data);
            },
        })
    );
}

// 控制是否显示加载中的提示
export const loading = (show, title = "玩命加载中...") => {
    if (show) {
        Taro.showLoading({
            title,
            mask: true,
        });
    } else Taro.hideLoading()
}