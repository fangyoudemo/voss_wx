// pages/shopdemo/shopdemo.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  shop:function(){
    let address0 = userInfo.province + userInfo.city + userInfo.county
    //---------------------------发起下单请求---------------------------//
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/submitorder',
      data: {
        openid: userInfo.openid,
        buyWares: userInfo.buyWares,
        provinceId: userInfo.provinceId,
        cityId: userInfo.cityId,
        countyId: userInfo.countyId,
        townId: userInfo.townId,
        address: userInfo.address,
        customerName: userInfo.customerName,
        customerMobile: userInfo.customerMobile,
        cardid: userInfo.selcard.Id,
        address0: address0 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('下单成功返回数据：',res)
        userInfo.orderId = res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.orderId
        userInfo.totalPrice = res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.totalPrice        
        userInfo.uid = res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.uid 
        userInfo.orderNumber = res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.orderNumber
        let resultCode = res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.resultCode
        let resultMsg = res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.resultMsg
        if (resultCode==0) {
          wx.login({
            success:function(res){
              console.log(res.code)
              userInfo.code=res.code
              console.log(res.code, userInfo.code)
    //---------------------------发起虚拟pin收银台接口---------------------------//
              wx.request({
                url: 'https://wxapp.m.jd.com/kwxp/wx/thirdPay.json',
                data: {
                  uid: userInfo.uid,
                  code: userInfo.code,
                  iv: userInfo.iv,
                  encryptedData: userInfo.encryptedData,
                  orderId: userInfo.orderId,
                  orderType: 0,
                  orderTypeCode: 0,
                  factPrice: userInfo.totalPrice,
                  appId: "wx56a5df84de769570",
                  fromType: 'wxapp',
                  appKey: '7ffa2e75489a40669cfbe5f49276cc05'
                },
                success: function (res) {
                  console.log('虚拟pin收银台返回:', res)
                  if (res.statusCode=='200'){
                    //测试用跳转
                    wx.navigateTo({
                      url: '../blessing/blessing',
                    })
    //---------------------------拉起支付---------------------------//
                    // wx.requestPayment({
                    //   'timeStamp': res.data.timeStamp,
                    //   'nonceStr': res.data.nonceStr,
                    //   'package': res.data.package,
                    //   'signType': 'MD5',
                    //   'paySign': res.data.paySign,
                    //   'success': function (res) {
                    //     if (res.errMsg == 'requestPayment:ok') {
                    //       console.log('用户成功支付，进入下一页')
                    //       wx.navigateTo({
                    //         url: '../blessing/blessing',
                    //       })
                    //     }
                    //   },
                    //   'fail': function (res) { },
                    //   'complete': function (res) { }
                    // })
                  }
                }
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: "不好意思" + resultMsg,
            mask: true
          })
          console.log(res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.resultCode, res.data.jd_kpl_open_cloudtrade_trade_submitorder_response.resultMsg)
        }    
      }
    })
  //---------------------------下单请求结束---------------------------//
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selcard: userInfo.selcard,
      wares: userInfo.wares,
      userInfo: userInfo
    })
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