<template>
	<view class="container">
		<navB :title="title" :ifFx="ifFx"></navB>
		<!-- 头像区域 -->
		<view class="photo">
			<view class="photo_box">
				<view class="photo_1">头像</view>
				<view class="photo_2">
					<image src="../../../static/index/da.png" mode=""></image>
				</view>
				<view class="iconfont icon-go"></view>
			</view>
		</view>
		<!-- 信息区域 -->
		<view class="Mes">
			<view class="Mes_box" @click="setMes(0)">
				<text class="Mes_1">用户昵称</text>
				<text class="iconfont icon-go"></text>
				<text class="Mes_2">{{inMes.name}}</text>
			</view>
			<view class="Mes_box" @click="setMes(1)">
				<text class="Mes_1">性别</text>
				<text class="iconfont icon-go"></text>
				<text class="Mes_2">{{inMes.sex}}</text>
			</view>
			<view class="Mes_box" @click="setMes(2)">
				<text class="Mes_1">生日</text>
				<text class="iconfont icon-go"></text>
				<text class="Mes_2">{{inMes.date}}</text>
			</view>
			<view class="Mes_box" @click="setMes(3)">
				<text class="Mes_1">电话</text>
				<text class="iconfont icon-go"></text>
				<text class="Mes_2">{{inMes.phone}}</text>
			</view>
			<view class="Mes_box" @click="setMes(4)">
				<text class="Mes_1">城市</text>
				<text class="iconfont icon-go"></text>
				<text class="Mes_2">{{inMes.city}}</text>
			</view>
			<view class="Mes_box" @click="setMes(5)">
				<text class="Mes_1">地址</text>
				<text class="iconfont icon-go"></text>
				<text class="Mes_2">{{inMes.region}}</text>
			</view>
			<u-picker :mode="pickerMode" v-model="show" :default-selector="[0]" :range="nameList" range-key="name"
				confirm-color="#41D9CD" :params="ifs === 'true' ?region : params" @confirm="getMes"></u-picker>
		</view>
	</view>
</template>
<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//tab标题
				title: "编辑资料",
				//是否分享
				ifFx: false,
				inMes: {
					name:'',
					sex:'',
					date:'',
					phone:'',
					city:'',
					region:''
				}, //数据
				//显示下拉框
				show: false,
				//下拉框
				nameList: [{
						cateName: '1',
						name: '男'
					},
					{
						cateName: '2',
						name: '女'
					}
				],
				//下拉框类型
				pickerMode: '',
				//地区下拉框选择显示的区域
				region:{
					province:true,
					city:false,
					area:false
				},
				//时间下拉框选择显示的区域
				params :{
					year: true,
					month: true,
					day: true,
					// 选择时间的时间戳
					timestamp: true,
				},
				//下拉框地区时间比较赋值
				ifs:'true'
			}
		},
		onLoad() {

		},
		components: {
			navB,
		},
		methods: {
			//显示下拉框和跳转修改昵称地址等页面
			setMes(index) {
				this.show = true;
				if (index == 0 || index == 3 || index == 5) {
					uni.navigateTo({
						url:'../setMes/setMes?id='+index
					})
				}
				if (index == 1) {
					this.pickerMode = "selector";
				}
				if (index == 2) {
					this.pickerMode = "time";
					this.ifs = "false"
				}
				if (index == 4) {
					this.pickerMode = "region";
					this.ifs = "true"
				}
			},
			//给页面赋值
			getMes(e) {
				if(this.pickerMode === "region"){
					this.inMes.city = e.province.label
				}else if(this.pickerMode === "time") {
					this.inMes.date = e.year+e.month+e.day;
					var date = this.inMes.date.split("");
					date.splice(4,0,'-');
					date.splice(7,0,'-');
					this.inMes.date = date.join("");
				}else if(this.pickerMode = "selector") {
					if(e == 0) {
						this.inMes.sex = '男'
					}else if(e == 1) {
						this.inMes.sex = '女'
					}
				}
				
			}
		},
	}
</script>

<style lang="less" scoped>
	@import "profileEdit.less";
</style>
