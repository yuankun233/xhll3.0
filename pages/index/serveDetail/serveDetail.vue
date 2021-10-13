<template>
    <view class="container">
        <!-- 页面主体结构 -->
        <!-- 顶部导航 -->
        <view class="top">
            <view class="statusbar" :style="{ height: statusBarHeight }"></view>
            <view class="navtop">
                <i class="iconfont icon-back"></i>
                <view class="options">
                    <view :class="navState == 1 ? 'option option_click' : 'option'" @click="navCheckout(1)">规格</view>
                    <view :class="navState == 2 ? 'option option_click' : 'option'" @click="navCheckout(2)">详情</view>
                </view>
            </view>
        </view>

        <view class="statusbar" :style="{ height: statusBarHeight }"></view>

        <!-- 地址信息 -->
        <view class="top_adress">
            <view class="notice">
                <i class="iconfont icon-notice"></i>
                <view class="text">为保证服务体验，轻按照流程提交您的预约信息</view>
            </view>
            <view class="adress_box">
                <view class="title">上门地址</view>
                <view class="flex">
                    <view class="adress">上海市 闵行区 紫月路1000号</view>
                    <view class="adress_select">更换></view>
                </view>
            </view>
        </view>

        <!-- 项目信息 -->
        <view class="top_servedetail">
            <view class="top">
                <image src="../../../static/index/logo.png" mode="widthFix" class="logo"></image>
                <view class="text">小护来了</view>
            </view>
            <view class="content">
                <image src="../../../static/index/project.png" mode="widthFix" class="left"></image>
                <view class="right">
                    <view class="project_name">腹膜透析</view>
                    <view class="flex">
                        <view class="project_num">已选×5</view>
                        <view class="project_price">￥299</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 服务信息选择 -->
        <view class="selectServeMessage">
            <view class="serve_patient item">
                <view class="label common_title">服务对象</view>
                <input type="text" value="" class="input" placeholder="请选择信息" :placeholder-style="placeholder" />
            </view>
            <view class="serve_patient item">
                <view class="label common_title">服务日期</view>
                <input type="text" value="" class="input" placeholder="请选择服务日期" :placeholder-style="placeholder" />
            </view>
            <view class="serve_patient item">
                <view class="label common_title">服务时间</view>
                <input type="text" value="" class="input" placeholder="请选择服务时间段" :placeholder-style="placeholder" />
            </view>
        </view>

        <!-- 服务次数选择 -->
        <view class="selectNum">
            <view class="title common_title">选择次数</view>
            <view class="handle">
                <i class="iconfont icon-add"></i>
                <view class="num">1</view>
                <i class="iconfont icon-sub"></i>
            </view>
        </view>

        <!-- 优惠券 -->
        <view class="selectNum discount">
            <view class="title common_title">优惠券</view>
            <input type="text" value="" class="input" placeholder="暂无优惠券" :placeholder-style="placeholder" />
        </view>
        <!-- 备注 -->
        <view class="remark">
            <view class="common_title title">备注信息</view>
            <u-input class="textarea" v-model="form.remark" type="textarea" placeholder="如需备注，请说明情况……" maxlength="84" />
        </view>

        <!-- 服务须知等信息 -->
        <view class="bottom_message">
            <view>
                <view class="title">耗材需求</view>
                <view class="content2">PICC维护包</view>
            </view>
            <view class="title">服务流程</view>
            <view class="content"><view v-for="item in 6" :key="this">1.预约上门</view></view>
            <view class="title">操作流程</view>
            <view class="content"><view v-for="item in 12" :key="this">1.核对患者直观信息及维护单</view></view>
            <view class="title">服务须知</view>
            <view class="content2"><view>护士上门为患者进行维护，需提供维护记录单，本服务只提供技术，耗材需自备</view></view>
            <image src="http://xiaohulaile.com/wxcx/tuikuan/tuikuan.png" style="width:662rpx;height:602rpx;margin-left:18rpx"></image>
        </view>

        <!-- 底部固定结算栏 -->
        <view class="bottom_wrap"></view>
        <view class="bottom_payBar">
            <view class="price">
                <view class="rmb">￥</view>
                <view class="price">299</view>
            </view>
            <view class="flex">
                <view class="detail">
                    明细
                    <i class="iconfont icon-zhankai"></i>
                </view>
                <u-button type="primary" class="submit" :ripple="true">提交订单</u-button>
            </view>
        </view>
        <!-- 页面主体结束 -->

        <!-- 页面隐藏结构 -->
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'

export default {
    data() {
        return {
            //当前页面表单数据
            form: {
                remark: ''
            },
            // 顶部状态栏高度
            statusBarHeight: 20,
            // 顶部导航规格和详情切换
            navState: 1, // 1 表示规格 2 表示详情
            // 服务信息选择输入框样式
            placeholder: 'font-size:30rpx;color:#999;font-family: PingFang SC-Regular, PingFang SC;letter-spacing: 1rpx;'
        }
    },
    components: {
        uniNavBar
    },
    methods: {
        navCheckout(state) {
            this.navState = state
        }
    },
    mounted() {
        // 在vue实例挂载时动态计算状态栏
        this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
    }
}
</script>

<style lang="less" scoped>
@import './serveDetail.less';
</style>
