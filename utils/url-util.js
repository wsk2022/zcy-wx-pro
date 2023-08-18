const { miniPromisify } = require('./async-util')
/**
 * 将参数对象，转成url参数的形式
 * @param paramObj
 * {
 *     paramA:'11',
 *     paramB:'22'
 * }
 * return paramA=11&paramB=22
 */
function formatParams (paramsObj) {
  paramsObj = paramsObj || {}
  const paramKeys = Object.keys(paramsObj)
  const paramPairs = paramKeys.map(key => {
    return `${key}=${paramsObj[key]}`
  })
  return paramPairs.join('&')
}

/**
 *
 * @param commonParams 用列表指定公共参数，用false来禁用
 * @returns {{}}
 */

function filterCommonParams (commonParams) {
  const allCommonParams = {
    time: new Date().getTime()
  }

  const finalCommonParams = {}
  const commonParamsList = commonParams
  if (!(commonParams === false)) {
    if (Array.isArray(commonParamsList)) {
      commonParamsList.map(key => {
        if (key in allCommonParams) {
          finalCommonParams[key] = allCommonParams[key]
        } else {
          console.error(`公共参数:${key}，不存在，请放在params中作为独有参数`)
        }
      })
    } else {
      Object.assign(finalCommonParams, allCommonParams)
    }
  }

  return finalCommonParams
}

/***
 * 将url和参数拼接起来
 * @param url url前面部分
 * @param params url其他参数
 * @param commonParams url公共参数选项
 */
function joinUrlParams (url, params, commonParams) {
  url = url || ''
  let paramsStr = params || ''
  if (typeof params === 'object') {
    paramsStr = formatParams(params)
  }

  let glue = ''
  if (url.includes('?')) {
    const lastChar = url[url.length - 1]
    if (lastChar !== '?' && lastChar !== '&') {
      glue = '&'
    }
  } else {
    glue = '?'
  }

  const commonParamStr = formatParams(filterCommonParams(commonParams))

  const joinUrlResult = `${url}${glue}${paramsStr}${commonParamStr ? '&' + commonParamStr : ''}`
  // console.log(joinUrlResult)
  return joinUrlResult
}

/**
 * 通过配置生成url
 * @param config
 * {
 *     urlPath:'/path/to/page',
 *     params: {
 *         paramA:'11',
 *         paramB:'22'
 *     },
 *     commonParams:['time','studentId']
 * }
 * 函数会自动为每一个url添加公共的参数，除非明确设置commonParams:false
 *
 * return '/path/to/page?paramA=11&paramB=22&time=1234567&studentId=abcdefg'
 */
function generateUrl (config) {
  config = config || {}
  const params = config.params || {}
  return joinUrlParams(config.urlPath || '', params, config.commonParams)
}

function getAdaptedUrlForAPI (url) {
  if (typeof url === 'string') {
    return {
      url
    }
  } else if (typeof url === 'object') {
    if (!url.url) {
      console.error('没有url地址参数:', url)
    } else {
      return url
    }
  } else {
    console.log('无效的参数:', url)
  }
}

const wxRelaunch = (url) => {
  return miniPromisify(wx.reLaunch)(getAdaptedUrlForAPI(url)).catch((err) => {
    console.error(err)
  }).then(() => {
    return {
      jumpedPage: true
    }
  })
}

const wxRedirectTo = (url) => {
  return miniPromisify(wx.redirectTo)(getAdaptedUrlForAPI(url)).catch((err) => {
    console.error(err)
  }).then(() => {
    return {
      jumpedPage: true
    }
  })
}

const wxNavigateTo = (url) => {
  return miniPromisify(wx.navigateTo)(getAdaptedUrlForAPI(url)).catch((err) => {
    console.error(err)
  }).then(() => {
    return {
      jumpedPage: true
    }
  })
}

const wxSwitchTab = (url) => {
  return miniPromisify(wx.switchTab)(getAdaptedUrlForAPI(url)).catch((err) => {
    console.error(err)
  }).then(() => {
    return {
      jumpedPage: false,
      switchedTab: true
    }
  })
}

/**
 * 跳到对应的页面，页面栈从第一个到最后一个，最后一个是目标页面
 * @param urlList
 */
function jumpToUrlWithSeq ([firstUrl = '', ...restUrls]) {
  return wxRelaunch(firstUrl).then(() => {
    return restUrls.reduce((lastPromise, thisUrl) => {
      return lastPromise.then(() => {
        return delayNavigateTo(thisUrl)
      })
    }, Promise.resolve())
  })
}

/**
 * 跳到对应的页面，页面栈从第一个到最后一个，最后一个是目标页面(首跳为wxNavigateTo)
 * @param urlList
 */
function navigateToUrlWithSeq ([firstUrl = '', ...restUrls]) { // 不知道将来会扩展到多少层的路由跳转，所以用restUrls[]接收一下。通过数组reduce方法实现promise的链式掉调用, 类似于 Promise.then(() => new Promise()).then(() => new Promise()).then(() => ...)
  return wxNavigateTo(firstUrl).then(() => {
    return restUrls.reduce((lastPromise, thisUrl) => {
      return lastPromise.then(() => { // 确保上一个url跳转的promise执行了resolve 再继续执行下一个 url的跳转
        return delayNavigateTo(thisUrl)
      })
    }, Promise.resolve())
  })
}

/**
 * 跳到URLTarget，返回可以到URLParent
 * @param urlParent
 * @param urlTarget
 */
function jumpToUrlWithParent (urlParent, urlTarget) {
  return wxNavigateTo(urlParent).then(() => {
    return delayNavigateTo(urlTarget)
  })
}

function delayJump (callback, delay = 1000) { // 套了一层壳 让callBack延迟一秒执行
  if (typeof callback !== 'function') {
    console.error('参数必须要是一个函数才可以：', callback)
    return
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback())
    }, delay)
  })
}

function delayNavigateTo (url) { // 延迟一秒执行 wxNavigateTo(url)
  return delayJump(() => {
    return wxNavigateTo(url)
  })
}

module.exports = {
  generateUrl,
  joinUrlParams,
  jumpToUrlWithParent,
  jumpToUrlWithSeq,
  wxRelaunch,
  wxRedirectTo,
  wxNavigateTo,
  delayNavigateTo,
  delayJump,
  wxSwitchTab,
  navigateToUrlWithSeq
}
