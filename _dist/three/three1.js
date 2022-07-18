import './three1.css';
import * as THREE from "three";
import * as dat from "gui";

const gui = new dat.GUI();

const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const material = new THREE.MeshPhysicalMaterial({
  color: "3c94d7",
  metalness: 0.86,
  roughness: 0.37,
  flatShading: true,
});

gui.addColor(material, "color");
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

const mesh1 = new THREE.Mesh( new THREE.TorusGeometry(1, 0.4, 16, 60), material );
const mesh2 = new THREE.Mesh( new THREE.OctahedronGeometry(), material );
const mesh3 = new THREE.Mesh( new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material );
const mesh4 = new THREE.Mesh( new THREE.IcosahedronGeometry(), material );

mesh1.position.set(2,0,0);
mesh2.position.set(-1,0,0);
mesh3.position.set(2,0,-6);
mesh4.position.set(5,0,3);

scene.add(mesh1, mesh2, mesh3, mesh4);
const meshes = [mesh1, mesh2, mesh3, mesh4];

// particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positionArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  positionArray[i] =(Math.random() - 0.5)*10;
}
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.025,
  color: "xffffff",
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);



const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

window.addEventListener("resize", ()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
})

let speed = 0;
let rotation = 0;
window.addEventListener("wheel", (event) => {
  speed += event.deltaY * 0.0002;
})

function rot() {
  rotation += speed;
  speed *= 0.93;
  //mesh1.position.x = rotation;
  mesh1.position.x = 2 + 3.8 * Math.cos(rotation);
  mesh1.position.z = -3 + 3.8 * Math.sin(rotation);  
  mesh2.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI/2);
  mesh2.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI/2);    
  mesh3.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI);
  mesh3.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI);  
  mesh4.position.x = 2 + 3.8 * Math.cos(rotation + 3 * (Math.PI/2));
  mesh4.position.z = -3 + 3.8 * Math.sin(rotation + 3 * (Math.PI/2));    
  
  window.requestAnimationFrame(rot);
}
rot();



const cursor = {};
cursor.x = 0;
cursor.y = 0;
window.addEventListener("mousemove", (event)=> {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
})



const clock = new THREE.Clock();

const animate = () => {
  renderer.render(scene, camera);

  let getDeltaTime = clock.getDelta();

  for (const mesh of meshes ) {
    mesh.rotation.x += 0.1 * getDeltaTime;
    mesh.rotation.y += 0.2 * getDeltaTime;
  }


  camera.position.x += cursor.x * getDeltaTime * 0.5;
  camera.position.y += -cursor.y * getDeltaTime * 0.5;

  window.requestAnimationFrame(animate);
}

animate();
