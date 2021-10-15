<template>
    <view class="container">
        <!-- 页面主体结构 -->
        <!-- 状态栏组件 -->
        <statusbar></statusbar>

        <!-- 顶部导航 -->
        <view class="top">
            <view class="navtop">
                <i class="iconfont icon-back" @click="back"></i>
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
                <image src="../../../static/index/logo.png" mode="widthFix" class="logo" :lazy-load="true"></image>
                <view class="text">小护来了</view>
            </view>
            <view class="content">
                <image :src="serveDetail.servicePicurl" mode="widthFix" class="left" :lazy-load="true"></image>
                <view class="right">
                    <view class="project_name">{{ serveDetail.serviceName }}</view>
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
                <input type="text" v-model="form.archiveName" class="input" placeholder="请选择信息" :placeholder-style="placeholder" :disabled="disabled" />
            </view>
            <view class="serve_patient item" @click="picker.date = true">
                <view class="label common_title">服务日期</view>
                <input type="text" v-model="form.date" class="input" placeholder="请选择服务日期" :placeholder-style="placeholder" :disabled="disabled" />
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
            <image src="http://xiaohulaile.com/wxcx/tuikuan/tuikuan.png" :lazy-load="true" style="width:662rpx;height:602rpx;margin-left:18rpx"></image>
        </view>

        <!-- 底部固定结算栏 -->
        <!-- <i class="iconfont icon-ditu" style="font-size: 50rpx;color: #007AFF;"></i> -->
        <view class="bottom_wrap"></view>
        <view class="bottom_payBar">
            <view class="price">
                <view class="rmb">￥</view>
                <view class="price">{{ totalOrderFee }}</view>
            </view>
            <view class="flex">
                <view class="detail" @click="orderDetailPop = !orderDetailPop">
                    明细
                    <!-- <i class="iconfont icon-zhankai"></i> -->
                    <image src="../../../static/index/up.png" mode="widthFix" v-show="orderDetailPop == false" class="arrow_icon" :lazy-load="true"></image>
                    <image src="../../../static/index/down.png" mode="widthFix" v-show="orderDetailPop" class="arrow_icon" :lazy-load="true"></image>
                </view>
                <u-button type="primary" class="submit" :ripple="true" @click="orderPopup()">提交订单</u-button>
            </view>
        </view>
        <!-- 页面主体结束 -->

        <!-- 页面隐藏结构 -->
        <!-- 费用明细 -->
        <view class="priceDetail" v-show="orderDetailPop">
            <view class="toptitle">费用明细</view>
            <view class="flex">
                <view class="title">服务费×{{ form.num }}</view>
                <view class="price">￥{{ totalOrderFee }}</view>
            </view>
            <view class="flex">
                <view class="title">优惠金额</view>
                <view class="price">-￥0.00</view>
            </view>
        </view>

        <!-- 选择器 -->
        <!-- 服务对象选择 -->
        <u-picker v-model="picker.patient" mode="selector" :range="picker_patient" @confirm="pickerCallback1"></u-picker>
        <!-- 时间选择 -->
        <u-picker v-model="picker.time" mode="selector" :range="pickerDate_time" @confirm="pickerCallback2"></u-picker>
        <!-- 日期选择 -->
        <u-picker v-model="picker.date" mode="time" @confirm="pickerDate"></u-picker>

        <!-- 提交订单弹窗 -->
        <u-popup mode="center" v-model="orderPop" class="orderPop" border-radius="24">
            <view class="content">
                <view class="top">
                    <image src="../../../static/index/orderPopTop.png" class="poptop" mode="widthFix" :lazy-load="true"></image>
                    <view class="title">预约须知</view>
                </view>
                <view class="content">
                    <scroll-view scroll-y="true" @scrolltolower="scrollbottom" style="height: 544rpx;width: 546rpx;">
                        <view class="message">
                            尊敬的先生/女士： 为了更好的给您和您的家人提供优质的居家专业服务，请务必仔细阅读本须知：
                            <br />
                            一、请如实告知疾病诊断，不要隐瞒传染类、精神类疾病等病史，或可能影响服务人员和自身安全的因素。
                            <br />
                            二、请在服务人员的服务时间内，尽可能保证有二人或二人以上人员在家。三、安全告知：小护来了居家服务项目都是常规专业内容，是帮助患者维护健康所采取的医学护理服务。由于个体的差异性、疾病的复杂性及不可抗拒的因素等，服务人员不能预测服务中或服务后患者的并发症等不良事件发生，特告知如下:
                            <br />
                            1、心脑疾病的突发；
                            <br />
                            2、伤口出血、疼痛、感染、异常生长等；
                            <br />
                            3、肠造口出血感染，造口狭窄，造口突出等并发症；
                            <br />
                            4、导管滑脱、移位、堵塞、感染等；
                            <br />
                            5、康复功能恢复不良等；
                            <br />
                            6、其他意外情况发生：如跌倒等。
                            <br />
                            四、您在下单后如需要更改服务时间，请提前6小时联系客服。
                            <br />
                            五、若服务人员已经接单，则所支付的金额不能全额退回。特告知：
                            <br />
                            1.服务人员已接单，扣除支付金额的30%
                            <br />
                            2.服务人员已出发，扣除支付金额的50%
                            <br />
                            3.服务人员已到达，扣除支付金额的80%
                            <br />
                            4.若用户下了多个订单，已服务过的项目正常结算。 请仔细阅读确认后下单。谢谢配合！
                        </view>
                    </scroll-view>
                </view>
                <view class="bottom_tools">
                    <view class="checkbox">
                        <u-checkbox :disabled="checkbox_disabled" v-model="checkbox_checked"></u-checkbox>
                        <text>下滑到底并勾选，即同意“预约须知”</text>
                    </view>
                    <view class="btns">
                        <u-button type="primary" class="cancel btn" :ripple="true" @click="orderPop = false">取消</u-button>
                        <u-button type="primary" class="submit btn" :ripple="true" @click="submitOrder">同意</u-button>
                    </view>
                </view>
            </view>
        </u-popup>
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
                projecetPrice: '',
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
                orderFee: '', //订单价格
                remark: '' //备注
            },
            // 服务详情的信息
            serveDetail: '',

            //  以下都是页面布局样式所需要的数据变量

            // 输入框是否禁用
            disabled: true,
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
            pickerDate_time: ['08:00-12:00', '13:00-18:00', '18:00-22:00'],
            //患者信息
            picker_patient: [],
            // 订单明细弹出层
            orderDetailPop: false,
            // 下单时的提示信息弹窗
            orderPop: false,
            // 下单时的信息弹窗复选框是否禁用
            checkbox_disabled: true,
            // 下单信息复选框是否选中
            checkbox_checked: false
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
        // 1  获取服务详情
        getServeDetail() {
            try {
                this.$myRequest1({
                    url: 'xhll/ServiceList/selectServiceList',
                    methods: 'POST',
                    data: {
                        serviceId:this.form.projecetId
                    }
                }).then(res => {
                    console.log('获取服务详情:', res)
                    this.serveDetail = res.data.selectItems[0]
                    // 保存单价到data
                    this.form.projecetPrice = res.data.selectItems[0].servicePrice
                })
            } catch (e) {
                //TODO handle the exception
            }
        },
        // 2  获取用户健康档案
        async getPatientMessage() {
            try {
                this.$myRequest1({
                    url: 'xhll/patient/selectPatient',
                    methods: 'POST',
                    data: {
                        userId: '2'
                    }
                }).then(res => {
                    console.log('获取患者健康档案:', res)
                    // 获取所有健康档案
                    let patients = res.data.selectPatient.data
                    // 组装数据
                    let patientnames = []
                    patients.forEach(item => {
                        patientnames.push(item.archivesName)
                    })
                    // 储存健康档案
                    this.picker_patient = patientnames
                })
            } catch (e) {
                //TODO handle the exception
            }
        },
        // 3 正式提交订单，并调起支付
        submitOrder() {
            if (this.checkbox_checked == false) {
                uni.showToast({
                    title: '请先同意预约须知',
                    icon: 'none'
                })
                return
            }
            console.log('执行付款相关操作')
        },
        //  1 提示弹窗滚动到底部触发事件
        scrollbottom() {
            console.log('提示信息到底了!')
            // 将复选框变为可用
            this.checkbox_disabled = false
        },
        //  2 校验表单并弹出弹窗
        orderPopup() {
            // 非空验证
            if (this.form.archiveName == '') {
                uni.showToast({
                    title: '请选择患者',
                    icon: 'none'
                })
                return
            }
            if (this.form.date == '') {
                uni.showToast({
                    title: '请选择服务日期',
                    icon: 'none'
                })
                return
            }
            if (this.form.timeSlot == '') {
                uni.showToast({
                    title: '请选择服务时间段',
                    icon: 'none'
                })
                return
            }
            // 打开弹出层
            this.orderPop = true
        },
        // 3 页面导航切换
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
        // 4 选择框赋值回调
        pickerDate(e) {
            // 日期选择
            console.log(e)
            let date = e.year + '-' + e.month + '-' + e.day
            console.log(date)
            this.form.date = date
        },
        //  5 患者选择
        pickerCallback1(e) {
            console.log(e)
            let index = e[0]
            // 赋值给form
            this.form.archiveName = this.picker_patient[index]
        },
        // 6 时间选择
        pickerCallback2(e) {
            console.log(e)
            let index = e[0]
            // 赋值给form
            this.form.timeSlot = this.pickerDate_time[index]
        },

        // 7 所选数量变化
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
        // 8 导航栏返回按钮
        back(){
            uni.navigateBack({
                delta:1
            })
        }
    },
    onLoad(options) {
        console.log(options)
        // 获取传过来的项目id
        this.form.projecetId = options.projecetId
        // 获取服务详情
        this.getServeDetail()
        // 获取用户健康档案
        this.getPatientMessage()
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
