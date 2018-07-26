// pages/blessing/blessing.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  confirm:function(){
    // wx.navigateTo({
    //   url: '../yiGive/yiGive'
    // })
  },
  xuanzehy:function(){
    wx.getShareInfo({
      success:function(e){
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //所选择的展示图片
      // sceneCard: userInfo.sceneCard,
      // buyWares: userInfo.buyWares,
      // conInfo: userInfo.conInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      //顶部标题
      title: "留下祝福"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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