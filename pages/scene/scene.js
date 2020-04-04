import { getLoader } from '../../utils/objLoader.js';
import { requestAnimationFrame } from '../../utils/requestAnimationFrame.js';
import Camera from './camera';

const app=getApp();
class Viewer {
  constructor() {
    this.camera=null;
    this.scene=null;
    this.renderer=null;
  }
  init(canvas,THREE) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    let renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    let camera=new Camera(THREE);

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(camera.intance)
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

    this.scene=scene;
    this.camera=camera;
    this.renderer=renderer;

    this.animate();

  }
  render() {
    this.renderer.render(this.scene, this.camera.intance);
  }
  animate(){
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}

export default Viewer;