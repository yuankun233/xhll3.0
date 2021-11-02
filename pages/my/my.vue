<template>
    <view class="container">
        <!-- 头部 -->
        <view class="status_bar"></view>
        <view class="myMes">
            <view class="myMes_box" @click="goMes">
                <view class="myMes_1">
                    <view class="myMes_1_1">
                        <text>{{ name }}</text>
                        <text v-show="isLogin">已认证</text>
                    </view>
                </view>
                <view class="myMes_2"><image class="imageRadio" :src="isLogin ? photo : '../../static/my/tx.png'" mode=""></image></view>
            </view>
            <view class="myMes_box_1">
                <view class="yhq" @click="goticket">
                    <view>0</view>
                    <view>优惠券</view>
                </view>
                <view class="yhq">
                    <view>0</view>
                    <view>积分</view>
                </view>
                <view class="yhq">
                    <view>0</view>
                    <view>关注</view>
                </view>
            </view>
        </view>
        <!-- 订单框架 -->
        <view class="orderMes">
            <view class="orderMes_box">
                <view class="orderMes_1" @click="goOrder(0)">
                    <view class="iconfont icon-daifukuan"></view>
                    <view>待付款</view>
                </view>
                <view class="orderMes_1" @click="goOrder(1)">
                    <view class="iconfont icon-daifuwu"></view>
                    <view>待服务</view>
                </view>
                <view class="orderMes_1" @click="goOrder(2)">
                    <view class="iconfont icon-daipingjia "></view>
                    <view>待评价</view>
                </view>
                <view class="orderMes_1" @click="goOrder(3)">
                    <view class="iconfont icon-yiwancheng"></view>
                    <view>全部订单</view>
                </view>
            </view>
        </view>
        <!-- 常用功能 -->
        <view class="inMes" v-for="(item, index) in inMes" :key="item.mes" @click="goFun(index)">
            <view class="inMes_box">
                <!-- <view :class="item.img"></view> -->
                <image :src="item.src" mode="widthFix" style="width: 40rpx;"></image>
                <view>{{ item.mes }}</view>
                <view class="iconfont icon-go"></view>
            </view>
        </view>
        <!-- 未登录提示弹窗 -->
        <u-modal v-model="show" content="您还没有登录,是否前往登录？" @confirm="toLogin" :show-cancel-button="true"></u-modal>
    </view>
</template>

<script>
export default {
    data() {
        return {
            inMes: [
                {
                    img: 'icon-ditu iconfont',
                    mes: '常见问题',
                    src: '../../static/my/question.png'
                },
                {
                    img: 'icon-a-dizhi2 iconfont',
                    mes: '地址管理',
                    src: '../../static/my/adress.png'
                },
                {
                    img: 'icon-dadianhua iconfont',
                    mes: '客服电话',
                    src: '../../static/my/call.png'
                },
                {
                    img: 'icon-shezhi iconfont',
                    mes: '设置',
                    src: '../../static/my/setting.png'
                }
            ],
            //用户信息
            user: null,
            //头像
            photo: '',
            //昵称
            name: '',
            // 用户当前是否登录
            isLogin: false,
            // 未登录提示弹窗
            show: false
        }
    },
    onLoad() {
        this.verifyIsLogin()
    },
    //页面切入之前判断是否登陆
    onShow() {
        this.verifyIsLogin()
    },
    methods: {
        //跳转功能
        goFun(index) {
            if (index == 3) {
                uni.navigateTo({
                    url: '/pages/my/setting/setting'
                })
            } else if (index == 2) {
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
            } else if (index == 1) {
                // 如果登录跳转订单页,未登录弹出弹窗选择是否跳转登录页
                if (this.isLogin) {
                    uni.navigateTo({
                        url: 'adressList/adressList'
                    })
                } else {
                    this.show = true
                }
            } else if (index == 0) {
                uni.navigateTo({
                    url: 'normalQuestion/normalQuestion'
                })
            }
        },
        // 跳转订单
        goOrder(index) {
            // 如果登录跳转订单页,未登录弹出弹窗选择是否跳转登录页
            if (this.isLogin) {
                uni.navigateTo({
                    url: 'orderList/orderList?id=' + index
                })
            } else {
                this.show = true
            }
        },
        //跳转编辑资料
        goMes() {
            // 判断用户是否登录,未登录跳转登录,已登录跳转编辑资料
            if (this.isLogin) {
                uni.navigateTo({
                    url: '/pages/my/profileEdit/profileEdit'
                })
            } else {
                // 因为在onload中获取本地缓存,所以当本地缓存中没有user时必须重定向到login页面
                // uni.reLaunch({
                //     url: '/pages/login/login'
                // })
                uni.navigateTo({
                    url: '/pages/login/login'
                })
            }
        },
        // 判断用户是否登录，没有登录给默认头像昵称，登录就显示真实信息
        verifyIsLogin() {
            try {
                // 获取本地缓存,当用户没有登录时换位默认头像和昵称
                const res = uni.getStorageSync('user')
				console.log(res)
                // 获取用户资料相关信息
                const res1 = uni.getStorageSync('user_mes')
                if (res) {
                    // 用户已登录,状态改为已登录
                    this.isLogin = true
                    // 当用户头像存在时赋值，不存在还是赋值默认
                    if (res.userHeadLogo != '') {
                        this.photo = res.userHeadLogo
                    } else {
                        this.photo = '../../static/my/tx.png'
                    }

                    // 当昵称存在时赋值，不存在默认赋值手机号
                    if (res.userName != '') {
                        this.name = res.userName
                    } else {
                        this.name = res.userPhone
                    }
                } else {
                    this.name = '未登录'
                }

                if (res1) {
                    this.name = res1.name
                    this.photo = res1.chooseImg
                }
            } catch (e) {
                //TODO handle the exception
            }
        },
        // 跳转至登录
        toLogin() {
            uni.reLaunch({
                url: '/pages/login/login'
            })
        },
		//跳转到优惠券界面
		goticket() {
			uni.navigateTo({
				url:'ticket/ticket?isStatus=0'
			})
		}
    }
}
</script>

<style lang="less" scoped>
@import 'my.less';
</style>
