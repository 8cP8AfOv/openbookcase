import * as THREE from "three";
import {OrbitControls} from "OrbitControls";

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const sizes = {
  width: innerWidth,
  height: innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 3000);
camera.position.set(0, 500, 1000);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const urls = [
  "./envImage/right.png",
  "./envImage/left.png",
  "./envImage/up.png",
  "./envImage/down.png",
  "./envImage/front.png",
  "./envImage/back.png",
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(500);

const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
});
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

function animate() {
  controls.update();
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

