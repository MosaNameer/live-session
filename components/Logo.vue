<template>
    <div ref="sceneRef"></div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import Stats from 'three/addons/libs/stats.module.js';


const sceneRef = ref(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 5, - 15);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
renderer.setClearColor(0x000000, 0);
renderer.setAnimationLoop(animation);
renderer.alpha = true
// tone mapping
// renderer.toneMapping = THREE.NoToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;



RectAreaLightUniformsLib.init();

// const rectLight1 = new THREE.RectAreaLight(0x0F0E17, 5, 4, 10);
// rectLight1.position.set(- 5, 5, 5);
// scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0x2C2657, 5, 4, 5);
rectLight2.position.set(0, 5, 1);
scene.add(rectLight2);


const geoFloor = new THREE.BoxGeometry(20, 0.1, 10);
const matStdFloor = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3, metalness: 0 });
const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
mshStdFloor.rotation.set(25, 0, 0);
scene.add(mshStdFloor);

const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
const matKnot = new THREE.MeshStandardMaterial({ color: 0x2C2657, roughness: 0, metalness: 0 });
const meshKnot = new THREE.Mesh(geoKnot, matKnot);
meshKnot.name = 'meshKnot';
meshKnot.position.set(0, 5, 0);
scene.add(meshKnot);


// probe
const lightProbe = new THREE.LightProbe();
scene.add(lightProbe);


const API = {
    lightProbeIntensity: 1.0,
    directionalLightIntensity: 0.9,
    envMapIntensity: 1
};

// light
const directionalLight = new THREE.DirectionalLight(0xffffff, API.directionalLightIntensity);
directionalLight.position.set(-20, 0, 0);
directionalLight.castShadow = true
scene.add(directionalLight);


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(meshKnot.position);
// controls.enabled = false
controls.update();

// const stats = new Stats();



function animation(time) {

    const mesh = scene.getObjectByName('meshKnot');
    mesh.rotation.y = time / 1000;

    directionalLight.rotation.y = time / 1000;
    rectLight2.rotation.z = time / 1000;

    renderer.render(scene, camera);

    // stats.update();

}








onMounted(() => {
    sceneRef.value.appendChild(renderer.domElement)
    // sceneRef.value.appendChild(stats.dom)



});

</script>