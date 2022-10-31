<template>
    <div ref="sceneRef"></div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import Stats from 'three/addons/libs/stats.module.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';


const sceneRef = ref(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// camera.position.set(0, 5, - 15);
camera.position.set(0, 0, 15);
// camera.position.set( 0, 0, 200 );





















const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
renderer.setClearColor(0x000000, 0);
renderer.setAnimationLoop(animation);
renderer.alpha = true
// tone mapping
// renderer.toneMapping = THREE.NoToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.physicallyCorrectLights = true;






// WORLD Light
// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new THREE.AmbientLight(color, intensity);
// scene.add(light);










const guiData = {
    currentURL: 'logo.svg',
    drawFillShapes: true,
    drawStrokes: true,
    fillShapesWireframe: false,
    strokesWireframe: false
};

const group = new THREE.Group();
const url = guiData.currentURL
const loader = new SVGLoader();
loader.load(url, function (data) {
    // const paths = data.paths;

    group.scale.multiplyScalar(0.06);
    group.position.x = -5;
    group.position.y = 2;
    group.scale.y *= - 1;

    // console.log(paths)
    // for (let i = 0; i < paths.length; i++) {
    //     const path = paths[i];

    //     // const fillColor = path.userData.style.fill;
    //     if (guiData.drawFillShapes) {

    //         const material = new THREE.MeshBasicMaterial({
    //             color: new THREE.Color(0x2C2657),
    //             opacity: path.userData.style.fillOpacity,
    //             transparent: true,
    //             side: THREE.DoubleSide,
    //             depthWrite: false,
    //             wireframe: guiData.fillShapesWireframe
    //         });

    //         const shapes = SVGLoader.createShapes(path);

    //         for (let j = 0; j < shapes.length; j++) {

    //             const shape = shapes[j];

    //             const geometry = new THREE.ShapeGeometry(shape);
    //             const mesh = new THREE.Mesh(geometry, material);

    //             group.add(mesh);

    //         }

    //     }

    //     const strokeColor = path.userData.style.stroke;

    //     if (guiData.drawStrokes && strokeColor !== undefined && strokeColor !== 'none') {

    //         const material = new THREE.MeshBasicMaterial({
    //             color: new THREE.Color().setStyle(strokeColor).convertSRGBToLinear(),
    //             opacity: path.userData.style.strokeOpacity,
    //             transparent: true,
    //             side: THREE.DoubleSide,
    //             depthWrite: false,
    //             wireframe: guiData.strokesWireframe
    //         });

    //         for (let j = 0, jl = path.subPaths.length; j < jl; j++) {

    //             const subPath = path.subPaths[j];

    //             const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);

    //             if (geometry) {

    //                 const mesh = new THREE.Mesh(geometry, material);

    //                 group.add(mesh);

    //             }

    //         }

    //     }

    // }


    // const material = new THREE.MeshNormalMaterial();
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xFFFFFF),
    });

    // Loop through all of the parsed paths
    data.paths.forEach((path, i) => {
        const shapes = path.toShapes(true);

        // Each path has array of shapes
        shapes.forEach((shape, j) => {
            // Finally we can take each shape and extrude it
            const geometry = new THREE.ExtrudeGeometry(shape, {
                steps: 4,
                depth: 16,
                bevelEnabled: true,
                bevelThickness: 2,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 1
            });

            // Create a mesh and add it to the group
            const mesh = new THREE.Mesh(geometry, material);

            group.add(mesh);
        });
    });

    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);

    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    // Offset all of group's elements, to center them
    group.children.forEach(item => {
        item.position.x = xOffset;
        item.position.y = yOffset;
    });

    scene.add(group);

    animation();

});












// probe
// const lightProbe = new THREE.LightProbe();
// scene.add(lightProbe);


const API = {
    lightProbeIntensity: 1.0,
    directionalLightIntensity: 0.5,
    envMapIntensity: 1
};


const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20, -5, 10);
scene.add(spotLight);

const sl2 = new THREE.SpotLight(0x2C2657);
sl2.position.set(20, -5, 10);
scene.add(sl2);

const sl3 = new THREE.SpotLight(0xFFFFFF);
sl3.position.set(0, 10, 0);
scene.add(sl3);


const sl4 = new THREE.SpotLight(0x0F0E17);
sl4.position.set(0, 10, -10);
scene.add(sl4);


const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.copy(meshKnot.position);
// controls.enabled = false
controls.update();

// const stats = new Stats();







// camera.position.set(0, 0, 5);
function animation(time) {

    // const mesh = scene.getObjectByName('meshKnot');
    // group.rotation.y = time / 1000;

    // spotLight.position.y = time / 100;
    // sl2.rotation.y = time / 1000;
    // sl3.rotation.y = time / 1000;
    // group.rotation.z = time / 1000;

    // console.log(group.rotation.y % 1.8)
    
    // if (camera.position.z <= 15){
    //     camera.position.z += 0.1;
    //     // camera.rotation.y += 0.01;
    // }




    renderer.render(scene, camera);

    // stats.update();

}








onMounted(() => {
    sceneRef.value.appendChild(renderer.domElement)
    // sceneRef.value.appendChild(stats.dom)



});

</script>