function generateEnvConfig(env) {
  const envConfig = {
    env,
    host: `http://139.129.243.129:18901`,
    codeHost: 'http://139.129.243.129:8090',
    webviewHost: `http://zcy.zhenghe.cn:12801/zcyweb/#/`, // 政和
    // questionHost: `https://www.yijijian.com/h5/#/`, // 调查问卷
    questionHost : `http://127.0.0.1:5173/#/`
  }
  switch (env) {
    case 'prod':
      envConfig.host = `https://mp.zicaicloud.com`
      envConfig.codeHost = 'https://mp.zicaicloud.com' //发送短信
      // envConfig.webviewHost = `http://zcy.zhenghe.cn:12801/zcyweb/#/` // 政和
      envConfig.webviewHost = `https://mp.zicaicloud.com/zhenghe/zcyweb/#/` // 政和
      // envConfig.questionHost = `https://www.zicaicloud.com/h5/#/` // 调查问卷
      envConfig.questionHost = `https://mp.zicaicloud.com/h5/#/` // 调查问卷
      break
    case 'dev':
      break
    case 'test':
      envConfig.host = `https://qa.mp.zicaicloud.com`
      envConfig.codeHost = 'https://qa.mp.zicaicloud.com' //发送短信
      envConfig.webviewHost = `http://zcy.zhenghe.cn:12801/zcyweb/#/` // 政和
      envConfig.questionHost = `https://qa.mp.zicaicloud.com/h5/#/` // 调查问卷
      break;
    default:
      break
  }

  return envConfig
}

// 开发
const devEnv = generateEnvConfig('dev')
// 测试
const testEnv = generateEnvConfig('test')
// 生产
const prodEnv = generateEnvConfig('prod')


// 切换测试、预发和线上改这里
module.exports = testEnv