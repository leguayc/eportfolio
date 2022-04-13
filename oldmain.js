//import { setCameraPosition, setPointInModel } from './camera.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const switchingScenes = [
    new THREE.Scene(),
    new THREE.Scene(),
    new THREE.Scene()
];
var scene = switchingScenes[0];

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
 * Objects
 */
// Load
const loader = new THREE.GLTFLoader(manager);

// Waterfall
loader.load( 'models/waterfallscene.glb', function ( gltf ) {
    gltf.scene.scale.x *= 5;
    gltf.scene.scale.y *= 5;
    gltf.scene.scale.z *= 5;
    gltf.scene.position.y = -1;
    
    gltf.scene.rotation.y = 11;
    scene.add( gltf.scene );
}, undefined, function ( error ) {

	console.error( error );

} );

// Material
const material = new THREE.MeshToonMaterial({ color: '#ffeded' })

// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
);
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
);
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
);

const sectionMeshes = [ mesh1, mesh2, mesh3 ];
var meshLookAtIndex = 0;
var boundingBoxFinal = new THREE.Box3().setFromObject(sectionMeshes[meshLookAtIndex]);

switchingScenes[0].add(mesh1);
console.log(switchingScenes[0]);
switchingScenes[1].add(mesh2);
switchingScenes[2].add(mesh3);

// Positions
const objectsDistance = 4;
for(let i = 0; i < sectionMeshes.length; i++) {
    //sectionMeshes[i].position.y = -objectsDistance * i;
    sectionMeshes[i].position.x = (i % 2 == 0) ? 2 : -2;
}

/**
 * Scroll
 */

let scrollY = window.scrollY;

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY;

    if(getScrollPercent() < 33) {
        scene = switchingScenes[0];
    } else if (getScrollPercent() < 66) {
        scene = switchingScenes[1];
    } else {
        scene = switchingScenes[2];
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
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

var randomPoints = [];
randomPoints.push(
    new THREE.Vector3(0, 0, 6)
);
randomPoints.push(
    new THREE.Vector3(0, -5, 6)
);
randomPoints.push(
    new THREE.Vector3(0, -10, 6)
);
var pathCurve = new THREE.CatmullRomCurve3(randomPoints);


var camPosIndex = 0;
function setCameraPosition()
{
    let p = (getScrollPercent() / 100);
    let position = pathCurve.getPointAt( p );
    return position;
}

function setPointInModel(rangeX, rangeY, rangeZ)
{
	let minArray = [], maxArray = [];
	boundingBoxFinal.min.toArray( minArray );
	boundingBoxFinal.max.toArray( maxArray );

	let xOut = THREE.Math.lerp( minArray[0], maxArray[0], rangeX );
	let yOut = THREE.Math.lerp( minArray[1], maxArray[1], rangeY );
	let zOut = THREE.Math.lerp( minArray[2], maxArray[2], rangeZ );

	let output = new THREE.Vector3( xOut, yOut, zOut );
	return output;
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setClearAlpha(0);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Animate camera
    //camera.position.y = -scrollY / sizes.height * objectsDistance;
    //camera.position.copy( setCameraPosition() );
    //if (mesh1) camera.lookAt( setPointInModel(.5,.8,.5) );

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();