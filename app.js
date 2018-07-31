//app.js
App({
  onLaunch: function() {
    var that = this
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //登陆获取openid
    wx.login({
      success: function (res) {
        console.log("登陆成功返回：",res)
        that.globalData.userInfo.code = res.code
        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            console.log('获取个人信息为：', res)
            that.globalData.userInfo.encryptedData = res.encryptedData
            that.globalData.userInfo.iv = res.iv
            that.globalData.userInfo.nickName = JSON.parse(res.rawData).nickName
            that.globalData.userInfo.avatarUrl = JSON.parse(res.rawData).avatarUrl
            if (that.globalData.userInfo.code) {
              wx.request({
                url: 'https://scrm.cnt-ad.net/voss/service/login',
                data: {
                  code: that.globalData.userInfo.code,
                  nickname:that.globalData.userInfo.nickName,
                  avata: that.globalData.userInfo.avatarUrl
                },
                success: function (res) {
                  console.log("服务器登陆成功返回：", res)
                  that.globalData.userInfo.openid = res.data.openid
                }
              })
              console.log('用户操作信息为:', that.globalData.userInfo)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    }) 
    //获取商品信息
    wx.request({
      url: 'https://scrm.cnt-ad.net/voss/service/giftcards',
      data: { },
      success: function (res) {
        console.log('服务器返回商品信息为:',res.data)
        for(let i = 0; i < res.data.length;i++){
          that.globalData.giftcards.push(res.data[i])
        }
      }
    })
  },

  
  //共用数据
  globalData: {
    userInfo: { wares:[]},     //用户每次操作数据临时保存，完成购买后销毁
    giftcards: []      //从服务器获取到卡面及商品信息存放位置
  }
})