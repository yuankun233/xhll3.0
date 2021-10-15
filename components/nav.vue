<template>
    <view class="container">
        <uniNavBar border="true" :title="title" :statusBar="true" color="#333333">
            <i class="iconfont icon-back" slot="left" @click="back"></i>
            <i class="iconfont icon-fenxiang" slot="right" v-show="ifFx"></i>
        </uniNavBar>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    name: 'mynav',
    props:["title","ifFx"],
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
				delta:1
			})
		}
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