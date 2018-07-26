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
    Province: ['请选择省'],   //省
    ProvinceIndex:0,
    city: ['请选择市'],
    cityIndex: 0,
    county: ['请选择区/县',],
    countyIndex: 0,
    township: ['请选择街道'],
    townshipIndex: 0,
  },
  //点击提交
  formSubmit: function (e) {
    let ProvinceIndex = this.data.ProvinceIndex
    let cityIndex = this.data.cityIndex
    let countyIndex = this.data.countyIndex
    let townshipIndex = this.data.townshipIndex
    let resProvince = this.data.resProvince
    let rescity = this.data.rescity
    let rescounty = this.data.rescounty
    let restownship = this.data.restownship
    let customerName = e.detail.value.name
    let customerMobile = e.detail.value.telnum
    let address = e.detail.value.address
    let openid = userInfo.openid
    if (customerName == "") {
      wx.showToast({
        icon: 'none',
        title:"请输入姓名",
        mask:true
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
    if (ProvinceIndex * cityIndex * countyIndex * townshipIndex==0) {
      wx.showToast({
        icon: 'none',
        title: "请完善地址信息",
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
    userInfo.provinceId = resProvince[ProvinceIndex - 1].id
    userInfo.province = resProvince[ProvinceIndex - 1].name   
    userInfo.cityId= rescity[cityIndex - 1].id
    userInfo.city = rescity[cityIndex - 1].name       
    userInfo.countyId= rescounty[countyIndex - 1].id
    userInfo.county = rescounty[countyIndex - 1].name       
    userInfo.townId= restownship[townshipIndex - 1].id
    userInfo.town = restownship[townshipIndex - 1].name     
    userInfo.customerName = e.detail.value.name
    userInfo.customerMobile = e.detail.value.telnum
    userInfo.address = e.detail.value.address
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/shopping',
      data: { 
        buyWares: userInfo.buyWares,
        provinceId: resProvince[ProvinceIndex - 1].id,
        cityId: rescity[cityIndex - 1].id,
        countyId: rescounty[countyIndex - 1].id,
        townId: restownship[townshipIndex - 1].id,
        openid: openid
       },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('结算完成返回结果',res.data)
        //运费
        userInfo.totalFee = res.data.jd_kpl_open_cloudtrade_trade_calfreight_response.data.totalFee
        //总价
        userInfo.totalPrice = res.data.jd_kpl_open_cloudtrade_trade_calfreight_response.data.totalPrice
      }
    })
    wx.navigateTo({
      url: '../shopdemo/shopdemo'
    })
  },
  bindProvince(e){
    if (e.detail.value !== this.data.ProvinceIndex) {
      this.setData({ city: ['请选择市'], cityIndex: '0', county: ['请选择区/县'], countyIndex: '0', township: ['请选择街道'], townshipIndex: '0' })
    } else {
      return true
    }
    this.setData({ ProvinceIndex: e.detail.value });
    var that = this
    if (e.detail.value>0){
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/getcitys',
      data: {provinceId: e.detail.value},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var rescity = res.data.jd_kpl_open_cloudtrade_address_getcities_response.data
        that.setData({ rescity: rescity });
        for (let i = 0; i < rescity.length; i++) {
          that.data.city.push(rescity[i].name)
        }
        that.setData({ city: that.data.city });
      }
    })
    }
  },
  bindcity(e) {
    if (e.detail.value !== this.data.cityIndex) {
      this.setData({ county: ['请选择区/县'], countyIndex: '0', township: ['请选择街道'], townshipIndex: '0'})
    }else{
      return true
    }
    this.setData({ cityIndex: e.detail.value });
    var that = this
    if (e.detail.value > 0) {
      wx.request({
        url: 'https://scrm.cnt-ad.net/voss/service/getcountrys',
        data: { cityId: this.data.rescity[e.detail.value-1].id },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let rescounty = res.data.jd_kpl_open_cloudtrade_address_getcounties_response.data
          that.setData({ rescounty: rescounty });
          for (let i = 0; i < rescounty.length; i++) {
            that.data.county.push(rescounty[i].name)
          }
          that.setData({ county: that.data.county });
        }
      })
    }
  }, 
  bindcounty(e) {
    if (e.detail.value !== this.data.countyIndex) {
      this.setData({ township: ['请选择街道'], townshipIndex: '0' })
    } else {
      return true
    }
    this.setData({ countyIndex: e.detail.value });
    var that = this
    if (e.detail.value > 0) {
      wx.request({
        url: 'https://scrm.cnt-ad.net/voss/service/gettowns',
        data: { countyId: this.data.rescounty[e.detail.value - 1].id },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data!==null){
          let restownship = res.data
          that.setData({ restownship: restownship });
          for (let i = 0; i < restownship.length; i++) {
            that.data.township.push(restownship[i].name)
          }
          that.setData({ township: that.data.township });
          }else{
            that.setData({ township: ['请选择街道', '无'], townshipIndex: 1, restownship: [{ id: 0, name:''}] });
          }
        }
      })
    }
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
      sceneCard: userInfo.selcard
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
    var that=this
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/getprovinces',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let resProvince = res.data.jd_kpl_open_cloudtrade_address_getprovinces_response.data
        that.setData({ resProvince: resProvince });
        for (let i = 0; i < resProvince.length; i++) {
          that.data.Province.push(resProvince[i].name)
        }
        that.setData({ Province: that.data.Province });
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