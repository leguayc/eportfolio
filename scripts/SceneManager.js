export class SceneManager
{
    constructor(sizes, manager)
    {
        this.scene = null;
        this.camera = null;
        this.sizes = sizes;
        this.loader = new THREE.GLTFLoader(manager);
        this.index = -1;
    }

    changeScene(index)
    {
        if (this.index != index) {
            this.index = index;
            this.removeScene();
            
            switch(index)
            {
                case 0 :
                    this.createSceneWelcome();
                    break;
                case 1 :
                    this.createSceneWorks();
                    break;
                case 2 :
                    this.createSceneWelcome();
                    break;
                default :
                    this.createSceneWelcome();
            }
        }

        return this.scene;
    }

    createSceneWelcome()
    {
        this.scene = new THREE.Scene();

        // Materials
        const material = new THREE.MeshToonMaterial({ color: '#ffeded' })

        // Meshes
        const mesh1 = new THREE.Mesh(
            new THREE.TorusGeometry(1, 0.4, 16, 60),
            material
        );

        mesh1.position.x = 2;

        this.scene.add(mesh1);
        
        this.createLight();
        this.createCamera();
    }

    createSceneWorks()
    {
        this.scene = new THREE.Scene();
        this.createLight();
        this.createCamera();
        this.camera.rotation.set(-0.15, -0.1, 0);

        let scene = this.scene; // To be able to access this.scene in callback
        this.loader.load('../models/fantasyinn.gltf', function (gltf) {
            gltf.scene.scale.x *= 1;
            gltf.scene.scale.y *= 1;
            gltf.scene.scale.z *= 1;

            gltf.scene.position.set(-20, -6.5, 25);
            gltf.scene.rotation.set(0, 1, 0)

            scene.add(gltf.scene);
            console.log(scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }

    createLight()
    {
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
        directionalLight.position.set(1, 1, 2);
        this.scene.add(directionalLight);
    }

    createCamera()
    {
        this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set( 0, 0, 6 );
        this.scene.add(this.camera);
    }

    removeScene()
    {
        if(this.scene != null)
        {
            for(let i = 0; i < this.scene.children; i++)
            {
                this.scene.children[i] = null;
            }

            this.camera = null;
            this.scene = null;
        }
    }

    updateSize(sizes)
    {
        this.sizes = sizes;
        this.camera.aspect = sizes.width / sizes.height;
        this.camera.updateProjectionMatrix();
    }
}