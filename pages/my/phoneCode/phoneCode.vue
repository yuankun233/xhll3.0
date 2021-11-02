<template>
	<view class="container">
		<!-- 修改密码页面 -->
		<my-nav :title="nav_title"></my-nav>
		<view class="text">验证码已发送，请填写验证码</view>
		<view class="form_item">
			<u-form-item label="+86 >" label-width="auto">
				<u-input style="margin-left: 30rpx;" placeholder="请填写手机号码" maxlength="11" v-model="form.newPhone"
					:disabled="true"></u-input>
			</u-form-item>
			<u-form-item label="验证码" label-width="auto">
				<u-input style="margin-left: 30rpx;" placeholder="请填写验证码" maxlength="4" v-model="form.code"></u-input>
			</u-form-item>
		</view>
		<view style="color: #007AFF; font-size: 24rpx; margin: 10rpx 0rpx 30rpx 30rpx" @click="show = true">收不到验证码？
		</view>
		<u-action-sheet :list="list" v-model="show" @click="anewSetCode"></u-action-sheet>
		<u-button type="primary" style="margin: 100rpx 30rpx 30rpx 30rpx" @click=" getPhone">提交</u-button>
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
					code: ''
				},
				//弹出层
				list: [{
					text: '点击重新获取'
				}],
				//显示与关闭弹出层
				show: false
			}
		},
		onLoad(option) {
			console.log(option.phone);
			this.form.newPhone = option.phone;
		},
		methods: {
			//提交
			getPhone() {
				this.isCode()
			},
			//发送验证码
			anewSetCode() {
				this.setCode()
			},
			//重新发送验证码封装
			async setCode() {
				try {
					const res = await this.$myRequest3({
						url: 'enroll/api/sendMsgphone',
						data: {
							userPhone: this.form.newPhone
						}
					})
					if (res) {
						uni.showToast({
							title: '发送成功',
							duration: 2000,
							icon: 'success',
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//验证码校验封装
			async isCode() {
				try {
					const res = await this.$myRequest3({
						url: 'enroll/api/verifyCodephone',
						methods: 'POST',
						data: {
							userPhone: this.form.newPhone,
							code: this.form.code
						}
					})
					if (res) {
						if (res.success === false) {
							uni.showToast({
								title: '验证码错误',
								duration: 2000,
								icon: 'none',
							})
						} else if (res.success === true) {
							//校验成功后修改手机号
							this.setPhone()
						}
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//更改手机号码封装
			async setPhone() {
				const user = uni.getStorageSync('user')
				try {
					const res = await this.$myRequest3({
						url: '/enroll/api/modifyPhone',
						methods: 'POST',
						data: {
							userPhone: this.form.newPhone,
							userId: user.userId
						}
					})
					if (res) {
						console.log(res)
						if (res.success === true) {
							uni.showToast({
								title: '修改成功需重新登陆',
								duration: 2000,
								icon: 'success',
								success: () => {
									const res = uni.removeStorageSync('user')
									const res1 = uni.removeStorageSync('user_mes')
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/my/my'
										})
									}, 1000)
								}
							})
						} else if (res.success === false) {
							uni.showToast({
								title: '修改失败稍后再试',
								duration: 2000,
								icon: 'none',
							})
						}
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
		margin: 40rpx 0rpx 40rpx 0rpx;
	}

	.form_item {
		background-color: #fff;
		padding: 0 30rpx;
	}
</style>
