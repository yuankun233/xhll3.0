<template>
    <view class="container">
        <navB :title="title"></navB>
        <!-- 关于小护 -->
        <view class="main">
            <view class="logo">
                <image src="../../../static/my/logo.png" mode="widthFix"></image>
                <view class="version_code">V 3.0.1</view>
            </view>

            <!-- 信息区域 -->
            <view class="setting_box">
                <view class="setting_item" @click="handleFunction(index)" v-for="(item, index) in functions">
                    <view class="title">{{ item.name }}</view>
                    <i class="iconfont icon-go" v-if="item.isArrow"></i>
                    <text v-else>已经是最新版本</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import navB from '../../../components/nav.vue'
export default {
    data() {
        return {
            title: '关于小护与帮助',
            functions: [
                {
                    name: '版本更新',
                    isArrow: false
                },
                {
                    name: '小护来了官网',
                    isArrow: true
                },
                {
                    name: '小护来了隐私权政策',
                    isArrow: true
                },
                // {
                //     name: '反馈',
                //     isArrow: true
                // }
            ]
        }
    },
    components: {
        navB
    },
    methods: {
        // 方法触发
        handleFunction(index) {
            switch (index) {
                case 0:
                    break
                case 1:
                    this.toOfficial()
                    break
                case 2:
					this.toArgument()
                    break
            }
        },
        // 去官网
        toOfficial() {
            plus.runtime.openURL('https://www.xiaohulaile.com/')
        },
		//跳转隐私政策页面
		toArgument() {
			uni.navigateTo({
				url:'/pages/login/userArgument/userArgument'
			})
		}
    }
}
</script>

<style lang="less">
.container {
    .main {
        .logo {
            margin-top: 56rpx;
            text-align: center;
            image {
                margin-bottom: 38rpx;
                width: 146rpx;
            }
            .version_code {
                font-family: PingFang SC;
                font-size: 16px;
                color: #999999;
            }
        }
        // 设置项样式
        .setting_box {
            margin-top: 46rpx;
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
}
</style>
