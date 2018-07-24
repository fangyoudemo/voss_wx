//index.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
Page({
  data: {
    //轮播img
    bannerImg: [
      'http://i4.bvimg.com/654292/2f8808ca24fbd372.jpg',
      'http://i4.bvimg.com/654292/2f8808ca24fbd372.jpg',
    ],
    //卡面
    sceneCard: [
      { Card_id: '0', img: 'http://i4.bvimg.com/654292/9c2b24afe98e9f92.jpg', title: '恋人' },
      { Card_id: '1', img: 'http://i4.bvimg.com/654292/9c2b24afe98e9f92.jpg', title: '朋友' },
      { Card_id: '2', img: 'http://i4.bvimg.com/654292/9c2b24afe98e9f92.jpg', title: '亲人' },
      { Card_id: '3', img: 'http://i4.bvimg.com/654292/9c2b24afe98e9f92.jpg', title: '同学' }
    ],
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
    var sceneId = event.currentTarget.id
    var sceneCard = this.data.sceneCard[sceneId]
    userInfo.sceneCard = this.data.sceneCard[sceneId]
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  buyhistory:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



})


