const app = getApp();

export function onMouseMove(event, mouse) {
  let { width, height } = app.globalData;
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  mouse.x = (event.touches[0].clientX / width) * 2 - 1;
  mouse.y = - (event.touches[0].clientY / height) * 2 + 1;
}

export function pointPick(event, object) {
  let THREE = app.THREE;

  if (!object)
    object = app.Viewer.scene;

  let selectObjs = [];
  object.traverse(o => {
    if (o.isMesh&&o.name!=="plane")
      selectObjs.push(o);
  })

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  onMouseMove(event, mouse);
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, app.Viewer.camera.intance);

  // 计算物体和射线的焦点
  var intersects = raycaster.intersectObjects(selectObjs);
  for(let inter of intersects){
    if(inter.object)
      return inter.object;
  }
}