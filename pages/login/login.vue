<template>
	<view class="container">
		<image src="@/static/login/loginbanner.png" mode="widthFix" :lazy-load="true" class="banner"></image>
		<!-- 登录表单 -->
		<view class="main">
			<!-- 返回按钮 -->
			<view class="backBtn" @click="back">返回</view>
			<!-- <image src="../static/launchpage.png" mode="" ></image> -->
			<view class="title">登录</view>

			<u-form :model="form" class="form" ref="uForm" :error-type="errorType" v-if="pageState == 'authcode'">
				<view class="item">
					<view class="label">账号/手机号</view>

					<u-form-item :border-bottom="false" class="form_item" prop="tel">
						<i class="iconfont icon-user"></i>
						<u-input v-model="form.tel" class="input" :height="inputheight" placeholder="输入手机号"
							:placeholder-style="inputplaceholder" maxlength="11" />
					</u-form-item>
				</view>

				<view class="item">
					<view class="label">验证码</view>
					<view class="wrap">
						<u-form-item :border-bottom="false" class="form_item" style="width:260rpx;" prop="authcode">
							<i class="iconfont icon-lock"></i>
							<u-input v-model="form.authcode" class="input" :height="inputheight" placeholder="验证码"
								:placeholder-style="inputplaceholder" maxlength="4" />
						</u-form-item>

						<button type="primary" class="getauthcode" v-if="isSend">{{ timenum }}s</button>
						<button type="primary" class="getauthcode" v-else @click="sendCode">获取验证码</button>
					</view>
				</view>
			</u-form>

			<u-form :model="form" class="form" ref="uForm" :error-type="errorType" v-if="pageState == 'password'">
				<view class="item">
					<view class="label">账号/手机号</view>

					<u-form-item :border-bottom="false" class="form_item" prop="tel">
						<i class="iconfont icon-user"></i>
						<u-input v-model="form.tel" class="input" :height="inputheight" placeholder="输入手机号"
							:placeholder-style="inputplaceholder" maxlength="11" />
					</u-form-item>
				</view>

				<view class="item">
					<view class="label">密码</view>

					<u-form-item :border-bottom="false" class="form_item" prop="password">
						<i class="iconfont icon-lock"></i>
						<u-input type="password" v-model="form.password" class="input" :height="inputheight"
							placeholder="输入密码" :placeholder-style="inputplaceholder" />
					</u-form-item>
				</view>
			</u-form>

			<u-button type="primary" :ripple="true" class="loginbtn" @click="login">登录</u-button>
			<view class="textline">
				<view class="line"></view>
				<view class="text">其他登录方式</view>
				<view class="line"></view>
			</view>
			<u-button type="primary" :ripple="true" class="logincheckout" v-if="pageState == 'authcode'"
				@click="checkoutLogin('password')">账号密码登录</u-button>
			<u-button type="primary" :ripple="true" class="logincheckout" v-if="pageState == 'password'"
				@click="checkoutLogin('authcode')">返回手机号一键登录</u-button>

			<!-- 用户协议 -->
			<view class="YH_login">
				<u-checkbox-group>
					<u-checkbox @change="checkboxChange" v-model="checked" icon-size="30rpx" active-color="#41d9cd"
						shape="circle"></u-checkbox>
				</u-checkbox-group>
				<text>
					注册/登录即表示您同意
					<text class="Text_1"><text @click="toUserArgument">《上海小护来了用户协议》</text>和<text
							@click="toUserPrivacy">《上海小护来了隐私政策》</text></text>
					小护来了向您保证：您的隐私绝不会外泄，请放心注册使用。
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		errorType,
		rules
	} from '@/common/js/formrules.js' // 引入校验错误规则

	export default {
		name: 'login',
		data() {
			return {
				timenum: 60,
				pageState: 'authcode', //控制页面的登录状态
				form: {
					tel: '',
					password: '',
					authcode: ''
				},
				inputheight: 92, //控制input的高度，和formitem保持一致
				inputplaceholder: 'color:rgba(0, 0, 0, 0.5099999904632568);font-size:32rpx;font-family:PingFang SC-Regular,PingFang SC',
				isSend: false,
				// 表单校验错误提示
				errorType,
				// 表单校验规则
				rules,
				//是否同意用户协议单选框
				checked: false,
				//是否选中同意协议
				isagree: false
			}
		},
		methods: {
			// 登录模式切换
			checkoutLogin(pageState) {
				// 切换模式
				this.pageState = pageState
				// 重置表单数据
				this.form = {
					tel: '',
					password: '',
					authcode: ''
				}
			},
			login() {
				if (this.isagree) {
					this.$refs.uForm.validate(valid => {
						if (valid) {
							console.log('验证通过,登录模式为', this.pageState)
							console.log('登录表单数据为', this.form)
							// 账号密码登录
							if (this.pageState == 'password') {
								this.passwordLogin()
							}
							// 手机号验证码登录
							if (this.pageState == 'authcode') {
								this.authcodeLogin()
							}
						} else {
							console.log('验证失败')
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请仔细阅读并勾选相关协议与政策'
					})
				}
			},
			// 手机号密码登录
			async passwordLogin() {
				try {
					const res = await this.$myRequest3({
						url: 'enroll/api/userregister',
						methods: 'POST',
						header: '',
						data: {
							userPhone: this.form.tel,
							userPassWord: this.form.password
						}
					})
					if (res.success == false) {
						uni.showToast({
							title: '手机号或密码输入错误',
							icon: 'none',
							duration: 500
						})
					}

					if (res.response.success) {
						uni.setStorage({
							key: 'user',
							data: res.response.data[0],
							success: res => {
								uni.showToast({
									title: '登录成功',
									icon: 'none',
									duration: 500,
									success() {
										setTimeout(() => {
											uni.switchTab({
												url: '../index/index'
											})
										}, 500)
									}
								})
							}
						})
						return
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			// 手机号验证码登录
			async authcodeLogin() {
				try {
					const res = await this.$myRequest3({
						url: 'enroll/api/userlogon',
						methods: 'POST',
						data: {
							userPhone: this.form.tel,
							code: this.form.authcode
						}
					})

					console.log(res.success)
					if (res.success == false) {
						uni.showToast({
							title: '手机号或验证码输入错误',
							icon: 'none',
							duration: 500
						})
						return
					}
					//如果验证成功把个人信息保存到本地然后跳转到首页
					if (res.response.success) {
						console.log(res.response.message)
						uni.setStorage({
							key: 'user',
							data: res.response.data[0],
							success: res => {
								uni.showToast({
									title: '登录成功',
									icon: 'none',
									duration: 500,
									success() {
										setTimeout(() => {
											uni.switchTab({
												url: '../index/index'
											})
										}, 500)
									}
								})
							}
						})
						return
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			// 获取验证码
			async sendCode() {
				// 手机号非空+格式校验
				let userPhone = this.form.tel
				if (userPhone == '') {
					uni.showToast({
						title: '请输入手机号',
						duration: 1000,
						icon: 'none'
					})

					return
				}
				let regExp = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/ // 手机验证正则
				let flag = regExp.test(userPhone)
				console.log(flag)
				if (flag == false) {
					uni.showToast({
						title: '手机号格式错误',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				// 获取验证码
				try {
					const res = await this.$myRequest3({
						url: 'enroll/api/checkmsg',
						data: {
							userPhone
						}
					})
					console.log('验证码发送结果:', res)

					if (res) {
						uni.showToast({
							title: '发送成功!',
							icon: 'success',
							success: () => {
								// 获取成功开启定时器
								this.isSend = true
								let timer = setInterval(() => {
									if (this.timenum == 1) {
										this.isSend = false
										this.timenum = 60
										return
									}
									this.timenum--
								}, 1000)
							}
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//勾选同意用户协议发生的事件
			checkboxChange() {
				if (!this.checked) {
					this.isagree = true
				}
			},
			// 跳转用户协议
			toUserArgument() {
				uni.navigateTo({
					url: '/pages/login/userArgument/userArgument?id=0'
				})
			},
			//跳转隐私政策
			toUserPrivacy() {
				uni.navigateTo({
					url: '/pages/login/userArgument/userArgument'
				})
			},
			// 返回
			back() {
				uni.switchTab({
					url: '../index/index'
				})
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		}
	}
</script>

<style lang="less">
	@import 'login.less';
</style>
