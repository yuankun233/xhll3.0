<template>
    <view class="container">
        <!-- 修改密码页面 -->
        <my-nav :title="nav_title"></my-nav>
        <!-- 信息区域 -->
        <view class="form">
            <view class="box_1" v-if="!isVerify">
                <view class="text">已往您当前用户手机号发送验证码,</view>
                <view class="text">请输入验证码校验身份</view>
                <view class="form_item" @click="toChangePassword">
                    <u-form-item label="验证码" label-width="auto">
                        <u-input placeholder="请输入验证码" maxlength="4" v-model="form.code"></u-input>
						<u-button type="primary" style="margin: 0 30rpx;" v-if="resetSend">{{ timenum }}s</u-button>
						<u-button type="primary" style="margin: 0 30rpx; background: #41D9CD;"  @click="resetSendCode()" v-else>重新发送</u-button>
                       
                    </u-form-item>
                </view>
                <view class="nosend">
                     <u-button style="" type="primary" :ripple="true" @click="checkCode">提交</u-button>
                </view>
            </view>
            <view class="box_2" v-if="isVerify">
                <view class="text">请输入8-20位新密码：</view>
                <view class="form_item" @click="toChangePassword">
                    <u-form-item label="新密码" label-width="auto"><u-input placeholder="请输入新密码" v-model="form.newPassword" maxlength="20"></u-input></u-form-item>
                </view>
                <view class="form_item" @click="toChangePassword">
                    <u-form-item label="确认密码" label-width="auto"><u-input placeholder="请再次输入" v-model="form.resetPassword"></u-input></u-form-item>
                </view>
                <u-button type="primary" :ripple="true" style="margin: 150rpx 30rpx;background-color: #41D9CD;" @click="changePassword">确认</u-button>
            </view>
        </view>
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'
export default {
    data() {
        return {
            nav_title: '修改密码',
            // 表单数据
            form: {
                code: '',
                newPassword: '',
                resetPassword: ''
            },
            isVerify: false,
            // 当前用户手机号
            userPhone: '',
            // 当前用户id
            id: '',
            // 获取的验证码
            realcode: '',
            // 验证码倒计时
            timenum: 60,
            // 表示是否重新发送验证码
            resetSend: false
        }
    },
    components: {
        'my-nav': mynav
    },
    methods: {
        // 1 向当前手机发送验证码
        async sendCode() {
            try {
                const res = await this.$myRequest3({
                    url: '/enroll/api/passwordcode',
                    data: {
                        userPhone: this.userPhone
                    }
                })
                console.log(res)
                if (res) {
                    this.realcode = res.obj
                }
            } catch (e) {
                //TODO handle the exception
            }
        },
        // 2 校验验证码
        checkCode() {
            if (this.form.code == this.realcode) {
                // 验证通过
                uni.showToast({
                    title: '验证通过',
                    icon: 'success',
                    duration: 1000,
                    success: () => {
                        // 更改页面验证变量
                        this.isVerify = true
                    }
                })
            } else {
                // 验证失败
                uni.showToast({
                    title: '验证失败',
                    icon: 'error',
                    duration: 1000
                })
            }
        },
        // 3 重新发送验证码
        async resetSendCode() {
            try {
                const res = await this.$myRequest3({
                    url: '/enroll/api/passwordcode',
                    data: {
                        userPhone: this.userPhone
                    }
                })
                console.log(res)
                if (res) {
                    uni.showToast({
                        title: '发送成功',
                        duration: 1000,
                        icon: 'success',
                        success: () => {
                            this.realcode = res.obj
                            // 开启定时器
                            this.resetSend = true
                            let timer = setInterval(() => {
                                if (this.timenum == 1) {
                                    this.resetSend = false
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
        // 4 修改密码
        async changePassword() {
            // 校验密码格式,8-20位密码
            if (this.form.newPassword.length < 8) {
                // 验证失败
                uni.showToast({
                    title: '密码格式错误',
                    icon: 'error',
                    duration: 1000
                })
                return
            }

            // 校验通过
            if (this.form.newPassword == this.form.resetPassword) {
                try {
                    const res = await this.$myRequest3({
                        url: '/enroll/api/alterregist',
                        data: {
                            userId: this.id,
                            userPassWord: this.form.newPassword
                        }
                    })
                    console.log(res)
                    if (res.success) {
                        if (res.success === true) {
                        	uni.showToast({
                        		title: '修改成功需重新登陆',
                        		duration: 2000,
                        		icon: 'none',
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
            } else {
                // 验证失败
                uni.showToast({
                    title: '两次输入的密码不一致',
                    icon: 'error',
                    duration: 1000
                })
            }
        }
    },
    onLoad() {
        // 获取当前用户手机号
        try {
            const res = uni.getStorageSync('user')
            if (res) {
                this.userPhone = res.userPhone
                this.id = res.userId
                //发送验证码
                this.sendCode()
				//判断用户是否设置密码
				if(res.userPassWord === '') {
					this.nav_title = '设置密码';
				}
            }
        } catch (e) {
            //TODO handle the exception
        }
    }
}
</script>

<style lang="less">
.container {
    // 修改密码表单

    .form {
        margin-top: 30rpx;
        .text {
            padding-left: 30rpx;
            margin-bottom: 30rpx;
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
        .nosend {
            margin-top: 150rpx;
        }
    }
}
</style>
