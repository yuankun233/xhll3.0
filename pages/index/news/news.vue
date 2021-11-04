<template>
	<view  class="container">
		<!-- 导航 -->
		<!-- 顶部标题 -->
		<view class="top">
		    <view class="status_bar"></view>
			<view class="navtop">
				<view  @click="back" class="iconfont icon-back"></view>
				<view class="title">通知</view>
				<view @click="setListStatus">全部已读</view>
			</view>
		</view>
		<!-- 顶部导航和状态栏占位高度 -->
		<view class="heightBox">
		    <view class="status_bar"></view>
		</view>
		<!-- 列表 -->
		<view class="news" v-for="(item,index) in mesList" :key="index" @click="goDetail(index)">
			<view class="titleTime">9:30</view>
			<view class="news_box">
				<view><text>{{item.messageContent}}</text><text v-show="item.pushReadSrate === '未读'"></text></view>
				<view><text>查看详情</text><text class="iconfont icon-go"></text></view>
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
				title: '通知',
				//是否分享
				ifFx: true,
				//是否已读
				isRead:true,
				//消息列表
				mesList:[],
				//判断已读未读
				status:null
			}
		},
		onLoad () {
			
		},
		onShow() {
			this.getList();
			console.log(this.status)
		},
		components: {
			navB,
		},
		methods: {
			// 返回到首页
			back() {
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			//通知数据封装
			getList() {
				try {
					this.$myRequest3({
							url: 'PushMessage/api/PushMessage',
							methods: 'POST',
							data: {
								userId:1
							}
						}).then(res => {
							console.log(res.queryNews.response.data);
							//接口数据赋值
							this.mesList = res.queryNews.response.data
						})
					} catch (e) {
						//TODO handle the exception
					}
			},
			//通知数据封装
			setListStatus() {
				try {
					this.$myRequest3({
							url: '/PushMessage/api/pushuserId',
							methods: 'GET',
							data: {
								userId:1
							}
						}).then(res => {
							this.getList();
						})
					} catch (e) {
						//TODO handle the exception
					}
			},
			//跳转到详情
			goDetail(index) {
				uni.navigateTo({
					url:'/pages/index/newsDetail/newsDetail?mes='+this.mesList[index].messageContent
				})
				this.status = index
				console.log(this.status)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import 'news.less';
</style>
