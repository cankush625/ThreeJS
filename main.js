import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  // Antialias will make the cube bounderies smooth
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(3, 3, 3);
const ankushTexture = new THREE.TextureLoader().load('ankush.jpg');
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const material = new THREE.MeshBasicMaterial({map: ankushTexture});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// MeshStandardMaterial requires light source inorder to make it visible
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // The below assignment of 0.01 works on the FPS supported
  // by the system. So, the system with 30 FPS will have different
  // animation speed than the system with 60 FPS.
  // To solve this issue and make it uniform, we need to use the
  // elapsed time from THREE.Clock().
  // Eg.
  //  let clock = THREE.Clock()
  //  cube.rotation.x = clock.getElapsedTime()
  // If we have to make the cube animation faster, we can do:
  //  cube.rotation.x = clock.getElapsedTime() * 5
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
