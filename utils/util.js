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
function request(url, data, success){
  var URL = 'https://scrm.cnt-ad.net'
  wx.request({
    url: URL+url,
    data:data,
    success: success
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











//输出js
module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  request: request,
  addCard: addCard
}
