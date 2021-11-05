<template>
    <view class="container">
        <my-nav :isShare="true" :title="currentArticle.biaoti"></my-nav>

        <!-- 主题内容 -->
        <view class="main">
            <view class="top">
                <view class="articleTitle">{{ currentArticle.biaoti }}</view>
                <view class="desc">
                    {{ currentArticle.createtime }}
                    <text class="origin">
                        来源：
                        <text class="light">{{ currentArticle.zuozhe }}</text>
                    </text>
                </view>
            </view>
            <view class="articleText"><rich-text :nodes="currentArticle.zhutineirong"></rich-text></view>
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
            currentId:"",
            // 当前文章详情
            currentArticle: ''
        }
    },
    onLoad(options) {
        // 获取传递过来的文章id
        this.currentId = options.id
        console.log("文章id",this.currentId)
        this.getArticleDetail()
    },
    methods: {
        // 获取文章详情
        getArticleDetail() {
            this.$myRequest3({
                url: 'wenzhang/api/detailsWenzhangliebiao',
                data: {
                    articleId: this.currentId
                }
            }).then(res => {
                console.log('文章详情获取：', res)
                this.currentArticle = res[0]
            })
        }
    }
}
</script>

<style lang="less">
.container {
    .main {
        padding: 30rpx;
        .top {
            margin-bottom: 28rpx;
            .articleTitle {
                margin-bottom: 20rpx;
                font-size: 48rpx;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
            }
            .desc {
                font-size: 24rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                color: #666666;
                .origin {
                    margin-left: 10rpx;
                    .light {
                        color: #4579ff;
                    }
                }
            }
        }

        .articleText {
            font-size: 34rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            color: #000000;
            view {
                margin-bottom: 40rpx;
                text-indent: 2rem;
            }
        }
    }
}
</style>
