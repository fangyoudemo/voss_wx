//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
var utils = require('../../utils/util.js')
Page({
  data: {
  },
  seeImg: function () {
    wx.previewImage({
      urls: ('https://scrm.cnt-ad.net' + this.data.givemsg.Order.Uploadpic).split(',')
    })
  },
  use:function(){
    wx.login({
      success: (res) => {
        userInfo.code = res.code
        //获取用户信息
        wx.getUserInfo({
          success: (res) => {
            userInfo.encryptedData = res.encryptedData
            userInfo.iv = res.iv
            userInfo.nickName = JSON.parse(res.rawData).nickName
            userInfo.avatarUrl = JSON.parse(res.rawData).avatarUrl
            if (userInfo.code) {
              wx.request({
                url: 'https://scrm.cnt-ad.net/voss/service/receive',
                data: {
                  openid: userInfo.openid,
                  orderid: this.data.orderid
                },
                success: (res) => {
                  var orderid = this.data.orderid
                  var selCards = JSON.stringify(this.data.selCards)
                  wx.navigateTo({
                    url: '../usecard/usecard?orderid=' + orderid + '&selCards=' + selCards,
                  })
                }
              })
              // var url = '/voss/service/login'
              // var data = { code: userInfo.code, nickname: userInfo.nickName, avata: userInfo.avatarUrl }
              // utils.request(url, data, (res) => {
              //   if (res.data.errcode == 0) {
              //     userInfo.openid = res.data.openid
              //     var orderid = this.data.orderid
              //     var selCards = JSON.stringify(this.data.selCards) 
              //     wx.navigateTo({
              //       url: '../usecard/usecard?orderid=' + orderid + '&selCards=' + selCards,
              //     })
              //   }
              // })
              console.log('用户操作信息为:', userInfo)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  gocards:function(){
    wx.login({
      success: (res) => {
        userInfo.code = res.code
        //获取用户信息
        wx.getUserInfo({
          success: (res) => {
            userInfo.encryptedData = res.encryptedData
            userInfo.iv = res.iv
            userInfo.nickName = JSON.parse(res.rawData).nickName
            userInfo.avatarUrl = JSON.parse(res.rawData).avatarUrl
            if (userInfo.code) {
              var that = this
              var selCards = JSON.stringify(this.data.selCards)
              var cardId = this.data.selCards.Cardid
              utils.addCard(cardId, (res) => {
                console.log(res.cardList[0].code)
                wx.request({
                  url: 'https://scrm.cnt-ad.net/voss/service/receive',
                  data: {
                    code: res.cardList[0].code,
                    openid: userInfo.openid,
                    orderid: that.data.orderid
                  },
                  success: (res) => {
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }
                })

              })
              
              console.log('用户操作信息为:', userInfo)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderid = options.orderid
    this.setData({
      orderid: orderid,
      // openid: userInfo.openid,
      selCards: JSON.parse(options.selCards)
    })
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/selforderdetail',
      data: { orderid: orderid},
      success:(res)=>{
        console.log(res)
        this.setData({ givemsg:res.data})
      }
    })
  }

})


