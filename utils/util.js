/* eslint-disable eqeqeq */
// 全局公共函数

// 全局配置文件
const app = getApp()
const config = require('./config.js')

// 大写中文数字
const changeNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十']

function zeroFill (value) {
  value += ''
  if (value.length < 2) {
    return '0' + value
  } else {
    return value
  }
}

// 手机号校验
const isPoneAvailable = (pone) => {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(pone)) {
    return false
  } else {
    return true
  }
}
// 输入:new Date()
// 输出:2019/03/04 10:20:27
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 输入:new Date()
// 输出:2019/03/04 10:20:27
const formatTimeLine = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 输入:new Date()
// 输出:2019/03/04 10:20
const formatTimeNoSecond = timestamp => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}
const getTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}.${month}.${day}`
}

/**
 * 时间格式转换函数
 * @param 2019-12-08 15:22:29
 * @return 12-08 15:22
 */
const getTimeA = (date) => {
  const month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  return `${month}-${day} ${hour}:${minute}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 10位时间戳
const getTimeStamp = () => {
  let time = new Date().getTime()
  time = time + ''
  return time.slice(0, 10)
}

/**
 * 节流函数 millisecond 毫秒内只能触发一次
 * @param millisecond
 * @return boolean
 */
let now = Date.now()
const delayClear = (millisecond) => {
  if (Date.now() - now > millisecond) {
    now = Date.now()
    return true
  } else {
    return false
  }
}

const share = () => {
  return {
    title: '',
    path: '',
    imageUrl: ''
  }
}

/**
 * 时间格式转换函数
 * @param second 秒
 * @return hh:mm:ss 时分秒
 */
function secondToDate (result) {
  const h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
  const m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
  const s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
  // h + ":" + m + ":" + s "00:00:15"
  if (h == '00') {
    if (m == '00') {
      result = s + '秒'
    }
    result = +m + '分' + s + '秒'
  }
  result = h + '时' + m + '分' + s + '秒'
  return result
}

function secondToDate2 (result) {
  const h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
  const m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
  const s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
  result = h + ':' + m + ':' + s
  return result
}
/**
 * 获取上层页面路径
 * @param
 * @return
 */
function getPrevPageRoute () {
  return getPageRoute(1)
}

function getCurrentPageRoute () {
  return getPageRoute()
}
function getPageRoute (delta = 0) {
  const targetPage = getPageObj(delta)
  if (targetPage) {
    return targetPage.route
  } else {
    return ''
  }
}

function getPage (delta, onlyRoute = false) {
  if (onlyRoute) {
    return getPageRoute(delta)
  } else {
    return getPageObj(delta)
  }
}

function getPageObj (delta = 0) {
  const pages = getCurrentPages()
  const targetPage = pages[pages.length - 1 - delta]
  if (targetPage) {
    return targetPage
  } else {
    console.error(`页面偏移量不正确，页面总数${pages.length},偏移量${delta}`)
    return null
  }
}

/**
 * 生成uuid 32位 + 4个-
 * @return uuid
 */
function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}

/**
 * 初试化app.globalData.tempInfo
 * @return
 */
function initTempInfo () {
  const ti = app.globalData.tempInfo
  for (const key in ti) {
    ti[key] = ''
  }
}

/**
 * 初始化localStorage-guideType 全局引导层状态 true-弹过-不显示遮罩层 false-没弹过-显示遮罩层
 * @param
 * @return
 */
function initGuideType () {
  if (wx.getStorageSync('guideType') == '') {
    const guideType = {
      selfCorrectModal: false// 去作答页面自主批改镂空引导遮罩层
    }
    wx.setStorageSync('guideType', JSON.stringify(guideType))
  }
}

/**
 * 全局公共计时器
 */
let count = 0
let timer = null
function initTimer () {
  count = 0
  timer = setInterval(() => { count++ }, 1000)
}
function getCount () {
  return count
}
function stopTimer () {
  clearInterval(timer)
  count = 0
  timer = null
}
/**
   * pdf预览
   * @param url pdf文件地址
   * @param fileName 文件名
   * @param switchToTabUrl 完成预览后跳转到tabBar的url
   * @param switchToOtherUrl 完成预览后跳转到其他页面的url
   */
function pdfPreview ({ url, fileName, switchToOtherUrl = '', switchToTabUrl = '' }) {
  wx.downloadFile({
    url: url,
    filePath: wx.env.USER_DATA_PATH + '/' + fileName,
    success: function (res) {
      const filePath = res.filePath
      wx.openDocument({
        filePath: filePath,
        fileType: 'pdf',
        success: function (res) {
          if (switchToTabUrl) {
            wx.switchTab({
              url: switchToTabUrl
            })
          } else if (switchToOtherUrl) {
            wx.navigateTo({
              url: switchToOtherUrl
            })
          }
          wx.hideLoading()
        },
        fail: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '文件打开失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    fail: function (res) {
      wx.hideLoading()
      wx.showToast({
        title: '文件下载失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
}

// 为了避免到处都引用scanUtil，但又要引用这个util 都是坑
function commonScanFlagReset () {
  const { qrcodeInfo } = app.globalData
  qrcodeInfo.scanEnter = false
  qrcodeInfo.fromScan = false
  qrcodeInfo.fromScanStatistics = false
}

const resetScanStatisticsFlag = () => {
  // 保证调用接口时状态绝大部分时间是对的
  const { qrcodeInfo } = app.globalData
  setTimeout(() => {
    qrcodeInfo.fromScanStatistics = false
  }, 4000)
}

const resetScanEnterFlag = () => {
  const { qrcodeInfo } = app.globalData
  qrcodeInfo.scanEnter = false

  resetScanStatisticsFlag()
}

const resetOpenEnterFlag = () => {
  const { openMiniInfo } = app.globalData
  openMiniInfo.openEnter = false
}

// 类似表单序列化
function queryToString (query) {
  if (!query || typeof query !== 'object') return
  const arr = Object.keys(query)
  if (arr.length == 0) return
  const result = arr.reduce((result, key, i) => {
    // 只要query[key]是undefined或者null的时候才会进入符合if语句判断 执行
    if (typeof query[key] === 'undefined') return result
    result += key + '=' + query[key == 'itemToken' ? 'itemsToken' : key] + '&'
    return result
  }, '')
  return result.slice(0, -1)
}

module.exports = {
  zeroFill,
  getTimeA,
  commonScanFlagReset,
  resetScanEnterFlag,
  resetOpenEnterFlag,
  formatTime: formatTime,
  formatTimeLine: formatTimeLine,
  getTimeStamp: getTimeStamp,
  delayClear: delayClear,
  getTime,
  changeNum,
  share: share,
  isPoneAvailable: isPoneAvailable,
  secondToDate: secondToDate,
  getPrevPageRoute,
  getCurrentPageRoute,
  getPageRoute,
  getPageObj,
  getPage,
  uuid,
  initTempInfo,
  initGuideType,
  initTimer,
  getCount,
  stopTimer,
  secondToDate2,
  formatTimeNoSecond,
  pdfPreview,
  queryToString
}
