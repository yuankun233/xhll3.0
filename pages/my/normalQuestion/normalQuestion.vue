<template>
	<view class="container">
		<!-- 头部 -->
		<navB :title="title" :ifFx="ifFx"></navB>
		<!-- 内容 -->
		<view style="margin-top: 28rpx;">
			<u-collapse  :item-style="itemStyle">
					<u-collapse-item :index="index"  :title="item.head" v-for="(item, index) in List" :key="index" :open="item.open">
						<view class="collapse-item" style="padding-bottom: 20rpx;">
							{{item.body}}
						</view>
					</u-collapse-item>
				</u-collapse>
		</view>
	</view>
</template>

<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//数据列表
				List: [
					{
						head:'请问你们是什么性质的公司?主要服务内涵有哪些？',
						body:'你好！我们是《小护来了》网约护士平台，也是大数据居家护理服务平台。自成立以来我们一直在探索建立“互联网+整体护理”模式，为客户提供安全、专业、可靠、便捷的居家护理服务。我们已能实现为客户定制个性化护理项目包，具体包括专业护理、生活护理和康复指导等服务内容。',
						open:false
					},
					{
						head:'贵公司上门服务人员都是专业的吗？ ',
						body:'你好：旗下注册的护理人员和康复师均经过专业化培训，并有合法合规的上岗资格证明。',
						open:false
					},
					{
						head:'我表兄刚做完腹膜透析，那个肚子里的管子一直要放在里面的？全家人都很担心',
						body:'你好，一般来说腹膜透析是终生的治疗方案之一。但各项条件允许的话可以进行肾移植。那么可以停止腹膜透析治疗了。',
						open:false
					},
					{
						head:'兄长7个月前在医院做了POUT，那个埋在肉里的东西要紧吗？摸上去和肉长在一起了',
						body:'你好，这个是为了确保长期输液治疗而置管的。只要定期做好维护不会有风险的。治疗结束医生会取出的。',
						open:false
					},
					{
						head:'你们护士上门会带些什么工具？',
						body:'你好；我们护士上门会带一些健康测量的工具的，如血压器等。也会根据服务的内容准备好相应的物品。',
						open:false
					}
				],
				//内容样式
				itemStyle:{
					width:'100%',
					background:'#FFFFFF',
					paddingLeft:'30rpx',
					paddingRight:'34rpx',
					marginBottom:'2rpx',
					color:'#000000',
					fontSize:'30rpx'
					// lineHeight:'100rpx'
				},
				//tab标题
				title: "常见问题",
				//是否分享
				ifFx: false,
			}
		},
		methods: {

		},
		components: {
			navB,
		}
	}
</script>

<style lang="less" scoped>
	@import "normalQuestion.less";
</style>
