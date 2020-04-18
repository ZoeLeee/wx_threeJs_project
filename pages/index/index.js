//index.js
import {
  createScopedThreejs
} from 'threejs-miniprogram'

import Viewer from '../scene/scene.js';
import { pointPick } from '../../utils/pointPick.js';

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
        if (data.url.endsWith(".mtl"))
          viewer.loadObjAndMtl(data.url);
        else
          viewer.loaderObj(data.url);
      });
    })
  },
  touchstart(e) {
    console.log(e)
    let o=pointPick(e);
    if(o&& o.material&&o.material.type==="MeshPhongMaterial"){
      o.material.emissive=new app.THREE.Color(0x33C541);
    }
    app.Viewer.controls.onTouchStart(e);
  },
  touchEnd(e) {
    app.Viewer.controls.onTouchEnd(e);
  },
  touchMove(e) {
    app.Viewer.controls.onTouchMove(e);
  },
  touchTap(e){
  
  },
  onReady(option) {

  },
  onHide() {
    app.Viewer.clear();
  }
})