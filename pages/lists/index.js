// pages/lists/index.js
Page({
  data: {
    url:""
  },
  look(e){
    let url=e.target.dataset.url;
    if(!url)
      url=this.data.url;
    wx.navigateTo({
      url: "/pages/index/index",
      success:(res)=> {
        this.setData({url:""});
        res.eventChannel.emit('acceptData', { url })
      }
    });
  },
  change(e){
    this.setData({url:e.detail.value});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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