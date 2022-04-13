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

    if(getScrollPercent() < 33) {
        scene = sceneManager.changeScene(0);
    } else if (getScrollPercent() < 66) {
        scene = sceneManager.changeScene(1);
    } else {
        scene = sceneManager.changeScene(2);
    }
});

function getScrollPercent()
{
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

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
    

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sceneManager.updateSize(sizes);
});

// SceneFactory
var sceneManager = new SceneManager(sizes, manager);
var scene = sceneManager.changeScene(0);

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

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();