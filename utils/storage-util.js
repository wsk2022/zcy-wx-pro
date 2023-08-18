const {
  miniPromisify
} = require('./async-util')

// 所有的全局存储需要到这里注册，便于管理防止冲突
const globalStorageKeys = [
  'phoneData', // 手机号验证信息
  'openId', // openid
  'userPhoneNum',//手机号
  'isTerraceLogin', //是否平台登录
  'projectDetail', //详情的项目全部信息
  'accountInfo', //用户与平台绑定关系等信息
  'accessToken', // 请求头
  'projectData', // 审核日志数据
  'sharePagePath',
]

const getGlobalStorageKey = (key) => {
  if (globalStorageKeys.indexOf(key) === -1) {
    console.error('key:', key, '没有在全局key中注册，容易产生冲突，相关功能也不会正常运行')
  }
  return `__gstore__${key}`
}

const wxGetStorage = miniPromisify(wx.getStorage)
const wxSetStorage = miniPromisify(wx.setStorage)
const wxRemoveStorage = miniPromisify(wx.removeStorage)

const setStorageData = (key, data) => {
  return wxSetStorage({
    key: getGlobalStorageKey(key),
    data
  })
}

const setStorageDataSync = (key, data) => {
  return wx.setStorageSync(getGlobalStorageKey(key), data)
}

const getStorageData = (key) => {
  return wxGetStorage({
    key: getGlobalStorageKey(key)
  }).then(res => {
    return res.data
  }).catch(error => {
    // console.error(`getStorageData ${key} error:`, error)
    return null
  })
}

const getStorageDataSync = (key) => {
  try {
    return wx.getStorageSync(getGlobalStorageKey(key))
  } catch (e) {
    console.error(e)
  }
}

const removeStorageData = (key) => {
  return wxRemoveStorage({
    key: getGlobalStorageKey(key)
  })
}

const removeStorageDataSync = (key) => {
  return wx.removeStorageSync(getGlobalStorageKey(key))
}

module.exports = {
  setStorageData,
  setStorageDataSync,
  getStorageData,
  getStorageDataSync,
  removeStorageData,
  removeStorageDataSync
}