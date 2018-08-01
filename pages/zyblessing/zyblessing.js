// pages/zyblessing/zyblessing.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
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
  addvideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        that.setData({
          giveVideo: res.tempFilePath
        })
        wx.uploadFile({
          url: 'https://scrm.cnt-ad.net/voss/service/uploadfile',
          filePath: that.data.giveVideo.toString(),
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
              uploadmedia: JSON.parse(res.data).errmsg
            })
          }
        })
      }
    })
  },
  bindinput: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  giveme: function () {
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/ordertransfer',
      data: {
        orderid: userInfo.orderId
      },
      success: function (res) {
        console.log('解锁订单返回信息：', res)
        if (res.data.jd_kpl_open_cloudtrade_order_transfer_response.data.resultCode == 0) {
          wx.navigateTo({
            url: '../yiGive/yiGive',
          })
        } else {
          console.log("订单确认失败，请联系客服")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: userInfo
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
    var orderid = userInfo.orderid
    // 来自页面内转发按钮
    if (e.from == 'button') {
      return {
        title: userInfo.selcard.Name,
        path: 'pages/zyReccards/zyReccards?orderid=' + orderid,
        imageUrl: userInfo.selcard.Imgurl,
        success: function (res) {
          // 转发成功之后的回调
          // if (res.errMsg == 'shareAppMessage:ok') {
          //   wx.request({
          //     url: 'https://scrm.cnt-ad.net/voss/service/shareorder',
          //     data: {
          //       orderid: orderId,
          //       message: that.data.message,
          //       uploadimg: that.data.uploadimg,
          //       uploadmedia: that.data.uploadmedia
          //     },
          //     success: function (res) {

          //     }
          //   })
            wx.navigateTo({
              url: '../yiGive/yiGive',
            })
          // }
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