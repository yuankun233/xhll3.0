<template>
    <view class="container">
        <my-nav :title="nav_title"></my-nav>

        <!-- 设置中的设置项表单 -->
        <!-- 信息区域 -->
        <view class="setting_box">
            <view class="setting_item" @click="toAccountsSecurity">
                <view class="title">账号与安全</view>
                <text class="iconfont icon-go"></text>
            </view>

            <view class="setting_item" @click="toAboutXh">
                <view class="title">关于小护与帮助</view>
                <text class="iconfont icon-go"></text>
            </view>
        </view>

        <!-- 登录和退出登录按钮 -->
        <u-button type="error" class="btn" v-if="isLogin" @click="show = true">退出登录</u-button>
        <u-button type="primary" class="btn" v-else @click="login">前往登录</u-button>
        <u-modal v-model="show" content="是否退出登录？" @confirm="exit" :show-cancel-button="true"></u-modal>
        <!-- <u-button type="warning" @click="clear">清除缓存</u-button> -->
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'
export default {
    components: {
        'my-nav': mynav
    },
    data() {
        return {
            nav_title: '设置',
            isLogin: false,
            show: false
        }
    },
    methods: {
        //退出登录
        exit() {
            try {
                const res = uni.removeStorageSync('user')
                const res1 = uni.removeStorageSync('user_mes')

                uni.showToast({
                    title: '已退出登录',
                    icon: 'none',
                    duration: 1000,
                    success: () => {
                        setTimeout(() => {
                            uni.reLaunch({
                                url: '/pages/index/index'
                            })
                        }, 1000)
                    }
                })
            } catch (e) {
                //TODO handle the exception
            }
        },
        // 跳转到登录
        login() {
            uni.navigateTo({
                url: '/pages/login/login'
            })
        },
        // 跳转到账户与安全
        toAccountsSecurity() {
            uni.navigateTo({
                url: '/pages/my/accountsSecurity/accountsSecurity'
            })
        },
        // 跳转到关于小护与帮助
        toAboutXh() {
            uni.navigateTo({
                url: '/pages/my/aboutXh/aboutXh'
            })
        }
    },
    onLoad() {
        try {
            // 获取用户信息本地储存
            const res = uni.getStorageSync('user')
            if (res) {
                this.isLogin = true
            }
        } catch (e) {
            //TODO handle the exception
        }
    }
}
</script>

<style lang="less">
.container {
    // 设置项样式
    .setting_box {
        margin-top: 30rpx;
        background-color: #fff;
        .setting_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30rpx;
            border-bottom: 2rpx solid #f3f3f3;
            .title {
                font-size: 30rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                color: #000000;
                letter-spacing: 1rpx;
            }
        }
    }
    // 登录登出按钮
    .btn {
        width: 600rpx;
        margin: 60rpx auto;
    }
}
</style>
