<template>
    <view class="container">
        <image src="../static/login/loginbanner.png" mode="widthFix" :lazy-load="true" class="banner"></image>
        <!-- 登录表单 -->
        <view class="main">
            <!-- <image src="../static/launchpage.png" mode="" ></image> -->
            <view class="title">登录</view>

            <u-form :model="form" class="form">
                <view class="item">
                    <view class="label">账号/手机号</view>

                    <u-form-item :border-bottom="false" class="form_item">
                        <i class="iconfont icon-user"></i>
                        <u-input v-model="form.name" class="input" :height="inputheight" placeholder="输入手机号" :placeholder-style="inputplaceholder" />
                    </u-form-item>
                </view>

                <view class="item" v-if="pageState == 'password'">
                    <view class="label">密码</view>

                    <u-form-item :border-bottom="false" class="form_item">
                        <i class="iconfont icon-lock"></i>
                        <u-input type="password" v-model="form.password" class="input" :height="inputheight" placeholder="输入密码" :placeholder-style="inputplaceholder" />
                    </u-form-item>
                </view>

                <view class="item" v-if="pageState == 'authcode'">
                    <view class="label">验证码</view>
                    <view class="wrap">
                        <u-form-item :border-bottom="false" class="form_item" style="width:260rpx;">
                            <i class="iconfont icon-lock"></i>
                            <u-input v-model="form.authcode" class="input" :height="inputheight" placeholder="验证码" :placeholder-style="inputplaceholder" />
                        </u-form-item>
                        <button type="primary" class="getauthcode">获取验证码</button>
                    </view>
                </view>
            </u-form>

            <u-button type="primary" :ripple="true" class="loginbtn">登录</u-button>
            <view class="textline">
                <view class="line"></view>
                <view class="text">其他登录方式</view>
                <view class="line"></view>
            </view>
            <u-button type="primary" :ripple="true" class="logincheckout" v-if="pageState == 'password'" @click="checkoutLogin('authcode')">手机号一键登录</u-button>
            <u-button type="primary" :ripple="true" class="logincheckout" v-if="pageState == 'authcode'" @click="checkoutLogin('password')">返回账号密码登录</u-button>
        </view>
    </view>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            pageState: 'password',
            form: {
                tel: '',
                password: '',
                authcode: ''
            },
            inputheight: 92, //控制input的高度，和formitem保持一致
            inputplaceholder: 'color:rgba(0, 0, 0, 0.5099999904632568);font-size:32rpx;font-family:PingFang SC-Regular,PingFang SC'
        }
    },
    methods: {
        // 登录模式切换
        checkoutLogin(pageState) {
            this.pageState = pageState
        }
    }
}
</script>

<style lang="less">
.container {
    overflow: hidden;
    .banner {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: -999;
    }
    .main {
        position: relative;
        overflow: hidden;
        margin-top: 528rpx;
        padding: 0 94rpx 100rpx 96rpx; // 用于控制表单底部空白间距
        width: 750rpx;
        min-height: 805rpx;
        background: #fff;
        border-radius: 72rpx 72rpx 0rpx 0;
        opacity: 1;
        .title {
            margin-top: 96rpx;
            margin-bottom: 62rpx;
            text-align: center;
            font-size: 50rpx;
            font-family: PingFang SC-Light;
            color: #26486f;
        }
        // 表单样式
        .form {
            .item {
                .label {
                    font-size: 32rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #000000;
                    line-height: 38px;
                }

                .form_item {
                    padding: unset; //清除自带边距
                    padding: 0 32rpx;
                    width: 560rpx;
                    height: 96rpx;
                    background: rgba(153, 153, 153, 0.10000000149011612);
                    border-radius: 30rpx 30rpx 30rpx 30rpx;
                    border: 2rpx solid rgba(102, 102, 102, 0.20000000298023224);
                    .input {
                        // line-height: 96rpx;
                    }
                    .iconfont {
                        margin-right: 20rpx;
                    }
                }

                // wrap用于控制验证码按钮和输入框位置
                .wrap {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    // 获取验证码按钮
                    .getauthcode {
                        margin: unset;
                        width: 260rpx;
                        height: 96rpx;
                        background: #41d9cd;
                        font-size: 38rpx;
                        border-radius: 30rpx;
                        opacity: 1;
                    }
                }
            }
        }
        // 按钮

        .loginbtn {
            margin-top: 72rpx;
            width: 560rpx;
            height: 96rpx;
            background: #41d9cd;
            border-radius: 30rpx;
        }
        .textline {
            position: absolute;
            top: 758rpx;
            left: 90rpx;
            display: flex;
            width: 580rpx;
            align-items: center;
            .text {
                margin: 0 15rpx;
                font-family: PingFang SC;
                font-style: normal;
                font-weight: normal;
                font-size: 32rpx;
                line-height: 44rpx;
                text-align: center;
                color: #999999;
            }
            .line {
                height: 1rpx;
                width: 178rpx;
                background-color: #999999;
            }
        }

        .logincheckout {
            margin-top: 104rpx;
            width: 560rpx;
            height: 68rpx;
            background: #274c82;
            border-radius: 40rpx;
            opacity: 1;
        }
    }
}
</style>
