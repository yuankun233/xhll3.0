<template>
	<view class="container">
		<!-- 头部 -->
		<navB :title="title" :ifFx="ifFx"></navB>
		<view class="list">
			<!-- 表单 -->
			<u-form :model="form" ref="uForm" label-width="auto" :error-type="errorType">
				<u-form-item label="姓名:" prop="archivesName">
					<u-input v-model="form.archivesName" />
				</u-form-item>
				<u-form-item label="性别:" prop="archivesSex">
					<u-radio-group v-model="form.archivesSex">
						<u-radio v-for="(item, index) in radioForm" :key="index" :name="item.sex"
							:disabled="item.disabled">
							{{ item.sex }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="年龄:" prop="archivesAge">
					<u-input v-model="form.archivesAge" />
				</u-form-item>
				<u-form-item label="联系电话:" prop="archivesPhone">
					<u-input v-model="form.archivesPhone" />
				</u-form-item>
				<u-form-item label="地址:">
					<view @click="getMtk">{{form.archivesRegion != '' ? form.archivesRegion : '请选择'}}</view>
					<u-picker mode="region" v-model="show" :default-selector="[0]" @confirm="getRegionMes"
						confirm-color="#41D9CD"></u-picker>
				</u-form-item>
				<u-form-item label="详细地址:" prop="archivesAddress">
					<u-input v-model="form.archivesAddress" />
				</u-form-item>
			</u-form>
			<view class="textMes">
				<view class="title"><text>疾病信息</text><text>(护士填写)</text></view>
				<textarea value="" placeholder="请输入内容" v-model="form.archivesText" />
			</view>
		</view>
		<!-- 添加按钮 -->
		<view class="addBtn" @click="addBtn(isStatus)">{{isStatus === false ? '立即添加' : '立即修改'}}</view>
	</view>
</template>

<script>
	import navB from "../../../components/nav.vue";
	import {
		errorType,
		addressRules
	} from '@/common/js/formrules.js' // 引入校验错误规则
	export default {
		data() {
			return {
				//表单数据
				form: {
					archivesName: '',
					archivesSex: '',
					archivesAge: null,
					archivesPhone:null,
					archivesRegion: '',
					archivesAddress: '',
					archivesText: '',
					archivesUid:1
				},
				radioForm: [{
					sex: '男',
					disabled: false
				}, {
					sex: '女',
					disabled: false
				}],
				//tab标题
				title: "健康档案",
				//是否分享
				ifFx: false,
				//地区选择模态框
				show: false,
				// 表单校验规则
				addressRules,
				//表单错误提示
				errorType,
				//判断是增加还是修改
				isStatus:false
			}
		},
		onLoad(option) {
			if(option.id === 'true') {
				this.isStatus = true;
				var list = uni.getStorage({
					key:'user_address',
					success: (res) => {
						console.log(res.data)
						this.form.archivesName = res.data.archivesName
						this.form.archivesSex = res.data.archivesSex
						this.form.archivesPhone = res.data.archivesPhone
						this.form.archivesRegion = res.data.archivesRegion
						this.form.archivesAddress = res.data.archivesAddress
						this.form.archivesAge = res.data.archivesAge
						this.form.archivesText = res.data.archivesText
						this.form['id'] = res.data.id
					}
				})
			}
		},
		methods: {
			//点击选择地区下拉框
			getMtk() {
				this.show = true
			},
			//地区赋值
			getRegionMes(e) {
				this.form.archivesRegion = e.province.label + e.city.label + e.area.label
			},
			//封装新增接口
			async getPort() {
				const res = await this.$myRequest1({
					url: 'xhll/patient/savePatient',
					methods: 'POST',
					data: {
						...this.form
					}
				})
				//判断是否添加成功，跳转到列表页面
				if(res.data.savePatient === true) {
					uni.navigateTo({
						url:'../adressList/adressList'
					})
				}
			},
			//修改接口封装
			async aditAdress() {
				const aditRes = await this.$myRequest1({
					url: 'xhll/patient/editPatient',
					methods: 'POST',
					data: {
						...this.form
					}
				})
				console.log(aditRes)
				//判断是否修改成功，跳转到列表页面
				if(res.data.editPatient === true) {
					uni.navigateTo({
						url:'../adressList/adressList'
					})
				}
			},
			//添加
			addBtn(e) {
				//判断是添加还是修改
				if(e === false) {
					//正则验证
					if (this.form.archivesRegion === '') {
						uni.showToast({
							title: '请选择地址',
							icon: 'none'
						});
					} else if (this.form.archivesText === '') {
						uni.showToast({
							title: '请输入内容',
							icon: 'none'
						});
					}
					this.$refs.uForm.validate(valid => {
						if (valid) {
							this.getPort()
						} else {
							
						}
					})
				}else {
					this.aditAdress()
				}
				
			}
		},
		components: {
			navB,
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.addressRules)
		}
	}
</script>

<style lang="less" scoped>
	@import "adressEdit.less";
</style>
