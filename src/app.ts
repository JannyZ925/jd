import Vue from 'vue'
import './app.less'

const App = {
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('div', this.$slots.default)
  }
}

export default App
