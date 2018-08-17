// pages/blessing/blessing.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giveObj:1,   //送给朋友：1；送给自己：2
    giveImg:'',
    giveVideo:'',
    message:'',
    uploadimg:'',
    uploadmedia:''
  },
  givefri:function(){
    this.setData({
      giveObj:1
    })
  },
  givefme: function () {
    this.setData({
      giveObj: 2
    })
  },
  addimg:function(){
    var that=this
    wx.chooseImage({
      count:1,
      success:(res)=>{
        that.setData({
          giveImg:res.tempFilePaths
        })
        wx.uploadFile({
          url: 'https://scrm.cnt-ad.net/voss/service/uploadfile',
          filePath: that.data.giveImg.toString(),
          header: {
            'content-type': 'multipart/form-data',
            'accept': 'application/json'
          },
          formData: {
            
          },
          name: 'filepath',
          success:(res)=> {
            that.setData({
              uploadimg: JSON.parse(res.data).errmsg
            })
          }
        })
      }
    })
  },
  seeImg:function(){
    wx.previewImage({
      urls: this.data.giveImg
    })
  },
  removeimg:function(){
    this.setData({
      giveImg:'',
      uploadimg:''
    })
  },
  bindinput:function(e){
    this.setData({
      message: e.detail.value
    })
  },
  giveme:function(){
    var that=this
    var data = {
      orderid: userInfo.orderId,
      townId: userInfo.townId,
      addressDetail: userInfo.address,
      openid: userInfo.openid,
      nickName: userInfo.nickName
    }
    utils.request('/voss/service/modifyaddress',data,(res)=>{
      if (res.data.jd_kpl_open_cloudtrade_order_modifyaddress_response.resultCode == 0) {
        var data = { orderid: userInfo.orderId}
        //解锁订单
        utils.request('/voss/service/ordertransfer',data,(res)=>{
          if (res.data.jd_kpl_open_cloudtrade_order_transfer_response.data.resultCode == 0) {
            var tipwares = []
            for (let i in userInfo.wares) {
            	tipwares[i] = { name: userInfo.wares[i].Productname + userInfo.wares[i].Spec, buy_num: userInfo.wares[i].buy_num }
            }
            var tips = JSON.stringify({ tips_title: "已赠送",tips_masg:"送给自己，请在历史购买中查看", tips_img: this.data.selCards.Imgurl, tipwares: tipwares, totalPrice: userInfo.totalPrice, tips_card: this.data.selCards.Name, d_btn: false })
            wx.reLaunch({
            	url: '../tips/tips?tips='+tips
            })
          } else {
            console.log("订单确认失败，请联系客服")
          }
        })
      } else {
        console.log("订单确认失败，请联系客服")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selCards: JSON.parse(options.selCards),
      userInfo: userInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
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
  onShareAppMessage: function (e) {
    var that=this
    var orderId = userInfo.orderId
		var selCards=JSON.stringify(this.data.selCards)
    // 来自页面内转发按钮
    if (e.from == 'button') {
      withShareTicket:true
      return {
        path: 'pages/Reccards/Reccards?orderid=' + orderId + '&selCards=' + selCards,
        imageUrl: this.data.selCards.Imgurl,
        success: (res)=>{
          console.log(res)
          //转发成功之后的回调
          if (res.errMsg == 'shareAppMessage:ok') {
            var data={
              orderid: orderId,
              message: that.data.message,
              uploadimg: that.data.uploadimg,
              uploadmedia: that.data.uploadmedia
            }
            utils.request('/voss/service/shareorder',data,(res)=>{
              var tipwares = []
              for (let i in userInfo.wares) {
                tipwares[i] = { name: userInfo.wares[i].Productname + userInfo.wares[i].Spec, buy_num: userInfo.wares[i].buy_num }
              }
              var tips = JSON.stringify({ tips_title: "已赠送", tips_img: this.data.selCards.Imgurl, tipwares: tipwares, totalPrice: userInfo.totalPrice, tips_card: this.data.selCards.Name, d_btn: false })
              wx.reLaunch({
              	url: '../tips/tips?tips='+tips
              })
            })
          }
        },
      　　　　fail: function (res) {
          // 转发失败之后的回调
          if (res.errMsg == 'shareAppMessage:fail cancel') {
            console.log("用户取消转发")
          } else if (res.errMsg == 'shareAppMessage:fail') {
            console.log("转发失败")
            
          }
        }
      }
    }else{
      return utils.transmit()
    }
  }
})