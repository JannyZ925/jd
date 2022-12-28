<template>
  <view class="my">
    <AtForm class="form">
      <AtInput 
        name='phone' 
        title='手机号' 
        type='phone' 
        placeholder='请输入手机号' 
        :value="user.phone"
        :onChange="onChange.bind(this, 'phone')" 
        clear
      />
      <AtInput 
        name='password' 
        title='密码' 
        type='password' 
        placeholder='请输入密码' 
        :value="user.password"
        :onChange="onChange.bind(this, 'password')" 
        clear
      />
      <AtButton type="primary" class="submitBtn" :onClick="handleClickSubmitBtn">登录</AtButton>
    </AtForm>
    
    <view class="tip">未注册的手机号登录成功后将自动注册</view>
  </view>
</template>

<script>
import './index.less'

import { AtButton, AtSearchBar } from '@lexmin0412/taro-ui-vue'
import { request, loading } from "../../utils/request";

export default {
  data () {
    return {
      // 用户的登录/注册信息
      user: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    // 输入框的值改变
    onChange(stateName, value) {
      this.user[stateName] = value;
    },

    async handleClickSubmitBtn() {
      const res = await request('/user/add', "POST", this.user)
    }
  }
}
</script>
