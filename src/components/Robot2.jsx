/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Annelida (https://sketchfab.com/Annelida)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/toy-robot-doggy-00d3f66feffc43ff8f1ebb4a1cdfe2ff
Title: Toy Robot Doggy
*/

import React, {useEffect, useRef} from 'react'
import {Decal, useGLTF, useVideoTexture} from '@react-three/drei'
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Robot2 = (props) => {

    const group = useRef()
    const { nodes, materials } = useGLTF('/models/toy_robot_doggy.glb')

    const txt = useVideoTexture(props.texture? props.texture : "/textures/project/project1.mp4")

    // useEffect(() => {
    //     if(txt){
    //         //txt.flipY = false;
    //         txt.center.set(0.5, 0.5);
    //         txt.rotation = 165;
    //     }
    // }, [txt]);

    useGSAP(()=>{
        gsap.from(group.current, {
            y: Math.PI/2,
            duration: 1,
            ease: "power3.out"
        })
    }, [txt]);


    return (
        <group {...props} dispose={null} ref={group}>
            <group scale={0.01}>
                <group position={[0, -7.64, -4.751]} rotation={[-1.823, 0, 0]} scale={100}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Doggy_Material_0.geometry}
                        material={materials.Material}
                    />
                    <group position={[0.096, -0.028, -0.144]} rotation={[0.252, Math.PI / 2, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder002_Material_0.geometry}
                            material={materials.Material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.WheelRight_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group position={[0, 0.16, -0.088]} rotation={[0.252, Math.PI / 2, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder003_Material_0.geometry}
                            material={materials.Material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.WheelBack_Material_0.geometry}
                            material={materials.Material}
                        />
                    </group>
                    <group position={[-0.096, -0.029, -0.142]} rotation={[0.252, Math.PI / 2, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder005_Material_0.geometry}
                            material={materials.Material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.WheelLeft_Material_0.geometry}
                            material={materials.Material}
                            position={[0.002, 0, 0]}
                        />
                    </group>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Tail_Material_0.geometry}
                        material={materials.Material}
                        position={[0, 0.18, -0.023]}
                    />
                    <mesh
                        name= "screen"
                        castShadow
                        receiveShadow
                        geometry={nodes.Glass_Glass_0.geometry}
                        material={materials.Glass}
                        position={[0, -0.065, 0.062]}
                    >
                        <Decal
                        debug
                        position={[0,-0.065, 0.062]}
                        rotation={[10,10,10]}
                        scale={0}
                        polygonOffset
                        polygonOffsetFactor={-1}/>
                        <meshBasicMaterial map={txt} toneMapped={true} />
                    </mesh>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Mouth_Material_0.geometry}
                        material={materials.Material}
                        position={[0, -0.065, 0.062]}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/toy_robot_doggy.glb')

export default Robot2;