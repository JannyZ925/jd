import Taro from "@tarojs/taro"

type IconType = 'success' | 'error' | 'loading' | 'none'

interface Options{
    icon?: IconType
    duration?: number
} 

const defaultOptions: Options = {
    icon: 'success', 
    duration: 1000
}

export const toast = (title: string, options = defaultOptions) => {    
    Taro.showToast({
        title,
        ...options
    })
}