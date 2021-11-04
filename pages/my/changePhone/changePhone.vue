<template>
	<view class="container">
		<!-- 修改密码页面 -->
		<my-nav :title="nav_title"></my-nav>
		<view class="text" style="margin-top: 40rpx;">更换手机后，下次登陆可使用新手机号登陆，当前手机号:</view>
		<view class="text" style="margin-bottom: 40rpx;">{{oldPhone}}</view>
		<view class="form_item">
			<u-form-item label="+86 >" label-width="auto">
				<u-input style="margin-left: 30rpx;" placeholder="请填写手机号码" maxlength="11" v-model="form.newPhone">
				</u-input>
			</u-form-item>
		</view>
		<u-button type="primary" style="margin: 0 30rpx;" @click="toNext">下一步</u-button>
	</view>
</template>

<script>
	import mynav from '@/components/mynav.vue'
	export default {
		data() {
			return {
				//导航栏标题
				nav_title: '修改手机号码',
				// 表单数据
				form: {
					newPhone: '',
				},
				//旧的手机号
				oldPhone: '',
			}
		},
		onLoad() {
			//获取本地储存手机号
			const res = uni.getStorageSync('user')
			console.log(res)
			this.oldPhone = res.userPhone;
		},
		methods: {
			//跳转到获取验证码页面
			toNext() {
				var isPhone = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/
				if (this.form.newPhone === '' || !isPhone.test(this.form.newPhone)) {
					uni.showToast({
						title: '手机号码格式不对',
						icon: 'none',
						duration: 2000
					})
				} else if (this.form.newPhone === this.oldPhone) {
					uni.showToast({
						title: '该手机号与当前绑定的手机号相同',
						icon: 'none',
						duration: 2000
					})
				} else {
					this.setCode();
				}
			},
			// 发送验证码
			async setCode() {
				try {
					const res = await this.$myRequest3({
						url: 'enroll/api/sendMsgphone',
						data: {
							userPhone: this.form.newPhone
						}
					})
					if (res) {
						console.log(res)
						uni.showToast({
							title: '已向填写手机号发送验证码',
							duration: 2000,
							icon: 'success',
						})
						uni.navigateTo({
							url: '/pages/my/phoneCode/phoneCode?phone=' + this.form.newPhone
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
		},
		components: {
			'my-nav': mynav
		},
	}
</script>

<style lang="less" scoped>
	.text {
		padding-left: 30rpx;
		font-size: 30rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		color: #000000;
		line-height: 35rpx;
		letter-spacing: 1rpx;
	}

	.form_item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}
</style>
