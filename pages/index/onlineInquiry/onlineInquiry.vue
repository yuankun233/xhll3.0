<template>
	<view class="container">
		<my-nav :title="nav_title"></my-nav>
		<image src="../../../static/index/onlineinquiry_banner.png" mode="widthFix" class="banner"></image>
		<view class="main">
			<view class="message">
				<u-input v-model="form.message" type="textarea" class="textarea" placeholder="请描述你的病情" />
			</view>
			<!-- 标签 -->
			<view class="tabs">
				<view class="item" v-for="(item, index) in tabs" :key="index" @click="addTag(index)">{{ item.label }}
				</view>
			</view>
			<!-- 上传图片信息 -->
			<u-upload ref="uUpload" :action="action" :auto-upload="true" max-count="6" name="image" max-size="3145728"
				:form-data="uppicdata" @on-success="onSuccess" @on-uploaded="onFullSuccess"
				@on-list-change="piclistchange" width="150rpx" height="150rpx" class="uploadImg"></u-upload>
			<view class="text">保护用户隐私，内容仅医生可见</view>
			<u-button type="primary" :ripple="true" class="nextStep" @click="submit()">下一步</u-button>
		</view>
		<!-- 提交成功弹出层 -->
		<u-popup ref="popup" mode="center" v-model="popup" class="popup" border-radius="12">
			<view class="content">
				<image src="../../../static/index/onlineinquiry_popupicon.png" mode="widthFix" :lazy-load="true"
					class="img"></image>
				<view class="bottom">
					<view class="text">提交成功，稍后会有专业护士联系您进行解答</view>
					<u-button type="primary" :ripple="true" class="backindex" @click="backindex">返回首页</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import mynav from '@/components/mynav.vue'
	export default {
		data() {
			return {
				nav_title: '图文问诊',
				form: {
					message: '',
					userId: '',
					interrogaPicture: ''
				},
				// 标签组
				tabs: [{
						label: '+症状描述',
						tag: '#症状描述#'
					},
					{
						label: '+患病时长',
						tag: '#患病时长#'
					},
					{
						label: '+医院检查',
						tag: '#医院检查#'
					},
					{
						label: '+用药情况',
						tag: '#用药情况#'
					}
				],
				// 图片上传携带参数
				uppicdata: {
					id: ''
				},
				// 图片是否上传完毕
				isUpload: true,
				// 图片上传服务器地址
				action: 'https://www.xiaohulaile.com/xh/p/alipay/Upload/uploads',
				// 控制弹出层
				popup: false
			}
		},
		components: {
			'my-nav': mynav
		},
		methods: {
			// 提交问诊
			async submit() {
				if (this.form.message == "") {
					uni.showToast({
						title: "请填写病情描述信息",
						icon: "none"
					})
					return
				}
				if (this.isUpload) {
					console.log('可以上传图片')
					try {
						const res = await this.$myRequest3({
							url: 'inguir/api/consultation',
							methods: 'POST',
							data: {
								interrogaIllness: this.form.message,
								userId: this.form.userId,
								interrogaPicture: this.form.interrogaPicture
							}
						})
						console.log(res)
						if (res.success) {
							this.popup = true
							this.form = {
								message: '',
								userId: '',
								interrogaPicture: ''
							}
						}
					} catch (e) {
						//TODO handle the exception
					}
					return
				}
				uni.showToast({
					title: '图片还未上传完毕',
					duration: 1000,
					icon: "none"
				})
			},
			// 返回首页
			backindex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 添加标签
			addTag(index) {
				// 添加标签
				this.form.message = this.form.message + this.tabs[index].tag + '  '
				// 去除标签
				this.tabs.splice(index, 1)
			},
			// 上传图片至服务器
			submitImg() {
				this.$refs.uUpload.upload() //上传图片
			},
			// 上传成功服务器返回的地址
			onSuccess(a, b, c, d) {
				// 图片地址
				console.log(a)

				// 处理上传的图片地址，拼接为字符串
				this.form.interrogaPicture = this.form.interrogaPicture + a + ','
			},

			//当图片增加或去除的时候，给一个变量代表所有图片是否都上传成功的标识，此时false就说明图片还在上传中，则不能提交表单
			piclistchange() {
				this.isUpload = false
			},
			//当所有图片上传成功时，flag变为true,可以提交表单
			onFullSuccess() {
				this.isUpload = true
			}
		},
		onLoad() {
			try {
				// 获取用户信息本地储存
				const res = uni.getStorageSync('user')
				console.log(res)
				if (res) {
					this.form.userId = res.userId
					this.uppicdata.id = res.userId
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
</script>

<style lang="less" scoped>
	@import 'onlineInquiry.less';
</style>
