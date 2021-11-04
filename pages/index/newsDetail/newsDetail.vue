<template>
	<view class="container">
		<navB :title="title" :ifFx="ifFx"></navB>
		<view class="message">
			<view>{{mes}}</view>
		</view>
	</view>
</template>

<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//tab标题
				title: "消息详情",
				//是否分享
				ifFx: false,
				//消息内容
				mes: null
			}
		},
		onLoad(option) {
			//给页面赋值内容
			this.mes = option.mes
			this.setStatus();
		},
		methods: {
			setStatus() {
				try {
					this.$myRequest3({
						url: 'PushMessage/api/pushmessageId',
						methods: 'GET',
						data: {
							messageId: 2
						}
					}).then(res => {
						
						// console.log(res.queryNews.response.data);
						//接口数据赋值
						// this.mesList = res.queryNews.response.data
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

</style>
