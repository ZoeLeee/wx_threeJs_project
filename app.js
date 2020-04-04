//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfo({
      success:(res)=> {
        // 获取可使用窗口宽度
        this.globalData.height= res.windowHeight;
        // 获取可使用窗口高度
        this.globalData.width = res.windowWidth;
      }
    })
  },
  globalData: {
    height:0,width:0
  },
  THREE:null,
  Viewer:null,
})