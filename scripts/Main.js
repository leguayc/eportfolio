import { SceneManager } from './SceneManager.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Loading Manager
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

/**
 * Scroll
 */

let scrollY = window.scrollY;

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY;

    scene = chooseScene();
});

function chooseScene()
{
    if(getScrollPercent() < 33) {
        document.getElementById('starswrapper').style.display = 'block';
        return sceneManager.changeScene(0);
    } else if (getScrollPercent() < 66) {
        document.getElementById('starswrapper').style.display = 'none';
        return sceneManager.changeScene(1);
    } else {
        document.getElementById('starswrapper').style.display = 'none';
        return sceneManager.changeScene(2);
    }
}

function getScrollPercent()
{
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

const mouse = { x : 0, y : 0};

window.addEventListener('mousemove', (e) =>
{
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update manager
    sceneManager.updateSize(sizes);

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sceneManager.updateSize(sizes);

    renderer.render(sceneManager.scene, sceneManager.camera);
});

// SceneFactory
var sceneManager = new SceneManager(sizes, manager);
var scene = chooseScene();

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setClearAlpha(0);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Render
    renderer.render(scene, sceneManager.camera);

    // Animate camera
    sceneManager.camera.rotation.y = THREE.MathUtils.lerp(sceneManager.camera.rotation.y, (mouse.x * Math.PI) / 100, 0.1);
    sceneManager.camera.rotation.x = THREE.MathUtils.lerp(sceneManager.camera.rotation.x, (mouse.y * Math.PI) / 100, 0.1);

    if (sceneManager.sceneTick)
        sceneManager.sceneTick();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();