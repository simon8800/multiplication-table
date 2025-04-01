import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// canvas element
const canvas = document.querySelector("canvas#webgl-canvas");

// scene
const scene = new THREE.Scene();

// camera
const fov = 75;
const sizes = {
    height: window.innerHeight / 2,
    width: window.innerWidth,
};
const near = 1;
const far = 100;
const camera = new THREE.PerspectiveCamera(
    fov,
    sizes.width / sizes.height,
    near,
    far
);
camera.position.z = 12;
scene.add(camera);

// controls
// const controls = new OrbitControls(camera, canvas);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// geometry
const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 16);

// material
const material = new THREE.MeshBasicMaterial({
    color: 0xff5733,
});

let spheres = [];

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

/**
 * Detect changes to math problem:
 */
const productElement = document.querySelector("#product");

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            const newText = productElement.innerText;
            const words = newText.split(" ");
            const multiplicand = words[0];
			const multipler = words[2];
			
			scene.clear();
			// for (let sphere of spheres) {
			// 	scene.remove(sphere);
			// }

			spheres = [];

			for (let i = 0; i < multiplicand; i++) {
				for (let j = 0; j < multipler; j++) {
					let sphere = new THREE.Mesh(sphereGeometry, material);
					sphere.position.y = -6 + (i * 1.25);
					sphere.position.x = -6 + j;
					spheres.push(sphere);
				}
			}

			for (let sphere of spheres) {
				scene.add(sphere);
			}
        }
    }
	scene.add(axesHelper);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(productElement, { childList: true });

/**
 * Resizing canvas
 */
window.addEventListener("resize", () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight / 2;

    // update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
});

/**
 * Tick
 */
const tick = () => {
    // controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();