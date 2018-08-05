//detail.js
//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gift:[
      { gift_id: 1,gift_name:"玻璃瓶（含气）"},
      { gift_id: 2, gift_name: "玻璃瓶（不含气）" },
      { gift_id: 3, gift_name: "塑料瓶（含气）" }        
    ],
    wares:[],
    detailsImg:"http://i1.bvimg.com/654292/8bd0b01fe7c3ae12.jpg",  //商品详情图片
    wares_contentId:1,   //规格展示列表控制 
    catalogSelect:1,  //选择礼品选中效果
    waresSelect:-1,   //规格选中效果
    totalPrice:0.00,  //总价 
    totalNum:0,  //总数
    flag:true,   //商品详情显示控制
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var Cardid = options.Cardid
    console.log(giftcards)
    for (let i = 0; i < giftcards.length;i++){
      if (giftcards[i].Id == Cardid){
        this.setData({
          List: giftcards[i].List
        })
        //向全局数据userInfo添加选择卡面信息
        userInfo.selcard = { Imgurl: giftcards[i].Imgurl, Cardid: giftcards[i].Cardid, Name: giftcards[i].Name, Id: giftcards[i].Id, Fromid: giftcards[i].Fromid }
      }
    }   
    for (let i = 0; i < this.data.List.length;i++){
      this.data.List[i].buy_num=0
      this.data.List[i].Unitprice = this.data.List[i].Unitprice/100
      this.data.List[i].sid = i
    }
    this.setData({
      List: this.data.List,
      selcard: userInfo.selcard
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      //顶部标题
      title: userInfo.selcard.Name
    })
  },
  //购买
  buy: function () {
    let List = this.data.List;
    let totalNum = this.data.totalNum
    let buyWares = { "sku": [] }
    userInfo.waresPrice = this.data.totalPrice
    userInfo.wares=[]
    for (let i = 0; i < List.length; i++) {
      if (List[i].buy_num > 0) {
        //向服务器发起请求携带data
        buyWares.sku.push({ "Id": List[i].Skuid, "buy_num": List[i].buy_num })
        //向全局数据userInfo添加选购商品信息
        userInfo.wares.push(List[i])
        userInfo.buyWares = buyWares
      }
    }
    if (totalNum == 0) {
      wx.showToast({
        icon: 'none',
        title: "不好意思,您还没选择商品",
        mask: true
      })
    } else {
      if (userInfo.selcard.Fromid == 1) {
        console.log("进入填写京东物流")
        //向服务器发起请求计算运费
        wx.navigateTo({
          url: '../address/address'
        })
      }else{
        console.log("自营发起统一下单接口")
        var url = '/voss/service/native'
        var data = {
          cardid: userInfo.selcard.Id,
          openid: userInfo.openid,
          attach: '',
          buyWares: userInfo.buyWares}
        utils.request(url, data,function(res){
          console.log(res)
          userInfo.orderid = res.data.orderid
          userInfo.totalPrice = res.data.totalfee
          if (res.data.errcode == 'SUCCESS') {
            //拉起支付api
            console.log("拉起支付")
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': 'MD5',
              'paySign': res.data.paySign,
              success: function (res) {
                console.log(res)
                if (res.errMsg == "requestPayment:ok") {
                  console.log('用户成功支付，进入下一页')
                  wx.navigateTo({
                    url: '../zyblessing/zyblessing',
                  })
                }
              },
              fail: function (res) {

              },
              complete: function (res) {

              }
            })
          }
        })

        // wx.request({
        //   url: 'https://scrm.cnt-ad.net/voss/service/native',
        //   data: {
        //     cardid: userInfo.selcard.Id,
        //     openid: userInfo.openid,
        //     attach: '',
        //     buyWares: userInfo.buyWares
        //   },
        //   success: function (res) {
        //     console.log(res)
        //     userInfo.orderid = res.data.orderid
        //     userInfo.totalPrice = res.data.totalfee
        //     if (res.data.errcode == 'SUCCESS') {
        //       //拉起支付api
        //       console.log("拉起支付")
        //       wx.requestPayment({
        //         'timeStamp': res.data.timeStamp,
        //         'nonceStr': res.data.nonceStr,
        //         'package': res.data.package,
        //         'signType': 'MD5',
        //         'paySign': res.data.paySign,
        //         success: function (res) {
        //           console.log(res)
        //           if (res.errMsg == "requestPayment:ok") {
        //             console.log('用户成功支付，进入下一页')
        //             wx.navigateTo({
        //               url: '../zyblessing/zyblessing',
        //             })
        //           }
        //         },
        //         fail: function (res) { 
                  
        //         },
        //         complete: function (res) {
                  
        //          }
        //       })
        //     }
        //   }
        // })
      }
    }
  },
  //计算总价
  getTotalPrice() {
    let List = this.data.List;
    let total = 0;
    for (let i = 0; i < List.length; i++) {
      total += List[i].buy_num * List[i].Unitprice;
    }
    this.setData({
      giftcards: giftcards,
      totalPrice: total.toFixed(2)
    });
  },
  //计算总数量
  getTotalNum() {
    let List = this.data.List;
    let total = 0;
    for (let i = 0; i < List.length; i++) {
      total += List[i].buy_num
    }
    this.setData({
      giftcards: giftcards,
      totalNum: total
    });
  },
  //点击选择礼品控制
  selectionGift: function (event) {
    var giftId = event.currentTarget.id
    var List = this.data.List
    if (giftId!=3){
      for(let i=0;i<List.length;i++){
        if (List[i].Skuid == 4044753){
            List[i].Ptype = giftId            
        }
      }
    }
    this.setData({
      wares_contentId: giftId,
      catalogSelect: giftId,
      List: List
    })
  },
  //添加商品
  addNum: function (e) {
    const index = e.currentTarget.dataset.index;
    let List = this.data.List;
    let num = List[index].buy_num;
    num = num + 1;
    List[index].buy_num = num;
    this.setData({
      List: List
    });
    this.getTotalPrice();
    this.getTotalNum();
  },
  //减少商品
  minusNum: function (e) {
    const index = e.currentTarget.dataset.index;
    let List = this.data.List;
    let num = List[index].buy_num;
    num = num - 1;
    List[index].buy_num = num;
    this.setData({
      List: List
    });
    this.getTotalPrice();
    this.getTotalNum();
  },
  //展示商品详情
  show: function (e) {
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
  shut: function () {
    this.setData({
      flag: true,
    });
    wx.setNavigationBarTitle({
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
