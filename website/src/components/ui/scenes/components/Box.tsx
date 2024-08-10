// components/Box.tsx
import React from 'react'
import { FC } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Box: FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}