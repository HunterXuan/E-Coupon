var app = getApp()
Page({
  data: {
    couponInfo: {},
    picWidth: wx.getSystemInfoSync().windowWidth,
    showTpwdDialog: false,
    tpwd: "",
    hasTpwd: false
  },

  onShow: function () {
    wx.setStorageSync('isDetailBack', true)
  },

  onLoad: function (options) {
    this.setData({
      couponInfo: wx.getStorageSync('couponInfo')
    })

    this.setTpwd()
  },

  showTpwd: function () {
    this.setData({
      showTpwdDialog: true
    })
  },

  setTpwd: function () {
    if (this.data.tpwd == '') {
      let that = this
      wx.cloud.callFunction({
        name: 'getTpwd',
        data: {
          'title': that.data.couponInfo.title,
          'picUrl': that.data.couponInfo.picUrl,
          'couponId': that.data.couponInfo.couponId,
          'itemId': that.data.couponInfo.itemId
        },
        success: (response) => {
          that.setData({
            tpwd: response.result.data.model,
            hasTpwd: true
          })
        }
      })
    }
  },

  copyTpwd: function () {
    wx.setClipboardData({
      data: this.data.tpwd,
      success: (res) => {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})
