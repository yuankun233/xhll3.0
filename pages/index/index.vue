<template>
    <view class="container">
        <h1>这是首页主要布局</h1>
        <!-- 字体图标使用示例 -->
        <i class="iconfont icon-a-dizhi2"></i>
        <view class="test"></view>
    </view>
</template>

<script>
import { myRequest } from '../../utils/myrequest1.js'
export default {
    data() {
        return {}
    },
    onLoad() {
        this.getList1()
        this.getList2()
    },
    methods: {
        // 示例ajax1  原型方式
        async getList1() {
            const res = await this.$myRequest({
                url: '/xhll/ServiceList/selectServiceList',
                methods: 'POST',
                data: {
                    cate: 2
                }
            })
            console.log('获取列表1', res)
        },

        // 示例ajax2  按需导入方式
        async getList2() {
            const res = await myRequest({
                url: '/xhll/ServiceList/selectServiceList',
                methods: 'POST',
                data: {
                    cate: 2
                }
            })
            console.log('获取列表2', res)
        }
    }
}
</script>

<style lang="less">
     @import "index.less";
</style>
