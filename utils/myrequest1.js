let ajax = 0 // 用于表示ajax的请求次数

export const myRequest1 = (options) => { //传入的options是一个json对象
    ajax++
    uni.showLoading({
        title: "加载中..."
    }) // 显示加载中提示
    
    // 定义公共的url
    // 莫灵枫の接口
    const baseUrl = "https://www.qycloud.com.cn/bee/open-75661043697254584/"
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url,
            method: options.methods || "GET", // 从options取出请求方法
            data: options.data || {}, // 从options对象中取出数据
            success: (res) => {
                resolve(res.data)
            }, // 不需要传失败的回调，仅判断成功回调就可以完成。
            complete: (res) => {
                ajax--
                // 当ajax都请求成功后隐藏加载框
                if (ajax == 0) {
                    uni.hideLoading()
                }
            }
        })
    })
}
