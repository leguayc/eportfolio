import React, { Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from "three";
import useScrollPosition from '../hooks/useScrollPosition';
import Carousel3D from './Carousel3D';
import { useCarouselContextBridge } from '../context/CarouselContext';
import LoadingScreen from './LoadingScreen';
import useModelScale from '../hooks/useModelScale';

function GLTFModel({url, isAnimated, scale, ...props}) {
    const { scene } = useGLTF(url);
    const modelScale = useModelScale(scale.base, scale[800], scale[1200]);

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

    return <primitive scale={modelScale} object={scene} {...props} />;
}

function Camera() {
    const { camera } = useThree();
    const { scrollPercentage } = useScrollPosition();
    const scrollCoeff = 11;

    camera.position.y = -scrollPercentage / scrollCoeff;

    useFrame((state, delta) => {
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollPercentage / scrollCoeff, 0.3);
    });

    return;
}

export default function Scene3D({onSceneLoaded}) {
    const ContextBridge = useCarouselContextBridge();
    const [hasSceneLoaded, setHasSceneLoaded] = useState(false);

    const handleSceneLoaded = () => {
        setHasSceneLoaded(true);
        onSceneLoaded();
    }

    console.log(hasSceneLoaded)

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
                    <GLTFModel url="./assets/models/envelopes.glb" isAnimated={true} rotation={[0, 1, 1]} scale={{base: 0.4, 800: 0.5, 1200: 0.6}} position={[0, -8.05, 0]} />
                </Suspense>
                {!hasSceneLoaded && <LoadingScreen onCompleteLoad={handleSceneLoaded} />}
            </Canvas>
        </div>
    );
}