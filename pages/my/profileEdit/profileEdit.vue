<template>
    <view class="container">
        <navB :title="title" :ifFx="ifFx"></navB>
        <!-- 头像区域 -->
        <view class="photo">
            <view class="photo_box" @click="getImg">
                <view class="photo_1">头像</view>
                <view class="photo_2"><image :src="inMes.chooseImg" mode=""></image></view>
                <view class="iconfont icon-go"></view>
            </view>
        </view>
        <!-- 信息区域 -->
        <view class="Mes">
            <view class="Mes_box" @click="setMes(0)">
                <text class="Mes_1">用户昵称</text>
                <text class="iconfont icon-go"></text>
                <text class="Mes_2">{{ inMes.name }}</text>
            </view>
            <view class="Mes_box" @click="setMes(1)">
                <text class="Mes_1">性别</text>
                <text class="iconfont icon-go"></text>
                <text class="Mes_2">{{ inMes.sex }}</text>
            </view>
            <view class="Mes_box" @click="setMes(2)">
                <text class="Mes_1">生日</text>
                <text class="iconfont icon-go"></text>
                <text class="Mes_2">{{ inMes.date }}</text>
            </view>
            <!-- <view class="Mes_box" @click="setMes(3)">
                <text class="Mes_1">电话</text>
                <text class="iconfont icon-go"></text>
                <text class="Mes_2">{{ inMes.phone }}</text>
            </view> -->
            <view class="Mes_box" @click="setMes(4)">
                <text class="Mes_1">城市</text>
                <text class="iconfont icon-go"></text>
                <text class="Mes_2">{{ inMes.city }}</text>
            </view>
            <view class="Mes_box" @click="setMes(5)">
                <text class="Mes_1">地址</text>
                <text class="iconfont icon-go"></text>
                <text class="Mes_2">{{ inMes.region }}</text>
            </view>
            <u-picker
                :mode="pickerMode"
                v-model="show"
                :default-selector="[0]"
                :range="nameList"
                range-key="name"
                confirm-color="#41D9CD"
                :params="ifs === 'true' ? region : params"
                @confirm="getMes"
            ></u-picker>
        </view>

        <view class="mod">
            <u-modal v-model="modShow" :show-title="false" :show-cancel-button="true" confirm-color="#41D9CD" @confirm="getInMes">
                <view class="Mes1" v-show="this.id == 0">
                    <view class="Mes1_1">{{ setTitle }}：</view>
                    <view calss="Mes1_2" style="width: 540rpx; height: 50rpx; border-bottom: 2rpx solid #000000;  margin-top: 20rpx;">
                        <input type="text" value="" maxlength="14" v-model="setInMes.setname" />
                    </view>
                </view>
                <view class="Mes1" v-show="this.id == 3">
                    <view class="Mes1_1">{{ setTitle }}：</view>
                    <view calss="Mes1_2" style="width: 480rpx; height: 50rpx; border-bottom: 2rpx solid #000000; margin-top: 20rpx;">
                        <input type="text" value="" maxlength="11" v-model="setInMes.setphone" />
                    </view>
                </view>
                <view class="Mes1" v-show="this.id == 5">
                    <view class="Mes1_1">{{ setTitle }}：</view>
                    <view calss="Mes1_2" style="width: 480rpx; height: 50rpx; border-bottom: 2rpx solid #000000;  margin-top: 20rpx;">
                        <input type="text" value="" v-model="setInMes.setregion" />
                    </view>
                </view>
            </u-modal>
        </view>
        <!-- 保存信息 -->
        <view class="btn" @click="saveMes">保存资料</view>
    </view>
