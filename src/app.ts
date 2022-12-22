import Vue from 'vue'
import TaroUIVue from '@lexmin0412/taro-ui-vue/src/index'
import { AtSearchBar, AtTag } from "@lexmin0412/taro-ui-vue";
import './request'

import GoodsItem from './components/goodsItem/index.vue';
import Search from './components/search/index.vue';

import '@lexmin0412/taro-ui-vue/dist/style/index.scss'
import './app.less'

Vue.use(TaroUIVue)

// 注册全局组件
Vue.component(AtSearchBar)
Vue.component(AtTag)
Vue.component('goods-item', GoodsItem)
Vue.component('search', Search)


const App = {
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('div', this.$slots.default)
  }
}

export default App
