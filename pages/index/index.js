//index.js
import {
  createScopedThreejs
} from 'threejs-miniprogram'

import Viewer from '../scene/scene.js';

//获取应用实例
const app = getApp()

Page({
  data: {},
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptData', function (data) {
        wx.createSelectorQuery().select('#canvas').node().exec((res) => {
          const canvas = res[0].node;
          const THREE = createScopedThreejs(canvas);
          const viewer = new Viewer();
          viewer.init(canvas, THREE);
          app.Viewer = viewer;
          app.THREE = THREE;
          viewer.loaderObj(data.url);
        });
    })
  },
  touchstart(e) {
    app.Viewer.controls.onTouchStart(e);
  },
  touchEnd(e) {
    app.Viewer.controls.onTouchEnd(e);
  },
  touchMove(e) {
    app.Viewer.controls.onTouchMove(e);
  },
  onReady(option) {

  },
  onHide() {
    app.Viewer.clear();
  }
})