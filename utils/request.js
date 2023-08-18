const config = require('./config.js')
let requestTask = null
const app = getApp()
// 白名单中的接口请求不会统一添加showLoading： 加载中
const whiteList = [
  '/mpProjectDeclare/api/track/share', // 分享接口
]

/**
 * @param url
 * @param data
 * @param header
 * @param method
 * @param ignoreLoadingToast 这里不做接口loading状态处理
 * @param  isShowLoading 是否展示默认loading
 * @returns {Promise<unknown>}
 */
const request = ({
  url,
  data = {},
  header = {},
  method = 'POST',
  ignoreLoadingToast = false,
  isShowLoading = true
}) => {
  
  const reqHeader = Object.assign({}, header)

  url = url.replace(/(^\s*)|(\s*$)/g, '') // 去掉url左右空格
  const promise = new Promise((resolve, reject) => {
    if (!whiteList.includes(url) && !ignoreLoadingToast && isShowLoading) {
      wx.showLoading({
        title: '加载中'
      })
    }
    requestTask = wx.request({
      // 发送短息在另一个端口号上
      url: url.indexOf('sms') > -1 ? `${config.codeHost}${url}` : `${config.host}${url}`,
      data,
      header: reqHeader,
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        const resData = res.data
        if (resData.code && resData.code === 200) {
          if (!whiteList.includes(url) && !ignoreLoadingToast && isShowLoading) {
            wx.hideLoading()
          }
          resolve(resData)
        } else if (resData.code === -1) { //操作出错
          wx.showToast({
            title: resData.message || '接口异常，请稍后重试',
            icon: 'none',
            duration: 2000
          })
          reject(resData)
        } else if (resData.code === 120) { // 网关校验不过, 跳转重新登陆
          wx.hideLoading()
          wx.showToast({
            title: '页面异常，请重新登录',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/mine/index'
            })
          }, 2000)
        } else {
          wx.hideLoading()
        }
      },
      fail: (err) => {
        if (err.errMsg === 'request:fail abort') {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(null)
        }
        wx.showToast({
          title: err.errMsg || '网络异常请重试',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function (res) {}
    })
    requestTask.onHeadersReceived((res) => {
      if (res.header && (res.header['SHARED-CONFIG'] || res.header['shared-config'])) { // 灰度标识, 大小写兼容
        app.globalData.grayVersionFlag = true
      }
    })
  })
  // eslint-disable-next-line no-proto
  // promise.__proto__.requestTask = requestTask // 这行代码这样写，会导致geetest（极验）验证码插件的接入有异常，比如返回值字符串变成[object...，校验弹层出不来等等
  // 上面这行__proto__的写法我猜原意是想留个处理的后门，让promise也能调用requestTask 的方法，比如abort，但放__proto__也会导致后面的请求会覆盖前面的结果，其实没啥鸟用
  // 暂时换成下面的这种方式,对当前对象有效，且不被覆盖
  promise.requestTask = requestTask
  return promise
}

module.exports = {
  request
}