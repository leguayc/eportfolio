import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from "three";
import { useCarousel } from '../context/CarouselContext';

function Laptop({isAnimated, ...props})
{
    const { nodes, materials } = useGLTF('./assets/models/laptop.glb')
    const group = useRef(null);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        if (isAnimated) {
            let rotationOffset = props.rotation ?? [];
            let positionOffset = props.position ?? [];
            let mesh = group.current;

            mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, Math.cos(t / 2) / 15 + 0.25 + rotationOffset[0], 0.1);
            mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, Math.sin(t / 4) / 15 + rotationOffset[1], 0.1);
            mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, Math.sin(t / 4) / 25 + rotationOffset[2], 0.1);
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, (-5 + Math.sin(t)) / 10 + positionOffset[1], 0.1);
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                <mesh geometry={nodes['Cube008_2'].geometry}>
                    {/* Drei's HTML component can now "hide behind" canvas geometry */}
                    {props.children}
                </mesh>
                </group>
            </group>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </group>
    );
}

function Phone({isAnimated, ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF('./assets/models/phone.gltf');
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        if (isAnimated) {
            let rotationOffset = props.rotation ?? [];
            let positionOffset = props.position ?? [];
            let mesh = group.current;

            mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, Math.cos(t / 2) / 15 + 0.25 + rotationOffset[0], 0.1);
            mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, Math.sin(t / 4) / 15 + rotationOffset[1], 0.1);
            mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, Math.sin(t / 4) / 25 + rotationOffset[2], 0.1);
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, (-5 + Math.sin(t)) / 10 + positionOffset[1], 0.1);
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group position={[0, 0.5, -1.43]} rotation={[-0.2, 0, 0]}>
                <mesh geometry={nodes.Object_2.geometry}>
                    
                </mesh>
                <mesh geometry={nodes.Object_3.geometry} material={materials.Phone} />
                {props.children}
            </group>
        </group>
    );
}
  
useGLTF.preload('./assets/models/laptop.glb');
useGLTF.preload('./assets/models/phone.gltf');

export default function Carousel3D(props) {
    const {viewport} = useThree();
    const group = useRef(null);
    const { state } = useCarousel();
    const index = state.carouselIndex;

    useFrame((state, delta) => {
        let carousel = group.current;
        carousel.position.x = THREE.MathUtils.lerp(carousel.position.x, -viewport.width * index, 0.08);
    });

    return (
        <group ref={group}>
            <Laptop isAnimated={true} scale={0.11} rotation={[0, 0, 0]} position={[0, -5.4, 0]}>
                <Html className='laptop-content myblazon' rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude></Html>
            </Laptop>
            <Laptop isAnimated={true} scale={0.11} rotation={[0, 0, 0]} position={[viewport.width, -5.4, 0]}>
                <Html className='laptop-content endlesswander' rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude></Html>
            </Laptop>
            <Laptop isAnimated={true} scale={0.11} rotation={[0, 0, 0]} position={[viewport.width * 2, -5.4, 0]}>
                <Html className='laptop-content ederiawebsite' rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude></Html>
            </Laptop>
            <Laptop isAnimated={true} scale={0.11} rotation={[0, 0, 0]} position={[viewport.width * 3, -5.4, 0]}>
                <Html className='laptop-content clicknboat' rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude></Html>
            </Laptop>
            <Phone isAnimated={true} scale={0.015} rotation={[-0.1, 0, 0]} position={[viewport.width * 4, -5.4, 0]}>
                <Html className='phone-content huun' position={[0, 0.7, -0.09]} transform></Html>
            </Phone>
        </group>
    );
}