<template>
	<view class="container">
		<navB :title="currentServe.serviceName" :ifFx="ifFx"></navB>
        
        <!-- 顶部图片 -->
		<view class="banner">
			<image class="banner_left" src="../../../static/community/community_servetop1.png" mode="widthFix" :lazy-load="true"></image>
			<image class="banner_right" src="../../../static/community/community_servetop2.png" mode="widthFix" :lazy-load="true"></image>
		</view>
        
        
        <!-- 小护医典入口 -->
        <view class="knowledge" @click="goServeInfo()">
            <view class="left">
                <view class="question">
                    什么是腹膜透析？
                </view>
                <view class="options">
                    <text>科室</text>
                    <text>病因</text>
                    <text>症状</text>
                    <text>注意事项</text>
                </view>
            </view>
            <view class="right">
                <image src="../../../static/community/logo.png" mode="widthFix" class="logo" :lazy-load="true"></image>
            </view>
        </view>
        
		<!-- 选项卡切换 -->
		<view class="swiperTabs" style="width: 750rpx; margin-left: 14rpx; margin-top: 20rpx;">
			<u-tabs name="name" :list="list" :current="current" @change="changeTabs" :bar-style="style" bar-width="28"
				bar-height="8" bg-color="#F5F5F5" active-color="#000000" inactive-color="#666666" gutter="30">
			</u-tabs>
		</view>
		<!-- 留言列表 -->
		<view class="messageList">
            <view class="message_item" v-for="item1 in messageList" :key="item1.id">
                <view class="top">
                    <view class="left">
                        <image class="head_img" :src="item1.userHeadLogo" mode="widthFix" :lazy-load="true"></image>
                        <view class="text">
                            <view class="name">{{item1.userName}}</view>
                            <view class="illness">{{item1.serviceName}}</view>
                        </view>
                        <view class="label" v-if="item1.inPerson">亲身经历者</view>
                    </view>
                    <view class="right">
                        查看详情
                    </view>
                </view>
                <view class="content">
                    <view class="title">
                        {{item1.title}}
                    </view>
                    <view class="desc" v-if="item1.desc!=''">
                        {{item1.messageContent}}
                    </view>
                    <view class="covers">
                       <block v-for="item2 in item1.covers">
                            <image :src="item2" mode="widthFix" class="cover" :lazy-load="true"></image>
                       </block>
                       
                    </view>
                </view>
                
                <view class="tools"> 
                    <view class="left">
                        {{item1.seenNum}}人看过
                    </view>
                    <view class="right">
                        <view class="like">
                            <i class="iconfont icon-like"></i>
                            <text class="num">{{item1.messageLikeNum}}</text>
                        </view>
                        <view class="comment">
                            <i class="iconfont icon-comment"></i>
                            <text>评论</text>
                        </view>
                    </view>
                </view>
                
            </view>
        </view>
		<!-- 小护logo -->
		<view class="xhLogo">
			<image src="../../../static/index/xhLogo.png" mode=""></image>
		</view>
		<view class="xhJs">
			<view></view>
			<view>小护来了,出院我也可以放心了</view>
			<view></view>
		</view>
	</view>

	</view>
</template>
<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
                // 当前服务项目数据
                currentServe:"",
                // 留言列表
                messageList:"",
                
				//nav标题
				title: "腹膜透析",
				//是否分享
				ifFx:false,
				text: "", //简介
				//选项卡切换
				list: [
                    {
						name: '留言'
					}, {
						name: '护士指导'
					}, {
						name: '自我记录'
					}
				],
				current: 0, //当前选中滑块
				//滑块样式
				style: {
					background: '#41D9CD',
				}
			}
		},
		onLoad(options) {
            // 获取服务详情id
            let servDetailId = options.servDetailId
			this.getServeDetail(servDetailId)
		},
		components: {
			navB,
		},
		methods: {
            // 获取服务项目详情模块
            async getServeDetail(servDetailId) {
                try {
                    const res = await this.$myRequest3({
                        url: 'serv/api/Specialtyid',
                        methods: 'POST',
                        data: {
                            servDetailId
                        }
                    })
                    console.log("获取服务项目详情模块",res)
                    if(res){
                        // 保存当前服务项目模块信息
                        this.currentServe=res[0]
                        // 请求当前服务对应留言
                        this.getinquiry()
                    }
                } catch (e) {
                    //TODO handle the exception
                }
            },
            // 获取留言
            async getinquiry(){
 
               try {
                   const res = await this.$myRequest3({
                       url: 'serv/api/specialist',
                       methods:"POST",
                       data:{
                           serviceName:this.currentServe.serviceName
                       }
                   })
                   console.log("留言列表",res)
                    this.messageList=res
               } catch (e) {
                   //TODO handle the exception
               }
            },
                        
			//选项卡切换
			changeTabs(index) {
				this.current = index;
			},
			// 跳转对应小护医典
            goServeInfo(){
                uni.navigateTo({
                    url:"/pages/community/serveIntro/serveIntro"
                })
            }
		}
	}
</script>

<style lang="less">
	@import "serveCommunity.less";
</style>
