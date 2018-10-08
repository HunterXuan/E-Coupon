let app = getApp()
Page({
  data: {
    sortByList: [],
    categoryList: [],
    couponList: [],
    selectedSortIndex: 0,
    selectedCatIndex: 0,
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
      pageIndex: 1,
      selectedSortIndex: wx.getStorageSync('selectedSortIndex'),
      selectedCatIndex: wx.getStorageSync('selectedCatIndex')
    })
    this.getMoreCouponList()
  },

  getMoreCouponList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getNineNineList',
      data: {
        'category': that.data.selectedCatIndex ? that.data.categoryList[that.data.selectedCatIndex].id : '',
        'sort': that.data.selectedSortIndex ? that.data.sortByList[that.data.selectedSortIndex].key : 'new',
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

  sortByChanged: function (e) {
    this.setData({
      couponList: [],
      pageIndex: 1,
      selectedSortIndex: e.detail.index,
    })
    this.getMoreCouponList()
    wx.setStorageSync('selectedSortIndex', e.detail.index)
  },

  categoryChanged: function (e) {
    this.setData({
      couponList: [],
      pageIndex: 1,
      selectedCatIndex: e.detail.value,
    })
    this.getMoreCouponList()
    wx.setStorageSync('selectedCatIndex', e.detail.value)
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

  onPullDownRefresh: function () {
    this.setData({
      couponList: [],
      pageIndex: 1
    })
    wx.stopPullDownRefresh()
    this.getMoreCouponList()
  },

  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getMoreCouponList()
  }
})
