import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Loader } from '@react-three/drei';
import * as THREE from "three";
import useMousePosition from '../hooks/useMousePosition';
import useScrollPosition from '../hooks/useScrollPosition';
import Carousel3D from './Carousel3D';
import { useCarouselContextBridge } from '../context/CarouselContext';

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

function Camera() {
    const { camera, gl } = useThree();
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
    const ContextBridge = useCarouselContextBridge();

    return (
        <div className='webgl'>
            <Canvas camera={{fov: 35}}>
                <ambientLight intensity={0.3}/>
                <directionalLight position={[1, 1, 1]} intensity={1.5} castShadow />
                <Camera />
                <Suspense fallback={null}>
                    <ContextBridge>
                        <Carousel3D position={[0, -5.4, 0]} />
                    </ContextBridge>
                    <GLTFModel url="./assets/models/envelopes.glb" isAnimated={true} rotation={[0, 1, 1]} scale={0.6} position={[0, -8.05, 0]} />
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}