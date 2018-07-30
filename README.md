#礼品卡小程序
###目录

├── dist                                //项目静态资源
│
├── images                              //项目用到的图片资源                                   
│
├── pages                               //页面结构
│   ├── index                           //首页 显示商品轮播及卡面挑选   
│   ├── detail                           //商品类型及规格挑选      
│   ├── address                          //填写地址电话等信息
│   ├── blessing                         //选择赠送好友、留下祝福
│   ├── yiGive                           //已赠送
│   ├── history                          //购买历史                                             
│
├── utils                                //共用js方法      
│
├── app.js                               //入口文件
│
├── app.json                             //全局配置
│
├── app.wxss                             //全局样式文件
│
├── README.md                             //说明文档
│
├──project.config.json                    //项目配置文件


          自营发起统一下单接口
          wx.request({
            url: 'https://scrm.cnt-ad.net/voss/service/native',
            data:{
              cardid: userInfo.cardid,
              openid: userInfo.openid,
              attach:'',
              orderNumber: userInfo.orderNumber
            },
            success:function(res){
              console.log('统一下单接口返回',res)
              if (res.data.errcode =='SUCCESS'){
                //拉起支付api
                console.log("拉起支付")
                wx.requestPayment({
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    if (res.errMsg =='requestPayment:ok'){
                      console.log('用户成功支付，进入下一页')
                      wx.navigateTo({
                        url: '../blessing/blessing',
                      })
                    }               
                  },
                  'fail': function (res) { },
                  'complete': function (res) { }
                })
              }
            }
          })