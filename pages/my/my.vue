<template>
	<view class="container">
		<!-- 头部 -->
		<view class="status_bar"></view>
		<view class="myMes">
			<view class="myMes_box">
				<view class="myMes_1">
					<view class="myMes_1_1">
						<text>暂定</text>
						<text>已认证</text>
					</view>
					<view class="myMes_1_2">
						这是你加入小护的第1天
					</view>
				</view>
				<view class="myMes_2">
					<image class="imageRadio" src="../../static/index/da.png" mode=""></image>
				</view>
			</view>
			<view class="myMes_box_1">
				<view class="yhq">
					<view>5</view>
					<view>优惠券</view>
				</view>
				<view class="yhq">
					<view>122</view>
					<view>积分</view>
				</view>
				<view class="yhq">
					<view>3</view>
					<view>关注</view>
				</view>
			</view>
		</view>
		<!-- 订单框架 -->
		<view class="orderMes">
			<view class="orderMes_box">
				<view class="orderMes_1" @click="goOrder(0)">
					<view class="iconfont icon-daifukuan"></view>
					<view>待付款</view>
				</view>
				<view class="orderMes_1" @click="goOrder(1)">
					<view class="iconfont icon-daifuwu"></view>
					<view>待服务</view>
				</view>
				<view class="orderMes_1" @click="goOrder(2)">
					<view class="iconfont icon-daipingjia "></view>
					<view>待评价</view>
				</view>
				<view class="orderMes_1" @click="goOrder(3)">
					<view class="iconfont icon-yiwancheng"></view>
					<view>全部订单</view>
				</view>
			</view>
		</view>
		<!-- 常用功能 -->
		<view class="inMes" v-for="(item,index) in inMes" :key="item.mes" @click="goFun(index)">
			<view class="inMes_box">
				<view :class="item.img"></view>
				<view>{{item.mes}}</view>
				<view class="iconfont icon-go"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inMes: [{
						img: "icon-ditu iconfont",
						mes: "常见问题"
					},
					{
						img: "icon-a-dizhi2 iconfont",
						mes: "地址管理"
					},
					{
						img: "icon-dadianhua iconfont",
						mes: "客服电话"
					},
					{
						img: "icon-shezhi iconfont",
						mes: "设置"
					},
				]
			}
		},
		methods: {
			//跳转功能
			goFun(index) {
				if (index == 3) {
					uni.navigateTo({
						url: "profileEdit/profileEdit"
					})
				} else if (index == 2) {
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
				} else if (index == 1) {
					uni.navigateTo({
						url: "adressList/adressList"
					})
				} else if (index == 0) {
					uni.navigateTo({
						url: "normalQuestion/normalQuestion"
					})
				}
			},
			// 跳转订单
			goOrder(index) {
				uni.navigateTo({
					url: 'orderList/orderList?id='+index
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "my.less";
</style>
