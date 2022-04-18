export class SceneManager
{
    constructor(sizes, manager)
    {
        this.scene = null;
        this.camera = null;
        this.sizes = sizes;
        this.loader = new THREE.GLTFLoader(manager);
        this.index = -1;
        this.sceneTick = null;
        this.cssRenderer = new THREE.CSS3DRenderer();
        this.cssRenderer.setSize( this.sizes.width, this.sizes.height );
    }

    /**
     * Change scene to the scene at the given index
     * @param {Number} index 
     * @returns {THREE.Scene}
     */
    changeScene(index)
    {
        if (this.index != index) {
            this.index = index;
            this.destroyScene();
            
            switch(index)
            {
                case 0 :
                    this.createSceneWelcome();
                    break;
                case 1 :
                    this.createSceneWorks();
                    break;
                case 2 :
                    this.createSceneContact();
                    break;
                default :
                    this.createSceneWelcome();
            }
        }

        return this.scene;
    }

    /**
     * Create scene for the welcome section (about me)
     */
    createSceneWelcome()
    {
        this.scene = new THREE.Scene();
        const light = this.createLight();
        this.createCamera();
        light.intensity = 3;

        // Use a function to use it in callback
        let updateSceneTick = (obj) => {
            let speed = 0.001;
            this.sceneTick = () => {
                obj.rotation.y += 0.005;

                if (objectCSS.rotation.y > -0.3 || objectCSS.rotation.y < -0.5) {
                    speed = -speed;
                }

                objectCSS.rotation.y += speed;

                this.cssRenderer.render( this.scene, this.camera );
            };
        };

        const element = document.createElement( 'img' );
		element.src = 'avatar.png';

        const objectCSS = new THREE.CSS3DObject( element );
        objectCSS.position.set(1.5, 0, 0);
        objectCSS.rotation.set(0, -0.3, 0);
        objectCSS.scale.set(0.005, 0.005, 0.005);
        this.scene.add(objectCSS);
		document.getElementById( 'container' ).appendChild( this.cssRenderer.domElement );

        let scene = this.scene; // To be able to access this.scene in callback
        this.loader.load('models/earth.glb', function (gltf) {
            gltf.scene.scale.x *= 0.14;
            gltf.scene.scale.y *= 0.14;
            gltf.scene.scale.z *= 0.14;

            gltf.scene.position.set(7, -5, -20);
            gltf.scene.rotation.set(-0.7, 0, 0);

            gltf.scene.castShadow = true;

            //scene.add(gltf.scene);

            updateSceneTick(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }

    /**
     * Create scene for the portfolio section (my works)
     */
    createSceneWorks()
    {
        this.scene = new THREE.Scene();
        const light = this.createLight();
        light.intensity = 1.4;
        this.createCamera();

        // Use a function to use it in callback
        let updateSceneTick = (obj) => {
            let speed = 0.001;
            this.sceneTick = () => {
                if (obj.rotation.y < 0.3 || obj.rotation.y > 0.5) {
                    speed = -speed;
                }

                //obj.rotation.y += speed;
                this.cssRenderer.render( this.scene, this.camera );
            };
        };

        const element = document.createElement( 'img' );
		element.src = '../banner-test.webp';

        const objectCSS = new THREE.CSS3DObject( element );
        objectCSS.position.set(-6.52, 2.5, -20);
        objectCSS.rotation.set(0, 0.3, 0.09)
        objectCSS.scale.set(0.0048, 0.006, 1);
        this.scene.add(objectCSS);
		document.getElementById( 'container' ).appendChild( this.cssRenderer.domElement );

        let scene = this.scene; // To be able to access this.scene in callback
        this.loader.load('../models/laptop.glb', function (gltf) {
            gltf.scene.scale.x *= 0.1;
            gltf.scene.scale.y *= 0.1;
            gltf.scene.scale.z *= 0.1;

            gltf.scene.position.set(-6, -2, -20);
            gltf.scene.rotation.set(0.3, 0.3, 0)

            scene.add(gltf.scene);
            updateSceneTick(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }

    /**
     * Create scene for the contact section
     */
    createSceneContact()
    {
        this.scene = new THREE.Scene();
        const light = this.createLight();
        light.position.x = -1;
        this.createCamera();

        // Use a function to use it in callback
        let updateSceneTick = (obj) => {
            let speed = 0.001;
            this.sceneTick = () => {
                if (obj.rotation.x < 0.3 || obj.rotation.x > 0.7) {
                    speed = -speed;
                }

                obj.rotation.x += speed;
            };
        };

        let scene = this.scene; // To be able to access this.scene in callback
        this.loader.load('../models/envelopes.glb', function (gltf) {
            gltf.scene.scale.x *= 1.3;
            gltf.scene.scale.y *= 1.3;
            gltf.scene.scale.z *= 1.3;

            gltf.scene.position.set(1, 0, 0);
            gltf.scene.rotation.set(0.3, 1, 0.8);

            scene.add(gltf.scene);

            updateSceneTick(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }

    /**
     * Creates generic light
     * @returns {THREE.DirectionalLight}
     */
    createLight()
    {
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
        directionalLight.position.set(1, 1, 2);
        this.scene.add(directionalLight);

        return directionalLight;
    }

    /**
     * Creates generic Camera
     * @returns {THREE.PerspectiveCamera}
     */
    createCamera()
    {
        this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set( 0, 0, 6 );
        this.scene.add(this.camera);

        return this.camera;
    }

    /**
     * Unloads current scene
     */
    destroyScene()
    {
        if(this.scene != null)
        {
            for(let i = 0; i < this.scene.children; i++)
            {
                this.scene.children[i] = null;
            }

            this.camera = null;
            this.scene = null;
            this.sceneTick = null;

            let child;
            do {
                // cssRenderer.domElement.firstElementChild (ore lastElementChild) contains all the CSS3DObjet
                child = this.cssRenderer.domElement.firstElementChild.lastElementChild;
                if (!child)
                    break;
                this.cssRenderer.domElement.firstElementChild.removeChild(child);
            } while (child);
        }
    }

    /**
     * Updates sizes
     * @param {{width: Number, height: Number}} sizes 
     */
    updateSize(sizes)
    {
        this.sizes = sizes;
        this.cssRenderer.setSize( this.sizes.width, this.sizes.height );
        this.camera.aspect = sizes.width / sizes.height;
        this.camera.updateProjectionMatrix();
    }
}