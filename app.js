//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          // wx.request({
            // url: '',
            // data: {
              // code: res.code
            // }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })  
  },

  
  //共用数据
  globalData: {
    userInfo: [],
  }
})