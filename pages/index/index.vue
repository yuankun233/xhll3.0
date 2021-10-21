<template>
	<view class="container">
		<view class="indexBox">
			<view class="top_box"></view>
			<view class="top">
				<!-- 背景图片 -->
				<!-- 定位图标 -->
				<view class="location">
					<view>
						<view class="iconfont icon-dizhi"></view>
					</view>
					<view>{{address}}</view>
				</view>

				<!-- 搜索框 -->
				<view class="seek">
					<view>
						<view class="iconfont icon-a-sousuo1"></view>
					</view>
					<view><input type="text" placeholder="股骨颈术后" /></view>
				</view>
			</view>

			<!-- 标题 -->
			<view class="titleXh">小护来了,出院我也可以放心了！</view>

			<!-- 轮播图 -->
			<view class="I_swiper">
				<swiper autoplay="true" interval="2000" duration="500" circular="true" indicator-active-color="#000000"
					indicator-color="rgba(0, 0, 0, .3)">
					<block>
						<swiper-item>
							<image src="../../static/index/banner.png" @click="tobanner1" :lazy-load="true"></image>
						</swiper-item>
					</block>
					<block>
						<swiper-item>
							<image src="../../static/index/banneryyfw.png" @click="tobanner2" :lazy-load="true"></image>
						</swiper-item>
					</block>
					<block>
						<swiper-item>
							<image src="../../static/index/gyhd.png" @click="tobanner3" :lazy-load="true"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<!-- 功能 -->
			<view class="func">
				<view v-for="(item,index) in funlist" :key="item.title" @click="goSpecialty(index)">
					<view>
						<image :src="item.img" :lazy-load="true"></image>
					</view>
					<view>{{item.title}}</view>
					<view>{{item.mes}}</view>
				</view>
			</view>

			<!-- 专科护理 -->
			<view class="nurseTitle">专科护理</view>
			<view class="zkNurse">
				<view @click="goOrder(43)">
					<image src="../../static/index/fmtx.png" :lazy-load="true"></image>
					<view class="zkNurse_1">腹膜透析</view>
					<view class="zkNurse_2">查看详情 ></view>
					<view class="zkNurse_3">258/次</view>
				</view>
				<view>
					<view @click="goOrder(45)" class="zkNurseRight">
						<image src="../../static/index/picc.png" :lazy-load="true"></image>
						<view class="zkNurse_1">PICC</view>
					</view>
					<view @click="goOrder(44)" class="zkNurseRight">
						<image src="../../static/index/zkhl.png" :lazy-load="true"></image>
						<view class="zkNurseRight_2">造口护理</view>
					</view>
				</view>
			</view>

			<!-- 服务团队 -->
			<view class="nurseTitle">服务团队</view>
			<view class="nurseTeam">
				<view @click="goMes(0)" style="position: relative;">
					<image src="../../static/index/hzjg.png" :lazy-load="true"></image>
					<view class="zkNurse_1">合作机构</view>
				</view>
				<view @click="goMes(1)" style="position: relative;">
					<image src="../../static/index/mxhs.png" :lazy-load="true"></image>
					<view class="zkNurse_1">明星护士</view>
				</view>
			</view>

			<view class="nurseTitle">大家都在问</view>
			<view>
				<view class="wdMes" v-for="item in wdlist" :key="item.mes1">
					<view>
						<image :src="item.img1" :lazy-load="true"></image>
					</view>
					<view>{{item.mes1}}</view>
				</view>
			</view>

			<!-- 服务保障 -->
			<view class="pledge">
				<view>服务保障</view>
				<view>审核严格</view>
				<view>专业问诊</view>
				<view>流程规范</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				funlist: [{
						img: '../../static/index/wenzhen.png',
						title: '极速问诊',
						mes: '专人在线答疑'
					},
					{
						img: '../../static/index/ystb.png',
						title: '在线医生',
						mes: '一键语音问诊'
					},
					{
						img: '../../static/index/yyfw.png',
						title: '预约服务',
						mes: '按需求找服务'
					},
				],
				wdlist: [{
						img1: '../../static/index/wen.png',
						mes1: '小护你好：你们上门会带些什么工具？',


					},
					{
						img1: '../../static/index/da.png',
						mes1: '你好,我们护士上门会带一些健康测量的工具的,如血压器等。也会根据服务的内容准备好相应的物品。'
					},
					{
						img1: '../../static/index/wen.png',
						mes1: '小护你好,我表哥刚做完腹膜透析,那个肚子里的管子一直要放在里面的？全家人都很担心',
					},
					{
						img1: '../../static/index/da.png',
						mes1: '你好,一般来说腹膜透析是终生的治疗方案之一,但各项条件允许的话可以进行肾移植。那么可以停止腹膜透析治疗了。'
					}
				],
				address: '上海' //地址
			}
		},
		onLoad() {
			// this.getMap();
		},
		methods: {
			//调用方法获取当前地理位置
			getMap() {
				//uni自带获取地理位置的方法
			},
			//点击在线医生拨打电话和跳转到预约项目页面
			goSpecialty(index) {
				if (index == 0) {
					// 前往极速问诊
					uni.navigateTo({
						url: '/pages/index/onlineInquiry/onlineInquiry'
					})
				}
				if (index == 1) {
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
				}
				if (index == 2) {
					console.log(123)
					uni.navigateTo({
						url: '/pages/index/serveList/serveList'
					})
				}
			},
			//跳转项目详情
			goOrder(id) {
				uni.navigateTo({
					url: '/pages/index/serveDetail/serveDetail?projecetId=' + id
				})
			},
			//跳转合作机构和明星护士
			goMes(e) {
				if (e == 0) {
					uni.navigateTo({
						url: '/pages/index/nursingStationList/nursingStationList'
					})
				}
				if (e == 1) {
					uni.navigateTo({
						url: '/pages/index/nurseList/nurseList'
					})
				}
			},
			// 轮播图
			tobanner1() {
				uni.navigateTo({
					url: '/pages/index/companyProfile/companyProfile'
				})
			},
			// 轮播图
			tobanner2() {

			},
			// 轮播图
			tobanner3() {
				uni.navigateTo({
					url: '/pages/index/actionDetail/actionDetail'
				})
			}
		},
	}
</script>
<style lang="less" scoped>
	@import 'index.less';
</style>
