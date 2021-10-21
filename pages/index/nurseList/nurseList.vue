<template>
	<view>
		<navB :title="title"></navB>
		<view class="nurseBox">
			<view class="index">
				<!-- banner图片 -->
				<view class="bannerImg">
					<image src="../../../static/index/nurseBanner.png"></image>
				</view>
				<!-- 标题 -->
				<view class="nurseTitle">优选医生推荐</view>
				<!-- 护士列表 -->
				<view class="nurseList" v-for="item in nurseList" :key="item.bianhao" @click="goNurseMes(item.bianhao)">
					<!-- 头像名字介绍 -->
					<view class="nurseTop">
						<view class="nurseTop_1">
							<image :src="item.touxianghttp"></image>
						</view>
						<view class="nurseTop_2">
							<view><text>{{item.xingming}}</text><text>{{item.zhandian}}</text></view>
							<view><text>{{item.zhicheng}}</text>
								<!-- <text>骨科术后康复</text> -->
							</view>
						</view>
					</view>
					<!-- 服务介绍 -->
					<view class="serveIn">
						<text>职业年限</text><text>{{item.gongzuonianxian}}年</text><text>好评率</text><text>98%</text><text>服务次数</text><text>{{item.serveNum}}</text>
					</view>
					<!-- 介绍 -->
					<view class="textIn">{{item.introduce}}</view>
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
				title: "明星护士",
				nurseList: [], //数据
				text: "" //简介
			}
		},
		onLoad() {
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
					data:{
					}
				})
				this.nurseList = res
				console.log(res,'hushiliebiao');
			},
			goNurseMes(id) {
				uni.navigateTo({
					url:"../nurseDetail/nurseDetail?id="+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "nurseList.less";
</style>
