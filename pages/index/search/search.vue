<template>
    <view class="container">
        <!-- 顶部搜索框区域 -->
        <view class="search_box">
            <view class="input">
                <view class="iconfont icon-a-sousuo1" style="font-size: 56rpx;"></view>
                <input type="text" placeholder="请输入服务名称" />
            </view>
            <view class="cancel" @click="cancel">取消</view>
        </view>
        <!-- 搜索推荐 -->
        <view class="recommend">
            <view class="title">热门搜索</view>
            <view class="tagslist">
                <view class="tags" v-for="(item, index) in tags">
                    <image src="../../../static/index/fire.png" mode="widthFix"></image>
                    <view class="name">{{ item }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            tags: ['腹膜透析', '伤口换药', '造口护理']
        }
    },
    methods: {
        // 取消搜索，返回首页
        cancel() {
            uni.switchTab({
                url: '/pages/index/index'
            })
        }
    }
}
</script>

<style lang="less">
page {
    background-color: #fff;
    font-weight: normal;
}
.container {
    .search_box {
        margin-top: 94rpx;
        padding: 0 42rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input {
            display: flex;
            align-items: center;
            width: 578rpx;
            height: 76rpx;
            background: #ffffff;
            border: 2rpx solid #41d9cd;
            box-sizing: border-box;
            border-radius: 100rpx;
            padding-left: 28rpx;
            .icon-a-sousuo1 {
                color: rgba(0, 0, 0, 0.5);
                line-height: 76rpx;
            }
            input {
                padding-left: 23rpx;
            }
        }
        .cancel {
            font-family: PingFang SC;
            font-size: 36rpx;
            color: #000000;
        }
    }
    // 推荐区域
    .recommend {
        margin-top: 66rpx;
        padding: 0 42rpx;
        .title {
            font-weight: 500;
            font-size: 32rpx;
            margin-bottom: 36rpx;
        }
        // 标签列表
        .tagslist {
            display: flex;
            .tags {
                margin-right: 28rpx;
                display: flex;
                align-items: center;
                padding: 0 20rpx;
                justify-content: space-between;
                width: 168rpx;
                height: 60rpx;
                background: #fafafa;
                border-radius: 30rpx;
                .name {
                    font-family: PingFang SC;
                    font-size: 24rpx;
                    line-height: 60rpx;
                }
                image {
                    width: 15rpx;
                }
            }
        }
    }
}
</style>
