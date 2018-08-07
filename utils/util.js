var app = getApp()
var userInfo = app.globalData.userInfo
//报错信息js
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取个人信息js
function getUserInfo(cb) {
  var that = this
  if (this.globalData.userInfo) {
    typeof cb == "function" && cb(this.globalData.userInfo)
  } else {
    //调用登录接口
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        console.log(res)
        that.globalData.userInfo = res.userInfo
        typeof cb == "function" && cb(that.globalData.userInfo)
      }
    })
  }
}
//request请求函数
function request(url, data, success,fail){
  var http = 'https://scrm.cnt-ad.net'
  wx.request({
    url: http+url,
    data:data,
    success: success,
    fail: fail
  })
}
//放入卡包
function addCard(){
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  wx.addCard({
    cardList: [
      {
        cardId: '',
        cardExt: '{"code": "", "openid": "", "timestamp":timestamp, "signature":签名}'
      }
    ],
    success: function (res) {
      console.log(res.cardList) // 卡券添加结果
    }
  })
}
//判断是否授权
function authorize(){
wx.getSetting({
  success: function (res) {
    if (!res.authSetting['scope.userInfo']) {
      console.log("no")
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    } 
  }
})
}
//登陆
function login(){
  wx.login({
    success: function (res) {
      userInfo.code = res.code
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
                if (res.data.errcode == 0) {
                  userInfo.openid = res.data.openid
                }
              }
            })
            console.log('用户操作信息为:', userInfo)
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  })
}
// 添加卡劵
function addCard(cardId,success){
wx.request({
  url: 'https://scrm.cnt-ad.net/voss/service/wxconfig',
  data: {
    card_id: cardId
  },
  success: (res) => {
    var nonceStr = res.data.nonceStr
    var timeStamp = res.data.timeStamp
    var signature = res.data.signature
    wx.addCard({
      cardList: [
        {
          cardId: cardId,
          cardExt: '{ "timestamp": "' + timeStamp + '", "nonce_str": "' + nonceStr + '", "signature":"' + signature + '"}'
        }
      ],
      success: success,
      fail: function (res) {
        
      }
    })
  }
})
}









//输出js
module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  request: request,
  addCard: addCard,
  authorize: authorize,
  login: login,
  addCard: addCard
}
