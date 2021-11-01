<template>
    <view class="container">
        <!-- 页面主体结构 -->

        <!-- 顶部导航 -->
        <view class="top">
            <!-- 顶部状态栏占位 -->
            <view class="status_bar" style="background-color: #fff;z-index: 50;position: fixed;"></view>
            <view class="status_bar" style="margin-bottom: 88rpx;"></view>
            <view class="navtop">
                <i class="iconfont icon-back" @click="back"></i>
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
                    <view class="adress">{{ serveAdress }}</view>
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
            <view class="serve_patient item" @click="patientSelect">
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
        <view class="selectNum discount" @click="selectTicket">
            <view class="title common_title">优惠券</view>
            <input type="text" value="" class="input" placeholder="请选择您的优惠券" :placeholder-style="placeholder" :disabled="disabled" />
        </view>
        <!-- 备注 -->
        <view class="remark">
            <view class="common_title title">备注信息</view>
            <u-input class="textarea" v-model="form.remarks" type="textarea" placeholder="如需备注，请说明情况……" maxlength="100" />
            <view class="text">温馨提示：详细的并请说明可以帮助我们更好的为您服务哦</view>
        </view>

        <!-- 服务须知等信息 -->
        <view class="bottom_message">
            <view>
                <view class="title">耗材需求</view>
                <view class="content2"></view>
            </view>
            <view class="title">服务流程</view>
            <view class="content"></view>
            <view class="title">操作流程</view>
            <view class="content">
                <view v-for="item in xdlc" :key="this">{{ item.text }}</view>
            </view>
            <view class="title">服务须知</view>
            <view class="content2">
                <view>{{ serveDetail.serviceNotice }}</view>
            </view>
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
        <!-- 当用户没有健康档案时的提示弹出层 -->
        <u-modal v-model="userFormPop" content="您还没有添加服务对象,是否立即添加？" @confirm="userFormConfirm" :show-cancel-button="true"></u-modal>
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
                            感谢信任，我们将竭诚为您提供优质的专业护理服务，为确保您能顺利接受护理服务并保障您和护士的执业安全，特将以下内容告知：
                            <br />
                            1、 请家属按预约护理时间提前做好准备工作。如：擦拭桌面、地面、保护被服务者不受凉的情况下，开窗通风、备好护士操作用的台面。
                            <br />
                            2、 护士将按时为您提供治疗。双方如遇特殊情况需要更改上门时间和服务内容，均应提前6小时进行沟通协商。
                            <br />
                            3、 护士入户提供上门服务，按照居家护理服务规范流程执行服务内容。
                            <br />
                            4、 护士将根据病情和服务内容的需要采集您的个人信息和生命体征并如实记录。
                            <br />
                            5、 请您按照护士的指导认真执行相关的护理服务后的内容及注意事项。
                            <br />
                            6、 抗生素、生物制品（如脂肪乳等）、化疗药品、各种疫苗、血液制品、以及其他需皮试的药物不在家中使用。
                            <br />
                            7、 护士按照护理需求执行服务，客户及家属不得强行要求护士进行预约项目以外的护理操作。
                            <br />
                            8、 除规定的护理服务外，如有其他护理需求，应向派单老师提出，统一安排。不允许私下和护理人员口头协议，如因私下协议造成的损失，我们不承担相应的责任。
                            <br />
                            9、 客户和家属如对护理人员服务有任何意见和建议，可及时向我们反映，我们会认真调查处理并及时反馈。
                            <br />
                            10、为保证服务质量、提供优质服务，护理期间或结束后我们会进行不定期电话回访或上门回访请您配合。
                            <br />
                            11、护理服务期间家属需全程看护患者，听从护士安排。
                            <br />
                            12、治疗操作后30分钟内，应避免被服务者体位的突然变化。
                            <br />
                            13、按照要求妥善保管所需的药品。
                            <br />
                            14、如您使用的药品或者耗材是自行提供，应符合如下要求：
                            <br />
                            （1） 您的药品或者耗材应由标准批准文号、生产厂家：药品名称、剂量、规格、日期、有效期标识清晰、符合要求
                            <br />
                            （2） 提供在本市正规医疗机构的治疗证明
                            <br />
                            （3） 提供正规的购买发票
                            <br />
                            （4） 护士在评估后确认能保证医疗安全后方可进行治疗。
                            <br />
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

        <!-- 用户未登录的提示弹窗 -->
        <u-modal v-model="isLoginshow" content="您还没有登录？是否前往登录" @confirm="loginConfirm"></u-modal>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
