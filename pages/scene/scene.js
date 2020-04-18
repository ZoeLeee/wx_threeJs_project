import { getLoader } from '../../utils/objLoader.js';
import Camera from './camera';
import { GetOrbitControls } from '../../utils/orbitControls';
import { getMtlLoader } from '../../utils/mtlLoader.js';
import { LoadingManager } from '../../utils/loadingManager.js';

const uv = "http://cdn.dodream.top/uv_grid_opengl.jpg";

class Viewer {
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.objLoader = null;
    this.textureLoader = null;
    this.mtlLoader=null;
    this.selectObjects=new Set();
  }
  init(canvas, THREE) {
    this.THREE = THREE;
    this.canvas = canvas;
    this.initScene(THREE);
    this.initRenderer(canvas, THREE);

    let camera = new Camera(THREE);

    this.scene.add(camera.intance)

    this.camera = camera;

    this.initHelper(THREE);

    this.initPlane(THREE);
    this.initLight(THREE);
    this.initControl(THREE);
    this.initLoader(THREE);

    const ObjLoader = getLoader(THREE);
    let objLoader = new ObjLoader(THREE.DefaultLoadingManager)
    this.objLoader = objLoader;

    this.textureLoader = new THREE.TextureLoader();

    const MTLLoader =getMtlLoader(THREE);

    this.mtlLoader=new MTLLoader(new THREE.LoadingManager());

    // this.testScene(THREE);

    this.animate();
  }
  initLoader(THREE){
    THREE.LoadingManager=LoadingManager;
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

    var helper = new THREE.GridHelper(10, 20);
    helper.position.y = - 0.1;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.scene.add(helper);
  }
  initPlane(THREE) {
    var planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
    planeGeometry.rotateX(- Math.PI / 2);
    var planeMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.25 });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.name="plane";
    this.scene.add(plane);
  }
  initLight(THREE) {
    this.scene.add(new THREE.AmbientLight(0xf0f0f0));
  }
  initControl(THREE) {
    const OrbitControls = GetOrbitControls(this.camera.intance, this.renderer.domElement, THREE);
    var controls = new OrbitControls(this.camera.intance, this.renderer.domElement);
    controls.update();
    this.controls = controls;
  }
  testScene(THREE) {
    let objLoader = this.objLoader;
    //http://cdn.dodream.top/haha.obj

    objLoader.load(
      // resource URL
      'http://cdn.dodream.top/haha.obj',
      // called when resource is loaded
      (object) => {
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
  loaderObj(url) {
    console.log(url);
    let objLoader = this.objLoader;
    const THREE = this.THREE;

    objLoader.load(
      // resource URL
      url,
      // called when resource is loaded
      (object) => {
        var texture = this.textureLoader.load(uv);
        let hasMesh = false;
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material.map = texture;
            hasMesh = true;
          }

          if (!hasMesh && child.isLineSegments)
            child.material.color = new THREE.Color("#000");
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
  loadObjAndMtl(mtlUrl){
    let objLoader = this.objLoader;
    let url=mtlUrl.replace(".mtl",".obj");
    let mtlLoader=this.mtlLoader;
    let self=this;
    mtlLoader
    .load( mtlUrl, function ( materials ) {
      materials.preload();
      objLoader
        .setMaterials( materials )
        .load( url, ( object )=> {
            self.scene.add( object );
        });
    } );

  }
  clear(obj) {
    if (!obj)
      obj = this.scene;

    for (let o of obj.children) {
      if (o.geometry)
        o.geometry.dispose();
      this.clear(o);
      o.parent = null;
      o.dispatchEvent({ type: "removed" });
    }
    obj.children.length = 0;
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