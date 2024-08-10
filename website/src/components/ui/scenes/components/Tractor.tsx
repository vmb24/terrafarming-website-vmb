// components/Tractor.tsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Tractor: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const positionRef = useRef(0)

  useFrame(() => {
    if (meshRef.current) {
      positionRef.current += 0.01
      meshRef.current.position.x = positionRef.current
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}