import Vue from 'vue'
import TaroUIVue from '@lexmin0412/taro-ui-vue/src/index'
import { AtSearchBar, AtTag, AtForm, AtInput, AtInputNumber, AtActionSheet } from "@lexmin0412/taro-ui-vue";
import './request'
import store from './store'

import GoodsItem from './components/goodsItem/index.vue';
import Search from './components/search/index.vue';
import ShippingAddress from './components/shippingAddress/index.vue';
import Settle from './components/settle/index.vue';

import '@lexmin0412/taro-ui-vue/dist/style/index.scss'
import './app.less'

Vue.use(TaroUIVue)

// 注册全局组件
Vue.component(AtSearchBar)
Vue.component(AtTag)
Vue.component(AtForm)
Vue.component(AtInput)
Vue.component(AtInputNumber)
Vue.component(AtActionSheet)
Vue.component('goods-item', GoodsItem)
Vue.component('search', Search)
Vue.component('shipping-address', ShippingAddress)
Vue.component('settle', Settle)


const App = {
  store,
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('div', this.$slots.default)
  },
  beforeCreate () {
    Vue.prototype.$bus = this;
  }
}

export default App
