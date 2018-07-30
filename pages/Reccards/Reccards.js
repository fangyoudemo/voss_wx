//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
Page({
  data: {
    township: ['请选择街道'],
    townshipIndex: 0,
    subtype:0,   //控制弹窗显示
  },
  bindtownship:function(e){
    this.setData({ townshipIndex: e.detail.value });
  },
  seeImg: function () {
    wx.previewImage({
      urls: ('https://scrm.cnt-ad.net' + this.data.givemsg.uploadpic).split(',')
    })
  },
  formSubmit:function(e){
    let restownship = this.data.restownship
    let townshipIndex = this.data.townshipIndex
    let that=this
    console.log(e)
    if (townshipIndex<1){
      townshipIndex=1
    }
    let townId = restownship[townshipIndex - 1].id
    let addressDetail = e.detail.value.address
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/modifyaddress',
      data:{
        orderid: 77841529600,
        townId: townId,
        addressDetail: addressDetail
      },
      success:function(res){
        console.log('修改地址返回信息：',res)
        if (res.data.jd_kpl_open_cloudtrade_order_modifyaddress_response.resultCode==0){
          that.setData({
            subtype : 1
          })
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var orderid = options.orderid
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/orderdetail',
      data: { orderid: 77841529600},
      success:function(res){
        console.log('领取页面获取信息返回：', res.data.jd_kpl_open_cloudtrade_order_getdetail_response.data)
        that.setData({
          givemsg: res.data.jd_kpl_open_cloudtrade_order_getdetail_response.data
        })
        wx.request({
          url: 'https://scrm.cnt-ad.net/voss/service/modifyorder',
          data: { orderid: 77841529600},
          success:function(res){
            console.log(res)
            //获取末级地址
            wx.request({
              url: 'https://scrm.cnt-ad.net/voss/service/gettowns',
              data: { countyId: that.data.givemsg.county },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data !== null) {
                  let restownship = res.data
                  that.setData({ restownship: restownship });
                  for (let i = 0; i < restownship.length; i++) {
                    that.data.township.push(restownship[i].name)
                  }
                  that.setData({ township: that.data.township });
                } else {
                  that.setData({ township: ['请选择街道', '无'], townshipIndex: 1, restownship: [{ id: 0, name: '' }] });
                }
              }
            })
          }
        })
      }
    })
  }

})


