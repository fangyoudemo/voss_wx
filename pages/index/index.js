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
    var Cardid = event.currentTarget.id
    var selCards={}
    for (let i in giftcards){
      if (giftcards[i].Id == Cardid){
        selCards.Id = giftcards[i].Id
        selCards.Cardid = giftcards[i].Cardid
        selCards.Imgurl = giftcards[i].Imgurl
        selCards.Name = giftcards[i].Name
        selCards.Fromid = giftcards[i].Fromid
      }
    }
    var selCards = JSON.stringify(selCards)
    wx.navigateTo({
      url: '../detail/detail?Cardid=' + Cardid + '&selCards=' + selCards
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
    // 获取banner
    var url = '/voss/service/banner'
    var data={}
    utils.request(url, data,(res)=>{
      this.setData({
        bannerImg: res.data
      })
    })
    // 获取商品信息
    var url ='/voss/service/giftcards'
    var data = {}
    utils.request(url, data,(res)=> {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        giftcards[i] = res.data[i]
      }
      this.setData({
        giftcards: giftcards
      })


    })
  },
})


