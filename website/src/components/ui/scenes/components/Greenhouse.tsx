// components/Greenhouse.tsx
import React from 'react'

export const Greenhouse: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color="lightgreen" opacity={0.7} transparent />
    </mesh>
  )
}