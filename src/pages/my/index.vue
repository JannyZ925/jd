<template>
  <view class="my">
    <text>{{ msg }}</text>
    <AtButton type='primary'>按钮文案</AtButton>
    <AtSearchBar />
  </view>
</template>

<script>
import './index.less'

import { AtButton, AtSearchBar } from '@lexmin0412/taro-ui-vue'

export default {
  components: {
    AtButton,
    AtSearchBar
  },
  data () {
    return {
      msg: '我的'
    }
  }
}
</script>
