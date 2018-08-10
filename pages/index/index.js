//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
var utils = require('../../utils/util.js')
Page({
  data: {
    //首页轮播设置
    indicatorDots:false,
    indicatorColor:"#fff",
    indicatorActiveColor:"#000",
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
  },
  //点击卡面
  bindViewCoffeeOnMe: function (event){
    var Cardid = event.currentTarget.id
    var fromid=event.currentTarget.dataset.fromid
    var giftcards = this.data.giftcards
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
      url: '../detail/detail?Cardid=' + Cardid + '&selCards=' + selCards + '&fromid=' + fromid
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
    //从服务器获取banner
    utils.request('/voss/service/banner',{},(res)=>{
      this.setData({
        bannerImg: res.data
      })
      if (this.data.bannerImg.length > 1) {
        this.setData({
          indicatorDots: true
        })
      }
    })
    //从服务器获取卡面信息
    utils.request('/voss/service/cardlist',{},(res)=>{
      this.setData({
        giftcards: res.data
      })
    })
  },
  /**
 *  当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 */
  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true //设置为false即可
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return utils.transmit()
  }
})


