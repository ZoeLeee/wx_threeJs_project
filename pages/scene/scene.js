import camera from "./camera";
const app=getApp();
const THREE=app.THREE;
class Scene {
  constructor(canvas) {
    this.canvas=canvas;
    this.init();
    this.render();
  }
  init() {
    const THREE = app.globalData.THREE;
    this.intance = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.camera = camera;

    this.axesHelper = new THREE.AxesHelper(100);

    this.intance.add(this.camera.intance);
    // this.intance.add(this.axesHelper);
    // let cameraHelper=new THREE.CameraHelper(camera);
    // this.intance.add(cameraHelper);
  }
  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.intance, this.camera.intance);
  }
}

export default Scene;