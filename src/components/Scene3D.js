import React, { useRef, useState, useEffect, Suspense } from 'react';
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

function GLTFModel({url, isAnimated, ...props}) {
    const { scene } = useGLTF(url);
    const { width, height } = useThree(state => state.viewport);

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (isAnimated) {
            let rotationOffset = props.rotation ?? [];
            let positionOffset = props.position ?? [];
            scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, Math.cos(t / 2) / 15 + 0.25 + rotationOffset[0], 0.1);
            scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, Math.sin(t / 4) / 15 + rotationOffset[1], 0.1);
            scene.rotation.z = THREE.MathUtils.lerp(scene.rotation.z, Math.sin(t / 4) / 25 + rotationOffset[2], 0.1);
            scene.position.y = THREE.MathUtils.lerp(scene.position.y, (-5 + Math.sin(t)) / 10 + positionOffset[1], 0.1);
        }
    });

    return <primitive object={scene} {...props} />;
}

function Camera() {
    const { camera } = useThree();
    const { mouseX, mouseY } = useMousePosition();
    const scrollY = useScrollPosition();

    useFrame((state, delta) => {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (mouseX * Math.PI) / 450, 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (mouseY * Math.PI) / 450, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollY / 300, 0.3);
    });

    return;
}

export default function Scene3D() {

    return (
        <div className='webgl'>
            <Canvas camera={{fov: 35}}>
                <ambientLight intensity={0.3}/>
                <directionalLight position={[1, 1, 1]} intensity={1.5} castShadow />
                <Box rotation={[0, 0, 0]} position={[1.5, 0, 0]} />
                <Camera />
                <Suspense fallback={null}>
                    <GLTFModel url="./models/laptop.glb" isAnimated={true} scale={0.2} rotation={[0, 0.3, 0]} position={[-1.2, -2.8, 0]} />
                    <GLTFModel url="./models/envelopes.glb" isAnimated={true} rotation={[0, 0.9, 1]} position={[1.2, -5.3, 0]} />
                </Suspense>
            </Canvas>
        </div>
    );
}