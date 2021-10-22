<template>
    <view class="container">
        <my-nav :title="nav_title" ></my-nav>
        <rich-text :nodes="argument"></rich-text>
    </view>
</template>

<script>
import mynav from '../../../components/mynav.vue'
export default {
    data() {
        return {
            argument: '',
            nav_title:"用户协议"
        }
    },
    components: {
        'my-nav': mynav
    },
    methods: {
        //获取用户协议
        async getAgreement() {
            try {
                const res = await this.$myRequest1({
                    url: 'xhll/info/selectInfo',
                    method: 'get'
                })

                console.log(res)
                if (res) {
                    this.argument = res.data.selectInfo[0].agreement
                }
            } catch (e) {
                //TODO handle the exception
            }
        }
    },
    onLoad() {
        // 获取用户协议
        this.getAgreement()
    }
}
</script>

<style></style>
