<template>
	<view class="container">
		<view class="tabs">
			<view class="statusbar" :style="{ height: statusBarHeight }"></view>
			<view>
				<view class="iconfont icon-back" @click="goList"></view>
			</view>
		</view>
		<!-- 详情信息 -->
		<view class="nursingStatDetail">
			<view class="referral">
				<view class="referral_1">
					<view>{{getDetails.nursingName}}</view>
					<view>
						<text>公立</text>
						<text>医保</text>
						<text>长护险</text>
					</view>
					<view>营业时间：07:30-23:00</view>
				</view>
				<view class="referral_2">
					<image class="imageRadio" :src="getDetails.nursingPicurl" mode=""></image>
				</view>
			</view>
			<!-- 介绍 -->
			<view class="referral_3">
				{{getDetails.nursingContent}}
			</view>
		</view>
		<!-- 地址 -->
		<view class="nursingStatDetail" style="margin-top: 40rpx; padding-bottom: 40rpx;">
			<view class="addr">
				<view class="addr_1">
					<view>护理站地址</view>
					<view>{{getDetails.nursingAddress}}</view>
				</view>
				<view class="addr_2">
					<view @click="getAddress">
						<image src="../../../static/index/dhtb.png" mode=""></image>
						导航
					</view>
					<view @click="getPhone">
						<image src="../../../static/index/dhtb2.png" mode=""></image>
						致电
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 顶部状态栏高度
				statusBarHeight: 20,
				//数据列表
				getDetails: "",
				//详情id
				detailId: ''
			}
		},
		onLoad(option) {
			this.detailId = option.id
			this.getDetail()
		},
		methods: {
			//跳转到列表
			goList() {
				uni.navigateBack({
					delta: 1
				})
			},
			//请求数据
			async getDetail() {
				const res = await this.$myRequest1({
					url: 'xhll/NursingStationList/selectStation',
					methods: 'POST',
					data: {
						nursingId: this.detailId
					}
				})
				console.log(res.data.selectStation, 'hushiliebiao');
				this.getDetails = res.data.selectStation[0]
			},
			//拨打电话
			getPhone() {
				uni.makePhoneCall({
					phoneNumber: '4009155291',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				})
			},
			//查看地理位置
			getAddress() {
				//暂定
			}
		},
		mounted() {
			// 在vue实例挂载时动态计算状态栏
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
		}
	}
</script>

<style lang="less" scoped>
	@import 'nursingStationDetail.less';
</style>
