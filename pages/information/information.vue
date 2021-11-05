<template>
	<view class="container">
		
        <!-- 状态栏 -->
       <!-- <statusbar></statusbar> -->
      
        <!-- 顶部标题 -->
        <view class="top">
            <view class="status_bar"></view>
            
            <view class="title">健康园地</view>
        </view>
        <!-- 顶部导航和状态栏占位高度 -->
        <view class="heightBox">
            <view class="status_bar"></view>
        </view>
        
		<!-- 选项卡切换 -->
		<view class="swiperTabs" style="width: 750rpx; margin-left: 14rpx; margin-top: 20rpx;">
			<u-tabs name="name" :list="list" :current="current" @change="changeTabs" :bar-style="style" bar-width="28"
				bar-height="8" bg-color="#F5F5F5" active-color="#000000" inactive-color="#666666" gutter="30">
			</u-tabs>
		</view>
        
        <!-- 暂无内容提示图片 -->
        <view class="image" v-if="isShow">
            <image src="../../static/my/ddzwy.png" mode="widthFix" class="zwImg"></image>
        </view>
		<!-- 文章列表 -->
		<view class="articleList" v-else>
            <!-- <view class="article1" @click="goArticleDetail">
                <view class="cover1">
                    
                </view>
                <text>缺乏维生素，这些身体“信号”告诉你！</text>
            </view> -->
           <block v-for="item in articleList" :key="item.articleId">
               <view class="articleitem" @click="goArticleDetail(item.articleId)">
                   <view class="left">
                       <view class="title">
                           {{item.biaoti}}
                       </view>
                       <view class="desc">
                           <text>{{item.zuozhe}}</text>
                           <text>评论{{item.discuss}}</text>
                           <text>{{item.issueTime}}</text>
                       </view>
                   </view>
                   <view class="right">
                       <image class="cover" :src="item.picture" mode="widthFix" :lazy-load="true"></image>
                   </view>
                   
               </view>
           </block>
         
        </view>
		
       
        
        <!-- 小护logo -->
		<view class="xhLogo">
			<image src="../../static/index/xhLogo.png" mode=""></image>
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
    import statusbar from "../../components/statusbar.vue"
	import navB from "../../components/nav.vue";
	export default {
		data() {
			return {
                // 文章列表(模拟数据)
               articleList:[],
                
                // 是否显示没订单的图片
                     isShow:false,
				//是否分享
				ifFx:false,
				text: "", //简介
				//选项卡切换
				list: [
                    {
						name: '全部'
					}, {
						name: '文章'
					}, {
						name: '视频'
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
			this.getArticleList()
		},
		components: {
			navB,
            statusbar
		},
		methods: {
            // 获取文章列表
            getArticleList(){
              
                 this.$myRequest3({
                      url:"wenzhang/api/queryWenzhangliebiao"
                    }).then((res)=>{
                        
                        this.articleList=res
						console.log("文章列表",this.articleList.length)
						if(this.articleList.length == 0){
							console.log(1111)
						     this.isShow=true
						     return
						}
                    })
            },
			//选项卡切换
			changeTabs(index) {
				this.current = index;
			},
			// 跳转对应文章详情
            goArticleDetail(articleId){
                uni.navigateTo({
                    url:"/pages/information/articleDetail/articleDetail?id="+articleId
                })
            }
		}
	}
</script>

<style lang="less" scoped>
   
	@import "information.less";
</style>
