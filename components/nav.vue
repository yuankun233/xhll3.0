<template>
    <view class="container">
        <view class="status_bar"></view>
        <uniNavBar border="true" :title="title" :statusBar="true" color="#333333" :border="false" class="mynav">
            <i class="iconfont icon-back" slot="left" @click="back"></i>
            <i class="iconfont icon-fenxiang" slot="right" v-show="ifFx"></i>
        </uniNavBar>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    name: 'mynav',
    props: ['title', 'ifFx'],
    data() {
        return {}
    },
    components: {
        uniNavBar
    },
    methods: {
        back() {
            console.log(1)
            uni.navigateBack({
                delta: 1
            })
        }
    }
}
</script>

<style lang="less">
.container {
    margin-top: 88rpx;
    position: relative;
    .mynav {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 99;
    }
    .icon-back {
        font-size: 60rpx;
        color: #666666;
        opacity: 1;
    }
    .icon-fenxiang {
        font-size: 60rpx;
        color: #666666;
        opacity: 1;
    }
}
</style>