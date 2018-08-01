//app.js
App({
  onLaunch: function() {
    var _this = this
    var userInfo = _this.globalData.userInfo
    var giftcards = _this.globalData.giftcards
    var cards = _this.globalData.cards
    //登陆获取openid
    wx.login({
      success: function (res) {
        userInfo.code = res.code
        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            userInfo.encryptedData = res.encryptedData
            userInfo.iv = res.iv
            userInfo.nickName = JSON.parse(res.rawData).nickName
            userInfo.avatarUrl = JSON.parse(res.rawData).avatarUrl
            if (userInfo.code) {
              wx.request({
                url: 'https://scrm.cnt-ad.net/voss/service/login',
                data: {
                  code: userInfo.code,
                  nickname: userInfo.nickName,
                  avata: userInfo.avatarUrl
                },
                success: function (res) {
                  if (res.data.errcode==0){
                    userInfo.openid = res.data.openid
                  }
                }
              })
              console.log('用户操作信息为:',userInfo)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  //共用数据
  globalData: {
    //用户操作信息
    userInfo: { wares:[]},
    //用户操作信息
    useroper:[],
    //商品信息
    giftcards: [],
    //历史订单信息
    history:[]
  }
})