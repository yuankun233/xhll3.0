<template>
    <view class="container">
        <my-nav :title="nav_title" :isShare="false"></my-nav>
        <view class="main">
            <!-- <image src="../../../static/index/companyProfile.png" mode="widthFix" style="width: 750rpx;"></image> -->
            <view class="bannerbox">
                <image src="../../../static/index/companyProfile_banner1.png" mode="widthFix" :lazy-load="true" class="banner1"></image>
                <image src="../../../static/index/companyProfile_banner2.png" mode="widthFix" :lazy-load="true" class="banner2"></image>
            </view>
            <view class="text">
                <image src="../../../static/index/companyProfile_title1.png" mode="widthFix" :lazy-load="true" class="title"></image>
                <view class="content">
                    <view class="content_text">
                        我们《小护来了》是网约护士平台，也是大数据居家护理服务平台。2018年，在上海交通大学老年长期照护研究所的支持下，我们在上海诞生了。两年多来，我们一直在探索建立“互联网+整体护理”模式，为客户提供安全、专业、可靠、便捷的居家护理服务。
                    </view>
                </view>
            </view>

            <view class="text">
                <image src="../../../static/index/companyProfile_title2.png" mode="widthFix" :lazy-load="true" class="title"></image>
                <view class="content"><image src="../../../static/index/companyProfile_banner3.png" mode="widthFix" :lazy-load="true" class="banner"></image></view>
            </view>

            <view class="text">
                <image src="../../../static/index/companyProfile_title3.png" mode="widthFix" :lazy-load="true" class="title"></image>
                <view class="content">
                    <image src="../../../static/index/companyProfileText1.png" mode="widthFix" :lazy-load="true" class="banner"></image>
                    <image src="../../../static/index/companyProfileText2.png" mode="widthFix" :lazy-load="true" class="banner"></image>
                </view>
            </view>

            <view class="text textbottom">
                <image src="../../../static/index/companyProfile_title4.png" mode="widthFix" :lazy-load="true" class="title"></image>
                <view class="content contentbottom">
                    <image src="../../../static/index/companyProfileMap.png" mode="widthFix" :lazy-load="true" class="map left"></image>
                    <view class="right">
                        <view class="wrapblock"><view class="bottom_text">商业合作、下单咨询：</view></view>
                        <view class="tel">400-9155-291</view>
                        <view class="wrapblock"><view class="bottom_text">联系地址：上海市闵行区 紫月路1000号302</view></view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'
export default {
    data() {
        return {
            nav_title:"公司简介"
        }
    },
    methods: {},
    components: {
        'my-nav': mynav
    }
}
</script>

<style lang="less">
.container {
    .main {
        overflow: hidden;
        .bannerbox {
            position: relative;
            height: 468rpx;
            width: 100%;
            // margin-bottom: 52rpx;
            .banner1 {
                position: absolute;
                z-index: 5;
                width: 100%;
            }
            .banner2 {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10;
                top: 140rpx;
                height: 328rpx;
                width: 652rpx;
            }
        }
        .text {
            margin-top: 50rpx;
            .title {
                width: 196rpx;
                height: 46rpx;
                margin-bottom: 28rpx;
            }
            .content {
                padding: 0 30rpx;
                // 文字
                .content_text {
                    text-indent: 2.5em;
                    font-size: 28rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #000000;
                    line-height: 40rpx;
                }
                // 图片
                .banner {
                    width: 100%;
                }
            }
        }
        // 底部地图和文字布局
        .textbottom {
            margin-bottom: 162rpx;
            .map {
                width: 326rpx;
                height: 180rpx;
                opacity: 1;
                margin-right: 34rpx;
            }
            .contentbottom {
                display: flex;
                justify-content: space-between;
            }
            .bottom_text {
                width: 322rpx;
                font-size: 24rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                line-height: 28rpx;
            }
            .wrapblock {
                position: relative;
            }
            .bottom_text::before {
                content: '';
                position: absolute;
                left: -16rpx;
                top: 10rpx;
                display: block;
                height: 8rpx;
                width: 8rpx;
                background-color: #237cd2;
            }
            .tel {
                margin: 6rpx 0 22rpx 18rpx;
                font-size: 36rpx;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 42rpx;
            }
        }
    }
}
</style>
