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

/**
 * Choose the correct scene for the current scroll Percent
 * @returns {THREE.Scene}
 */
function chooseScene()
{
    if(getScrollPercent() < 33) {
        return sceneManager.changeScene(0);
    } else if (getScrollPercent() < 66) {
        return sceneManager.changeScene(1);
    } else {
        return sceneManager.changeScene(2);
    }
}

// Add click event to scroll down to next scenes
let buttonsToScrollDown = document.getElementsByClassName('scrolldown');
for (let i = 0; i < buttonsToScrollDown.length; i++) {
    buttonsToScrollDown[i].addEventListener('click', () => {
        scrollToScene(sceneManager.index+1);
    });
}

/**
 * Scroll to the scene at the given index
 * @param {Number} index Index of the scene
 */
function scrollToScene(index) {
    let percent = (34 * index);
    let scrollTarget = getScrollHeightWithPercent(percent);
    window.scrollTo(0, scrollTarget);
}

/**
 * Get scrollY with the given percent
 * @param {Number} percent Percent of the page
 * @returns {Number}
 */
function getScrollHeightWithPercent(percent) {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    return percent / 100 * ((h[sh]||b[sh]) - h.clientHeight);
}

/**
 * Get current scroll percent (where you are on the page)
 * @returns {Number}
 */
function getScrollPercent()
{
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

// Used to know where the mouse is
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
    alpha: true,
    antialias: true
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
    sceneManager.camera.rotation.y = THREE.MathUtils.lerp(sceneManager.camera.rotation.y, (mouse.x * Math.PI) / 450, 0.05);
    sceneManager.camera.rotation.x = THREE.MathUtils.lerp(sceneManager.camera.rotation.x, (mouse.y * Math.PI) / 450, 0.05);

    if (sceneManager.sceneTick)
        sceneManager.sceneTick();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();