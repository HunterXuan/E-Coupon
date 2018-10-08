// 云函数入口文件
const cloud = require('wx-server-sdk')
const util = require('util')
const TopClient = require('topsdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const config = await cloud.callFunction({
    name: 'getExtConf'
  })

  const client = new TopClient(
    config.result.APP_KEY,
    config.result.APP_SEC,
    config.result.APP_URL
  )

  let urlTpl = 'https://uland.taobao.com/coupon/edetail?activityId=%s&pid=%s&itemId=%s'

  return new Promise((resolve, reject) => {
    client.execute('taobao.tbk.tpwd.create', {
      'text': event.title,
      'logo': event.picUrl,
      'url': util.format(
        urlTpl,
        event.couponId,
        config.result.APP_MO_PID,
        event.itemId
      )
    }, function (error, response) {
      if (!error && response) {
        resolve(response)
      }
    })
  })
}