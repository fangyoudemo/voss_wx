// pages/Orderdetails/Orderdetails.js
//获取应用实例
var app = getApp()
var history = app.globalData.history
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < history.orderList.length; i++) {
      if(history.orderList[i].orderId ==options.orderId){
        this.setData({
          detail: history.orderList[i]
        })
      }
    }
    for (let i = 0; i < history.orderList2.length; i++) {
      if (history.orderList2[i].orderId == options.orderId) {
        this.setData({
          detail: history.orderList2[i]
        })
      }
    }
    for (let i = 0; i < history.selforderList.length; i++) {
      if (history.selforderList[i].orderId == options.orderId) {
        this.setData({
          orderList: history.selforderList[i]
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      //顶部标题
      title: "订单详情"
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})