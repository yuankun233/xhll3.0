<template>
    <view class="statusbar" :style="{ height: statusBarHeight }"></view>
</template>

<script>
export default {
    name: 'statusbar',
    data() {
        return {
            statusBarHeight: ''
        }
    },

    mounted() {
        // 在vue实例挂载时动态计算状态栏
        this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
    }
}
</script>

<style lang="less">
    .statusbar{
        position: fixed;
        top: 0;
        background-color: #007AFF;
        z-index: 999 !important;
    }
</style>
