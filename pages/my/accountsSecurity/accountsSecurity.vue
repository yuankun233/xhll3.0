<template>
    <view class="container">
        <!-- 账户与安全设置项列表页 -->
        <my-nav :title="nav_title"></my-nav>
        <!-- 信息区域 -->
        <view class="setting_box">
            <view class="setting_item" @click="toChangePassword"> 
                <view class="title">{{title}}</view>
                <text class="iconfont icon-go"></text>
            </view>
			<view class="setting_item" @click="toChangePhone">
			    <view class="title">修改手机号码</view>
			    <text class="iconfont icon-go"></text>
			</view>
        </view>
		<!-- 用户未登录的提示弹窗 -->
		<u-modal v-model="isLoginshow" content="您还没有登录？是否前往登录" @confirm="loginConfirm"></u-modal>
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'
export default {
    data() {
        return {
            nav_title:"账户与安全",
			isLoginshow:true,
			//有无密码参数
			title:'修改密码'
        }
    },
	onLoad() {
		try {
		    // 获取用户信息本地储存
		    const res = uni.getStorageSync('user')
		    if (res) {
		        this.isLoginshow = false
				if(res.userPassWord === '') {
					this.title = '设置密码'
				}
		    }
		} catch (e) {
		    //TODO handle the exception
		}
	},
    components: {
        'my-nav': mynav
    },
    methods: {
        // 前往修改密码
        toChangePassword(){
            uni.navigateTo({
                url:"/pages/my/changePassword/changePassword"
            })
        },
		// 前往修改手机号码
		toChangePhone(){
		    uni.navigateTo({
		        url:"/pages/my/changePhone/changePhone"
		    })
		},
		//用户没有登录时弹出的登录跳转
			loginConfirm() {
			    uni.reLaunch({
			        url: '/pages/login/login'
			    })
			},
    }
}
</script>

<style lang="less">
.container {
    // 设置项样式
    .setting_box {
        margin-top: 30rpx;
        background-color: #fff;
        .setting_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30rpx;
            border-bottom: 2rpx solid #f3f3f3;
            .title {
                font-size: 30rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                color: #000000;
                letter-spacing: 1rpx;
            }
        }
    }
}
</style>
