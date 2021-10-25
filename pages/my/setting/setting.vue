<template>
    <view class="container">
        <my-nav :title="nav_title"></my-nav>

        <u-button type="error" class="btn" v-if="isLogin">退出登录</u-button>
        <u-button type="primary" class="btn" v-else>登录</u-button>
        <u-modal v-model="show" content="是否退出登录？" @confirm="exit" :show-cancel-button="true"></u-modal>
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
            try{
                const res = uni.removeStorageSync('user')
                if(res){
                    uni.showToast({
                        title:"已退出登录",
                        icon:"none",
                        duration:1000,
                        success: () => {
                           setTimeout(()=>{
                               uni.reLaunch({
                                   url:"/pages/index/index"
                               })
                           }) 
                        }
                    })
                }
            }catch(e){
                //TODO handle the exception
            }
           
        }
    },
    onLoad: () => {
        try {
            // 获取用户信息本地储存
            const res = uni.getStorageSync('user')
            console.log(res)
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
