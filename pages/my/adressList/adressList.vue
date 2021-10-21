<template>
	<view class="container">
		<!-- 头部 -->
		<navB :title="title" :ifFx="ifFx"></navB>
		<!-- 列表 -->
		<view class="addList_box">
			<view class="addList" v-for="(item,index) in addList" :key="item.id">
				<view class="addList_1">
					<view><text>{{item.archivesName}}</text><text>{{item.archivesSex}}</text></view>
					<view><text>{{item.archivesAddress}}</text></view>
					<view>手机号：{{item.archivesPhone}}</view>
				</view>
				<view class="addList_2">
					<view @click="editAdress(index)">编辑</view>
					<view @click="removeAdress(item.id)">删除</view>
				</view>
			</view>
		</view>
		<!-- 添加按钮 -->
		<view class="addBtn" @click="addBtn">新增健康档案</view>
	</view>

</template>

<script>
	import navB from "../../../components/nav.vue";
	export default {
		data() {
			return {
				//tab标题
				title: "地址管理",
				//是否分享
				ifFx: false,
				//列表
				addList: [],
				isedit:false
			}
		},
		onLoad() {
			this.getAddressList();
		},
		methods: {
			//封装请求列表接口
			async getAddressList() {
				const res = await this.$myRequest1({
					url: 'xhll/patient/selectPatient',
					methods: 'POST',
					data: {
						userId: 1
					}
				})
				this.addList = res.data.selectPatient.data;
				console.log(this.addList)
			},
			//封装删除接口
			async removeMes(id) {
				const removeRes = await this.$myRequest1({
					url: 'xhll/patient/delPatient',
					methods: 'POST',
					data: {
						archivesId: id
					}
				})
				if(removeRes.data.delPatient === true){
					this.getAddressList();
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					});
				}else {
					uni.showToast({
						title: '删除失败请稍后再试',
						icon: 'error'
					});
				}
				
			},
			//跳转新增
			addBtn() {
				uni.navigateTo({
					url:'../adressEdit/adressEdit'
				})
			},
			//删除地址
			removeAdress(id) {
				console.log(id)
				uni.showModal({
					title:'提示',
					content:'是否删除地址',
					success: (res) => {
						if(res.confirm){
							this.removeMes(id)
						}
					}
				})
			},
			// 编辑地址
			editAdress(index) {
				this.isedit = true
				uni.setStorage({
					key:'user_address',
					data:this.addList[index]
				})
				uni.navigateTo({
					url:'../adressEdit/adressEdit?id='+this.isedit
				})
			}
		},
		components: {
			navB,
		},
	}
</script>

<style lang="less" scoped>
	@import "adressList.less";
</style>
