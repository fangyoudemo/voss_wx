//address.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conInfo: [],  //消费者个人信息
  },
  //点击提交
  formSubmit: function (e) {
    let customerName = e.detail.value.name
    let customerMobile = e.detail.value.telnum
    let address = e.detail.value.address
    let openid = userInfo.openid


    //---------------------------提交信息判断---------------------------//
    if (customerName == "") {
      wx.showToast({
        icon: 'none',
        title: "请输入姓名",
        mask: true
      })
      return true
    }
    function isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    }
    if (!isPoneAvailable(customerMobile)) {
      wx.showToast({
        icon: 'none',
        title: "请输入正确手机号",
        mask: true
      })
      return true
    }
    if (address == "") {
      wx.showToast({
        icon: 'none',
        title: "请填写详细地址",
        mask: true
      })
      return true
    }
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/selfusecard',
      data:{
        orderid: this.data.orderid,
        address0: address,
        addressDetail: address,
        customerName: customerName,
        customerMobile: customerMobile
      },
      success:function(res){
        console.log(res)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      //所选择的展示图片
      selcard: options.selcard,
      orderid: options.orderid
    })
    var that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      //顶部标题
      title: "填写地址"
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
    var that = this;
    return {
      title: 'VOSS小程序',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功  
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})