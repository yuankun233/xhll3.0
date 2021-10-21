<template>
	<view class="container">
		<!-- 头部 -->
		<view class="BOX"  :style="{height: height_box +'px'}">
			<view>
				<navB :title="title" :ifFx="ifFx"></navB>
				<!-- 选项卡 -->
				<view style="width: 750rpx; background-color: #FFFFFF;">
					<view class="" style="width: 690rpx; margin-left:30rpx ;">
						<u-tabs-swiper ref="uTabs" :list="tabList" :is-scroll="false" :current="current"
							:active-item-style="barStyle" @change="tabsChange" :show-bar="false"></u-tabs-swiper>
					</view>
				</view>
			</view>
				<view class="swiper_box">
					<swiper class="swiper" :current="swiperCurrent" @change="getIndex" style="height: 100%;">
						<swiper-item class="swiper-item" v-for="(count,index) in 4" :key="this">
							<scroll-view @scrolltolower="onreachBottom" style="height: 100%;" scroll-y>
								<view class="orderList" v-for="(item,index) in list" :key="item.id">
									<view class="title">
										<view>{{item.serviceName}}</view>
										<view>{{item.status}}</view>
									</view>
									<view class="orderList_box">
										<view class="orderList_1">
											<image :src="item.servicePicurl" mode=""></image>
										</view>
										<view class="orderList_2">
											<text>{{item.serviceName}}</text>
											<text>{{item.servicePrice}}.00</text>
											<text>共一件</text>
										</view>
									</view>
									<view class="orderList_3">
										<view @click="goDetail(item.orderId)"
											:class="item.status === '已完成' || current ==3 ? qh : ''">
											{{item.status === '待支付'  && current ==0 ? ifStatusDfk : ifStatusDfw}}
										</view>
										<view v-show="ifshow">
											{{item.status === '待支付'? ifStatusDfk1 : ifStatusDfw1}}</view>
									</view>
								</view>
								<image v-show="list === undefined" class="zwImg" src="../../../static/my/ddzwy.png">
								</image>
								<view class="toLoad" v-show="data.currentPage != 1">
									{{isMore === 1 ? '没有更多了' : '正在加载....'}}</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
		</view>
	</view>
</template>

<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//数据列表
				list: [],
				//tab标题
				title: "订单列表",
				//是否分享
				ifFx: false,
				//判断条件
				ifStatusDfk: '取消订单',
				ifStatusDfw: '订单详情',
				ifStatusDfk1: '立即支付',
				ifStatusDfw1: '取消预约',
				ifshow: true,
				//请求参数
				data: {
					userId: 1,
					status: '',
					currentPage: 1
				},
				//tab列表
				tabList: [{
						name: '待付款'
					},
					{
						name: '待服务'
					},
					{
						name: '待评价'
					},
					{
						name: '全部订单'
					},
				],
				//默认选中
				current: 0,
				// swiper选中
				swiperCurrent: 0,
				// 滑块样式
				barStyle: {
					borderBottom: '4rpx solid #41D9CD',
					color: '#000000'
				},
				//样式
				qh: 'qh',
				//上拉加载判断
				isMore: 0,
				//大盒子高度
				height_box:'',
			}
		},
		//页面加载时请求数据
		onLoad(option) {
			this.current = option.id;
			this.swiperCurrent = option.id;
			this.ifStatus(option.id);
			this.getList();
		},
		//计算高度
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.height_box = res.windowHeight;//获取手机高度
				}
			})
		},
		methods: {
			//上拉加载
			onreachBottom() {
				this.data.currentPage = this.data.currentPage + 1;
				this.getListFy();
				console.log(this.list);
				if (this.list === undefined) {
					this.isMore = 1
				}
			},
			//请求列表
			async getList() {
				const res = await this.$myRequest1({
					url: 'xhll/order/selectOrder',
					methods: 'POST',
					data: {
						...this.data
					}
				})
				this.list = res.data.selectOrder.data;
			},
			//请求分页列表
			async getListFy() {
				const res = await this.$myRequest1({
					url: 'xhll/order/selectOrder',
					methods: 'POST',
					data: {
						...this.data
					}
				})
				var _this = this
				if (res.data.selectOrder.data === undefined) {
					this.isMore = 1
					return
				} else {
					_this.list = _this.list.concat(res.data.selectOrder.data);
				}
			},
			//判断请求状态
			ifStatus(index) {
				if (index == 3) {
					this.data.status = '';
					this.ifshow = false;
				} else if (index == 2) {
					this.data.status = '待评价';
					this.ifshow = false;
				} else if (index == 1) {
					this.data.status = '待服务';
					this.ifshow = true;
				} else if (index == 0) {
					this.data.status = '待支付';
					this.ifshow = true;
				}
			},
			//判断订单状态
			tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index;
				this.data.currentPage = 1
				this.ifStatus(index);
				this.getList();
			},
			//tab随着swiper一起走
			getIndex(e) {
				this.current = e.detail.current;
				this.data.currentPage = 1
				this.ifStatus(e.detail.current);
				this.getList();
			},
			//跳转订单详情
			goDetail(id) {
				if (this.list.status === "待支付") {

				} else {
					uni.navigateTo({
						url: '../orderDetail/orderDetail?orderId=' + id
					})
				}
			}
		},
		components: {
			navB,
		},
	}
</script>

<style lang="less" scoped>
	@import "orderList.less";
	.BOX {
		display: flex;
		flex-direction: column;
	}
</style>
