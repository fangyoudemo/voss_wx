var utils = require('../../utils/util.js')
var tips = getApp().globalData.tips
Page({

  /**
   * 页面的初始数据
   */
  data: {
		mask:false,
    // tips: {
    // 	tips_title: "提交成功",
    // 	tips_img: "https://scrm.cnt-ad.net/static/images/upload/zlsdccsg.jpg",
    // 	// tips_masg: "送给自己，请在历史购买中查看",
    // 	// tipwares: [{ name: 'voss含气不含气365*20', Spec: '365*6' }],
    // 	// totalPrice: 888,
    // 	// tips_card: '恋人心',
    //   prompt: '我们会尽快为您发货',
    // 	d_btn:true,
    //   bgimg:true
    // }
  },
  toIndex:function(){
    console.log("返回首页")
    wx.reLaunch({
      url: '../index/index',
    })
  },
	//点击开始时的时间
	  timestart: function (e) {
	    var _this = this;
	    _this.setData({ timestart: e.timeStamp });
	  },
	
	  //点击结束的时间
	  timeend: function (e) {
	    var _this = this;
	    _this.setData({ timeend: e.timeStamp });
	  },
	  //保存图片
	  saveImg: function (e) {
	    var _this = this;
	    var times = _this.data.timeend - _this.data.timestart;
	    console.log(times)
	    if (times > 300) {
	      wx.saveImageToPhotosAlbum({
	        filePath: "/images/erweima.jpg",
	        success: function (res) {
	          console.log(res)
	          if (res.errMsg == "saveImageToPhotosAlbum:ok") {
	            wx.showToast({
	              icon: 'success',
	              title: "图片保存成功",
	              mask: true,
	              duration: 3000
	            })
	            setTimeout(function () {
	              wx.hideLoading({
	                success: function () {
	                  _this.setData({
	                    mask: false
	                  })
	                }
	              })
	            }, 2000)
	          }
	        }
	      })
	    }
	  },
	
	  guanzhu: function (e) {
	    this.setData({
	      mask: true
	    })
	  },
	  mask_btn: function () {
	    this.setData({
	      mask: false
	    })
	  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(JSON.parse(options.tips))
		this.setData({
			tips:JSON.parse(options.tips)
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    wx.setStorageSync('tips', 'true')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // wx.reLaunch({
    //   url: '../index/index',
    // })
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
  
  }
})