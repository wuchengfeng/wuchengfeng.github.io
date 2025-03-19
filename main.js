import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 创建坐标轴
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// 存储所有添加的正方体
const cubes = new Set();

// 创建正方体的函数
function createCube(x, y, z) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);
    cubes.add(cube);
    return cube;
}

// 删除最后添加的正方体
function removeLastCube() {
    if (cubes.size > 0) {
        const lastCube = Array.from(cubes).pop();
        scene.remove(lastCube);
        cubes.delete(lastCube);
    }
}

// 切换坐标轴显示状态
function toggleAxes() {
    axesHelper.visible = !axesHelper.visible;
}

// 添加事件监听器
document.getElementById('addCube').addEventListener('click', () => {
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const z = parseFloat(document.getElementById('z').value);
    createCube(x, y, z);
});

document.getElementById('removeCube').addEventListener('click', removeLastCube);
document.getElementById('toggleAxes').addEventListener('click', toggleAxes);

// 窗口大小改变时更新渲染
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
