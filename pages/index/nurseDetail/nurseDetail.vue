<template>
	<view>
		<navB :title="title"></navB>
		<view class="nurseBox">
			<view class="index">
					<!-- 护士列表 -->
					<view class="nurseList">
						<!-- 头像名字介绍 -->
						<view class="nurseTop">
							<view class="nurseTop_1">
								<image :src="nurseList.touxianghttp"></image>
							</view>
							<view class="nurseTop_2">
								<view><text>{{nurseList.xingming}}</text><text>{{nurseList.zhandian}}</text></view>
								<view><text>{{nurseList.zhicheng}}</text>
									<!-- <text>骨科术后康复</text> -->
								</view>
							</view>
						</view>
						<!-- 服务介绍 -->
						<view class="serveIn">
							<text>职业年限</text><text>{{nurseList.gongzuonianxian}}年</text><text>好评率</text><text>98%</text><text>服务次数</text><text>{{nurseList.serveNum}}</text>
						</view>
						<!-- 介绍 -->
						<view class="textIn">{{nurseList.introduce}}</view>
					</view>
			</view>
			<!-- 服务数据 -->
			<view class="serveData">
				<view class="serveDataTitle">服务数据</view>
				<view class="serveData_1">
					<view>99.5%</view>
					<view>{{nurseList.serveNum}}</view>
					<view>10min</view>
				</view>
				<view class="serveData_2">
					<view>好评率</view>
					<view>服务人次</view>
					<view>响应时间</view>
				</view>
			</view>
			<!-- 服务评价 -->
			<view class="serveEvaluate">
				<!-- 标题 -->
				<view class="serveEvaluateTitle">
					<view><text>服务评价</text><text>（21）</text></view>
					<view>查看全部></view>
				</view>
				<!-- 信息 -->
				<view class="serveEvaluate_1" v-for="count in 3">
					<view>
						<image src="../../../static/index/da.png" mode=""></image>
					</view>
					<view>
						<view><text>小林</text><text>满意度</text>
							<image src="../../../static/index/xingxing.png" mode=""></image>
						</view>
						<view><text>类型：</text><text>腹膜透析</text></view>
					</view>
					<view>
						2021-8-20
					</view>
					<!-- 评论 -->
					<view class="serveText">
						<view>服务态度非常好</view>
					</view>
				</view>
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
				title: "护士详情",
				nurseList: [], //数据
				text: "", //简介
				nurseId:''//护士列表id
			}
		},
		onLoad(option) {
			this.nurseId = option.id
			this.getNursingList();
		},
		components: {
			navB,
		},
		methods: {
			async getNursingList() {
				const res = await this.$myRequest2({
					url: 'attendant/api/starteam',
					methods:'GET',
					data: {
						bianhao:this.nurseId
					}
				})
				console.log(res, 'hushiliebiao');
				this.nurseList = res[0]
			}
		}
	}
</script>

<style lang="less">
	@import "nurseDetail.less";
	
</style>
