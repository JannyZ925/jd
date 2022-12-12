<template>
	<view>
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
import Taro from '@tarojs/taro'
// import { getBannerList } from '@/api/home.js'
export default {
	data() {
		return {
			title: '首页',
		}
	},
	methods: {
		// getBannerList() {
		// 	const result = Taro.request({
		// 		url: 'http://localhost:5200/api/jd-service/home/bannerList',
		// 		method: 'get'
		// 	})
		// 	console.log(result)
		// }
	},
	mounted() {
		// this.getBannerList()
	}
}
</script>

<style lang="less">

</style>
