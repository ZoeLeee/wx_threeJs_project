//index.js
import { createScopedThreejs } from 'threejs-miniprogram'

import Viewer from '../scene/scene.js';

//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
  
  },
  touchstart(e){
    if(e.touches.length>1){
      return;
    }
    app.Viewer.controls.onTouchStart(e);
  },
  touchEnd(e){
    if(e.touches.length>1){
      return;
    }
    app.Viewer.controls.onTouchEnd(e);
  },
  touchMove(e){
    if(e.touches.length>1){
      return;
    }
    app.Viewer.controls.onTouchMove(e);
  },
  onReady(){
    const query = wx.createSelectorQuery().select('#canvas').node().exec((res) => {
      const canvas = res[0].node;
      const THREE = createScopedThreejs(canvas);

      const viewer=new Viewer();
      viewer.init(canvas,THREE);
      app.Viewer=viewer;
      app.THREE=THREE;
    })
  },
})
