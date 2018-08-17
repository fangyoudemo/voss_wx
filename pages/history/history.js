// pages/history/history.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var history = app.globalData.history
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authSetting:true
  },
  seeLogistics:function(e){
    var orderId = e.target.dataset.orderid
    wx.navigateTo({
      url: '../logistics/logistics?orderId=' + orderId,
    })
  },
  orderDetails:function(res){
    var orderId=res.target.dataset.id
    wx.navigateTo({
      url: '../Orderdetails/Orderdetails?orderId=' + orderId,
    })
  },
  blessing: function (e){
    var orderId = e.target.dataset.orderid
    var orderimg = e.target.dataset.orderimg
    var cardid = e.target.dataset.cardid
    wx.navigateTo({
      url: '../tblessing/tblessing?orderId=' + orderId + '&orderimg=' + orderimg + '&cardid=' + cardid
    })
  },
  user:function(e){
    var orderId = e.target.dataset.id
    var orderimg = e.target.dataset.orderimg
    var selCards = JSON.stringify({ Imgurl: orderimg })
    wx.navigateTo({
      url: '../usecard/usecard?orderid=' + orderId + '&selCards=' + selCards
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success:(res)=> {
        if (res.authSetting['scope.userInfo']) { 
          this.setData({
            authSetting: true,
            userInfo: userInfo
          })          
    var that=this
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/orderHistory',
      data:{
        page:1,
        openid: userInfo.openid
      },
      success:function(res){
        console.log('自营订单：', res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.selforderList)        
        console.log('京东订单：', res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList)
        console.log('我收到的订单：', res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList2)
        if (res.data.jd_kpl_open_cloudtrade_order_queryorders_response.resultCode==0){
          history.orderList = res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList
          history.orderList2 = res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList2
          history.selforderList = res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.selforderList
          that.setData({
            orderList: history.orderList,
            orderList2: history.orderList2,
            selforderList: history.selforderList
          })
        }
        // 转化时间格式
        Date.prototype.Format = function (format) {
          var o = {
            "M+": this.getMonth() + 1, //month 
            "d+": this.getDate(), //day 
            "h+": this.getHours(), //hour 
            "m+": this.getMinutes(), //minute 
            "s+": this.getSeconds(), //second 
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
            "S": this.getMilliseconds() //millisecond 
          }
          if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
          }
          return format;
        }
        let orderList = that.data.orderList
        let orderList2 = that.data.orderList2
        let selforderList = that.data.selforderList
        for (let i = 0; i < orderList.length;i++){
          orderList[i].dateSubmit = orderList[i].dateSubmit.split(".")[0].replace("T"," ")
          if (orderList[i].orderState>=9){
              orderList[i].status=5
          }
          if (orderList[i].orderState >= 18){
              orderList[i].status= 6
          }
        }
        for (let i = 0; i < orderList2.length; i++) {
          orderList2[i].dateSubmit = utils.formatTime(orderList2[i].dateSubmit, 'Y/M/D h:m:s')          
          orderList2[i].shouldPay = orderList2[i].shouldPay*0.01
        }
        for (let i = 0; i < selforderList.length; i++) {
          selforderList[i].dateSubmit = utils.formatTime(selforderList[i].dateSubmit, 'Y/M/D h:m:s')
          selforderList[i].shouldPay = selforderList[i].shouldPay
        }
        that.setData({
          orderList: orderList,
          orderList2: orderList2,
          selforderList: selforderList
        })
        history.orderList = orderList
        history.orderList2 = orderList2
        history.selforderList = selforderList
      }
    })
        } else {
          this.setData({
            authSetting:false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      //顶部标题
      title: "购买历史"
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