//address.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conInfo:[],  //消费者个人信息
    Province: ['请选择省','北京市','山西省','上海市'],   //省
    ProvinceIndex:0,
    city: ['请选择市', '北京市', '太原市', '上海市'],
    cityIndex: 0,
    county: ['请选择区', '朝阳区', '小店区', '浦东区'],
    countyIndex: 0,
    township: ['街道', '朝阳', '小店', '浦东'],
    townshipIndex: 0,
  },
  //点击提交
  formSubmit: function (e) {
    console.log(e)
    this.setData({
      conInfo: e.detail.value,
    });
    userInfo.conInfo = this.data.conInfo
    wx.navigateTo({

      url: '../blessing/blessing'
    })
  },
  bindProvince(e){
    this.setData({ ProvinceIndex: e.detail.value });
  },
  bindcity(e) {
    this.setData({ cityIndex: e.detail.value });
  }, 
  bindcounty(e) {
    this.setData({ countyIndex: e.detail.value });
  }, 
  bindtownship(e) {
    this.setData({ townshipIndex: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //所选择的展示图片
      sceneCard:userInfo.sceneCard,
      buyWares: userInfo.buyWares,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      //顶部标题
      title: "填写地址"
    })
    wx.showModal({
      title: '友情提示',
      content: '送朋友\r\n请填写朋友的收货信息，收到方可更改末级地址\r\n\r\n送自己\r\n请填写自己收货信息，在支付后可更改末级地址',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
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