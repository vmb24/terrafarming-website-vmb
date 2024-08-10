import React from 'react'

export const Crop: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}