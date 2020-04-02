//index.js
import { createScopedThreejs } from 'threejs-miniprogram'

import {getLoader} from '../../utils/objLoader.js';

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  
  },
  onReady(){
    const query = wx.createSelectorQuery().select('#canvas').node().exec((res) => {
      const canvas = res[0].node;
      canvas.height=300;
      canvas.width=300;
      const THREE = createScopedThreejs(canvas);
      const scene= new THREE.Scene();
      let renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
      });
      
      let [width, height] = [app.globalData.width, app.globalData.height];
      const aspect = height / width;
      const size=1.2;
      const camera = new THREE.OrthographicCamera(-size, size, size * aspect, -size * aspect, -100, 100);
      camera.position.set(-10, 10, 10);
      const target = new THREE.Vector3(0, 0, 0);
      camera.lookAt(target);

      const axesHelper = new THREE.AxesHelper(100);
      scene.add(camera)
      scene.add(axesHelper);

      const ObjLoader = getLoader(THREE);
      let objLoader = new ObjLoader(THREE.DefaultLoadingManager)

      //http://cdn.dodream.top/haha.obj

      objLoader.load(
        // resource URL
        'http://cdn.dodream.top/haha.obj',
        // called when resource is loaded
        function (object) {
          scene.add(object);
          renderer.render(scene, camera);

        },
        // called when loading is in progresses
        function (xhr) {

          console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

          console.log('An error happened');

        }
      );

      renderer.render(scene, camera);
      
    })
  },
  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.intance, this.camera.intance);
  }
})
