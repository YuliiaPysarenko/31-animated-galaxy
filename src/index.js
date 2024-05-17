import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { generateGalaxy, parameters } from "./modules/galaxy.js";
import { setupGUI } from "./modules/gui.js";
import { setupCamera } from "./modules/camera.js";
import { setupRenderer, resizeHandler } from "./modules/renderer.js";

THREE.ColorManagement.enabled = false;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => resizeHandler(camera, renderer, sizes));

/**
 * Camera
 */
const camera = setupCamera(sizes);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = setupRenderer(canvas, sizes);

// GUI
const gui = new dat.GUI();
setupGUI(gui, generateGalaxy, parameters);

// Generate galaxy
generateGalaxy(scene, renderer);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update material
  parameters.material.uniforms.uTime.value = elapsedTime * parameters.spinSpeed;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();