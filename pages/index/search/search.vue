<template>
    <view class="container">
        <!-- 顶部搜索框区域 -->
        <view class="search_box">
            <view class="input">
                <view class="iconfont icon-a-sousuo1" style="font-size: 56rpx;"></view>
                <input type="text" placeholder="请输入服务名称" v-model="search_sign" @input="search" />
            </view>
            <view class="cancel" @click="cancel">取消</view>
        </view>
        <!-- 搜索结果 -->
        <view class="result" v-if="isSearchOver">
            <view class="search_item" v-for="item in resultList" @click="goOrder(item.serviceId)">{{ item.serviceName }}</view>
        </view>

        <!-- 搜索推荐 -->
        <view class="recommend" v-else>
            <view class="title">热门搜索</view>
            <view class="tagslist">
                <view class="tags" v-for="(item, index) in tags" @click="tagSearch(index)">
                    <image src="../../../static/index/fire.png" mode="widthFix"></image>
                    <view class="name">{{ item }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 是否搜索完成
            isSearchOver: false,
            tags: ['腹膜透析', '伤口换药', '造口护理'],
            search_sign: '', // 搜索关键词
            resultList: [] // 搜索结果
        }
    },
    methods: {
        // 取消搜索，返回首页
        cancel() {
            uni.switchTab({
                url: '/pages/index/index'
            })
        },
        // 搜索结果
        async search() {
            this.isSearchOver = true // 改变当前页面状态
            //关键词为空不执行搜索操作
            if (this.search_sign == '') {
                this.resultList = []
                this.isSearchOver = false
                return
            }
            try {
                const res = await this.$myRequest3({
                    url: 'servicelist/api/ServiceListSearch',
                    methods: 'POST',
                    data: {
                        serviceName: this.search_sign
                    }
                })
                console.log('搜索结果:', res)
                if (res) {
                    this.resultList = res.result
                }
            } catch (e) {
                //TODO handle the exception
            }
        },
        //跳转项目详情
        goOrder(id) {
            uni.navigateTo({
                url: '/pages/index/serveDetail/serveDetail?projecetId=' + id
            })
        },
        // 根据标签搜索项目
        tagSearch(index) {
            // 改变搜索关键词
            this.search_sign = this.tags[index]
            // 执行搜索
            this.search()
        }
    }
}
</script>

<style lang="less">
page {
    background-color: #fff;
    font-weight: normal;
}
.container {
    .search_box {
        margin-top: 94rpx;
        padding: 0 42rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input {
            display: flex;
            align-items: center;
            width: 578rpx;
            height: 76rpx;
            background: #ffffff;
            border: 2rpx solid #41d9cd;
            box-sizing: border-box;
            border-radius: 100rpx;
            padding-left: 28rpx;
            .icon-a-sousuo1 {
                color: rgba(0, 0, 0, 0.5);
                line-height: 76rpx;
            }
            input {
                padding-left: 23rpx;
            }
        }
        .cancel {
            font-family: PingFang SC;
            font-size: 36rpx;
            color: #000000;
        }
    }
    // 推荐区域
    .recommend {
        margin-top: 66rpx;
        padding: 0 42rpx;
        .title {
            font-weight: 500;
            font-size: 32rpx;
            margin-bottom: 36rpx;
        }
        // 标签列表
        .tagslist {
            display: flex;
            .tags {
                margin-right: 28rpx;
                display: flex;
                align-items: center;
                padding: 0 20rpx;
                justify-content: space-between;
                width: 168rpx;
                height: 60rpx;
                background: #fafafa;
                border-radius: 30rpx;
                .name {
                    font-family: PingFang SC;
                    font-size: 24rpx;
                    line-height: 60rpx;
                }
                image {
                    width: 15rpx;
                }
            }
        }
    }
    // 搜索结果
    .result {
        margin-top: 30rpx;
        padding: 0 42rpx;
        .search_item {
            height: 60rpx;
            font-family: PingFang SC;
            font-size: 30rpx;
            line-height: 60rpx;
            border-bottom: solid 1rpx #ccc;
        }
    }
}
</style>
