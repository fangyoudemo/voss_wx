// pages/history/history.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var history = app.globalData.history
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[
      {name:"怦然心动",time:"2018.06.05   13:00:23",peric:75.00,get_name:"tony"},
      { name: "恋人", time: "2018.06.07   17:00:23", peric: 175.00, get_name: null }
      ]
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
    var shouldPay = e.target.dataset.shouldPay
    wx.navigateTo({
      url: '../tblessing/tblessing?orderId=' + orderId + '&orderimg=' + orderimg + '&shouldPay=' + shouldPay
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/orderHistory',
      data:{
        page:1,
        openid: userInfo.openid
      },
      success:function(res){
        console.log('京东订单：', res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList)
        console.log('自营订单：', res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList2)
        if (res.data.jd_kpl_open_cloudtrade_order_queryorders_response.resultCode==0){
          history.orderList = res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList
          history.orderList2 = res.data.jd_kpl_open_cloudtrade_order_queryorders_response.data.orderList2
          that.setData({
            orderList: history.orderList,
            orderList2: history.orderList2
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
        for (let i = 0; i < orderList.length;i++){
          orderList[i].dateSubmit = new Date(orderList[i].dateSubmit).Format("yyyy-MM-dd hh:mm:ss")
        }
        for (let i = 0; i < orderList2.length; i++) {
          orderList2[i].dateSubmit = new Date(orderList2[i].dateSubmit).Format("yyyy-MM-dd hh:mm:ss")
        }
        that.setData({
          orderList: orderList,
          orderList2: orderList2
        })
        history.orderList = orderList
        history.orderList2 = orderList2
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