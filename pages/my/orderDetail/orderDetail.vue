<template>
    <view class="container">
        <!-- 导航 -->
        <my-nav :title="nav_title"></my-nav>
        <!-- 页面主体结构 -->
        <!-- 地址信息 -->
        <view class="top_adress">
            <view class="notice">
                <i class="iconfont icon-notice"></i>
                <view class="text">为保证服务体验，轻按照流程提交您的预约信息</view>
            </view>
            <view class="adress_box">
                <view class="title">上门地址</view>
                <view class="flex">
                    <view class="adress">{{ orderDetail.archivesRegion }}{{ orderDetail.archivesAddress }}</view>
                    <!-- <view class="adress_select">更换></view> -->
                </view>
            </view>
        </view>

        <!-- 项目信息 -->
        <view class="top_servedetail">
            <view class="top">
                <image src="../../../static/index/logo.png" mode="widthFix" class="logo" :lazy-load="true"></image>
                <view class="text">小护来了</view>
            </view>
            <view class="content">
                <image :src="orderDetail.servicePicurl" mode="widthFix" class="left" :lazy-load="true"></image>
                <view class="right">
                    <view class="project_name">{{ orderDetail.serviceName }}</view>
                    <view class="flex">
                        <view class="project_num">已选×{{ orderDetail.num }}</view>
                        <view class="project_price">￥{{ orderDetail.servicePrice }}</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 服务信息选择 -->
        <view class="selectServeMessage">
            <view class="serve_patient item">
                <view class="label common_title">服务对象</view>
                <input type="text" class="input" v-model="orderDetail.archivesName" :disabled="disabled" />
            </view>
            <view class="serve_patient item">
                <view class="label common_title">服务日期</view>
                <input type="text" class="input" v-model="orderDetail.startTime" :disabled="disabled" />
            </view>
            <view class="serve_patient item">
                <view class="label common_title">服务时间</view>
                <input type="text" class="input" v-model="orderDetail.timeSlot" :disabled="disabled" />
            </view>
        </view>

        <!-- 服务次数选择 -->
        <view class="selectNum">
            <view class="title common_title">服务次数</view>
            <view class="handle">
                <view class="num" style="width: 30rpx;">{{ orderDetail.num }}</view>
            </view>
        </view>

        <!-- 优惠券 -->
        <view class="selectNum discount">
            <view class="title common_title">优惠券</view>
            <input type="text" value="" class="input" placeholder="暂无优惠券" :placeholder-style="placeholder" :disabled="disabled" />
        </view>
        <!-- 备注 -->
        <view class="remark">
            <view class="common_title title">备注信息</view>
            <u-input class="textarea" v-model="orderDetail.chontentText" type="textarea" placeholder="如需备注，请说明情况……" maxlength="100" />
            <view class="text">温馨提示：详细的并请说明可以帮助我们更好的为您服务哦</view>
        </view>

        <!-- 底部固定结算栏 -->
        <view class="bottom_wrap"></view>
        <view class="bottom_payBar">
            <view class="price">
                <view class="rmb">￥</view>
                <view class="price">{{ orderDetail.orderFee }}</view>
            </view>
            <view class="flex">
                <view class="detail" @click="orderDetailPop = !orderDetailPop">
                    明细
                    <!-- <i class="iconfont icon-zhankai"></i> -->
                    <image src="../../../static/index/up.png" mode="widthFix" v-show="orderDetailPop == false" class="arrow_icon" :lazy-load="true"></image>
                    <image src="../../../static/index/down.png" mode="widthFix" v-show="orderDetailPop" class="arrow_icon" :lazy-load="true"></image>
                </view>
                <u-button type="primary" class="submit" :ripple="true" @click="callservice()">联系客服</u-button>
            </view>
        </view>
        <!-- 页面主体结束 -->

        <!-- 页面隐藏结构 -->
        <!-- 费用明细 -->
        <view class="priceDetail" v-show="orderDetailPop">
            <view class="toptitle">费用明细</view>
            <view class="flex">
                <view class="title">服务费×{{ orderDetail.num }}</view>
                <view class="price">￥{{ orderDetail.orderFee }}</view>
            </view>
            <view class="flex">
                <view class="title">优惠金额</view>
                <view class="price">-￥0.00</view>
            </view>
        </view>
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'

export default {
    components: {
        'my-nav': mynav
    },
    data() {
        return {
            // 页面接收的订单id
            orderId: '',
            // 订单详情信息
            orderDetail: '',
            //  以下都是页面布局样式所需要的数据变量
            // 导航标题
            nav_title: '订单详情',
            // 输入框是否禁用
            disabled: true,
            // 服务信息选择输入框样式
            placeholder: 'font-size:30rpx;color:#999;font-family: PingFang SC-Regular, PingFang SC;letter-spacing: 1rpx;',
            //患者信息
            picker_patient: [],
            // 订单明细弹出层
            orderDetailPop: false
        }
    },
    computed: {},
    methods: {
        // 1  获取服务详情
        getOrderDetail() {
            try {
                this.$myRequest1({
                    url: 'xhll/order/selectOrderDetails',
                    methods: 'POST',
                    data: {
                        orderId: this.orderId
                    }
                }).then(res => {
                    console.log('获取订单详情:', res)
                    this.orderDetail = res.data.selectOrderDetails
                    console.log(this.orderDetail)
                })
            } catch (e) {
                //TODO handle the exception
            }
        },
        // 2 联系客服
        callservice() {
            uni.makePhoneCall({
                phoneNumber: '4009155291',
                // 成功回调
                success: res => {
                    console.log('调用成功!')
                },
                // 失败回调
                fail: res => {
                    console.log('调用失败!') 
                }
            })

            plus.device.dial('4009155291', true)
        }
    },
    onLoad(options) {
        console.log(options)
        // 获取传过来的项目id
        this.orderId = options.orderId
        // 获取服务详情
        this.getOrderDetail()
    },
    mounted() {}
}
</script>

<style lang="less" scoped>
@import './orderDetail.less';
</style>
