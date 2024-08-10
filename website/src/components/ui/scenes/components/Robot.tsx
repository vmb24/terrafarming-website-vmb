// components/Robot.tsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Robot: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += 0.01
      if (meshRef.current.position.x > 5) meshRef.current.position.x = -5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      <boxGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}