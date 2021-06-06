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

Array(200).fill().map( addStar );

const spaceTexture = new THREE.TextureLoader().load( "/img/space.jpg" );
scene.background = spaceTexture;


const pointLight = new THREE.PointLight( 0xffffff );
const pointLight2 = new THREE.PointLight( 0xFF0080 );

pointLight.position.set( 5, 5, 5 );
pointLight2.position.set( 5, 20, 20 );

scene.add( pointLight );
scene.add( pointLight2 );

// const gridhelper = new THREE.GridHelper( 200, 50 );

// scene.add( gridhelper );

// const controls = new OrbitControls( camera, renderer.domElement );



// calling the animation and input related manipulations

animate();

document.body.onscroll = moveCamera;




// function declarations


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01 + 20;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

  camera.rotation.y = t * .0005;

}

function addStar() {
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x,  y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );
  star.position.set( x, y, z );

  scene.add( star );
}

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.001;

  renderer.render( scene, camera ); 
}