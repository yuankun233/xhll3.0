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
		
</template>

<script>
</script>

<style>
</style>
