//index.js
import {
  createScopedThreejs
} from 'threejs-miniprogram'

import Viewer from '../scene/scene.js';
import { pointPick } from '../../utils/pointPick.js';

//获取应用实例
const app = getApp()

Page({
  data: { isMove: false,showMtls:"none" },
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptData', function (data) {
      wx.createSelectorQuery().select('#canvas').node().exec((res) => {
        const canvas = res[0].node;
        let [width, height] = [app.globalData.width, app.globalData.height];
       canvas.width=width;
       canvas.height=height;
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
    app.Viewer.controls.onTouchStart(e);
  },
  touchMove(e) {
    this.setData({ isMove: true });
    app.Viewer.controls.onTouchMove(e);
  },
  touchEnd(e) {
    if (!this.data.isMove) {
      let selectObjects = app.Viewer.selectObjects;
      let o = pointPick({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
      console.log(o);
      if (selectObjects.has(o)) {
        o.material.emissive = new app.THREE.Color(0x000000);
        selectObjects.delete(o)
      }
      else {
        if (o && o.material && o.material.type === "MeshPhongMaterial") {
          o.material.emissive = new app.THREE.Color(0x33C541);
          selectObjects.add(o);
        }
      }
    }
    app.Viewer.controls.onTouchEnd(e);
    this.setData({ isMove: false });
  },
  selectMtl(e){
    let viewer=app.Viewer;
    let url=e.target.dataset.url;
    if(!url) return;
    viewer.changeObjectsMaterial(url)
  },
  clearSelct(){
    app.Viewer.cancelSelect();
  },
  toggleShowMtls(){
    this.setData({
      showMtls:this.data.showMtls==="none"?"flex":"none"
    })
  },
  toggleSceneBackground(){
    let viewer=app.Viewer;
    viewer.loadSceneBg();
  },
  onHide() {
    app.Viewer.clear();
  }
})