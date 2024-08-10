// components/Tree.tsx
import React from 'react'

export const Trees: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Tronco da Árvore */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial color="saddlebrown" />
      </mesh>

      {/* Copa da Árvore */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  )
}