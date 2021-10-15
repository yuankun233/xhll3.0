<script>
export default {
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import 'common/css/iconfont.css';
@import 'common/css/fontfamily.css';
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    // 解决溢出隐藏
    overflow: hidden;
}
page {
    background-color: #f5f5f5;
    font-weight: normal;
}
//圆形图片
.imageRadio {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>
