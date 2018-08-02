//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
Page({
  data: {
  },
  seeImg: function () {
    wx.previewImage({
      urls: ('https://scrm.cnt-ad.net' + this.data.givemsg.Order.Uploadpic).split(',')
    })
  },
  use:function(){
    var orderid = this.data.orderid
    var selcard = this.data.givemsg.Order.OrderImg
    wx.navigateTo({
      url: '../usecard/usecard?orderid=' + orderid + '&selcard=' + selcard,
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
        that.setData({ givemsg:res.data})
      }
    })
  }

})


