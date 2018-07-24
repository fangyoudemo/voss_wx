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
//从服务器获取banner图
function getData(userId){
  wx.request({
    url: 'test.php',
    data: {
      userId
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}
//从服务器获取商品列表
function getWares(){
  wx.request({
    url: '',
    data:{

    },
    success:function(){
      
    }
  })
}











//输出js
module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo
}