import statusbar from '@/components/statusbar.vue'
export default {
    data() {
        return {
            // 代表当前用户是否登录标识
            isLogin: false,
            isLoginshow: true,
            //当前页面表单数据
            form: {
                //手机号
                userPhone: '',

                //用户id
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
                archivesId: '',
                //患者名称
                archiveName: '',
                // 服务日期
                date: '',
                //订单来源
                orderSource: 'APP微信',
                orderFee: '', //订单价格
                //服务时间
                timeSlot: '',
                //备注
                remarks: ''
                //订单价格
                // orderFee:this.data.total_fee,
                //服务日期
                // startTime: '',
            },
            //判断是不是新增地址返回回来的
            isAdressEdit: '',
            // 服务详情的信息
            serveDetail: '',
            // 用户所有的健康档案
            userFormList: '',
            // 控制用户没有健康档案时的提示弹窗
            userFormPop: false,
            // 控制用户是否有健康档案
            userFormFlag: true,

            // 当前选择患者对应服务地址
            serveAdress: '请先选择服务对象',

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
            checkbox_checked: false,
            // 操作流程
            xdlc: [
                {
                    text: '1.预约上门'
                },
                {
                    text: '2.首诊评估'
                },
                {
                    text: '3.签订知情通知书'
                },
                {
                    text: '4.专项操作'
                },
                {
                    text: '5.宣教指导'
                },
                {
                    text: '6.记录、评价'
                }
            ]
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

            // 将总价格赋值到form中
            this.form.orderFee = price
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
                        serviceId: this.form.projecetId
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
                        userId: this.form.userId
                    }
                }).then(res => {
                    console.log('获取患者健康档案:', res)
                    // 当用户没有健康档案时
                    if (res.data.selectPatient.data.length == 0) {
                        console.log('无健康档案')
                        // 状态变为无健康档案
                        this.userFormFlag = false
                        return
                    }
                    // 获取所有健康档案
                    let patients = res.data.selectPatient.data
                    // 将用户全部健康档案储存
                    this.userFormList = res.data.selectPatient.data
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
        //获取支付接口
        async getOrderPay() {
            // 组装创建订单数据
            let data = {
                //手机号
                userPhone: this.form.userPhone,
                //id
                userId: this.form.userId,
                //项目id
                serviceId: this.serveDetail.serviceId,
                //项目价格
                servicePrice: this.serveDetail.servicePrice,
                //服务项目
                serviceName: this.serveDetail.serviceName,
                //服务次数
                num: this.form.num,
                //患者表Id
                archivesId: this.form.archivesId,
                //患者名称
                archivesName: this.form.archiveName,
                //订单来源
                orderSource: this.form.orderSource,
                //服务日期
                startTime: this.form.date,
                //服务时间
                timeSlot: this.form.timeSlot,
                //备注
                remarks: this.form.remarks,
                //订单总价
                orderFee: this.form.orderFee,
                //openid
                wxOpenId: '',
                //用户IP
                userLastIp: '139.226.46.100'
            }
            console.log('创建订单发送数据:', data)
            const res = await this.$myRequest1({
                url: 'xhll/order/createOrder',
                methods: 'POST',
                data
            })
            console.log('创建订单', res)
            console.log(res.data.saveOrder, '支付')
            if (res.message === '成功') {
                uni.requestPayment({
                    provider: 'wxpay',
                    orderInfo: res.data.saveOrder,
                    success: res => {
                        console.log('success:' + JSON.stringify(res))
                        uni.showToast({
                            title: '支付成功',
                            icon: 'none',
                            duration: 1000,
                            success() {
                                setTimeout(() => {
                                    uni.navigateTo({
                                        url: '/pages/my/orderList/orderList?id=1'
                                    })
                                }, 1000)
                            }
                        })
                    },
                    fail: err => {
                        console.log('fail:' + JSON.stringify(err))
                        uni.showToast({
                            title: '用户取消支付',
                            icon: 'none',
                            duration: 1000,
                            success() {
                                setTimeout(() => {
                                    uni.navigateTo({
                                        url: '/pages/my/orderList/orderList?id=0'
                                    })
                                }, 1000)
                            }
                        })
                    }
                })
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
            this.getOrderPay() //执行付款相关操作
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
            // plus.runtime.openURL("weixin://");
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
            //调起支付
            uni.getProvider({
                service: 'payment',
                success: res => {
                    console.log(res, 123456)
                }
            })
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
            // 患者名称赋值给form
            this.form.archiveName = this.picker_patient[index]
            // 患者id赋值给form
            this.form.archivesId = this.userFormList[index].archivesId
            // 患者对应地址变更
            this.serveAdress = this.userFormList[index].archivesRegion + this.userFormList[index].archivesAddress
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
        back() {
            console.log(this.isAdressEdit)
            if (this.isAdressEdit === undefined) {
                uni.navigateBack({
                    delta: 1
                })
            } else {
                uni.navigateTo({
                    url: '/pages/index/index'
                })
            }
        },
        // 9 患者健康档案选择
        patientSelect() {
            // 1 如果没有健康档案,则弹出提示弹窗
            if (this.userFormFlag == false) {
                this.userFormPop = true
                return
            }
            // 2 如果有健康档案，则弹出选择框
            if (this.userFormFlag) {
                this.picker.patient = true
            }
        },
        // 10 患者没有健康档案的弹窗确定回调
        userFormConfirm() {
            uni.reLaunch({
                url: '/pages/my/adressEdit/adressEdit?isGo=1'
            })
        },
        // 11 用户没有登录时弹出的登录跳转
        loginConfirm() {
            uni.reLaunch({
                url: '/pages/login/login'
            })
        },
        // 12 校验用户登录进行相关操作
        verifyIsLogin() {
            try {
                // 获取用户信息本地储存
                const res = uni.getStorageSync('user')
                console.log(res)
                if (res) {
                    // 将当前页面变为已登录
                    this.isLogin = true
                    // 更改登录弹窗状态
                    this.isLoginshow = false
                    // 赋值
                    this.form.userId = res.userId
                    this.form.userPhone = res.userPhone
                    // 获取用户健康档案
                    this.getPatientMessage()
                }
            } catch (e) {
                //TODO handle the exception
            }
        },
		// 13 点击选择优惠券
		selectTicket() {
			uni.navigateTo({
				url:'/pages/my/ticket/ticket?isStatus=1'
			})
		}
    },
    onLoad(options) {
        console.log(options)
        this.isAdressEdit = options.isGo
        // 获取传过来的项目id
        this.form.projecetId = options.projecetId
        // 获取服务详情
        this.getServeDetail()
        // 用户是否登录校验
        this.verifyIsLogin()
    },
    onShow() {
        // 重置标识
        this.userFormFlag = true
        // 重置弹窗
        this.orderPop = false

        // 用户是否登录校验
        this.verifyIsLogin()
    },
    mounted() {
        // 在vue示例挂载时获取到详情模块的位置

        const query = uni.createSelectorQuery().in(this)
        query
            .select('.bottom_message')
            .boundingClientRect(data => {
                // console.log("得到布局位置信息" + JSON.stringify(data));
                console.log('节点离页面顶部的距离为' + data.top)
                this.bottom_message_top = data.top - 88
            })
            .exec()
    }
}
</script>

<style lang="less" scoped>
@import './serveDetail.less';
</style>
