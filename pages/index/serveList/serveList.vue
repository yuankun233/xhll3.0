<template>
	<view class="container">
		<!-- 导航 -->
		<navB :title="title" :ifFx="ifFx"></navB>
		<!-- 专科列表 -->
		<view class="list">
			<view class="list_1">专科列表</view>
			<view class="list_2"></view>
			<view class="mar"></view>
			<view class="list_3" v-for="item in zkserveList" :key="item.id" @click="goOrder(item.id)">
				<view class="list_3_1">
					<image :src="item.serviceMap" mode="widthFix"></image>
				</view>
				<view class="list_3_2">
					<view>{{ item.serviceName }}</view>
					<view>
						<view>
							<image src="../../../static/index/xingxing.png" mode="" v-for="count in 4" :key="this">
							</image>
							<image src="../../../static/index/xingxingwxz.png" mode=""></image>
							<text>4.0评分</text>
						</view>
					</view>
					<view>{{ item.serviceNum }}人已付款</view>
					<view>¥{{ item.servicePrice }}</view>
				</view>
				<view class="list_3_3">查看详情</view>
			</view>
		</view>

		<!-- 临床列表 -->
		<view class="list">
			<view class="list_1">临床列表</view>
			<view class="list_2"></view>
			<view class="mar"></view>
			<view class="list_3" v-for="item in lcserveList" :key="item.id" @click="goOrder(item.id)">
				<view class="list_3_1">
					<image :src="item.serviceMap" mode="widthFix"></image>
				</view>
				<view class="list_3_2">
					<view>{{ item.serviceName }}</view>
					<view>
						<view>
							<image src="../../../static/index/xingxing.png" mode="" v-for="count in 4" :key="this">
							</image>
							<image src="../../../static/index/xingxingwxz.png" mode=""></image>
							<text>4.0评分</text>
						</view>
					</view>
					<view>{{ item.serviceNum }}人已付款</view>
					<view>¥{{ item.servicePrice }}</view>
				</view>
				<view class="list_3_3">查看详情</view>
			</view>
		</view>

		<!-- 居家康复 -->
		<view class="list">
			<view class="list_1">居家康复</view>
			<view class="list_2"></view>
			<view class="mar"></view>
			<view class="list_3" v-for="item in jjserveList" :key="item.id" @click="goOrder(item.id)">
				<view class="list_3_1">
					<image :src="item.serviceMap" mode="widthFix"></image>
				</view>
				<view class="list_3_2">
					<view>{{ item.serviceName }}</view>
					<view>
						<view>
							<image src="../../../static/index/xingxing.png" mode="" v-for="count in 4" :key="this">
							</image>
							<image src="../../../static/index/xingxingwxz.png" mode=""></image>
							<text>4.0评分</text>
						</view>
					</view>
					<view>{{ item.serviceNum }}人已付款</view>
					<view>¥{{ item.servicePrice }}</view>
				</view>
				<view class="list_3_3">查看详情</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//tab标题
				title: '预约服务',
				//是否分享
				ifFx: false,
				//专科列表
				zkserveList: '',
				//临床列表
				lcserveList: '',
				//居家康复
				jjserveList: '',
			}
		},
		components: {
			navB,
		},
		onLoad() {
			this.getserveList()
		},
		methods: {
			//请求数据
			async getserveList() {
				const res = await this.$myRequest1({
					url: 'xhll/ServiceList/selectServiceList',
					methods: 'POST',
					data: {
						serviceCate: '专科护理'
					}
				})
				this.zkserveList = res.data.selectItems
				const res1 = await this.$myRequest1({
					url: 'xhll/ServiceList/selectServiceList',
					methods: 'POST',
					data: {
						serviceCate: '临床护理'
					}
				})
				this.lcserveList = res1.data.selectItems
				const res2 = await this.$myRequest1({
					url: 'xhll/ServiceList/selectServiceList',
					methods: 'POST',
					data: {
						serviceCate: '居家康复'
					}
				})
				this.jjserveList = res2.data.selectItems
				//返回上一个页面
			},

			//跳转项目详情
			goOrder(id) {
				uni.navigateTo({
					url: '/pages/index/serveDetail/serveDetail?projecetId=' + id
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		mounted() {}
	}
</script>

<style lang="less" scoped>
	@import 'serveList.less';
</style>
