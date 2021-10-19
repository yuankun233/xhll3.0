<template>
	<view class="container">
		<navB :title="title" :ifFx="ifFx"></navB>
        
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
                        <image class="head_img" :src="item1.head_img" mode="widthFix" :lazy-load="true"></image>
                        <view class="text">
                            <view class="name">{{item1.name}}</view>
                            <view class="illness">{{item1.illness}}</view>
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
                        {{item1.desc}}
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
                            <text class="num">{{item1.likeNum}}</text>
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
                // 留言列表(模拟数据)
                messageList:[
                    {
                        id:1,
                        head_img:"../../../static/community/community_headimg1.png",
                        name:"患者A",
                        illness:"肾衰竭",
                        inPerson:true,
                        title:"建立信心，积极对抗慢性肾衰竭",
                        desc:"",
                        likeNum:233,
                        covers:["../../../static/community/cover1.png","../../../static/community/cover1.png","../../../static/community/cover1.png"],
                        seenNum:666
              
                    },
                    {
                        id:2,
                        head_img:"../../../static/community/community_headimg2.png",
                        name:"患者B",
                        illness:"肾衰竭",
                        inPerson:false,
                        title:"腹膜透析—为尿毒症患者撑起半边天",
                        desc:"规律腹膜透析治疗，定期隧道口及伤口换药，严格无菌操作，记录超滤量检测体重，避免隧道口湿水。",
                        likeNum:45,
                        covers:["../../../static/community/cover2-1.png","../../../static/community/cover2-2.png","../../../static/community/cover2-3.png"],
                        seenNum:453
                                  
                    } 
                ],
            
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
		onLoad() {
			
		},
		components: {
			navB,
		},
		methods: {

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
