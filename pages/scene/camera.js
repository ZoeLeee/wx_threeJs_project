const app = getApp()
const { Vector3, OrthographicCamera } = app.THREE;
class Camera {
  constructor() {
    this.intance = null;
    this._size = 30;
    this.init();
  }
  init() {
    let [width, height] = [app.globalData.width, app.globalData.height];
    const aspect = height / width;
    this.intance = new OrthographicCamera(-this._size, this._size, this._size * aspect, -this._size * aspect, -100, 100);
    this.intance.position.set(-10, 10, 10);
    this.target = new app.THREE.Vector3(0, 0, 0);
    this.intance.lookAt(this.target);
  }
}
export default new Camera();