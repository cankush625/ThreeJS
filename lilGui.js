import './style.css';
import * as lui from 'lil-gui';
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
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const material = new THREE.MeshBasicMaterial({map: ankushTexture});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// MeshStandardMaterial requires light source inorder to make it visible
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

camera.position.z = 5;

// Adding lil-gui to enable changing the material and mesh properties
// from UI
const gui = new lui.GUI();

// Material settings
const materialFolder = gui.addFolder("Material");
materialFolder.add(material, "roughness", 0, 1).name("Roughness");
materialFolder.add(material, "metalness", 0, 1).name("Metalness");
materialFolder.addColor(material, "color").name("Color");
materialFolder.open();

// Mesh settings
const meshFolder = gui.addFolder("Mesh");
meshFolder.add(cube.scale, "x", 0.1, 5).name("Scale X");
meshFolder.add(cube.scale, "y", 0.1, 5).name("Scale Y");
meshFolder.add(cube.scale, "z", 0.1, 5).name("Scale Z");
meshFolder.add(cube.position, "x", -10, 10).name("Position X");
meshFolder.add(cube.position, "y", -10, 10).name("Position Y");
meshFolder.add(cube.position, "z", -10, 10).name("Position Z");
meshFolder.open();

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
