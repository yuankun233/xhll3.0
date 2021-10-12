<template>
    <view class="container">
        <uniNavBar style="border: none;" title="测试">
            <i class="iconfont icon-back" slot="left"></i>

        </uniNavBar>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    name: 'mynav',
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
    .iconfont {
        font-size: 60rpx;
        color: #666666;
        opacity: 1;
    }
}
.uni-navbar--border {
    border-bottom: unset !important;
}
</style>
