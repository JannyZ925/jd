<template>
  <view class="my">
    <text>{{ msg }}</text>
    <AtButton type='primary'>按钮文案</AtButton>
  </view>
</template>

<script>
import './index.less'

import { AtButton } from 'taro-ui-vue'

export default {
  components: {
    AtButton,
  },
  data () {
    return {
      msg: '我的'
    }
  }
}
</script>
