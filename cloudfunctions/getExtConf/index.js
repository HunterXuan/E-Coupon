// 接口相关配置
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    'APP_KEY': 'APP_KEY',								// 淘宝客 APP KEY
    'APP_SEC': 'APP_SEC',								// 淘宝客 APP SECRECT
    'APP_URL': 'http://gw.api.taobao.com/router/rest',	// 淘宝客 API 地址
    'APP_DE_PID': 'mm_XXXXXXXXX_YYYYYYYYY_ZZZZZZZZZ',	// 桌面端推广位 PID
    'APP_MO_PID': 'mm_XXXXXXXXX_YYYYYYYYY_ZZZZZZZZZ',	// 移动端推广位 PID
    'APP_DE_ZID': 'ZZZZZZZZZ',							// 桌面端 ZONE ID，即桌面端推广位 PID 最后一段数字
    'APP_MO_ZID': 'ZZZZZZZZZ',							// 移动端 ZONE ID，即移动端推广位 PID 最后一段数字
    'TKZS_APP_KEY': 'TKZS_APP_KEY'						// 淘客助手 APP KEY
  }
}