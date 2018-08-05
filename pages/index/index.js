//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
var utils = require('../../utils/util.js')
Page({
  data: {
    //首页轮播设置
    indicatorDots:true,
    indicatorColor:"#fff",
    indicatorActiveColor:"#000",
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
  },
  //点击卡面
  bindViewCoffeeOnMe: function (event) {
    //带着
    var Cardid = event.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?Cardid=' + Cardid
    })
  },
  //点击购买历史
  buyhistory:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    //从服务器获取banner图并设置到页面中
    var url = '/voss/service/banner'
    var data={}
    utils.request(url, data, function(res){
      _this.setData({
        bannerImg: res.data
      })
    })
    //获取商品信息
    var url ='/voss/service/giftcards'
    var data = {}
    utils.request(url, data, function (res) {
      console.log('服务器返回商品信息为:', res.data)
      for (let i = 0; i < res.data.length; i++) {
        giftcards[i] = res.data[i]
      }
      //将服务器获取商品信息设置到index.js中
      _this.setData({
        giftcards: giftcards
      })
    })
  }
})


