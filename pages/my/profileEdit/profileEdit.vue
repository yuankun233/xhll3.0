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
		
		<view class="mod">
			<u-modal v-model="modShow" :show-title="false" :show-cancel-button="true" confirm-color="#41D9CD" @confirm="getInMes">
				<view class="Mes1" v-show="this.id == 0">
					<view class="Mes1_1">{{setTitle}}：</view>
					<view calss="Mes1_2" style="width: 540rpx; height: 50rpx; border-bottom: 2rpx solid #000000;  margin-top: 20rpx;"><input
							type="text" value="" maxlength="14" v-model="setInMes.setname" /></view>
				</view>
				<view class="Mes1" v-show="this.id == 3">
					<view class="Mes1_1">{{setTitle}}：</view>
					<view calss="Mes1_2" style="width: 480rpx; height: 50rpx; border-bottom: 2rpx solid #000000; margin-top: 20rpx;"><input
							type="text" value="" maxlength="11" v-model="setInMes.setphone"  /></view>
				</view>
				<view class="Mes1" v-show="this.id == 5">
					<view class="Mes1_1">{{setTitle}}：</view>
					<view calss="Mes1_2" style="width: 480rpx; height: 50rpx; border-bottom: 2rpx solid #000000;  margin-top: 20rpx;"><input
							type="text" value="" v-model="setInMes.setregion"  /></view>
				</view>
			</u-modal>
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
				
				//数据
				inMes: {
					name: '1',
					sex: '1',
					date: '1',
					phone: '1',
					city: '1',
					region: '1'
				}, 
				setInMes:{
					setname:'',
					setphone:'',
					setregion:''
				},
				//修改数据
				//显示下拉框
				show: false,
				//模态框显示与隐藏
				modShow:false,
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
				region: {
					province: true,
					city: false,
					area: false
				},
				//时间下拉框选择显示的区域
				params: {
					year: true,
					month: true,
					day: true,
					// 选择时间的时间戳
					timestamp: true,
				},
				//下拉框地区时间比较赋值
				ifs: 'true',
				//点击下标
				id:'',
				//修改title
				setTitle:''
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
				this.id= index;
				console.log(index)
					if(index == 0) {
						this.modShow = true
						this.setTitle = '修改昵称'
					}else if(index == 3) {
						this.modShow = true
						this.setTitle = '修改手机号码'
					}else if(index == 5) {
						this.modShow = true
						this.setTitle = '修改地址'
					}
				if (index == 1) {
					this.show = true;
					this.pickerMode = "selector";
				}
				if (index == 2) {
					this.show = true;
					this.pickerMode = "time";
					this.ifs = "false"
				}
				if (index == 4) {
					this.show = true;
					this.pickerMode = "region";
					this.ifs = "true"
				}
			},
			//给页面赋值
			getMes(e) {
				if (this.pickerMode === "region") {
					this.inMes.city = e.province.label
				} else if (this.pickerMode === "time") {
					this.inMes.date = e.year + e.month + e.day;
					var date = this.inMes.date.split("");
					date.splice(4, 0, '-');
					date.splice(7, 0, '-');
					this.inMes.date = date.join("");
				} else if (this.pickerMode = "selector") {
					if (e == 0) {
						this.inMes.sex = '男'
					} else if (e == 1) {
						this.inMes.sex = '女'
					}
				}
				console.log(e)
			},
			// 给修改的数据赋值
			getInMes() {
				if(this.setTitle === '修改昵称') {
					this.inMes.name = this.setInMes.setname
				}else if(this.setTitle === '修改手机号码') {
					this.inMes.phone = this.setInMes.setphone
				}else if(this.setTitle === '修改地址'){
					this.inMes.region = this.setInMes.setregion
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	@import "profileEdit.less";
</style>
