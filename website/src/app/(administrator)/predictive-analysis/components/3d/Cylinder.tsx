import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface CylinderProps {
  position: [number, number, number];
  color: string;
  height: number;
  label: string;
  value: number;
  unit: string;
}

function Cylinder({ position, color, height, label, value, unit }: CylinderProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const targetHeight = height
  const currentHeight = useRef(0)

  useFrame(() => {
    if (mesh.current) {
      currentHeight.current += (targetHeight - currentHeight.current) * 0.05
      mesh.current.scale.y = currentHeight.current
      mesh.current.position.y = currentHeight.current / 2
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, height + 2, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {value} {unit}
      </Text>
    </group>
  )
}

export default Cylinder;