let app = getApp()
Page({
  data: {
    couponList: [],
    searchContent: "",
    pageIndex: 1
  },

  onLoad: function (options) {
  },

  onShow: function () {
    if (wx.getStorageSync('isDetailBack')) {
      wx.removeStorageSync('isDetailBack')
      return
    }

    this.setData({
      couponList: [],
      searchContent: "",
      pageIndex: 1
    })
  },

  onSearch: function (e) {
    if (e.detail !== "") {
      this.setData({
        searchContent: e.detail,
        couponList: []
      }, () => {
        this.getMoreCouponList()
      })
    }
  },

  jumpToDetail: function (e) {
    wx.setStorage({
      key: 'couponInfo',
      data: this.data.couponList[e.currentTarget.dataset.index],
      success: () => {
        wx.navigateTo({
          url: '../detail/detail',
        })
      }
    })
  },

  getMoreCouponList: function () {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    wx.cloud.callFunction({
      name: 'getSearchList',
      data: {
        'query': that.data.searchContent,
        'page': that.data.pageIndex
      },
      success: response => {
        that.setData({
          couponList: that.data.couponList.concat(response.result)
        }, () => {
          wx.hideLoading()
        })
      }
    })
  },

  jumpToDetail: function (e) {
    wx.setStorage({
      key: 'couponInfo',
      data: this.data.couponList[e.currentTarget.dataset.index],
      success: () => {
        wx.navigateTo({
          url: '../detail/detail',
        })
      }
    })
  },

  onReachBottom: function () {
    if (this.data.searchContent !== "") {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      }, () => {
        this.getMoreCouponList()
      })
    }
  }
})
