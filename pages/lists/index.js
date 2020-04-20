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
  scanCode(){
    wx.scanCode({
      success: (res) => {
        let url=res.result;
        if(url&&url.startsWith("http")&&url.endsWith(".obj")){
          wx.navigateTo({
            url: "/pages/index/index",
            success:(res)=> {
              this.setData({url:""});
              res.eventChannel.emit('acceptData', { url})
            }
          });
        }
      },
    })
  },
})