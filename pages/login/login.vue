<template>
    <view class="container">
        <image src="@/static/login/loginbanner.png" mode="widthFix" :lazy-load="true" class="banner"></image>
        <!-- 登录表单 -->
        <view class="main">
            <!-- <image src="../static/launchpage.png" mode="" ></image> -->
            <view class="title">登录</view>

            <u-form :model="form" class="form" ref="uForm" :error-type="errorType">
                <view class="item">
                    <view class="label">账号/手机号</view>

                    <u-form-item :border-bottom="false" class="form_item" prop="tel">
                        <i class="iconfont icon-user"></i>
                        <u-input v-model="form.tel" class="input" :height="inputheight" placeholder="输入手机号" :placeholder-style="inputplaceholder" maxlength="11" />
                    </u-form-item>
                </view>

                <view class="item" v-if="pageState == 'password'">
                    <view class="label">密码</view>

                    <u-form-item :border-bottom="false" class="form_item" prop="password">
                        <i class="iconfont icon-lock"></i>
                        <u-input type="password" v-model="form.password" class="input" :height="inputheight" placeholder="输入密码" :placeholder-style="inputplaceholder" />
                    </u-form-item>
                </view>

                <view class="item" v-if="pageState == 'authcode'">
                    <view class="label">验证码</view>
                    <view class="wrap">
                        <u-form-item :border-bottom="false" class="form_item" style="width:260rpx;" prop="authcode">
                            <i class="iconfont icon-lock"></i>
                            <u-input v-model="form.authcode" class="input" :height="inputheight" placeholder="验证码" :placeholder-style="inputplaceholder" />
                        </u-form-item>
                        <button type="primary" class="getauthcode">获取验证码</button>
                    </view>
                </view>
            </u-form>

            <u-button type="primary" :ripple="true" class="loginbtn" @click="login">登录</u-button>
            <view class="textline">
                <view class="line"></view>
                <view class="text">其他登录方式</view>
                <view class="line"></view>
            </view>
            <u-button type="primary" :ripple="true" class="logincheckout" v-if="pageState == 'authcode'" @click="checkoutLogin('password')">账号密码登录</u-button>
            <u-button type="primary" :ripple="true" class="logincheckout" v-if="pageState == 'password'" @click="checkoutLogin('authcode')">返回手机号一键登录</u-button>
        </view>
    </view>
</template>

<script>
import { errorType, rules } from '@/common/js/formrules.js' // 引入校验错误规则

export default {
    name: 'login',
    data() {
        return {
            pageState: 'authcode',
            form: {
                tel: '',
                password: '',
                authcode: ''
            },
            inputheight: 92, //控制input的高度，和formitem保持一致
            inputplaceholder: 'color:rgba(0, 0, 0, 0.5099999904632568);font-size:32rpx;font-family:PingFang SC-Regular,PingFang SC',

            // 表单校验错误提示
            errorType,
            // 表单校验规则
            rules
        }
    },
    methods: {
        // 登录模式切换
        checkoutLogin(pageState) {
            this.pageState = pageState
        },

        login() {
            this.$refs.uForm.validate(valid => {
                if (valid) {
                    console.log('验证通过')
                } else {
                    console.log('验证失败')
                }
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
