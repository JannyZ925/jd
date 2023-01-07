import Taro from '@tarojs/taro'

interface Options {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    data?: Object 
}

const defaultOptions: Options = {
    method: 'GET'
}

export const request = (url, options: Options = defaultOptions) => {
    return new Promise((resolve, reject) =>
        Taro.request({
            url,
            ...options,
            success: (res) => {
                resolve(res.data.data);
            },
        })
    );
}

export const get = (url, data):Promise<any> => {
    return request(url, { method: 'GET', data });
}

export const post = (url, data):Promise<any> => {
    return request(url, { method: 'POST', data });
}

export const put = (url, data):Promise<any> => {
    return request(url, { method: 'PUT', data });
}

export const del = (url, data):Promise<any> => {
    return request(url, { method: 'DELETE', data });
}




