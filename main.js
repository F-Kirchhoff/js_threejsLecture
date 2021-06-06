import './style.css';

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const bg = document.querySelector( "#bg" );


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: bg,
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ( 30 );

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( {
  color: 0xFF6347, 
  wireframe: false,
});
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

const pointLight = new THREE.PointLight( 0xffffff );
const pointLight2 = new THREE.PointLight( 0xFF0080 );

pointLight.position.set( 5, 5, 5 );
pointLight2.position.set( 5, 20, 20 );

scene.add( pointLight );
scene.add( pointLight2 );

const gridhelper = new THREE.GridHelper( 200, 50 );

scene.add( gridhelper );

const controls = new OrbitControls( camera, renderer.domElement );


animate();






function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.001;

  controls.update();

  renderer.render( scene, camera ); 
}