// uview表单校验规则


// 表单校验错误提示
export const errorType = ['toast']

// 登录表单校验规则
export const rules = {
    // 手机号码
    tel: [{
            required: true,
            message: '请输入手机号码',
            trigger: ['blur', 'change']
        },
        {
            pattern: /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,
            // 正则检验前先将值转为字符串
            transform(value) {
                return String(value)
            },
            message: '手机号码格式错误',
            trigger: ['change', 'blur']
        }
    ],
    // 验证码
    authcode: [{
        required: true,
        message: "请输入验证码"
    }],
    // 密码
    password: [{
        required: true,
        message: "请输入密码"
    }]
}


// 详情页表单校验规则
export const serveDetailRules = {
    // 患者名称
    archiveName: [{
        required: true,
        message: '请选择患者'
    }],
    // 服务时间
    timeSlot: [{
        required: true,
        message: "请选择服务时间"
    }],
    // 服务日期
    date: [{
        required: true,
        message: "请选择服务日期"
    }]
}