</template>
<script>
import navB from '../../../components/nav.vue'
export default {
    data() {
        return {
            //tab标题
            title: '编辑资料',
            //是否分享
            ifFx: false,
            //数据
            inMes: {
                name: '',
                sex: '',
                date: '',
                phone: '',
                city: '',
                region: '',
                chooseImg: '',
                headImg: '' //上传到服务器的头像地址
            },
            setInMes: {
                setname: '',
                setphone: '',
                setregion: ''
            },
            //修改数据
            //显示下拉框
            show: false,
            //模态框显示与隐藏
            modShow: false,
            //下拉框
            nameList: [
                {
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
                timestamp: true
            },
            //下拉框地区时间比较赋值
            ifs: 'true',
            //点击下标
            id: '',
            //修改title
            setTitle: '',
            //用户id
            Uid: ''
        }
    },
    onLoad() {
        const res = uni.getStorageSync('user_mes')
        if (res) {
            this.inMes = res
            console.log(this.inMes)
        } else {
            //获取用户信息
            uni.getStorage({
                key: 'user',
                success: res => {
                    console.log('user', res)
                    this.inMes.name = res.data.userName
                    this.Uid = res.data.userId
                    this.inMes.sex = res.data.userSex
                    this.inMes.phone = res.data.userPhone
                    this.inMes.city = res.data.userRegion
                    this.inMes.region = res.data.userAddress
                    this.inMes.date = res.data.birthday
                    console.log(this.inMes.name)
                    if (res.data.userHeadLogo === '') {
                        this.inMes.chooseImg = '../../../static/my/tx.png'
                    } else {
                        this.inMes.chooseImg = res.data.userHeadLogo
                    }
                }
            })
        }
    },
    components: {
        navB
    },
    methods: {
        //显示下拉框和跳转修改昵称地址等页面
        setMes(index) {
            this.id = index
            console.log(index)
            if (index == 0) {
                this.modShow = true
                this.setTitle = '修改昵称'
                this.setInMes.setname = this.inMes.name
            } else if (index == 3) {
                this.modShow = true
                this.setTitle = '修改手机号码'
                this.setInMes.setphone = this.inMes.phone
            } else if (index == 5) {
                this.modShow = true
                this.setTitle = '修改地址'
                this.setInMes.setregion = this.inMes.region
            }
            if (index == 1) {
                this.show = true
                this.pickerMode = 'selector'
            }
            if (index == 2) {
                this.show = true
                this.pickerMode = 'time'
                this.ifs = 'false'
            }
            if (index == 4) {
                this.show = true
                this.pickerMode = 'region'
                this.ifs = 'true'
            }
        },
        //给页面赋值
        getMes(e) {
            if (this.pickerMode === 'region') {
                this.inMes.city = e.province.label
            } else if (this.pickerMode === 'time') {
                this.inMes.date = e.year + e.month + e.day
                var date = this.inMes.date.split('')
                date.splice(4, 0, '-')
                date.splice(7, 0, '-')
                this.inMes.date = date.join('')
            } else if ((this.pickerMode = 'selector')) {
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
            if (this.setTitle === '修改昵称') {
                if (this.setInMes.setname === '') {
                    this.modShow = true
                    uni.showToast({
                        title: '昵称格式不对',
                        icon: 'error',
                        duration: 2000
                    })
                    return
                } else {
                    this.inMes.name = this.setInMes.setname
                }
            } else if (this.setTitle === '修改手机号码') {
                var isPhone = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/
                if (this.setInMes.setphone === '' || !isPhone.test(this.setInMes.setphone)) {
                    this.modShow = true
                    uni.showToast({
                        title: '手机号码格式不对',
                        duration: 2000
                    })
                } else {
                    this.inMes.phone = this.setInMes.setphone
                }
            } else if (this.setTitle === '修改地址') {
                if (this.setInMes.setregion === '') {
                    this.modShow = true
                    uni.showToast({
                        title: '地址不能为空',
                        icon: 'error',
                        duration: 2000
                    })
                    return
                } else {
                    this.inMes.region = this.setInMes.setregion
                }
            }
        },
		
        //上传头像
        getImg() {
			// uni.authorize({
			//     scope: 'scope.camera',
			//     success: res => {
			        uni.chooseImage({
			            count: 1,
						crop:{
							width:'73',
							height:'73',
							// quality:'100'
						},
			            success: res => {
			                this.inMes.chooseImg = res.tempFilePaths[0]
			                // 执行图片上传
			                uni.uploadFile({
			                    url: 'https://www.xiaohulaile.com/xh/p/alipay/Upload/imgs', //仅为示例，非真实的接口地址
			                    filePath: res.tempFilePaths[0], //文件路径
			                    name: 'image',
			                    formData: {
			                        id: this.Uid
			                    },
			                    success: uploadFileRes => {
			                        console.log('图片上传', uploadFileRes.data)
			                        // 保存到本地
			                        this.inMes.headImg = uploadFileRes.data
			                    }
			                })
			            }
			        })
			//     }
			// })
        },
        //保存资料
        async saveMes() {
            console.log(this.Uid)
            try {
                let data = {
                    userPhone: this.inMes.phone,
                    userSex: this.inMes.sex,
                    userAddress: this.inMes.region,
                    userHeadLogo: this.inMes.headImg,
                    userName: this.inMes.name,
                    birthday: this.inMes.date,
                    userRegion: this.inMes.city,
                    userId: this.Uid
                }
                console.log('编辑资料ajax数据:', data)
                this.$myRequest3({
                    url: 'enroll/api/editUser',
                    methods: 'POST',
                    data
                }).then(res => {
                    uni.setStorage({
                        key: 'user_mes',
                        data: this.inMes,
                        success: res => {
                            uni.reLaunch({
                                url: '/pages/my/my'
                            })
                        }
                    })
                })
            } catch (e) {}
        }
    }
}
</script>

<style lang="less" scoped>
@import 'profileEdit.less';
</style>
