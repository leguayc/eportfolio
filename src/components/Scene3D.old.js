import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useGLTF, MeshWobbleMaterial, Loader } from '@react-three/drei';
import * as THREE from "three";
import useMousePosition from '../hooks/useMousePosition';
import useScrollPosition from '../hooks/useScrollPosition';

function GLTFModel({url, isAnimated, ...props}) {
    const { scene } = useGLTF(url);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
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

function TransparentImage3D({image, width, height, isAnimated, ...props}) {
    const texture = useLoader(THREE.TextureLoader, image);
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        if (isAnimated) {
            let rotationOffset = props.rotation ?? [0, 0, 0];
            let positionOffset = props.position ?? [0, 0, 0];
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, Math.sin(t / 4) / 15 + rotationOffset[1], 0.1);
            mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, (-5 + Math.sin(t)) / 10 + positionOffset[1], 0.1);
        }
    });

    return (
        <mesh ref={mesh} {... props}>
            <planeBufferGeometry args={[width, height]} />
            <meshPhongMaterial  map={texture} toneMapped={false} transparent />
        </mesh>
    );
}

function WobblyImage3D({image, width, height, speed, factor, ...props}) {
    const texture = useLoader(THREE.TextureLoader, image);
    const mesh = useRef();

    return (
        <mesh ref={mesh} {... props}>
            <planeBufferGeometry args={[width, height]} />
            <MeshWobbleMaterial factor={factor} speed={speed} map={texture} toneMapped={false} />
        </mesh>
    );
}

function Camera() {
    const { camera } = useThree();
    const { mouseX, mouseY } = useMousePosition();
    const { scrollPercentage } = useScrollPosition();
    const scrollCoeff = 11;

    camera.position.y = -scrollPercentage / scrollCoeff;

    useFrame((state, delta) => {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (mouseX * Math.PI) / 450, 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (mouseY * Math.PI) / 450, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollPercentage / scrollCoeff , 0.3);
    });

    return;
}

export default function Scene3D() {

    return (
        <div className='webgl'>
            <Canvas camera={{fov: 35}}>
                <ambientLight intensity={0.3}/>
                <directionalLight position={[1, 1, 1]} intensity={1.5} castShadow />
                <Camera />
                <Suspense fallback={null}>
                    <TransparentImage3D image="./avatar.png" width="1.7" height="1.7" isAnimated={true} rotation={[0.1, -0.2, 0]} position={[1.2, 0.7, 0]} />
                    <GLTFModel url="./models/laptop.glb" isAnimated={true} scale={0.17} rotation={[0, 0.3, 0]} position={[-1.2, -2.8, 0]} />
                    <GLTFModel url="./models/envelopes.glb" isAnimated={true} rotation={[0, 0.9, 1]} position={[1.2, -5.3, 0]} />
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}