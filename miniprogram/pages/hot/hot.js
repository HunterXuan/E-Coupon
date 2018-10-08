let app = getApp()
Page({
  data: {
    sortByList: [],
    categoryList: [],
    couponList: [],
    selectedSortIndex: 0,
    selectedCatIndex: 0,
    pageIndex: 1,
    isLoading: true,
    loadOver: false
  },

  onLoad: function (options) {
    this.setSortByList()
    this.setCategoryList()
  },

  onShow: function () {
    if (wx.getStorageSync('isDetailBack')) {
      wx.removeStorageSync('isDetailBack')
      return
    }

    this.setData({
      couponList: [],
      pageIndex: 1,
      isLoading: true,
      loadOver: false,
      selectedSortIndex: wx.getStorageSync('selectedSortIndex'),
      selectedCatIndex: wx.getStorageSync('selectedCatIndex')
    })
    this.getMoreCouponList()
  },

  // 设置排序列表
  setSortByList: function () {
    this.setData({
      sortByList: [
        { key: "new", name: "最新券" },
        { key: "price_asc", name: "最优惠" },
        { key: "sale_num", name: "最畅销" }
      ],
      selectedSortIndex: 0
    })
  },

  // 获取商品分类
  setCategoryList: function () {
    let categoryList = [
      { id: "", name: "全部分类" },
      { id: "1", name: "女装" },
      { id: "2", name: "男装" },
      { id: "3", name: "内衣" },
      { id: "4", name: "数码家电" },
      { id: "5", name: "美食" },
      { id: "6", name: "美妆个护" },
      { id: "7", name: "母婴" },
      { id: "8", name: "鞋包配饰" },
      { id: "9", name: "家居家装" },
      { id: "10", name: "文体车品" },
      { id: "11", name: "其它" }
    ]

    this.setData({
      categoryList: categoryList,
      selectedCatIndex: 0
    })
  },

  getMoreCouponList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getHotList',
      data: {
        'category': that.data.selectedCatIndex ? that.data.categoryList[that.data.selectedCatIndex].id : '',
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
      loadOver: false,
      isLoading: true,
      pageIndex: 1,
      selectedSortIndex: e.detail.index,
    })
    this.getMoreCouponList()
    wx.setStorageSync('selectedSortIndex', e.detail.index)
  },

  categoryChanged: function (e) {
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
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
      loadOver: false,
      isLoading: true,
      pageIndex: 1
    })
    wx.stopPullDownRefresh()
    this.getMoreCouponList()
  },

  onReachBottom: function () {
    this.setData({
      isLoading: true,
      loadOver: false,
      pageIndex: this.data.pageIndex + 1
    })
    this.getMoreCouponList()
  }
})
