<template>
    <view class="container">
        <!-- 顶部背景和搜索框 -->
        <view class="top">
            <image src="../../static/community/community_banner.png" :lazy-load="true" mode="widthFix" class="banner"></image>
            <view class="search_box">
                <view class="flex">
                    <view class="search_input">
                        <i class="iconfont icon-a-sousuo1"></i>
                        <input type="text" value="" class="input" placeholder="大家最近都在关注的健康…" :placeholder-style="placeholder" />
                    </view>

                    <u-button type="primary" class="search_btn" :ripple="true">搜索</u-button>
                </view>
            </view>
        </view>

        <!-- 主要内容布局 -->
        <view class="main">
            <!-- 专科护理布局 -->
            <view class="title_item">
                <view class="left">
                    <view class="title">专科护理</view>
                    <view class="line"></view>
                </view>
                <view class="right">
                    所有项目
                    <i class="iconfont icon-arrow-r"></i>
                </view>
            </view>
            <view class="content1">
                <view class="left" @click="toServeCommunity()"><image src="../../static/community/fmtx.png" mode="widthFix" :lazy-load="true"></image></view>
                <view class="right">
                    <view class="option_item">
                        <view class="flex">
                            <image src="../../static/community/community_mini1.png" mode="widthFix" :lazy-load="true" class="limg"></image>
                            <view>
                                <view class="title">最新留言</view>
                                <view class="label">关注最新留言，掌握方法</view>
                            </view>
                        </view>

                        <image src="../../static/community/community_next.png" mode="widthFix" :lazy-load="true" class="rimg"></image>
                    </view>
                    <view class="option_item">
                        <view class="flex">
                            <image src="../../static/community/community_mini2.png" mode="widthFix" :lazy-load="true" class="limg"></image>
                            <view>
                                <view class="title">自我记录</view>
                                <view class="label">关注最新留言，掌握方法</view>
                            </view>
                        </view>

                        <image src="../../static/community/community_next.png" mode="widthFix" :lazy-load="true" class="rimg"></image>
                    </view>
                    <view class="option_item">
                        <view class="flex">
                            <image src="../../static/community/community_mini3.png" mode="widthFix" :lazy-load="true" class="limg"></image>
                            <view>
                                <view class="title">小护指导</view>
                                <view class="label">关注最新留言，掌握方法</view>
                            </view>
                        </view>

                        <image src="../../static/community/community_next.png" mode="widthFix" :lazy-load="true" class="rimg"></image>
                    </view>
                </view>
            </view>

            <!-- 其他专科布局 -->
            <view class="title_item" style="margin-top: 40rpx;">
                <view class="left">
                    <view class="title">其他专科</view>
                    <view class="line"></view>
                </view>
                <view class="right">
                    所有项目
                    <i class="iconfont icon-arrow-r"></i>
                </view>
            </view>
            <view class="content2">
                <view class="serveitem" v-for="item in List">
                    <view class="top">
                        <image :src="item.icon" mode="widthFix" :lazy-load="true" class="icon"></image>
                        <view class="title">{{ item.title }}</view>
                    </view>

                    <view class="text">{{ item.text }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 搜索框placeholder样式
            placeholder: 'font-size:24rpx;color:#333;font-family: PingFang SC-Light, PingFang SC;line-height:70rpx;font-weight: 300;',
            // 其他专科列表
            List: [
                {
                    title: 'PICC导管维护',
                    icon: '../../static/community/community_serveitem1.png',
                    text: 'PICC导管维护、术后维护、术后指导维护，身体检查。'
                },
                {
                    title: '造口术后护理',
                    icon: '../../static/community/community_serveitem2.png',
                    text: 'PICC导管维护、术后维护、术后指导维护，身体检查。'
                },
                {
                    title: '一些专科护理',
                    icon: '../../static/community/community_serveitem3.png',
                    text: 'PICC导管维护、术后维护、术后指导维护，身体检查。'
                },
                {
                    title: '一些专科护理',
                    icon: '../../static/community/community_serveitem4.png',
                    text: 'PICC导管维护、术后维护、术后指导维护，身体检查。'
                },
                {
                    title: 'PICC导管维护',
                    icon: '../../static/community/community_serveitem1.png',
                    text: 'PICC导管维护、术后维护、术后指导维护，身体检查。'
                },
                {
                    title: 'PICC导管维护',
                    icon: '../../static/community/community_serveitem1.png',
                    text: 'PICC导管维护、术后维护、术后指导维护，身体检查。'
                }
            ]
        }
    },
    methods:{
        toServeCommunity(){
            uni.navigateTo({
                url:"/pages/community/serveCommunity/serveCommunity"
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import 'community.less';
</style>
