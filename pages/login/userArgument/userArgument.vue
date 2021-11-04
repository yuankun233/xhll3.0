<template>
	<view class="container" style="text-indent: 20rpx;">
		<my-nav :title="nav_title"></my-nav>
		<rich-text :nodes="argument"></rich-text>
	</view>
</template>

<script>
	import mynav from '../../../components/mynav.vue'
	export default {
		data() {
			return {
				argument: '',
				nav_title: "",
				//判断是用户协议还是隐私政策
				isShow: null
			}
		},
		onLoad(option) {
			this.isShow = option.id
			// 获取用户协议
			this.getAgreement()
		},
		components: {
			'my-nav': mynav
		},
		methods: {
			//获取用户协议
			async getAgreement() {
				try {
					const res = await this.$myRequest1({
						url: 'xhll/info/selectInfo',
						method: 'get'
					})
					console.log(res)
					if (res) {
						if (this.isShow == 0) {
							this.argument = res.data.selectInfo[0].agreement
							this.nav_title = '用户协议'
						} else {
							this.argument = res.data.selectInfo[0].privacyPolicy
							this.nav_title = '隐私政策'
						}
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
	}
</script>

<style></style>
