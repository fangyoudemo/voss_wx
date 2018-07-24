//detail.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gift:[
      { gift_id: 0,gift_name:"玻璃瓶（含气）"},
      { gift_id: 1, gift_name: "玻璃瓶（不含气）" },
      { gift_id: 2, gift_name: "塑料瓶（含气）" }        
    ],
    wares:[
      { wares_id: 0, buy_num: 0, wares_name: "苏打水饮料（含气型）", wares_specs: " 375ml* 6瓶", wares_price: 112.8, gift_id: 0, wares_source:0 },
      { wares_id: 1, buy_num: 0, wares_name: "苏打水饮料（含气型）", wares_specs: " 375ml* 24瓶", wares_price: 451.2, gift_id: 0, wares_source: 0},
      { wares_id: 2, buy_num: 0, wares_name: "苏打水饮料（含气型）", wares_specs: " 800ml* 12瓶", wares_price: 441.6, gift_id: 0, wares_source: 0},
      { wares_id: 3, buy_num: 0, wares_name: "苏打水饮料（深层自流）", wares_specs: " 375ml* 6瓶", wares_price: 112.8, gift_id: 1, wares_source: 0 },
      { wares_id: 4, buy_num: 0, wares_name: "苏打水饮料（深层自流）", wares_specs: " 375ml* 24瓶", wares_price: 451.2, gift_id: 1, wares_source: 0},
      { wares_id: 5, buy_num: 0, wares_name: "苏打水饮料（深层自流）", wares_specs: " 800ml* 12瓶", wares_price: 441.6, gift_id: 1, wares_source: 0},
      { wares_id: 6, buy_num: 0, wares_name: "苏打水饮料（深层自流）", wares_specs: " 800ml* 12瓶", wares_price: 441.6, gift_id: 2, wares_source: 0},
      { wares_id: 7, buy_num: 0, wares_name: "苏打水饮料（深层自流）", wares_specs: " 800ml* 12瓶", wares_price: 441.6, gift_id: 2, wares_source: 0},
      { wares_id: 8, buy_num: 0, wares_name: "苏打水饮料（深层自流）", wares_specs: " 800ml* 12瓶", wares_price: 70, gift_id: 2, wares_source: 0}
      ],
    detailsImg:"http://i1.bvimg.com/654292/8bd0b01fe7c3ae12.jpg",  //商品详情图片
    wares_contentId:0,   //规格展示列表控制 
    catalogSelect:0,  //选择礼品选中效果
    waresSelect:-1,   //规格选中效果
    totalPrice:0.00,  //总价 
    totalNum:0,  //总数
    flag:true,   //商品详情显示控制
    buyWares: [],   //购物车列表
  },
  //计算总价
  getTotalPrice() {
    let wares = this.data.wares;
    let total = 0;
    for (let i = 0; i < wares.length; i++) {
      total += wares[i].buy_num * wares[i].wares_price;
    }
    // if (total<99){
    //   total+=6
    // }
    // if(total==6){
    //   total=0
    // }
    this.setData({
      wares: wares,
      totalPrice: total.toFixed(2)
    });
  },
  //计算总数量
  getTotalNum() {
    let wares = this.data.wares;
    let total = 0;
    for (let i = 0; i < wares.length; i++) {
      total += wares[i].buy_num
    }
    this.setData({
      wares: wares,
      totalNum: total
    });
  },
  selectionGift: function (event) {
    var giftId = event.currentTarget.id
      this.setData({
        wares_contentId: giftId,
        catalogSelect: giftId
      })
  },
  //添加商品
  addNum:function(e){
    const index = e.currentTarget.dataset.index;
    let wares = this.data.wares;
    let num = wares[index].buy_num;
    num = num + 1;
    wares[index].buy_num = num;
    this.setData({
      wares: wares
    });
    this.getTotalPrice();
    this.getTotalNum();
  },
  //减少商品
  minusNum:function(e){
    const index = e.currentTarget.dataset.index;
    let wares = this.data.wares;
    let num = wares[index].buy_num;
    num = num - 1;
    wares[index].buy_num = num;
    this.setData({
      wares: wares
    });  
    this.getTotalPrice();
    this.getTotalNum();
  },
  //展示商品详情
  show:function(e){
    const index = e.currentTarget.dataset.index;
    let wares = this.data.wares;
    this.setData({
      wares_details: wares[index],
      flag: false,
    });
    wx.setNavigationBarTitle({
      title: "商品详情"
    })
  },
  //关闭商品详情
  shut:function(){
    this.setData({
      flag: true,
    });
    wx.setNavigationBarTitle({
      title: this.data.sceneCard.title
    })
  },
  //购买
  buy:function(){
    let wares = this.data.wares;
    let buyWares = this.data.buyWares
    //添加选择的商品到购物车
    for (let i = 0; i < wares.length; i++) {
      if (wares[i].buy_num>0){
        buyWares.push(wares[i])
      }
    }
    userInfo.buyWares = buyWares
    userInfo.totalPrice = this.data.totalPrice
    userInfo.totalNum = this.data.totalNum
    if (buyWares.length==0){
        console.log("您还没选择商品")
    }else{
      for (let i = 0; i < buyWares.length; i++){
        if (buyWares[i].wares_source==0){
          console.log("进入京东物流")
          wx.navigateTo({
            url: '../address/address'
          })
        }else{
          console.log("进入自营")
        }
      }
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      //所选择的展示图片
      sceneCard: userInfo.sceneCard,
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      //顶部标题
      title: this.data.sceneCard.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
