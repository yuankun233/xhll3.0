<template>
    <view class="container">
        <!-- 页面主体结构 -->
        <!-- 状态栏组件 -->
        <statusbar></statusbar>

        <!-- 顶部导航 -->
        <view class="top">
            <view class="navtop">
                <i class="iconfont icon-back"></i>
                <view class="options">
                    <view :class="navState == 1 ? 'option option_click' : 'option'" @click="navCheckout(1)">规格</view>
                    <view :class="navState == 2 ? 'option option_click' : 'option'" @click="navCheckout(2)">详情</view>
                </view>
            </view>

            <view class="nav_wrap"></view>
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
                        <view class="project_num">已选×{{ form.num }}</view>
                        <view class="project_price">￥{{ form.projecetPrice }}</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 服务信息选择 -->
        <view class="selectServeMessage">
            <view class="serve_patient item" @click="picker.patient = true">
                <view class="label common_title">服务对象</view>
                <input type="text" class="input" placeholder="请选择信息" :placeholder-style="placeholder" :disabled="disabled" />
            </view>
            <view class="serve_patient item" @click="picker.date = true">
                <view class="label common_title">服务日期</view>
                <input type="text" class="input" v-model="form.date" placeholder="请选择服务日期" :placeholder-style="placeholder" :disabled="disabled" />
            </view>
            <view class="serve_patient item" @click="picker.time = true">
                <view class="label common_title">服务时间</view>
                <input type="text" v-model="form.timeSlot" class="input" placeholder="请选择服务时间段" :placeholder-style="placeholder" :disabled="disabled" />
            </view>
        </view>

        <!-- 服务次数选择 -->
        <view class="selectNum">
            <view class="title common_title">选择次数</view>
            <view class="handle">
                <!-- 数量增加按钮 -->
                <i class="iconfont icon-add" @click="changeNum('add')"></i>
                <view class="num" style="width: 30rpx;">{{ form.num }}</view>
                <!-- 数量减少按钮 -->
                <i class="iconfont icon-sub" @click="changeNum('sub')"></i>
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
        <i class="iconfont icon-ditu" style="font-size: 50rpx;color: #007AFF;"></i>
        <view class="bottom_wrap"></view>
        <view class="bottom_payBar">
            <view class="price">
                <view class="rmb">￥</view>
                <view class="price">{{ totalOrderFee }}</view>
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

        <!-- 选择器 -->
        <!-- 时间选择 -->
        <u-picker v-model="picker.date" mode="time" @confirm="pickerDate"></u-picker>

        <u-picker v-model="picker.time" mode="selector" :range="pickerDate_time" @confirm="pickerCallback"></u-picker>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
import statusbar from '@/components/statusbar.vue'
export default {
    data() {
        return {
            //当前页面表单数据
            form: {
                //手机号
                userPhone: '',
                //openid
                wxOpenId: '',
                //id
                userId: '',
                //用户IP
                userLastIp: '',
                //项目id
                projecetId: '',
                //项目价格
                projecetPrice: 66,
                //服务项目
                body: '',
                //服务次数
                num: 1,
                //患者表Id
                archiveId: '',
                //患者名称
                archiveName: '',
                //订单来源
                orderSource: '微信',
                //服务日期
                startTime: '',
                //服务时间
                timeSlot: '',
                //备注
                remarks: '',
                //订单价格
                // orderFee:this.data.total_fee,
                orderFee: 0, //订单价格
                remark: '' //备注
            },
            // 输入框是否禁用
            disabled: true,
            //  以下都是页面布局样式所需要的数据变量
            // 顶部状态栏高度
            statusBarHeight: 20,
            // 顶部导航规格和详情切换
            navState: 1, // 1 表示规格 2 表示详情
            // 服务信息选择输入框样式
            placeholder: 'font-size:30rpx;color:#999;font-family: PingFang SC-Regular, PingFang SC;letter-spacing: 1rpx;',
            // 详情模块在页面的位置
            bottom_message_top: '',
            // 三个选择器的显示隐藏
            picker: {
                patient: false,
                date: false,
                time: false
            },
            // 服务时间段pickerdata
            pickerDate_time: ['08:00-12:00', '13:00-18:00', '18:00-22:00']
        }
    },
    components: {
        uniNavBar,
        statusbar: statusbar
    },

    computed: {
        // 总价格计算
        totalOrderFee() {
            let price = this.form.num * this.form.projecetPrice
            return price
        }
    },
    methods: {
        // 页面导航切换
        navCheckout(state) {
            this.navState = state
            // 1 滚动到规格(页面顶部)
            if (state == 1) {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 500
                })
            }
            // 2 滚动到详情
            if (state == 2) {
                uni.pageScrollTo({
                    scrollTop: this.bottom_message_top,
                    duration: 500
                })
            }
        },
        // 选择框赋值回调
        pickerDate(e) {
            // 日期选择
            console.log(e)
            let date = e.year + '-' + e.month + '-' + e.day
            console.log(date)
            this.form.date = date
        },
        // 时间选择
        pickerCallback(e) {
            console.log(e)
            let index = e[0]
            // 赋值给form
            this.form.timeSlot = this.pickerDate_time[index]
        },

        // 所选数量变化
        changeNum(mode) {
            // 数量增加
            if (mode == 'add') {
                console.log('数量发生变化，类型为', mode)
                this.form.num += 1
            }

            // 数量减少
            if (mode == 'sub') {
                console.log('数量发生变化，类型为', mode)
                if (this.form.num > 1) {
                    this.form.num -= 1
                }
            }
        },
        // 获取服务详情
        getServeDetail() {
            try {
                this.$myRequest2({
                    url: '/xhll/ServiceList/selectServiceList',
                    methods: 'POST',
                    data: {
                        serviceId: 45
                    }
                }).then(res => {
                    console.log('获取服务详情:', res)
                })
            } catch (e) {
                //TODO handle the exception
            }
        }
    },
    onLoad() {
        // 获取服务详情
        this.getServeDetail()
    },
    mounted() {
        // 在vue示例挂载时获取到详情模块的位置

        const query = uni.createSelectorQuery().in(this)
        query
            .select('.bottom_message')
            .boundingClientRect(data => {
                // console.log("得到布局位置信息" + JSON.stringify(data));
                console.log('节点离页面顶部的距离为' + data.top)
                this.bottom_message_top = data.top
            })
            .exec()
    }
}
</script>

<style lang="less" scoped>
@import './serveDetail.less';
</style>
