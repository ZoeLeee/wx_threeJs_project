const app=getApp();
class Camera {
  constructor(THREE) {
    this.THREE=THREE;
    this.intance=null;
    this._size = 1.5;
    this.orthCamera=null;
    this.persCamera=null;
    this.init();
  }
  initOrthCamera() {
    const THREE=this.THREE;
    let [width, height] = [app.globalData.width, app.globalData.height];
    const aspect = height / width;
    const size = this._size;
    const camera = new THREE.OrthographicCamera(-size, size, size * aspect, -size * aspect, -1000, 1000);
    camera.position.set(-1, 1, 1);
    const target = new THREE.Vector3(0, 0, 0);
    camera.lookAt(target);
    this.orthCamera = camera;
    this.target=target;
  }
  initPeCamera(){
    const THREE=this.THREE;
    const fov = 75;
    let [width, height] = [app.globalData.width, app.globalData.height];
    const aspect = width / height;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    this.persCamera = camera;
  }
  init(){
    this.initOrthCamera();
    this.initPeCamera();
    this.intance=this.orthCamera;
  }
}
export default Camera;