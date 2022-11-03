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
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";


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
// const color = 0xd4b2f7;
// const intensity = 0.25;
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

    group.scale.multiplyScalar(0.05);
    group.position.x = -4;
    group.position.y = 4;
    group.scale.y *= - 1;


    // const material = new THREE.MeshNormalMaterial();
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x404040),
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

            const geometry2 = new BufferGeometryUtils.mergeVertices(geometry);
            geometry2.computeVertexNormals();

            // Create a mesh and add it to the group
            const mesh = new THREE.Mesh(geometry2, material);

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


const spotLight = new THREE.SpotLight(0x1e1d24);
spotLight.position.set(-20, -10, 5);
scene.add(spotLight);



const sl4 = new THREE.PointLight(0x1e1d24, 0.70, 70);
sl4.position.set(0, -10, -50);
scene.add(sl4);



const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.copy(meshKnot.position);
// controls.enabled = false
controls.enableZoom = false
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
// controls.enableRotate = false
controls.enablePan = false
controls.update();

// const stats = new Stats();






var mouse = new THREE.Vector2();
// camera.position.set(0, 0, 5);
function animation(time) {

    // const mesh = scene.getObjectByName('meshKnot');
    // group.rotation.y = time / 1000;

    // spotLight.position.y = time / 100;
    // sl2.rotation.y = time / 1000;
    // sl3.rotation.y = time / 1000;
    // group.rotation.z = time / 1000;

    // console.log(group.rotation.y % 1.8)

    // if (spotLight.position.x <= 25){
    //     spotLight.position.x += 0.5;
    // }



    // spotLight2.position.x = Math.cos(time / 1000) * 25;
    // console.log(spotLight.position.x, spotLight.position.y)
    
    
    
    spotLight.position.x = mouse.x * 0.040
    
    // const far = 100
    // const near = 20
    // if (mouse.x <= far && mouse.x >= near) {
    //     spotLight.position.x =  mouse.x * 0.1;
    // } else if (mouse.x > far) {
    //     spotLight.position.x = far - 5;
    // } else if (mouse.x < near) {
    //     spotLight.position.x = -near;
    // }
    // spotLight.position.x = mouse.x
    // spotLight.position.y = -5 + (mouse.y * 5)
    // console.log(spotLight.position.x, spotLight.position.y)


    // console.log(mouse.x, mouse.y)
    window.requestAnimationFrame(render);


    renderer.render(scene, camera);

    // stats.update();

}








onMounted(() => {
    sceneRef.value.appendChild(renderer.domElement)
    // sceneRef.value.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousemove', onMouseMove, false);

    // sceneRef.value.appendChild(stats.dom)



    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
    }

});


var raycaster = new THREE.Raycaster();

function offset(el) {
  const box = el.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}
function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (offset(elem).left + (elem.getBoundingClientRect().width / 2)), 2) - elem.getBoundingClientRect().width / 2 + Math.pow(mouseY - (offset(elem).top + (elem.getBoundingClientRect().height / 2)), 2)) - elem.getBoundingClientRect().height / 2);
}

function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates 
    // (-1 to +1) for both components 

    // mouse.x = (event.clientX / (window.innerWidth));
    // mouse.y = - (event.clientY / (window.innerHeight));
    const mX = event.pageX;
    const mY = event.pageY;
    let distance = calculateDistance(sceneRef.value, mX, mY);
    if (distance > 15)
        mouse.x = distance
        // mouse.x = (mX / (window.innerWidth)) * distance;
        // mouse.y = - (mY / (window.innerHeight)) * distance;
    else {
        distance = 15
    }

}

function render() {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray 
    var intersects = raycaster.intersectObjects(scene.children);
    // console.log(scene.children)

    for (var i = 0; i < intersects.length; i++) {
        // objects

        // intersects[i].object.material.color.set(0xff0000);
    }

    renderer.render(scene, camera);
}

</script>