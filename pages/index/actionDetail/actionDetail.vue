<template>
    <view class="container">
        <my-nav :title="nav_title" :isShare="true"></my-nav>
        <image src="../../../static/index/warefal_banner.png" mode="widthFix" class="banner"></image>
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'
export default {
    data() {
        return {
            nav_title: '活动简介'
        }
    },
    components: {
        'my-nav': mynav
    },
    methods: {}
}
</script>

<style lang="less">
.container {
    .banner {
        width: 750rpx;
        height: 1334rpx;
    }
}
</style>
