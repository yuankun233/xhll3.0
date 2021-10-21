<template>
    <view class="container">
        <uniNavBar :title="title" :statusBar="true" :border="false">
            <i class="iconfont icon-back" slot="left" @click="back"></i>
            <text class="send" slot="right">发布</text>
        </uniNavBar>
        <!-- 内容区域 -->
        <view class="main">
            <!-- 问 -->
            <view class="inquiry">
                <view class="title">问：腹膜透析液放出量不正常怎么办？</view>
                <view class="desc">
                    腹膜透析液放出量不正常怎么办？腹膜透析液放出量不正常怎么办？腹膜透析液放出量不正常怎么办？腹膜透析液放出量不正常怎么办？腹膜透析液放出量不正常怎么办？
                </view>
            </view>
            <!-- 答 -->
            <view class="reply">
                <view class="title">答：</view>
                <u-input v-model="form.message" type="textarea" class="textarea" placeholder="请在这里输入回答……" maxlength="230" />
            </view>

            <!-- 上传图片 -->
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
        </view>
    </view>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    data() {
        return {
            title: '小护问答',
            form: {
                message: ''
            }
        }
    },
    components: {
        uniNavBar
    },
    methods: {
        back() {
            uni.navigateBack({
                delta: 1
            })
        }
    }
}
</script>

<style lang="less">
.container {
    background-color: #ffffff;
    .icon-back {
        font-size: 60rpx;
        color: #666666;
        opacity: 1;
    }
    .send {
        font-size: 30rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
    }
    .main {
        padding: 0 30rpx;
        margin-top: 20rpx;
        // 回答输入框
        .textarea {
            padding: 22rpx !important;
            margin-top: 32rpx;
            width: 690rpx;
            height: 452rpx;
            background: #f4f4f4;
            border-radius: 16rpx;
        }
        .title {
            font-size: 38rpx;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 45rpx;
        }
        // 问
        .inquiry {
            .desc {
                margin-top: 18rpx;
                margin-bottom: 50rpx;
                font-size: 28rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
            }
        }
        .uploadImg {
            margin-top: 36rpx;
            margin-bottom: 400rpx;
        }
    }
}
</style>
