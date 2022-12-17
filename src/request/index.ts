import Taro from '@tarojs/taro'

// 请求拦截器
const requestInterceptor = (chain) => {
    const requestParams = chain.requestParams;
    // console.log(chain);

    // 获取请求的url
    const { url } = requestParams
    // 配置基础路径
    const baseUrl = 'http://localhost:5200/api/jd-service'
    // 添加基础路径
    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
        requestParams.url = `${baseUrl}${url}`
    }

    return chain.proceed(requestParams)
}


// 响应拦截器
// const responseInterceptor = (chain) => {
//     const requestParams = chain.requestParams;

//     return chain.proceed(requestParams).then(res => {
//         // console.log('res:',res);
//         return null;
//     })
// }

// 添加请求拦截器
Taro.addInterceptor(requestInterceptor)
// 添加响应拦截器
// Taro.addInterceptor(responseInterceptor)