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
//右上角转发
function transmit(){
  return {
    title: '',
    path: '/pages/index/index',
    imageUrl:'https://scrm.cnt-ad.net/static/images/851531812537_.pic.jpg',  
    success: function (res) {
      // 转发成功  
    },
    fail: function (res) {
      // 转发失败
    }
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


//数据转化
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;


}
//点击时间
function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 1000)
}
//输出js
module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  request: request,
  authorize: authorize,
  login: login,
  addCard: addCard,
  formatTime: formatTime,
  transmit: transmit,
  buttonClicked: buttonClicked, 
}
