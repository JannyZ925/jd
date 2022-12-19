import Vue from 'vue'
import './app.less'
import './request'

// 注册全局组件goods-item
import GoodsItem from './components/goodsItem/index.vue';
Vue.component('goods-item', GoodsItem)

const App = {
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('div', this.$slots.default)
  }
}

export default App
