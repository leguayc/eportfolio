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
    const { nodes, materials } = useGLTF('./assets/models/phone.glb');
    
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
            <mesh geometry={nodes.mesh817659832.geometry} material={materials.mat16} />
            <mesh geometry={nodes.mesh817659832_1.geometry} material={materials.mat23} />
            <mesh geometry={nodes.mesh817659832_2.geometry}>
                {props.children}
            </mesh>
            <mesh geometry={nodes.group40103501.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group465359774.geometry} material={materials.mat17} />
            <mesh geometry={nodes.group1120752718.geometry} material={materials.mat17} />
            <mesh geometry={nodes.group1884584545.geometry} material={materials.mat23} />
            <mesh geometry={nodes.mesh641155211.geometry} material={materials.mat16} />
            <mesh geometry={nodes.mesh641155211_1.geometry} material={materials.mat8} />
            <mesh geometry={nodes.group1224932749.geometry} material={materials.mat17} />
            <mesh geometry={nodes.group849457402.geometry} material={materials.mat17} />
            <mesh geometry={nodes.group1152579848.geometry} material={materials.mat17} />
            <mesh geometry={nodes.group1637273763.geometry} material={materials.mat17} />
            <mesh geometry={nodes.group660411554.geometry} material={materials.mat23} />
            <mesh geometry={nodes.mesh1674681057.geometry} material={materials.mat24} />
            <mesh geometry={nodes.mesh1674681057_1.geometry} material={materials.mat25} />
            <mesh geometry={nodes.mesh1674681057_2.geometry} material={materials.mat5} />
            <mesh geometry={nodes.group31295272.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group1982349354.geometry} material={materials.mat25} />
            <mesh geometry={nodes.group2136648518.geometry} material={materials.mat24} />
            <mesh geometry={nodes.group1909018237.geometry} material={materials.mat24} />
            <mesh geometry={nodes.group1638188736.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group1013736083.geometry} material={materials.mat15} />
            <mesh geometry={nodes.group1124957205.geometry} material={materials.mat15} />
            <mesh geometry={nodes.group1113113092.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group15167646.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group291280508.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group261416222.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group1910001921.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group1251928019.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group1821786415.geometry} material={materials.mat23} />
            <mesh geometry={nodes.group1896686979.geometry} material={materials.mat23} />
        </group>
    );
}
  
useGLTF.preload('./assets/models/laptop.glb');
useGLTF.preload('./assets/models/phone.glb');

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
            <Phone isAnimated={true} scale={0.7} rotation={[-0.2, 3.1, 0]} position={[viewport.width * 4, -5.4, 0]}>
                <Html className='phone-content huun' rotation-y={-Math.PI} position={[0, 0.05, -0.09]} transform occlude></Html>
            </Phone>
        </group>
    );
}