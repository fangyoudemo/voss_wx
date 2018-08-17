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
    giveObj: 1,   //送给朋友：1；送给自己：2
    giveImg: '',
    giveVideo: '',
    message: '',
    uploadimg: '',
    uploadmedia: ''
  },
  givefri: function () {
    this.setData({
      giveObj: 1
    })
  },
  givefme: function () {
    this.setData({
      giveObj: 2
    })
  },
  addimg: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          giveImg: res.tempFilePaths
        })
        wx.uploadFile({
          url: 'https://scrm.cnt-ad.net/voss/service/uploadfile',
          filePath: that.data.giveImg.toString(),
          header: {
            'content-type': 'multipart/form-data',
            'accept': 'application/json'
          },
          formData: {
            'orderid': 77841529600
          },
          name: 'filepath',
          success: function (res) {
            that.setData({
              uploadimg: JSON.parse(res.data).errmsg
            })
          }
        })
      }
    })
  },
  seeImg: function () {
    wx.previewImage({
      urls: this.data.giveImg
    })
  },
  bindinput: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  giveme: function () {
    var that = this
    var cardId = this.data.Cardid
    utils.addCard(cardId, (res) => {
      wx.request({
        url: 'https://scrm.cnt-ad.net/voss/service/receive',
        data: {
          code: this.data.Cardid,
          openid: userInfo.openid,
          orderid: this.data.orderId
        },
        success: (res) => {
          var tipwares = []
          var tips = JSON.stringify({ tips_title: "已赠送", tips_masg: "送给自己，请在历史购买中查看", tips_img: this.data.Imgurl, tips_card: this.data.Name, d_btn: false })
          wx.reLaunch({
            url: '../tips/tips?tips=' + tips
          })
        }
      })

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从服务器获取卡面信息
    utils.request('/voss/service/cardlist', {}, (res) => {
      console.log(res)
      for (let i in res.data){
        if (res.data[i].Id== options.cardid){
          this.setData({
            Cardid: res.data[i].Cardid,
            Imgurl: res.data[i].Imgurl,
            Name: res.data[i].Name
          })
        }
      }
    })
    this.setData({
      orderId: options.orderId,
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
  onShareAppMessage: function (e) {
    var that = this
    var orderid = this.data.orderid
    var selCards = JSON.stringify(this.data.selCards)
    // 来自页面内转发按钮
    if (e.from == 'button') {
      withShareTicket: true
      return {
        title: this.data.selCards.Name,
        path: 'pages/zyReccards/zyReccards?orderid=' + orderid + '&selCards=' + selCards,
        imageUrl: this.data.selCards.Imgurl,
        success: (res) => {
          // 转发成功之后的回调
          if (res.errMsg == 'shareAppMessage:ok') {
            wx.request({
              url: 'https://scrm.cnt-ad.net/voss/service/selfshareorder',
              data: {
                orderid: orderid,
                message: that.data.message,
                uploadimg: that.data.uploadimg,
                uploadmedia: that.data.uploadmedia
              },
              success: (res) => {
                var tipwares = []
                for (let i in userInfo.wares) {
                  tipwares[i] = { name: userInfo.wares[i].Productname + userInfo.wares[i].Spec, buy_num: userInfo.wares[i].buy_num }
                }
                var tips = JSON.stringify({ tips_title: "已赠送", tips_img: this.data.selCards.Imgurl, tipwares: tipwares, totalPrice: userInfo.waresPrice, tips_card: this.data.selCards.Name, d_btn: false })
                wx.reLaunch({
                  url: '../tips/tips?tips=' + tips
                })
              }
            })
          }
        },
        fail: function (res) {
          // 转发失败之后的回调
          if (res.errMsg == 'shareAppMessage:fail cancel') {
            console.log("用户取消转发")
          } else if (res.errMsg == 'shareAppMessage:fail') {
            console.log("转发失败")
            // 转发失败，其中 detail message 为详细失败信息
          }
        }
      }
    }
  }
})