<template>
    <view class="container">
        <my-nav :title="nav_title"></my-nav>
        <view class="main">
            <view class="message"><u-input v-model="form.message" type="textarea" class="textarea" placeholder="请在这里输入……" /></view>
            <!-- 标签 -->
            <view class="tabs">
                <view class="item" v-for="(item, index) in tabs" :key="index" @click="addTag(index)">{{ item.label }}</view>
            </view>
            <!-- 上传图片信息 -->
            <u-upload
                ref="uUpload"
                :action="action"
                :auto-upload="true"
                max-count="6"
                name="image"
                max-size="3145728"
                :form-data="uppicdata"
                @on-success="onSuccess"
                @on-uploaded="onFullSuccess"
                @on-list-change="piclistchange"
                width="150rpx"
                height="150rpx"
                class="uploadImg"
            ></u-upload>
            <view class="text">保护用户隐私，内容仅医生可见</view>
            <u-button type="primary" :ripple="true" class="nextStep" @click="popup = true">立即发布</u-button>
        </view>
        <!-- 提交成功弹出层 -->
        <u-popup ref="popup" mode="center" v-model="popup" class="popup" border-radius="12">
            <view class="content">
                <image src="../../../static/index/onlineinquiry_popupicon.png" mode="widthFix" :lazy-load="true" class="img"></image>
                <view class="bottom">
                    <view class="text">提交成功，稍后会有专业护士联系您进行解答</view>
                    <u-button type="primary" :ripple="true" class="backindex" @click="backindex">返回首页</u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import mynav from '@/components/mynav.vue'
export default {
    data() {
        return {
            nav_title: '',
            form: {
                message: ''
            },
            // 标签组
            tabs: [
                {
                    label: '+症状描述',
                    tag: '#症状描述#'
                },
                {
                    label: '+患病时长',
                    tag: '#患病时长#'
                },
                {
                    label: '+医院检查',
                    tag: '#医院检查#'
                },
                {
                    label: '+用药情况',
                    tag: '#用药情况#'
                }
            ],
            // 图片上传携带参数
            uppicdata: {},
            // 图片上传服务器地址
            action: '',
            // 控制弹出层
            popup: false
        }
    },
    components: {
        'my-nav': mynav
    },
    methods: {
        // 返回首页
        backindex() {
            uni.switchTab({
                url: '/pages/index/index'
            })
        },
        // 添加标签
        addTag(index) {
            // 添加标签
            this.form.message = this.form.message + this.tabs[index].tag + '  '
            // 去除标签
            this.tabs.splice(index, 1)
        },
        // 上传图片至服务器
        submitImg() {
            this.$refs.uUpload.upload() //上传图片
        },
        // 上传成功服务器返回的地址
        onSuccess(a, b, c, d) {
            console.log(a.result)
        },

        //当图片增加或去除的时候，给一个变量代表所有图片是否都上传成功的标识，此时false就说明图片还在上传中，则不能提交表单
        piclistchange() {},
        //当所有图片上传成功时，flag变为true,可以提交表单
        onFullSuccess() {}
    }
}
</script>

<style lang="less" scoped>
.container {
    height:100%;
    font-size: 0;
    background-color: #ffffff;

    // 发帖功能部分
    .main {
        margin-top: 30rpx;
        padding: 0 36rpx 0 30rpx;
        .message {
            .textarea {
                height: 314rpx;
                width: 684rpx;
                // background-color: #007AFF;
            }
        }
        .tabs {
            display: flex;
            align-items: center;

            .item {
                margin-left: 20rpx;
                width: 156rpx;
                height: 50rpx;
                background: #f4f4f4;
                border-radius: 12rpx;
                text-align: center;
                font-size: 28rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                color: #000000;
                line-height: 50rpx;
            }
            .item:nth-of-type(1) {
                margin-left: 0;
            }
        }
        // 图片上传
        .uploadImg {
            margin-top: 48rpx;
        }
        .u-list-item {
        }
        .text {
            text-align: center;
            font-size: 20rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            margin-bottom: 400rpx;
        }
        .nextStep {
            margin-left: 20rpx;
            margin-bottom: 110rpx;
            width: 652rpx;
            height: 90rpx;
            background: #41d9cd;
            border-radius: 76rpx;
        }
    }
    // 弹出层样式
    .popup {
        .content {
            position: relative;
            overflow: hidden;
            width: 444rpx;
            height: 548rpx;
            background: linear-gradient(134deg, #41d9cd 0%, #40cdc1 100%);
            .img {
                margin: 0 auto;
                display: block;
                width: 200rpx;
                margin-top: 68rpx;
            }
            .bottom {
                position: absolute;
                bottom: 0;
                width: 444rpx;
                height: 240rpx;
                background: #ffffff;
                border-radius: 0px 0px 12rpx 12rpx;
                padding: 44rpx 34rpx 0 20rpx;
                .text {
                    text-align: center;
                    font-size: 28rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #000000;
                }
                .backindex {
                    margin: 24rpx auto;

                    display: block;
                    width: 280rpx;
                    height: 64rpx;
                    border-radius: 52rpx;
                    border: 2rpx solid #41d4c8;
                    background-color: #fff;
                    color: #41d4c8;
                    line-height: 64rpx;
                }
            }
        }
    }
}
</style>
