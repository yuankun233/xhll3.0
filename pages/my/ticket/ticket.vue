<template>
	<view class="container">
		<!-- 头部 -->
		<navB :title="title" :ifFx="ifFx"></navB>
		<!-- 列表 -->
		<view class="BOX">
			<view class="addList_box" v-for="(item,index) in  0" :key='item.uCouId' @click="PickOn(index)">
				<view class="list_1">
					<view v-show="index == isPickOn">已选中</view>
					<view></view>
					<view><text>¥</text><text>{{item.couponsDiscounts}}</text></view>
					<view>优惠券</view>
				</view>
				<view class="list_2">
					<view>{{item.couponsName}}</view>
					<!-- <view>该优惠券仅限腹膜透析项目使用</view> -->
					<view>有效期：{{item.couponsDeadline}}</view>
				</view>
				<view class="list_3">立即使用
					<view></view>
				</view>
			</view>
		</view>
		<!-- 添加按钮 -->
		<view class="addBtn" v-show="status == 1">确定使用</view>
	</view>
</template>

<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//tab标题
				title: "优惠券",
				//是否分享
				ifFx: false,
				//判断用户是否选中优惠券
				isPickOn: null,
				//判断是从哪个页面跳转过来
				status: null,
				//优惠券列表
				list:null
			}
		},
		onLoad(option) {
			//0是从我的页面传过来的   1是从下单选择优惠券页面传过来的
			this.status = option.isStatus;
			//获取用户id
			const user = uni.getStorageSync('user');
			//在进入页面时加载优惠券
			this.getList(user.userId);
			console.log(this.list)
		},
		methods: {
			//点击优惠券发生的事件
			PickOn(index) {
				//判断如果是从我的页面跳转过来点击使用的时候跳转到预约服务列表
				if (this.status == 0) {
					uni.navigateTo({
						url: '/pages/index/serveList/serveList'
					})
				} else if (this.status == 1) {
					//根据点击的下标判断哪个选中状态
					this.isPickOn = index;
				}
			},
			//查询优惠券
			getList(id) {
				try {
					this.$myRequest1({
						url: 'xhll/coupons/selectUserCoupon',
						methods: 'POST',
						data: {
							userId:id ,
							userCouStatus:'未使用'
						}
					}).then(res => {
						console.log('获取优惠券列表:', res);
						this.list = res.data.selectUserCoupon;
					})
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		components: {
			navB,
		},
	}
</script>

<style lang="less" scoped>
	@import "ticket.less";
</style>
