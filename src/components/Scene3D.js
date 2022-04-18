import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from "three";
import useMousePosition from '../hooks/useMousePosition';
import useScrollPosition from '../hooks/useScrollPosition';

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

function GLTFObject({url, ...props}) {
    const { scene } = useGLTF(url);

    return <primitive object={scene} {...props} />;
}

function Camera() {
    const { camera } = useThree();
    const { mouseX, mouseY } = useMousePosition();
    const scrollY = useScrollPosition();

    console.log(camera)

    useFrame((state, delta) => {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (mouseX * Math.PI) / 450, 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (mouseY * Math.PI) / 450, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollY / 300, 0.3);
    });

    return;
}

export default function Scene3D() {
    const {objects, setObjects} = useState([]);

    return (
        <div className='webgl'>
            <Canvas camera={{fov: 35}}>
                <ambientLight intensity={0.1}/>
                <directionalLight position={[1, 1, 1]} intensity={1} />
                <Box rotation={[0, 0, 0]} position={[1.5, 0, 0]} />
                <Camera />
                <Suspense fallback={null}>
                    <GLTFObject url="./models/envelopes.glb" rotation={[0.3, 0.9, 1]} position={[1.2, -5.8, 0]}></GLTFObject>
                    <GLTFObject url="./models/laptop.glb" scale={0.015} rotation={[0.3, 0.3, -0.03]} position={[-1.2, -3.5, 0]}></GLTFObject>
                </Suspense>
            </Canvas>
        </div>
    );
}