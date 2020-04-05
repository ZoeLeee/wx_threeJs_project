import { getLoader } from '../../utils/objLoader.js';
import { requestAnimationFrame } from '../../utils/requestAnimationFrame.js';
import Camera from './camera';
import  {GetOrbitControls}  from '../../utils/orbitControls';

class Viewer {
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
  }
  init(canvas, THREE) {
    this.canvas=canvas;
    this.initScene(THREE);
    this.initRenderer(canvas, THREE);

    let camera = new Camera(THREE);

    this.scene.add(camera.intance)

    this.camera = camera;

    this.initHelper(THREE);

    this.initPlane(THREE);
    this.initLight(THREE);
    this.initControl(THREE);
    this.testScene(THREE);

    this.animate();
  }
  initScene(THREE) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    this.scene = scene;
  }
  initRenderer(canvas, THREE) {
    let renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    this.renderer = renderer;
  }
  initHelper(THREE) {
    const axesHelper = new THREE.AxesHelper(100);
    this.scene.add(axesHelper);

    var helper = new THREE.GridHelper(10,20);
    helper.position.y = - 0.1;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.scene.add(helper);
  }
  initPlane(THREE) {
    var planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
    planeGeometry.rotateX(- Math.PI / 2);
    var planeMaterial = new THREE.MeshBasicMaterial({transparent:true,opacity:0.25});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.scene.add(plane);
  }
  initLight(THREE){
    this.scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );
  }
  initControl(THREE){
    const OrbitControls=GetOrbitControls(this.camera.intance, this.renderer.domElement,THREE);
    var controls = new OrbitControls( this.camera.intance, this.renderer.domElement );
    controls.update();
    this.controls=controls;
  }
  testScene(THREE) {
    const ObjLoader = getLoader(THREE);
    let objLoader = new ObjLoader(THREE.DefaultLoadingManager)

    //http://cdn.dodream.top/haha.obj

    objLoader.load(
      // resource URL
      'http://cdn.dodream.top/haha.obj',
      // called when resource is loaded
      (object) => {
        console.log('object: ', object);
        object.children.forEach(obj => {
          if (obj.material)
            obj.material.color = new THREE.Color("#000");
        });
        this.scene.add(object);
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
  }
  render() {
    this.renderer.render(this.scene, this.camera.intance);
  }
  animate() {
    this.canvas.requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.render();
  }
}

export default Viewer;