//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
var group = app.globalData.group
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
              console.log('用户操作信息为:', userInfo)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  ok:function(){
    var tipwares = []
    for (let i in this.data.givemsg.ProductList) {
      tipwares[i] = { name: this.data.givemsg.ProductList[i].GoodsName, buy_num: this.data.givemsg.ProductList[i].GoodsNumber }
    }
    var tips = JSON.stringify({ tips_title: "提交成功", prompt: "我们会尽快为您发货", tips_img: this.data.selCards.Imgurl,/* tipwares: tipwares,*/ d_btn: true,bgimg: true })
    wx.reLaunch({
      url: '../tips/tips?tips=' + tips
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
										var tipwares = []
										for (let i in this.data.givemsg.ProductList) {
											tipwares[i] = { name: this.data.givemsg.ProductList[i].GoodsName, buy_num: this.data.givemsg.ProductList[i].GoodsNumber }
										}
										var tips = JSON.stringify({ tips_title: "领取成功",tips_masg:"领取成功，可在历史购买中查看", tips_img: this.data.selCards.Imgurl, tipwares: tipwares,d_btn: true })
										wx.reLaunch({
											url: '../tips/tips?tips='+tips
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
    console.log(options)
    var orderid = options.orderid
    this.setData({
      orderid: orderid,
      selCards: JSON.parse(options.selCards),
      group: group
    })
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/selforderdetail',
      data: { orderid: orderid},
      success:(res)=>{
        console.log(res)
        this.setData({ givemsg:res.data})
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  }

})


