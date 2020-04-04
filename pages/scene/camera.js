const app=getApp();
class Camera {
  constructor(THREE) {
    this.THREE=THREE;
    this.intance=null;
    this._size = 1.5;
    this.init();
  }
  init() {
    const THREE=this.THREE;
    let [width, height] = [app.globalData.width, app.globalData.height];
    const aspect = height / width;
    const size = this._size;
    const camera = new THREE.OrthographicCamera(-size, size, size * aspect, -size * aspect, -100, 100);
    camera.position.set(-10, 10, 10);
    const target = new THREE.Vector3(0, 0, 0);
    camera.lookAt(target);
    this.intance = camera;
    this.target=target;
  }
}
export default Camera;