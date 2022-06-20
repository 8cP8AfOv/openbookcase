//import * as THREE from './three/build/three.module.js'
//import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js'
//import * as THREE from "./build/three.module.js";
//import { OrbitControls } from "./controls/OrbitControls.js";
//import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm';

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import * as GUI from 'gui';

let scene, camera, renderer, pointLight, controls, sphere, plane, octahedron, sun;
let degree = 0; 
let diameter = 5;


window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  /**
   * マテリアルセクション
   */
  const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const planeGeometry = new THREE.PlaneGeometry(1,1);
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);
const sunGeometry = new THREE.SphereGeometry(0.8,16,16);

  const texture = new THREE.TextureLoader().load('./textures/brick.jpg');

  /*
  const material = new THREE.MeshBasicMaterial({ 
    //wireframe:true,
    map: texture,
    //color: 'blue',
  });
  */

  //const material = new THREE.MeshBasicMaterial();
  //material.map = texture;
  //material.color.set('red');
  //material.wireframe = true;
  //material.side = THREE.DoubleSide;
  //material.opacity = 0.5;
  //material.transparent =true;

  //const material = new THREE.MeshNormalMaterial();
  //material.flatShading = true;
  //material.side = THREE.DoubleSide;

  //const material = new THREE.MeshStandardMaterial();
  //material.color.set('blue');
  //material.roughness = 0.34;
  //material.metalness = 0.64;
  //material.map = texture;

  const material = new THREE.MeshPhongMaterial();
  material.shininess = 100;
  //material.specular = new THREE.Color('blue');
  material.side = THREE.DoubleSide;
  
 const material2 = new THREE.MeshPhongMaterial();
  //material.map = texture;
  material2.color.set(0xffff88);
  //material2.wireframe = true;
  material2.side = THREE.DoubleSide;
  material2.opacity = 0.5;
  material2.transparent =true;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.set(0,0,0);
  scene.add(pointLight);

  //const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
  //scene.add(pointLightHelper);

  sphere = new THREE.Mesh(sphereGeometry, material);
  plane = new THREE.Mesh(planeGeometry, material);
  octahedron = new THREE.Mesh(octahedronGeometry, material);
  sun = new THREE.Mesh(sunGeometry, material2);
  

  //sphere.position.x = 0;
  octahedron.position.set(2,0,0);
  plane.position.set(-2,0,0);
  sun.position.set(0,0,0);

  //var axes = new THREE.AxesHelper(25);
  //scene.add(axes, sphere);
  scene.add(sphere, plane, octahedron);
//scene.add(sphere, sun);

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  //sphere.rotation.x += 0.1;
  //sphere.rotation.x = elapsedTime;

  degree++;
  const pos1 = calcBallPos(7, 5, 1);
  sphere.position.set(pos1['x'], pos1['y'], 0);

  plane.rotation.y = elapsedTime;
  octahedron.rotation.z = elapsedTime;
  sun.rotation.y = elapsedTime;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

//---------------------------------------------------------------------
function calcBallPos(radius, space, speed) {
  speed = speed || 1.0;
  const rad = ( degree * speed + diameter + space ) * Math.PI / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  return {'x':x, 'y':y};
}
