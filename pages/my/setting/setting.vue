<template>
    <view class="container">
        <my-nav :title="nav_title"></my-nav>

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

                uni.showToast({
                    title: '已退出登录',
                    icon: 'none',
                    duration: 1000,
                    success: () => {
                        setTimeout(() => {
                            uni.reLaunch({
                                url: '/pages/index/index'
                            })
                        },1000)
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
    .btn {
        width: 600rpx;
        margin: 60rpx auto;
    }
}
</style>
