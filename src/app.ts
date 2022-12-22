import Vue from 'vue'
import './app.less'
import './request'

import 'taro-ui/dist/style/index.scss'

// 注册全局组件
import GoodsItem from './components/goodsItem/index.vue';
import Search from './components/search/index.vue';
Vue.component('goods-item', GoodsItem)
Vue.component('search', Search)


const App = {
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('div', this.$slots.default)
  }
}

export default App
