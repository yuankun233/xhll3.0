<template>
	<view class="container">
		<navB :title="title" :ifFx="ifFx"></navB>
		<view class="banner">
			<view>
				<text>合作医院</text>
				<image src="../../../static/index/hezuojigoubanner.png" mode=""></image>
			</view>
			<view>
				<text>护理站</text>
				<image src="../../../static/index/hzjgbanner2.png" mode=""></image>
			</view>
		</view>
		<!-- 选项卡切换 -->
		<view class="swiperTabs" style="width: 750rpx; margin-left: 14rpx; margin-top: 20rpx;">
			<u-tabs name="name" :list="list" :current="current" @change="changeTabs" :bar-style="style" bar-width="28"
				bar-height="8" bg-color="#F5F5F5" active-color="#000000" inactive-color="#666666" gutter="30"
				:active-item-style="pad">
			</u-tabs>
		</view>
		<!-- 护理站列表 -->
		<view class="nursingStatList" v-for="(item,index) in nursingStatList" :key="item.id" @click="goDetail(item.id)">
			<view class="nursingStatList_1">
				<image :src="item.nursingPicurl" mode=""></image>
			</view>
			<view class="nursingStatList_2">
				<view>{{item.nursingName}}</view>
				<view>
					<image v-for="count in 4" :key="this" src="../../../static/index/xingxing.png" mode=""></image>
					<image src="../../../static/index/xingxingwxz.png" mode=""></image>
				</view>
				<!-- <view>距离：11.33km</view> -->
				<view>{{item.nursingAddress}}</view>
			</view>
			<view class="nursingStatList_3" >查看详情</view>
		</view>
		<!-- 小护logo -->
		<view class="xhLogo">
			<image src="../../../static/index/xhLogo.png" mode=""></image>
		</view>
		<view class="xhJs">
			<view></view>
			<view>小护来了,出院我也可以放心了</view>
			<view></view>
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
				title: "合作机构",
				//是否分享
				ifFx:false,
				nursingStatList: [], //数据
				text: "", //简介
				//选项卡切换
				list: [{
						name: '全部'
					}, {
						name: '黄浦区'
					}, {
						name: '静安区',
						id:1
					},
					{
						name: '徐汇区'
					},
					{
						name: '闵行区'
					},
					{
						name: '宝山区'
					},
					{
						name: '浦东新区'
					},
					{
						name: '嘉定区'
					},
					{
						name: '奉贤区'
					}
				],
				current: 0, //当前选中滑块
				fons: 18,
				//滑块样式
				style: {
					background: '#41D9CD',
				},
				//tab样式
				pad: {
				}
			}
		},
		onLoad() {
			this.getNursingStatList();
		},
		components: {
			navB,
		},
		methods: {
			//请求数据
			async getNursingStatList(id) {
				const res = await this.$myRequest1({
					url: 'xhll/NursingStationList/selectStation',
					methods:'POST'
				})
				//如果查看全部就重新赋值一遍然后跳出
				if(this.current == 0) {
					this.nursingStatList = res.data.selectStation;
					return
				}
				//重新赋值为了下面做过滤
				this.nursingStatList = res.data.selectStation;
				//根据地址过滤对应的
				var demo = this.nursingStatList.filter(item =>{
					if(this.list[this.current].name === item.nursingRegion.substring(item.nursingRegion.length-3)) {
						return true
					}
				})
				//过滤之后赋值给列表
				this.nursingStatList = demo;
			},
			//选项卡切换
			changeTabs(index) {
				this.current = index;
				this.getNursingStatList(index);
				
			},
			//跳转详情页
			goDetail(id) {
				uni.navigateTo({
					url:'../nursingStationDetail/nursingStationDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "nursingStationList.less";
</style>
