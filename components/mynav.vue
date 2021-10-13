<template>
    <view class="container">
        <uniNavBar style="border: none;" :title="title" :statusBar="true">
            <i class="iconfont icon-back" slot="left"></i>
            <i class="iconfont icon-fenxiang" slot="right"></i>
        </uniNavBar>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    name: 'mynav',
    props:["title"],
    data() {
        return {}
    },
    components: {
        uniNavBar
    }
}
</script>

<style lang="less">
.container {
    .icon-back {
        font-size: 60rpx;
        color: #666666;
        opacity: 1;
    }
    .icon-fenxiang{
        font-size: 60rpx;
        color: #666666;
        opacity: 1;
    }
}

</style>
