<template>
  <view class="my">
    <view class="login" v-if="showLogin">
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
    
    <view class="personal-page" v-else>
      <!-- 用户信息区域 -->
      <view class="user-info">
        <image class="user-avatar" :src="user.nickName || defaultUserInfo.avatar"></image>
        <text class="user-name">{{ user.nickName || defaultUserInfo.nickName }}</text>
      </view>
  
      <!-- 面板区域 -->
      <view class="panel-list">
        <!-- 第一个面板 -->
        <view class="panel1">
          <view class="panel-body">
            <view class="panel-item" @tap="goToStoredGoods">
              <text>{{ storedGoods.length }}</text>
              <text>收藏的商品</text>
            </view>
            <view class="panel-item" @tap="goToLookedGoods">
              <text>{{ lookedGoods.length }}</text>
              <text>足迹</text>
            </view>
          </view>
        </view>
  
        <!-- 第二个面板 -->
        <view class="panel2">
          <view class="panel-title">我的订单</view>
          <view class="panel-body">
            <view class="panel-item">
              <image class="item-img" src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/my/icons/1.png" mode=""></image>
              <text>待付款</text>
            </view>
            <view class="panel-item">
              <image class="item-img" src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/my/icons/2.png" mode=""></image>
              <text>待收货</text>
            </view>
            <view class="panel-item">
              <image class="item-img" src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/my/icons/3.png"></image>
              <text>退款/退货</text>
            </view>
            <view class="panel-item">
              <image class="item-img" src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/my/icons/4.png"></image>
              <text>全部订单</text>
            </view>
          </view>
        </view>
  
        <!-- 第三个面板 -->
        <view class="panel3">
          <view class="panel-item">
            <text>收货地址</text>
            <view class='at-icon at-icon-chevron-right'></view>
          </view>
          <view class="panel-item" @tap="logout">
            <text>退出登录</text>
            <view class='at-icon at-icon-chevron-right'></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.less'
import { AtButton, AtSearchBar } from '@lexmin0412/taro-ui-vue'
import { login } from '@/apis/user';
import { showLoading, hideLoading } from "@/utils/loading";
import { toast } from "@/utils/toast";
import * as paths from "@/consts/path";
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data () {
    return {
      // 用户的登录/注册信息
      loginParams: {
        phone: '',
        password: ''
      },

      // 默认的用户信息
      defaultUserInfo: {
        avatar: 'https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/service-data/my/defaultAvatar.png',
        nickName: "哆啦"
      },

      // 是否显示输入登录信息的表单
      showLogin: !Taro.getStorageSync('user')
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapGetters('user', ['storedGoods', 'lookedGoods'])
  },
  methods: {
    ...mapMutations('user', { updateUser: 'UPDATEUSER'}),

    // 输入框的值改变
    onChange(stateName, value) {
      this.loginParams[stateName] = value;
    },

    async handleClickSubmitBtn() {
      showLoading("登录中...")
      const res = await login(this.loginParams)
      const icon = res.message === "登录成功！" ? 'success' : 'error'
      toast(res.message, { icon })
      if(icon === 'success') {
        this.updateUser(res.user)
        this.showLogin = false
      }
    },


    goToStoredGoods() {
      Taro.navigateTo({
        url: `${paths.STORED_GOODS}?storedGoods=${JSON.stringify(this.storedGoods)}`
      })
    },


    goToLookedGoods() {
      Taro.navigateTo({
        url: `${paths.LOOKED_GOODS}?lookedGoods=${JSON.stringify(this.lookedGoods)}`
      })
    },


    // 退出登录
    logout() {
      Taro.showModal({
        title: '确认退出？',
        success: (res) => {
          if(res.confirm) {
            this.updateUser({});
            this.showLogin = true;
          }
        }
      })
    }
  }
}
</script>
