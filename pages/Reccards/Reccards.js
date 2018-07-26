//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
Page({
  data: {
    //轮播img
    bannerImg: [],
    //卡面
    giftcards: [],
    //首页轮播设置
    indicatorDots: true,
    indicatorColor: "#fff",
    indicatorActiveColor: "#000",
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
  },
  //点击卡面
  bindViewCoffeeOnMe: function (event) {
    var Cardid = event.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?Cardid=' + Cardid
    })
  },
  //点击购买历史
  buyhistory: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //从服务器获取banner图并设置到页面中
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/banner',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          bannerImg: res.data
        })
      }
    })
    //将服务器获取商品信息设置到index.js中
    this.setData({
      giftcards: giftcards
    })
  }

})


