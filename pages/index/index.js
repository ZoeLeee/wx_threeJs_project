//index.js
import { createScopedThreejs } from 'threejs-miniprogram'

import {getLoader} from '../../utils/objLoader.js';

import Viewer from '../scene/scene.js';

//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
  
  },
  onReady(){
    const query = wx.createSelectorQuery().select('#canvas').node().exec((res) => {
      const canvas = res[0].node;
      canvas.height=300;
      canvas.width=300;
      const THREE = createScopedThreejs(canvas);

      const viewer=new Viewer();
      viewer.init(canvas,THREE);

      app.Viewer=viewer;
      app.THREE=THREE;
    })
  },
})
