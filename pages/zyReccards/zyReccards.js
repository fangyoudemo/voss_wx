//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
Page({
  data: {
    township: ['请选择街道'],
    townshipIndex: 0,
    subtype: 0,   //控制弹窗显示
  },
  bindtownship: function (e) {
    this.setData({ townshipIndex: e.detail.value });
  },
  seeImg: function () {
    wx.previewImage({
      urls: ('https://scrm.cnt-ad.net' + this.data.givemsg.uploadpic).split(',')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var orderid = options.orderid
    console.log(options)
    this.setData({
      orderid: orderid,
      openid: userInfo.openid
    })
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/selforderdetail',
      data: { orderid: orderid},
      success:function(res){
        console.log(res)
      }
    })
  }

})


